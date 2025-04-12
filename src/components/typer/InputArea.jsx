import { useDispatch, useSelector } from "react-redux";
import { appendChar } from "../../store/actions/typingActions";
import * as Engine from "../../utils/Engine";
import { startGame } from "../../store/actions/gameActions";
import React, { forwardRef } from "react";

const InputArea = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const typedText = useSelector((state) => state.typing.typedText);
  const prompt = useSelector((state) => state.typing.prompt);
  const startTime = useSelector((state) => state.game.startTime);
  const gameEnded = useSelector((state) => state.game.gameEnded);

  const handleKeyDown = (e) => {
    if (gameEnded) return;

    if (!startTime) {
      dispatch(startGame());
    }

    if (e.key === "Backspace") {
      e.preventDefault();
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
    <textarea
      ref={ref}
      value={typedText}
      onKeyDown={handleKeyDown}
      onChange={() => {}}
      autoFocus
      className="absolute opacity-0 w-0 h-0 pointer-events-none"
    />
  );
});

export default InputArea;
