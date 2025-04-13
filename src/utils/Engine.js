import { calculateAccuracy, highlightPromptChar } from "./Helper";
import {
  increaseCorrectCount,
  increaseMistakeCount,
} from "../store/actions/typingActions";
import socket from "../socket/socket";
import { SOCKET_EVENTS } from "./constants";

export const evaluateTyping = ({
  typedText,
  promptText,
  gameStarted,
  dispatch,
  correctCount,
  mistakeCount,
  roomId,
  userId,
}) => {
  if (!gameStarted) {
    for (let i = 0; i < promptText.length; i++) {
      highlightPromptChar(i, "reset");
    }
    return;
  }

  const index = typedText.length - 1;
  const typedChar = typedText[index];
  const expectedChar = promptText[index];

  for (let i = 0; i < promptText.length; i++) {
    highlightPromptChar(i, "reset");
  }

  for (let i = 0; i <= index; i++) {
    if (typedText[i] === promptText[i]) {
      highlightPromptChar(i, "correct");
    } else {
      highlightPromptChar(i, "incorrect");
    }
  }

  let updatedCorrect = correctCount;
  let updatedIncorrect = mistakeCount;

  if (typedChar !== undefined && expectedChar !== undefined) {
    if (typedChar === expectedChar) {
      updatedCorrect++;
      dispatch(increaseCorrectCount());
    } else {
      updatedIncorrect++;
      dispatch(increaseMistakeCount());
    }
  }

  if (roomId && userId) {
    const accuracy = calculateAccuracy(updatedCorrect, updatedIncorrect);
    socket.emit(SOCKET_EVENTS.TYPING_UPDATE, {
      roomId,
      userId,
      correctCount: updatedCorrect,
      mistakeCount: updatedIncorrect,
      accuracy,
    });
  }

  // Add caret to next character
  highlightPromptChar(index + 1, "current");
};
