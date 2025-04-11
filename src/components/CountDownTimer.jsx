import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const CountdownTimer = ({ duration = 30, onComplete }) => {
    const startTime = useSelector((state) => state.game.startTime);
    const [timeLeft, setTimeLeft] = useState(duration);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (startTime) {
            const end = startTime + duration * 1000;

            const updateTimeLeft = () => {
                const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));
                setTimeLeft(remaining);

                if (remaining === 0) {
                    clearInterval(intervalRef.current);
                    if (onComplete) onComplete();
                }
            };

            updateTimeLeft();
            intervalRef.current = setInterval(updateTimeLeft, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [startTime, duration, onComplete]);

    return (
        <div className="text-xl font-mono font-bold text-red-600">
            {timeLeft}s
        </div>
    );
};

export default CountdownTimer;
