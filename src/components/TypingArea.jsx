import RandomWordsGenerator from "../utils/RandomWordsGenerator";
import CountdownTimer from "./CountDownTimer";
import InputArea from "./InputArea";
import RenderTypingPrompt from "./RenderTypingPrompt";

const TypingArea = () => {
  const words = RandomWordsGenerator(10);

  return (
    <div>
      <CountdownTimer duration={30} />
      <RenderTypingPrompt words={words} />
      <InputArea />
    </div>
  );
};

export default TypingArea;
