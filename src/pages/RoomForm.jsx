import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { toast } from "react-toastify";
import socket from "../socket/socket";
import { createRoom, joinRoom, setUsers } from "../store/actions/roomActions";
import { createRoomAPI, joinRoomAPI } from "../api/room";
import { SOCKET_EVENTS } from "../utils/constants";
import Spinner from "../components/common/Spinner";

const RoomForm = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useSelector((state) => state.game.darkMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !roomName) return;

    setIsLoading(true);
    const socketId = socket.id;
    try {
      let res;
      if (isCreating) {
        res = await createRoomAPI(username, socketId, roomName);
        dispatch(createRoom(roomName, username));
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
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, {
        roomId: roomName,
        userId: username,
      });
      navigate("/lobby");
    } catch (err) {
      toast.warn(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center rounded-md shadow-lg space-y-6 p-16 mt-24",
        {
          "bg-ternary": !isDarkMode,
          "bg-dternary text-white": isDarkMode,
        },
      )}
    >
      <h2 className="text-2xl font-bold">
        {isCreating ? "Create" : "Join"} a Room
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <input
          type="text"
          className={classNames(
            "w-full px-4 py-2 rounded-md transition focus:outline-none focus:ring-2",
            {
              "bg-light text-primary border-ternary placeholder-secondary focus:ring-primary focus:border-primary":
                !isDarkMode,
              "bg-dlight text-dprimary border-dternary placeholder-dsecondary focus:ring-dprimary focus:border-dprimary":
                isDarkMode,
            },
          )}
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          className={classNames(
            "w-full px-4 py-2 rounded-md transition focus:outline-none focus:ring-2",
            {
              "bg-light text-primary border-ternary placeholder-secondary focus:ring-primary focus:border-primary":
                !isDarkMode,
              "bg-dlight text-dprimary border-dternary placeholder-dsecondary focus:ring-dprimary focus:border-dprimary":
                isDarkMode,
            },
          )}
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />

        <button
          className={classNames(
            "cursor-pointer px-5 py-2 rounded-md shadow-md transition duration-300 disabled:cursor-not-allowed",
            {
              "bg-primary text-white hover:bg-secondary hover:text-primary":
                !isDarkMode,
              "bg-dprimary text-dlight hover:bg-dsecondary hover:text-dprimary":
                isDarkMode,
            },
          )}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? <Spinner /> : isCreating ? "Create" : "Join"}
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
