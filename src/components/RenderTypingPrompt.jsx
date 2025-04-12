import { useSelector } from "react-redux";

const RenderTypingPrompt = () => {
  const prompt = useSelector((state) => state.typing.prompt);

  const renderSpans = () => {
    return prompt.map((char, index) => (
      <span id={`prompt-${index}`} key={index}>
        {char}
      </span>
    ));
  };

  return <div>{renderSpans()}</div>;
};

export default RenderTypingPrompt;
