import { flattenWordsToChars } from "../utils/Helper";

const RenderTypingPrompt = ({ words }) => {
  const renderSpans = () => {
    const spans = flattenWordsToChars(words).map((char, index) => (
      <span id={`prompt-${index}`} key={index}>
        {char}
      </span>
    ));
    return spans;
  };

  return <div>{renderSpans()}</div>;
};

export default RenderTypingPrompt;
