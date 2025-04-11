import { useDispatch, useSelector } from "react-redux";
import { endGame } from "../store/actions/gameActions";
import { resetPrompt, resetTypedText } from "../store/actions/typingActions";
import * as Engine from "../utils/Engine";

const Reset = () => {
  const dispatch = useDispatch();
  const prompt = useSelector((state) => state.typing.prompt);

  const resetStore = () => {
    dispatch(endGame());
    console.log("stop");
    dispatch(resetPrompt());
    dispatch(resetTypedText());
    Engine.evaluateTyping({
      typedText: "",
      promptText: prompt,
      gameStarted: false,
    });
  };

  return (
    <div
      className="cursor-pointer px-4 py-2 bg-red-500 w-fit text-white rounded hover:bg-red-600"
      onClick={() => resetStore()}
    >
      Reset
    </div>
  );
};

export default Reset;
