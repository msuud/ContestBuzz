# 🎯 ContestBuzz – Your Personal Competitive Programming Notifier

Staying updated with coding contests across multiple platforms can be overwhelming.  
**ContestBuzz** is a smart contest tracking and notification platform that helps competitive programmers stay informed about upcoming and ongoing contests — all in one place.

## 🚀 What is ContestBuzz?

ContestBuzz fetches live contest data from major platforms and displays them in a clean, organized dashboard.  
It also offers email reminders, calendar integration, and platform filtering to make contest tracking effortless.

## 🔥 Features

### 📅 Unified Contest Dashboard
- View **upcoming** and **ongoing** contests at a glance  
- Clean UI with platform-wise contest cards  
- Featured contest slider on the homepage  

### 🔍 Contest Filtering
- Filter contests by:
  - CodeForces  
  - LeetCode  
  - CodeChef  
  - AtCoder  
  - GeeksforGeeks  

### 🔔 Smart Email Notifications
- Click **"Notify Me"** on any contest  
- Receive an automated email alert **1 hour before** the contest starts  
- Handled using **Twilio SendGrid**  

### 📆 Calendar Integration
- One-click **Add to Calendar** button  
- Supports Google Calendar, Outlook & others  

### 👤 User Authentication
- Google Sign-In using Firebase Auth  
- Personalized notifications per user  

### 📡 Real-Time Data Integration
- Uses **Clist.by API** to fetch contest data from 5 major platforms  
- Updates in real time  

## 🧠 How It Works

1. Clist.by API fetches real-time contest data  
2. Backend categorizes contests as **ongoing** / **upcoming**  
3. User filters contests by platform  
4. User clicks:
   - **Visit Contest** → Opens contest page  
   - **Add to Calendar** → Saves contest timing  
   - **Notify Me** → Sends email reminder automatically  

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Styled Components  
- Framer Motion  

### **Backend**
- Node.js  
- Express.js  
- Firebase Admin SDK  

### **Database**
- Firebase Firestore  

### **Email Service**
- Twilio SendGrid API  

### **Contest API**
- Clist.by  

## 📸 Screenshots
<img width="1919" height="812" alt="Screenshot 2025-11-14 215242" src="https://github.com/user-attachments/assets/4dd850a1-061e-4421-bffa-7973e90a6fd2" />
<img width="1919" height="829" alt="Screenshot 2025-11-14 215258" src="https://github.com/user-attachments/assets/2c71f630-7471-4345-bc43-44e1bf830684" />
<img width="1917" height="689" alt="Screenshot 2025-11-14 215311" src="https://github.com/user-attachments/assets/5c944433-1b84-4494-aa9b-861217bf49f9" />
<img width="1916" height="822" alt="Screenshot 2025-11-14 215322" src="https://github.com/user-attachments/assets/403861a7-28a7-4240-a74c-e9a0b06cb7fc" />
<img width="985" height="741" alt="Screenshot 2025-11-14 215338" src="https://github.com/user-attachments/assets/731a1273-48e7-4043-acc3-ff61467f4760" />
<img width="1557" height="621" alt="Screenshot 2025-11-14 215734" src="https://github.com/user-attachments/assets/cbb14596-9e73-45d6-bfb2-19a36db00bb9" />







