import { useDispatch } from "react-redux";
import RandomWordsGenerator from "../utils/RandomWordsGenerator";
import {
  resetCount,
  resetTypedText,
  setPrompt,
} from "../store/actions/typingActions";
import { flattenWordsToChars } from "../utils/Helper";
import { resetGame } from "../store/actions/gameActions";
import * as Engine from "../utils/Engine";

const Refresh = () => {
  const dispatch = useDispatch();
  const resetStore = (promptChars) => {
    dispatch(resetGame());
    dispatch(resetTypedText());
    dispatch(resetCount());
    Engine.evaluateTyping({
      typedText: "",
      promptText: promptChars,
      gameStarted: false,
      dispatch,
    });
    console.log("game refreshed");
  };

  const resetPrompt = () => {
    console.log("reset");
    const words = RandomWordsGenerator();
    const promptChars = flattenWordsToChars(words);
    dispatch(setPrompt(promptChars));
    resetStore(promptChars);
  };

  return (
    <div
      className="cursor-pointer px-4 py-2 bg-green-500 w-fit text-white rounded hover:bg-green-600"
      onClick={resetPrompt}
    >
      Refresh
    </div>
  );
};

export default Refresh;
