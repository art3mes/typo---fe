import axios from "axios";

const API_BASE = "http://localhost:3000/api/room";

export const createRoomAPI = async (username, socketId, roomName) => {
  try {
    console.log("create", username, socketId, roomName);
    const res = await axios.post(`${API_BASE}/create`, {
      username,
      socketId,
      roomName,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to create room.";
  }
};

export const joinRoomAPI = async (username, socketId, roomName) => {
  try {
    const res = await axios.post(`${API_BASE}/join`, {
      username,
      socketId,
      roomName,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to join room.";
  }
};
