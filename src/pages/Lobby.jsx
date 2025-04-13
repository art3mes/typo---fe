import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import RenderImage from "../utils/RenderImage";
import { SOCKET_EVENTS } from "../utils/constants";
import { startGame } from "../store/actions/gameActions";
import { setUsers } from "../store/actions/roomActions";

const Lobby = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { roomId, users, userId } = useSelector((state) => state.room);
  console.log("users", users);
  useEffect(() => {
    if (users.length === 0) {
      navigate("/");
    }
  }, [users, navigate]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.USER_JOINED, ({ userId }) => {
      console.log(`${userId} joined`);
      toast(`Player ${userId} has joined the room!`);
      const updatedList = [...users, { username: userId }];
      console.log("updated list", updatedList);
      dispatch(setUsers(updatedList));
    });

    socket.on(SOCKET_EVENTS.START_GAME, () => {
      dispatch(startGame());
      navigate("/game");
      toast("Game has started!");
    });

    return () => {
      socket.off(SOCKET_EVENTS.USER_JOINED);
      socket.off(SOCKET_EVENTS.START_GAME);
    };
  }, [dispatch, navigate]);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = () => {
    console.log("game started emitting");
    socket.emit(SOCKET_EVENTS.START_GAME, { roomId, userId });
  };

  return (
    <div className="flex flex-col w-[30%] bg-ternary shadow-lg justify-center rounded-md  space-y-6 mt-12 py-12 px-6">
      <div className="flex flex-col">
        <div className="font-bold">room:</div>
        <div className="text-2xl flex flex-row items-center gap-2 ">
          {roomId}{" "}
          <button onClick={handleCopyRoomId} className=" cursor-pointer">
            {copied ? (
              <RenderImage name="tick" />
            ) : (
              <RenderImage name="copy" className="!w-4 !h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="w-full">
        <h3 className="text-xl font-semibold mb-2">Players in Lobby:</h3>
        <ul className="">
          {users.map((user, index) => (
            <div
              key={user.username}
              className="border-2 my-2 cursor-pointer flex flex-row gap-2 rounded-md border-primary bg-white "
            >
              <span className="bg-primary flex items-center justify-center w-6 text-white">
                {index + 1}.
              </span>{" "}
              <span className="font-semibold text-primary text-lg leading-10">
                {user.username}
              </span>
            </div>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mt-3">
          {users.length}/5 players in room (More the Merrier!)
        </p>
      </div>

      <button
        className="bg-primary cursor-pointer text-white px-5 py-2 rounded-md shadow-md hover:bg-secondary hover:text-primary transition duration-300"
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default Lobby;
