import { useDispatch } from "react-redux";
import { flattenWordsToChars } from "../utils/Helper";
import RandomWordsGenerator from "../utils/RandomWordsGenerator";
import CountdownTimer from "./CountDownTimer";
import InputArea from "./InputArea";
import RenderTypingPrompt from "./RenderTypingPrompt";
import Reset from "./Reset";
import { setPrompt } from "../store/actions/typingActions";
import Refresh from "./Refresh";
import ScoreCard from "./ScoreCard";

const TypingArea = () => {
  const dispatch = useDispatch();
  const words = RandomWordsGenerator();
  const promptChars = flattenWordsToChars(words);
  dispatch(setPrompt(promptChars));

  return (
    <div>
      <CountdownTimer duration={30} />
      <RenderTypingPrompt />
      <InputArea />
      <Reset /> <Refresh /> <ScoreCard />
    </div>
  );
};

export default TypingArea;
