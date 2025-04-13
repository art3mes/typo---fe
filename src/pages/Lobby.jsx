import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import RenderImage from "../utils/RenderImage";
import { SOCKET_EVENTS } from "../utils/constants";
import { startGame } from "../store/actions/gameActions";
import { setUsers } from "../store/actions/roomActions";
import classNames from "classnames";

const Lobby = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { roomId, users, userId } = useSelector((state) => state.room);
  const isDarkMode = useSelector((state) => state.game.darkMode);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      navigate("/");
    }
  }, [users, navigate]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.USER_JOINED, ({ userId }) => {
      toast(`Player ${userId} has joined the room!`);
      const updatedList = [...users, { username: userId }];
      dispatch(setUsers(updatedList));
    });

    socket.on(SOCKET_EVENTS.START_GAME, () => {
      dispatch(startGame());
      setIsLoading(false);
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
    setIsLoading(true);
    socket.emit(SOCKET_EVENTS.START_GAME, { roomId, userId });
  };

  return (
    <div
      className={classNames(
        "flex flex-col w-fit shadow-lg justify-center rounded-md space-y-6 mt-12 py-12 px-6",
        {
          "bg-ternary": !isDarkMode,
          "bg-dternary text-dlight": isDarkMode,
        },
      )}
    >
      <div className="flex flex-col">
        <div className="font-bold">room:</div>
        <div
          className={classNames("text-2xl flex flex-row items-center gap-2 ", {
            "text-white": isDarkMode,
          })}
        >
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
              className={classNames(
                "my-2 cursor-pointer flex flex-row gap-2 rounded-md",
                {
                  "border-2 border-primary bg-white": !isDarkMode,
                  "border-2 border-dprimary bg-dprimary": isDarkMode,
                },
              )}
            >
              <span
                className={classNames(
                  "flex items-center justify-center w-6 text-white",
                  {
                    "bg-primary": !isDarkMode,
                    "bg-dprimary": isDarkMode,
                  },
                )}
              >
                {index + 1}.
              </span>{" "}
              <span
                className={classNames("font-semibold text-lg leading-10", {
                  "text-primary": !isDarkMode,
                  "text-dlight": isDarkMode,
                })}
              >
                {user.username}
              </span>
            </div>
          ))}
        </ul>
        <p
          className={classNames("text-sm mt-3", {
            "text-gray-500": !isDarkMode,
            "text-dlight": isDarkMode,
          })}
        >
          {users.length}/5 players in room (More the Merrier!)
        </p>
      </div>

      <button
        className={classNames(
          "cursor-pointer text-white px-5 py-2 rounded-md shadow-md transition duration-300 disabled:cursor-not-allowed",
          {
            "bg-primary hover:bg-secondary hover:text-primary": !isDarkMode,
            "bg-dprimary hover:bg-dsecondary hover:text-dprimary": isDarkMode,
          },
        )}
        disabled={isLoading}
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default Lobby;
