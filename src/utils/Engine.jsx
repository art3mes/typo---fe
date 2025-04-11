import { highlightPromptChar } from "./Helper";

export const evaluateTyping = ({ typedText, promptText }) => {
  const errors = [];
  const matches = [];

  // Reset all first
  for (let i = 0; i < promptText.length; i++) {
    highlightPromptChar(i, "reset");
  }

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === promptText[i]) {
      highlightPromptChar(i, "correct");
      matches.push(i);
    } else {
      highlightPromptChar(i, "incorrect");
      errors.push(i);
    }
  }
};
