import { useDispatch, useSelector } from "react-redux";
import { appendChar } from "../store/actions/typingActions";
import * as Engine from "../utils/Engine";
import { startGame } from "../store/actions/gameActions";
import React, { forwardRef } from "react";
import { toast } from "react-toastify";

const InputArea = forwardRef((prop, ref) => {
  const dispatch = useDispatch();
  const startTime = useSelector((state) => state.game.startTime);
  const gameEnded = useSelector((state) => state.game.gameEnded);
  const prompt = useSelector((state) => state.typing.prompt);
  const typedText = useSelector((state) => state.typing.typedText);
  const correctCount = useSelector((state) => state.typing.correctCount);
  const mistakeCount = useSelector((state) => state.typing.mistakeCount);
  const roomId = useSelector((state) => state.room.roomId);
  const userId = useSelector((state) => state.room.userId);

  const handleKeyDown = (e) => {
    if (gameEnded) return;

    if (!startTime) {
      dispatch(startGame());
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      toast.warn("There is no going back. Move forward!");
    } else if (e.key.length === 1) {
      const updatedText = typedText + e.key;
      dispatch(appendChar(e.key));

      Engine.evaluateTyping({
        typedText: updatedText,
        promptText: prompt,
        gameStarted: true,
        dispatch,
        correctCount,
        mistakeCount,
        roomId,
        userId,
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
