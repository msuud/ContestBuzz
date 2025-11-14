import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_API_URL;
console.log("BACKEND_URL =", process.env.REACT_APP_API_URL);

export const scheduleNotification = async (userId, userEmail, contest) => {
  try {
    const response = await fetch(`${BASE_URL}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        userEmail,
        contestId: contest.id,
        contestName: contest.name,
        contestTime: contest.start_time,
        contestUrl: contest.url,
      }),
    });

    const data = await response.json(); // << You forgot this earlier

    if (data.success) {
      toast.success("Notification set successfully!");
      return true;
    } else {
      toast.error(data.message || "Failed to set notification");
      return false;
    }
  } catch (error) {
    console.error("Error setting notification:", error);
    toast.error("Failed to set notification. Please try again.");
    return false;
  }
};

export const cancelNotification = async (userId, contestId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cancel-notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, contestId }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Notification canceled");
      return true;
    } else {
      toast.error(data.message || "Failed to cancel notification");
      return false;
    }
  } catch (error) {
    console.error("Error canceling notification:", error);
    toast.error("Failed to cancel notification. Please try again.");
    return false;
  }
};
