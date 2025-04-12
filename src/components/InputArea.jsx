import { useDispatch, useSelector } from "react-redux";
import { appendChar, removeLastChar } from "../store/actions/typingActions";
import * as Engine from "../utils/Engine";
import { startGame } from "../store/actions/gameActions";

const InputArea = () => {
  const dispatch = useDispatch();
  const typedText = useSelector((state) => state.typing.typedText);
  const prompt = useSelector((state) => state.typing.prompt);
  const startTime = useSelector((state) => state.game.startTime);

  const handleKeyDown = (e) => {
    if (!startTime) {
      dispatch(startGame());
    }
    console.log(startTime);
    console.log("game started");
    if (e.key === "Backspace") {
      dispatch(removeLastChar());

      Engine.evaluateTyping({
        typedText: typedText.slice(0, -1),
        promptText: prompt,
        gameStarted: true,
        dispatch,
      });
    } else if (e.key.length === 1) {
      const updatedText = typedText + e.key;
      dispatch(appendChar(e.key));

      Engine.evaluateTyping({
        typedText: updatedText,
        promptText: prompt,
        gameStarted: true,
        dispatch,
      });
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={typedText}
        onKeyDown={handleKeyDown}
        onChange={() => {}}
        placeholder="Type something..."
        autoFocus
      />
    </div>
  );
};

export default InputArea;
