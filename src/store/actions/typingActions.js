import { APPEND_CHAR, INC_CORRECT_COUNT, INC_MISTAKE_COUNT, REMOVE_LAST_CHAR, RESET_COUNT, RESET_PROMPT, RESET_TYPED_TEXT, SET_PROMPT, SET_TYPED_TEXT, SET_WPM } from "../../utils/constants";

export const setTypedText = (text) => ({
  type: SET_TYPED_TEXT,
  payload: text,
});

export const setPrompt = (text) => ({
  type: SET_PROMPT,
  payload: text,
});

export const appendChar = (char) => ({
  type: APPEND_CHAR,
  payload: char,
});

export const removeLastChar = () => ({
  type: REMOVE_LAST_CHAR,
});

export const resetTypedText = () => ({
  type: RESET_TYPED_TEXT,
});

export const resetPrompt = () => ({
  type: RESET_PROMPT,
});

export const increaseCorrectCount = () => ({
  type: INC_CORRECT_COUNT,
});

export const increaseMistakeCount = () => ({
  type: INC_MISTAKE_COUNT,
});

export const resetCount = () => ({
  type: RESET_COUNT,
});

export const setWPM = () => ({
  type: SET_WPM,
});
