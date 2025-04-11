// store/actions/typingActions.js

export const SET_TYPED_TEXT = "SET_TYPED_TEXT";
export const APPEND_CHAR = "APPEND_CHAR";
export const REMOVE_LAST_CHAR = "REMOVE_LAST_CHAR";
export const RESET_TYPED_TEXT = "RESET_TYPED_TEXT";

// Action Creators
export const setTypedText = (text) => ({
    type: SET_TYPED_TEXT,
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
