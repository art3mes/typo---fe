import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endGame } from "../store/actions/gameActions";
import socket from "../socket/socket";
import { calculateAccuracy, calculateWPM } from "../utils/Helper";
import { setWPM } from "../store/actions/typingActions";

const CountdownTimer = ({ duration = 30 }) => {
  const startTime = useSelector((state) => state.game.startTime);
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.room.roomId);
  const userId = useSelector((state) => state.room.userId);
  const correctCount = useSelector((state) => state.typing.correctCount);
  const mistakeCount = useSelector((state) => state.typing.mistakeCount);
  const wpm = useSelector((state) => state.typing.wpm);

  useEffect(() => {
    if (startTime) {
      const end = startTime + duration * 1000;

      const updateTimeLeft = () => {
        const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));
        setTimeLeft(remaining);

        if (remaining === 0) {
          clearInterval(intervalRef.current);
          dispatch(endGame());

          if (roomId && userId) {
            const calculatedWPM = calculateWPM(correctCount, startTime);
            console.log("emitting wpm for BE: ", calculatedWPM);

            dispatch(setWPM(calculatedWPM));

            console.log(
              roomId,
              userId,
              calculatedWPM,
              correctCount,
              mistakeCount,
              calculateAccuracy(correctCount, mistakeCount),
            );
            socket.emit("end-game", {
              roomId,
              userId,
              wpm: calculatedWPM,
              correctCount,
              mistakeCount,
              accuracy: calculateAccuracy(correctCount, mistakeCount),
            });
          }

          console.log("game ended");
          return () => {
            socket.off("end-game");
          };
        }
      };

      updateTimeLeft();
      intervalRef.current = setInterval(updateTimeLeft, 1000);
    } else {
      setTimeLeft(duration);
    }

    return () => clearInterval(intervalRef.current);
  }, [
    duration,
    dispatch,
    roomId,
    userId,
    wpm,
    mistakeCount,
    startTime,
    correctCount,
  ]);

  return (
    <div className="text-xl font-mono font-bold text-red-600">{timeLeft}s</div>
  );
};

export default CountdownTimer;
