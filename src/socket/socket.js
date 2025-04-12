import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // or your deployed backend URL
// const socket = io("https://typo-be-production.up.railway.app");

export default socket;
