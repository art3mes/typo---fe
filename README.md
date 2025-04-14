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

## ✨ Future Enhancements?

There’s always more to build when you're a bit of a perfectionist (or just easily excited). Here are some things I might add... or might not... who knows:

- 🌸 **Offline Practice Mode**  
  Because sometimes you just wanna zone out and type in peace, no internet drama.

- 🏆 **Global Leaderboard**  
  The data’s already in MongoDB — might as well flex those top scores, right?

- 🎨 **More Themes**  
  Dark and light are fine, but we all have main character moods. Theme selector incoming?

- 📜 **Scrolling Typing Area**  
  Static walls of text? Nah. A dynamic, scrollable typing view that keeps up with your speed.

- 💬 **Chatroom in Lobby/Endgame**  
  For all the trash talk, GG’s, and existential dread. Maybe even emoji support if I get too ambitious.

---

## 📼 Media

Jam link: https://jam.dev/c/53213a0b-2ce5-4e94-8de2-7046b2a1d2a3

![typo](https://github.com/user-attachments/assets/61ba8e8f-4259-4eb3-87c9-8ee6708299bb)

---

## 🎉 Final words

This was fun, nerve-wrecking, informative and a good use of my time.

Feel free to contribute, suggest features, or just vibe with it. Thanks for checking it out 💖

---

> made with way too many keyboard noises 🎧
