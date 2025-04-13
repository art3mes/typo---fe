import { useSelector } from "react-redux";

const RenderTypingPrompt = ({ onClick }) => {
  const prompt = useSelector((state) => state.typing.prompt);

  return (
    <div
      className="cursor-text select-none font-mono text-[#305485] text-2xl"
      onClick={onClick}
    >
      {prompt.map((char, index) => (
        <span
          id={`prompt-${index}`}
          key={index}
          className="px-[0.3px] leading-8"
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default RenderTypingPrompt;
