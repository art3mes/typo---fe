import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoom, joinRoom, setUsers } from "../store/actions/roomActions";
import socket from "../socket/socket";
import { createRoomAPI, joinRoomAPI } from "../api/room";

const RoomForm = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !roomName) return;

    const socketId = socket.id;

    try {
      let res;
      if (isCreating) {
        res = await createRoomAPI(username, socketId, roomName);
        dispatch(createRoom(roomName, username));
        console.log(res?.user);
        dispatch(setUsers([res?.user]));
      } else {
        res = await joinRoomAPI(username, socketId, roomName);
        dispatch(joinRoom(roomName, username));
        const userList = res?.users?.map((user) => ({
          username: user.username,
        }));
        dispatch(setUsers(userList));
      }
      console.log(res);
      // Set users from API response

      // Now emit socket event after success
      socket.emit("join-room", { roomId: roomName, userId: username });

      navigate("/lobby");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-6 p-6">
      <h2 className="text-3xl font-bold">
        {isCreating ? "Create" : "Join"} a Room
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <input
          type="text"
          className="p-2 rounded bg-gray-800"
          placeholder="Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="p-2 rounded bg-gray-800"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600"
          type="submit"
        >
          {isCreating ? "Create Room" : "Join Room"}
        </button>
      </form>

      <button
        onClick={() => setIsCreating(!isCreating)}
        className="text-sm text-pink-300 underline"
      >
        {isCreating ? "Join existing room instead" : "Create new room instead"}
      </button>
    </div>
  );
};

export default RoomForm;
