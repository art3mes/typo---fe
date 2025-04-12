import { useDispatch, useSelector } from "react-redux";
import { calculateAccuracy, calculateWPM } from "../utils/Helper";
import { useEffect, useState } from "react";

const ScoreCard = () => {
  const dispatch = useDispatch();
  const correctCount = useSelector((state) => state.typing.correctCount);
  const mistakeCount = useSelector((state) => state.typing.mistakeCount);
  const startTime = useSelector((state) => state.game.startTime);
  const [WPM, setWPM] = useState(null);
  const [showWPM, setShowWPM] = useState(false);
  const gameEnded = useSelector((state) => state.game.gameEnded);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (gameEnded && startTime && correctCount > 0) {
      const wpm = calculateWPM(correctCount, startTime);
      setWPM(wpm);
      setShowWPM(true);
      setAccuracy(calculateAccuracy(correctCount, mistakeCount));
    }
    if (!startTime) {
      setWPM(0);
      setShowWPM(false);
      setAccuracy(calculateAccuracy(0, 0));
    }
  }, [gameEnded, startTime, correctCount, mistakeCount]);

  return (
    <div>
      <div>Correct Count: {correctCount}</div>
      <div>Mistake Count: {mistakeCount}</div>
      {showWPM && (
        <div>
          <div>{WPM} WPM</div>
          <div>Accuracy {accuracy}</div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;
