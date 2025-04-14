# typo😔

> A realtime typing battle app — where speed meets chaos.

## ⚙️ Tech Stack

<p float="left">
  <img src="https://img.shields.io/badge/React-v18-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-v5-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoosev8-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-v20-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-v4-010101?logo=socket.io&logoColor=white" />
</p>

---

## 💡 What is it actually?

**typo😔** is a realtime multiplayer typing competition app made with love and just a pinch of chaos.

Here's what it does:
- 🧠 Users can **create a room** and share the name for others to join (up to 5 players).
- 🕹️ Once the room creator hits **Start**, a **60-second countdown** begins.
- ⌨️ Players type their hearts out while metrics like **correct letters**, **mistakes**, **accuracy**, and **WPM** update in realtime using Socket.IO.
- 🏆 At the end of the countdown, the player with the **highest WPM** gets bragging rights as the winner.
- 🧘‍♂️ Not ready for battle? Hit the **Practice** button from the header for a chill solo session.

It's all live, reactive, and surprisingly intense for something as nerdy as typing 😌

---

## 🚀 Getting Started

You'll need:
- Both **frontend** and **backend** repos
- A **MongoDB connection string**
- Environment variables set up properly

---

### 🖥️ Frontend Setup

1. Clone the frontend repo.
2. Create a `.env` file in the root and add:
   > VITE_BACKEND_URL=http://localhost:3000
3. Install dependencies:
   > npm install
4. Start the frontend server:
   > npm run dev
   
---

### 🔧 Backend Setup

1. Clone the backend repo.
2. Create a `.env` file in the root and add:
   > MONGO_URI=your_mongo_connection_string_here
3. Install dependencies:
   > npm install
4. Start the backend server:
   > nodemon server.js


---

## 🎉 Final words

This was fun, nerve-wrecking, informative and a good use of my time. 

Feel free to contribute, suggest features, or just vibe with it. Thanks for checking it out 💖

---

> made with way too many keyboard noises 🎧

