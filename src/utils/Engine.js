// Engine.js
import { highlightPromptChar } from "./Helper";
import {
  increaseCorrectCount,
  increaseMistakeCount,
} from "../store/actions/typingActions";

export const evaluateTyping = ({
  typedText,
  promptText,
  gameStarted,
  dispatch,
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

  if (typedChar !== undefined && expectedChar !== undefined) {
    if (typedChar === expectedChar) {
      dispatch(increaseCorrectCount());
    } else {
      dispatch(increaseMistakeCount());
    }
  }

  // Add caret to next character
  highlightPromptChar(index + 1, "current");
};
