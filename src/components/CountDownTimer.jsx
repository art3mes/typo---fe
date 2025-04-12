import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endGame } from "../store/actions/gameActions";

const CountdownTimer = ({ duration = 30 }) => {
  const startTime = useSelector((state) => state.game.startTime);
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (startTime) {
      const end = startTime + duration * 1000;

      const updateTimeLeft = () => {
        const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));
        setTimeLeft(remaining);

        if (remaining === 0) {
          clearInterval(intervalRef.current);
          console.log("game ended");
          dispatch(endGame());
        }
      };

      updateTimeLeft();
      intervalRef.current = setInterval(updateTimeLeft, 1000);
    } else {
      setTimeLeft(duration);
    }

    return () => clearInterval(intervalRef.current);
  }, [startTime, duration, dispatch]);

  return (
    <div className="text-xl font-mono font-bold text-red-600">{timeLeft}s</div>
  );
};

export default CountdownTimer;
