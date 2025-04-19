import { useSelector } from "react-redux";
import classNames from "classnames";
import RenderImage from "../common/RenderImage";

const StatBox = ({ value, label, color }) => (
  <div className={`flex items-end gap-1 ${color}`}>
    <span className="text-3xl font-thin">{value}</span>
    <span className="text-sm font-bold mb-0.5">{label}</span>
  </div>
);

const ScoreCard = ({
  id = "YOU",
  correctCount,
  mistakeCount,
  accuracy,
  wpm,
  icon,
  isWinner,
}) => {
  let conditionalWPM = wpm ?? 0;
  const isDarkMode = useSelector((state) => state.game.darkMode);

  return (
    <div
      className={classNames(
        "flex p-6 min-w-[200px] w-fit rounded-md shadow-md relative cursor-pointer transition-all duration-300",
        {
          "bg-ternary": !isDarkMode,
          "bg-dternary": isDarkMode,
          "ring-4 ring-yellow-400": isWinner,
          "shadow-xl scale-105": isWinner,
        },
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-semibold">{id}</div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
          <StatBox
            value={correctCount}
            label="hits"
            color={isDarkMode ? "text-dlight" : "text-green-600"}
          />
          <StatBox
            value={mistakeCount}
            label="slips"
            color={isDarkMode ? "text-dlight" : "text-[#FF0000]"}
          />
          <StatBox
            value={accuracy}
            label="acc%"
            color={isDarkMode ? "text-dprimary" : "text-primary"}
          />
          <StatBox
            value={conditionalWPM}
            label="wpm"
            color={isDarkMode ? "text-dprimary" : "text-primary"}
          />
        </div>
      </div>

      <div className="absolute right-2 top-2">
        <RenderImage name={icon} />
      </div>
    </div>
  );
};

export default ScoreCard;
