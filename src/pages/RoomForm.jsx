import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import socket from "../socket/socket";
import { useDispatch } from "react-redux";
import { createRoom, joinRoom, setUsers } from "../store/actions/roomActions";
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
        toast(`${roomName} room has been created`);
      } else {
        res = await joinRoomAPI(username, socketId, roomName);
        dispatch(joinRoom(roomName, username));
        const userList = res?.users?.map((user) => ({
          username: user.username,
        }));
        dispatch(setUsers(userList));
        toast(`You have joined ${roomName} room.`);
      }
      socket.emit("join-room", { roomId: roomName, userId: username });
      navigate("/lobby");
      
    } catch (err) {
      console.log(err);
      toast.warn(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-ternary rounded-md shadow-lg space-y-6 p-16 mt-24">
      <h2 className="text-2xl font-bold">
        {isCreating ? "Create" : "Join"} a Room
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md bg-light text-primary border border-ternary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md bg-light text-primary border border-ternary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />

        <button
          className="bg-primary text-white cursor-pointer px-5 py-2 rounded-md shadow-md hover:bg-secondary hover:text-primary transition duration-300"
          type="submit"
        >
          {isCreating ? "Create" : "Join"}
        </button>
      </form>

      <button
        onClick={() => setIsCreating(!isCreating)}
        className="text-sm underline cursor-pointer"
      >
        {isCreating
          ? "Join an existing room instead"
          : "Create a new room instead"}
      </button>
    </div>
  );
};

export default RoomForm;
