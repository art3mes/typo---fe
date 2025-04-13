import { useDispatch, useSelector } from "react-redux";
import { calculateAccuracy, calculateWPM } from "../utils/Helper";
import { useEffect, useState } from "react";
import socket from "../socket/socket";
import ScoreCard from "./ScoreCard";
import classNames from "classnames";

const RenderScoreCard = () => {
  const dispatch = useDispatch();

  const correctCount = useSelector((state) => state.typing.correctCount);
  const mistakeCount = useSelector((state) => state.typing.mistakeCount);

  const startTime = useSelector((state) => state.game.startTime);
  const [localWPM, setLocalWPM] = useState(null);
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
      setLocalWPM(temp);
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
    <div className="">
      {roomId ? (
        <>
          <div
            className={classNames("gap-4 flex flex-row")}
          >
            {Object.entries(playersMetrics).map(([id, metrics]) => (
              <ScoreCard
                key={id}
                id={id}
                correctCount={metrics.correctCount}
                mistakeCount={metrics.mistakeCount}
                accuracy={metrics.accuracy}
                wpm={metrics.wpm}
                icon="live"
              />
            ))}
          </div>
        </>
      ) : (
        <div className="">
          <ScoreCard
            id="YOU"
            correctCount={correctCount}
            mistakeCount={mistakeCount}
            accuracy={accuracy}
            wpm={localWPM}
          />
        </div>
      )}
    </div>
  );
};

export default RenderScoreCard;
