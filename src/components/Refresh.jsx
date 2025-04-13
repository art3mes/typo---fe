import { useDispatch } from "react-redux";
import {
  resetCount,
  resetTypedText,
  setPrompt,
} from "../store/actions/typingActions";
import { resetGame } from "../store/actions/gameActions";
import * as Engine from "../utils/Engine";
import { flattenWordsToChars } from "../utils/Helper";
import RandomWordsGenerator from "../utils/RandomWordsGenerator";

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
  };

  const resetPrompt = () => {
    const words = RandomWordsGenerator();
    const promptChars = flattenWordsToChars(words);
    dispatch(setPrompt(promptChars));
    resetStore(promptChars);
  };

  return (
    <div
      className="cursor-pointer px-4 py-2 bg-green-500 w-fit text-white rounded hover:bg-green-600"
      onMouseDown={(e) => {
        e.preventDefault(); // prevent blur
        resetPrompt();
      }}
    >
      Refresh
    </div>
  );
};

export default Refresh;
