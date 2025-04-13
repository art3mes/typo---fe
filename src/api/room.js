import axios from "axios";

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/room`;

const handleRoomRequest = async (endpoint, username, socketId, roomName) => {
  try {
    const res = await axios.post(`${API_BASE}/${endpoint}`, {
      username,
      socketId,
      roomName,
    });
    return res.data;
  } catch (err) {
    throw `Failed to ${endpoint === "create" ? "create" : "join"} room.`;
  }
};

export const createRoomAPI = (username, socketId, roomName) =>
  handleRoomRequest("create", username, socketId, roomName);
export const joinRoomAPI = (username, socketId, roomName) =>
  handleRoomRequest("join", username, socketId, roomName);
