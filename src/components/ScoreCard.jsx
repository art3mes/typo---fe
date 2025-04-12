import { useDispatch, useSelector } from "react-redux";
import { calculateAccuracy, calculateWPM } from "../utils/Helper";
import { useEffect, useState } from "react";
import socket from "../socket/socket";
import { setWPM } from "../store/actions/typingActions";

const ScoreCard = () => {
  const dispatch = useDispatch();
  const correctCount = useSelector((state) => state.typing.correctCount);
  const mistakeCount = useSelector((state) => state.typing.mistakeCount);
  const wpm = useSelector((state) => state.typing.wpm);

  const startTime = useSelector((state) => state.game.startTime);
  const [localWPM, setLocalWPM] = useState(null);
  const [showWPM, setShowWPM] = useState(false);
  const gameEnded = useSelector((state) => state.game.gameEnded);
  const [accuracy, setAccuracy] = useState(0);
  const [playersMetrics, setPlayersMetrics] = useState({});

  const roomId = useSelector((state) => state.room.roomId);
  const userId = useSelector((state) => state.room.userId);

  useEffect(() => {
    //local metrics
    if (gameEnded && startTime && correctCount > 0) {
      const temp = calculateWPM(correctCount, startTime);
      console.log("setting wpm: ", temp);
      dispatch(setWPM(temp));
      setLocalWPM(temp);
      setShowWPM(true);
    }
    if (!startTime) {
      setWPM(0);
      setShowWPM(false);
      setAccuracy(calculateAccuracy(0, 0));
    }

    setAccuracy(calculateAccuracy(correctCount, mistakeCount));

    if (roomId && userId) {
      socket.on(
        "typing-metrics-update",
        ({ userId, correctCount, mistakeCount, accuracy }) => {
          setPlayersMetrics((prev) => ({
            ...prev,
            [userId]: { correctCount, mistakeCount, accuracy },
          }));
        },
      );

      socket.on(
        "end-game",
        ({ userId, correctCount, mistakeCount, accuracy, wpm }) => {
          console.log(userId, correctCount, mistakeCount, accuracy, wpm);
          setPlayersMetrics((prev) => ({
            ...prev,
            [userId]: { correctCount, mistakeCount, accuracy, wpm },
          }));
        },
      );

      return () => {
        socket.off("typing-metrics-update");
        socket.off("end-game");
      };
    }
  }, [
    gameEnded,
    startTime,
    correctCount,
    mistakeCount,
    roomId,
    userId,
    dispatch,
  ]);

  return (
    <div className="text-white p-4">
      {roomId ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Live Typing Metrics</h2>
          <ul className="space-y-2">
            {Object.entries(playersMetrics).map(([id, metrics]) => (
              <li key={id} className="bg-gray-800 p-3 rounded">
                <p>
                  <strong>User:</strong> {id}
                </p>
                <p>✅ Correct: {metrics.correctCount}</p>
                <p>❌ Mistakes: {metrics.mistakeCount}</p>
                <p>🎯 Accuracy: {metrics.accuracy}%</p>
                {metrics.wpm && <p>⌚ WPM: {metrics.wpm}</p>}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Not Live Typing Metrics</h2>
          <ul className="space-y-2">
            <li className="bg-gray-800 p-3 rounded">
              <p>
                <strong>User:</strong> YOU
              </p>
              <p>✅ Correct: {correctCount}</p>
              <p>❌ Mistakes: {mistakeCount}</p>
              <p>🎯 Accuracy: {accuracy}%</p>
              {showWPM && <p>⌚ WPM: {wpm ?? localWPM}</p>}
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default ScoreCard;
