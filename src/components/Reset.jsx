import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../store/actions/gameActions";
import { resetCount, resetTypedText } from "../store/actions/typingActions";
import * as Engine from "../utils/Engine";

const Reset = () => {
  const dispatch = useDispatch();
  const prompt = useSelector((state) => state.typing.prompt);

  const resetStore = () => {
    dispatch(resetGame());
    dispatch(resetTypedText());
    dispatch(resetCount());
    Engine.evaluateTyping({
      typedText: "",
      promptText: prompt,
      gameStarted: false,
      dispatch,
    });
    console.log("game ended");
  };

  return (
    <div
      className="cursor-pointer px-4 py-2 bg-red-500 w-fit text-white rounded hover:bg-red-600"
      onMouseDown={(e) => {
        e.preventDefault(); // prevent blur
        resetStore();
      }}
    >
      Reset
    </div>
  );
};

export default Reset;
