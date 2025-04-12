import { useDispatch, useSelector } from "react-redux";
import { calculateWPM } from "../utils/Helper";
import { useEffect, useState } from "react";

const ScoreCard = () => {
  const dispatch = useDispatch();
  const correctCount = useSelector((state) => state.typing.correctCount);
  const mistakeCount = useSelector((state) => state.typing.mistakeCount);
  const startTime = useSelector((state) => state.game.startTime);
  const [WPM, setWPM] = useState(null);
  const [showWPM, setShowWPM] = useState(false);
  const gameEnded = useSelector((state) => state.game.gameEnded);

  useEffect(() => {
    if (gameEnded && startTime && correctCount > 0) {
      const wpm = calculateWPM(correctCount, startTime);
      setWPM(wpm);
      setShowWPM(true);
    }
    if (!startTime) {
      setWPM(0);
      setShowWPM(false);
    }
  }, [gameEnded, startTime, correctCount]);

  return (
    <div>
      <div>Correct Count: {correctCount}</div>
      <div>Mistake Count: {mistakeCount}</div>
      {showWPM && <div>{WPM} WPM</div>}
    </div>
  );
};

export default ScoreCard;
