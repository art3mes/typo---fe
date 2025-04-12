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
  console.log(typedText, promptText, gameStarted);
  if (!gameStarted) {
    for (let i = 0; i < promptText.length; i++) {
      highlightPromptChar(i, "reset");
    }
    return;
  }

  const index = typedText.length - 1;
  const typedChar = typedText[index];
  const expectedChar = promptText[index];

  if (typedChar === undefined || expectedChar === undefined) return;

  if (typedChar === expectedChar) {
    highlightPromptChar(index, "correct");
    dispatch(increaseCorrectCount());
  } else {
    highlightPromptChar(index, "incorrect");
    dispatch(increaseMistakeCount());
  }
};
