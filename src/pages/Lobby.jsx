import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "../store/actions/gameActions";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";

const Lobby = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId, users } = useSelector((state) => state.room);
  const [copied, setCopied] = useState(false);
  console.log("users", users);
  useEffect(() => {
    if (users.length === 0) {
      navigate("/");
    }
  }, [users, navigate]);

  useEffect(() => {
    socket.on("user-joined", ({ userId }) => {
      console.log(`${userId} joined`);
      // Don't update Redux users here. Let API handle it in RoomForm.
    });

    socket.on("start-game", () => {
      dispatch(startGame());
      navigate("/game");
    });

    return () => {
      socket.off("user-joined");
      socket.off("start-game");
    };
  }, [dispatch, navigate]);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = () => {
    socket.emit("start-game", { roomId });
  };

  return (
    <div className="flex flex-col items-center bg-ternary shadow-lg justify-center rounded-md  space-y-6 p-12">
      <h2 className="text-2xl font-bold">
        Room: <span className="">{roomId}</span>
      </h2>

      <button
        className="px-4 py-2  rounded"
        onClick={handleCopyRoomId}
      >
        {copied ? "Copied!" : "Copy Room ID"}
      </button>

      <div className="w-full max-w-md rounded-lg p-4 shadow">
        <h3 className="text-xl font-semibold mb-2">Players Joined</h3>
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={user.username}
              className=" px-4 py-2 rounded text-sm"
            >
              {index + 1}. {user.username}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-400 mt-3">
          {users.length}/5 players in room
        </p>
      </div>

      <button
        className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-secondary hover:text-primary transition duration-300"
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default Lobby;
