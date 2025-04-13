import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import socket from "../socket/socket";
import { endGame } from "../store/actions/gameActions";
import { setWPM } from "../store/actions/typingActions";
import { SOCKET_EVENTS } from "../utils/constants";
import { calculateAccuracy, calculateWPM } from "../utils/Helper";

const CountdownTimer = ({ duration = 30 }) => {
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  const hasEndedRef = useRef(false);
  const [timeLeft, setTimeLeft] = useState(duration);

  const { startTime } = useSelector((state) => state.game);
  const { roomId, userId } = useSelector((state) => state.room);
  const { correctCount, mistakeCount } = useSelector((state) => state.typing);

  useEffect(() => {
    if (!startTime) {
      setTimeLeft(duration);
      return;
    }

    const endTime = startTime + duration * 1000;

    const updateTimeLeft = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0 && !hasEndedRef.current) {
        clearInterval(intervalRef.current);
        hasEndedRef.current = true;
        dispatch(endGame());
        toast("Game Ended!");

        if (roomId && userId) {
          const wpm = calculateWPM(correctCount, startTime);
          const accuracy = calculateAccuracy(correctCount, mistakeCount);

          dispatch(setWPM(wpm));

          socket.emit(SOCKET_EVENTS.END_GAME, {
            roomId,
            userId,
            wpm,
            correctCount,
            mistakeCount,
            accuracy,
          });
        }
      }
    };

    updateTimeLeft(); // Initialize immediately
    intervalRef.current = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(intervalRef.current);
  }, [startTime, duration, dispatch, roomId, userId, correctCount, mistakeCount]);

  return (
    <div className="flex flex-col w-36 px-4">
      <span>Time left</span>
      <div className="flex flex-row items-end">
        <span className="font-pixelify text-xl mb-2">s</span>
        <span className="text-9xl text-ternary">{timeLeft}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
