import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket/socket";
import ScoreCard from "./ScoreCard";
import { SOCKET_EVENTS } from "../utils/constants";
import { calculateAccuracy, calculateWPM } from "../utils/Helper";

const RenderScoreCard = () => {
  const dispatch = useDispatch();
  const { correctCount, mistakeCount } = useSelector((state) => state.typing);
  const { startTime, gameEnded } = useSelector((state) => state.game);
  const { roomId, userId, users } = useSelector((state) => state.room);

  const [localWPM, setLocalWPM] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [playersMetrics, setPlayersMetrics] = useState({});

  const renderInitialData = (correctCount, mistakeCount, accuracy, id) => {
    setPlayersMetrics((prev) => ({
      ...prev,
      [id]: { correctCount, mistakeCount, accuracy },
    }));
  };

  useEffect(() => {
    if (users && users.length > 0) {
      users.forEach((user) => {
        renderInitialData(0, 0, 100, user.username);
      });
    }
  }, [users]);

  useEffect(() => {
    //local metrics
    console.log("gay")
    if (gameEnded && startTime && correctCount > 0) {
      const temp = calculateWPM(correctCount, startTime);
      setLocalWPM(temp);
    }

    setAccuracy(calculateAccuracy(correctCount, mistakeCount));
    if (roomId && userId) {
      console.log("render score card: ",correctCount, mistakeCount);
      socket.on(
        SOCKET_EVENTS.TYPING_METRICS_UPDATE,
        ({ userId, correctCount, mistakeCount, accuracy }) => {
          console.log("recieved data from socket typing update: ", userId, correctCount, mistakeCount, accuracy);
          
          setPlayersMetrics((prev) => ({
            ...prev,
            [userId]: { correctCount, mistakeCount, accuracy },
          }));
        },
      );

      socket.on(
        SOCKET_EVENTS.END_GAME,
        ({ userId, correctCount, mistakeCount, accuracy, wpm }) => {
          console.log("endgame recieceid data: ",userId, correctCount, mistakeCount, accuracy, wpm);
          setPlayersMetrics((prev) => ({
            ...prev,
            [userId]: { correctCount, mistakeCount, accuracy, wpm },
          }));
        },
      );

      return () => {
        socket.off(SOCKET_EVENTS.TYPING_METRICS_UPDATE);
        socket.off(SOCKET_EVENTS.END_GAME);
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
