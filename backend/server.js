const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const notificationJobs = new Map();
const contestService = require("./contestService.js");

let cachedContests = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000 * 5; // 5 minutes

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "urvadave2@gmail.com",
    pass: process.env.REACT_APP_GMAIL_PASSWORD,
  },
});

const sendConfirmationEmail = async (userEmail, contestName, contestTime) => {
  try {
    const mailOptions = {
      from: "contestbuzz123@gmail.com",
      to: userEmail,
      subject: `Notification Set for ${contestName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #8b5cf6;">ContestBuzz Notification Confirmation</h2>
          <p>You have successfully set up a notification for the following contest:</p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="margin: 0 0 10px 0;">${contestName}</h3>
            <p style="margin: 0;">Scheduled for: ${new Date(
              contestTime
            ).toLocaleString()}</p>
          </div>
          <p>You will receive a reminder email 1 hour before the contest starts.</p>
          <p>Happy coding!</p>
          <p>- The ContestBuzz Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", userEmail);
    return true;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return false;
  }
};

const sendReminderEmail = async (
  userEmail,
  contestName,
  contestUrl,
  contestTime
) => {
  try {
    const mailOptions = {
      from: "contestbuzz123@gmail.com",
      to: userEmail,
      subject: `REMINDER: ${contestName} Starting in 1 Hour!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #8b5cf6;">ContestBuzz Reminder</h2>
          <p><strong>${contestName}</strong> is starting in 1 hour!</p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="margin: 0 0 10px 0;">${contestName}</h3>
            <p style="margin: 0;">Starting at: ${new Date(
              contestTime
            ).toLocaleString()}</p>
          </div>
          <p>Don't miss it! Click the button below to go to the contest:</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${contestUrl}" style="background-color: #8b5cf6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Contest</a>
          </div>
          <p>Good luck!</p>
          <p>- The ContestBuzz Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Reminder email sent to:", userEmail);
    return true;
  } catch (error) {
    console.error("Error sending reminder email:", error);
    return false;
  }
};

app.post("/api/notify", async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      contestId,
      contestName,
      contestTime,
      contestUrl,
    } = req.body;

    if (
      !userEmail ||
      !contestId ||
      !contestName ||
      !contestTime ||
      !contestUrl
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    await sendConfirmationEmail(userEmail, contestName, contestTime);

    const contestDate = new Date(contestTime);
    const reminderDate = new Date(contestDate.getTime() - 60 * 60 * 1000); // 1 hour before

    if (reminderDate <= new Date()) {
      return res.status(200).json({
        success: true,
        message:
          "Confirmation email sent but reminder not scheduled (contest is too soon)",
      });
    }

    const jobKey = `${userId}_${contestId}`;

    if (notificationJobs.has(jobKey)) {
      notificationJobs.get(jobKey).stop();
    }

    const job = cron.schedule(
      `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${
        reminderDate.getMonth() + 1
      } *`,
      async () => {
        await sendReminderEmail(
          userEmail,
          contestName,
          contestUrl,
          contestTime
        );
        notificationJobs.delete(jobKey);
      },
      { scheduled: true }
    );

    notificationJobs.set(jobKey, job);

    res.status(200).json({
      success: true,
      message: "Notification scheduled successfully",
      reminderTime: reminderDate,
    });
  } catch (error) {
    console.error("Error scheduling notification:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/cancel-notify", async (req, res) => {
  try {
    const { userId, contestId } = req.body;
    const jobKey = `${userId}_${contestId}`;

    if (notificationJobs.has(jobKey)) {
      notificationJobs.get(jobKey).stop();
      notificationJobs.delete(jobKey);
      res
        .status(200)
        .json({ success: true, message: "Notification canceled successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
  } catch (error) {
    console.error("Error canceling notification:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== CLIST ROUTE =====
app.get("/api/clist/contests", async (req, res) => {
  try {
    const now = Date.now();

    if (cachedContests && now - lastFetchTime < CACHE_DURATION) {
      return res.json({ success: true, data: cachedContests });
    }

    const data = await contestService.getCategorizedContests();

    cachedContests = data;
    lastFetchTime = now;

    res.json({ success: true, data });
  } catch (err) {
    console.error("CLIST FETCH ERROR:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch contests",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Notification server running on port ${PORT}`);
});

module.exports = app;
