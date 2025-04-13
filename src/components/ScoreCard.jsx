import RenderImage from "../utils/RenderImage";

const StatBox = ({ value, label, color }) => (
  <div className={`flex items-end gap-1 ${color}`}>
    <span className="text-3xl font-thin">{value}</span>
    <span className="text-sm font-bold mb-0.5">{label}</span>
  </div>
);

const ScoreCard = ({
  id = "Yourself",
  correctCount,
  mistakeCount,
  accuracy,
  wpm,
  icon,
}) => {
  let conditionalWPM = wpm ?? 0;
  console.log("score card", conditionalWPM)

  return (
    <div className="flex p-6 min-w-[200px] w-fit bg-ternary rounded-md shadow-md relative  cursor-pointer">
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-semibold">{id}</div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
          <StatBox value={correctCount} label="hits" color="text-green-600" />
          <StatBox value={mistakeCount} label="slips" color="text-[#FF0000]" />
          <StatBox value={accuracy} label="acc%" color="text-primary" />
          <StatBox value={conditionalWPM} label="wpm" color="text-primary" />
        </div>
      </div>

      <div className="absolute right-2 top-2">
        <RenderImage name={icon} />
      </div>
    </div>
  );
};

export default ScoreCard;
