import { useSelector } from "react-redux";

const RenderTypingPrompt = ({ onClick }) => {
  const prompt = useSelector((state) => state.typing.prompt);

  return (
    <div className="cursor-text select-none" onClick={onClick}>
      {prompt.map((char, index) => (
        <span id={`prompt-${index}`} key={index}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default RenderTypingPrompt;
