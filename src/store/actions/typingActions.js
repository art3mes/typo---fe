export const SET_TYPED_TEXT = "SET_TYPED_TEXT";
export const APPEND_CHAR = "APPEND_CHAR";
export const REMOVE_LAST_CHAR = "REMOVE_LAST_CHAR";
export const RESET_TYPED_TEXT = "RESET_TYPED_TEXT";
export const SET_PROMPT = "SET_PROMPT";
export const RESET_PROMPT = "RESET_PROMPT";
export const INC_CORRECT_COUNT = "INC_CORRECT_COUNT";
export const INC_MISTAKE_COUNT = "INC_MISTAKE_COUNT";
export const RESET_COUNT = "RESET_COUNT";
export const SET_WPM = "SET_WPM";

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
