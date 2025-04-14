import classNames from "classnames";
import { useSelector } from "react-redux";

const RenderTypingPrompt = ({ onClick }) => {
  const prompt = useSelector((state) => state.typing.prompt);
  const isDarkMode = useSelector((state) => state.game.darkMode);
  

  return (
    <div
      className={classNames("cursor-text select-none font-mono text-2xl", {
        "text-[#305485]": !isDarkMode,
        "text-dlight": isDarkMode,
      })}
      onClick={onClick}
    >
      {prompt.map((char, index) => (
        <span
          id={`prompt-${index}`}
          key={index}
          className="px-[0.3px] leading-8 cursor-pointer"
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default RenderTypingPrompt;
