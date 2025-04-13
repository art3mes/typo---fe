export const SOCKET_EVENTS = {
  JOIN_ROOM: "join-room",
  TYPING_UPDATE: "typing-update",
  START_GAME: "start-game",
  END_GAME: "end-game",
  TYPING_METRICS_UPDATE: "typing-metrics-update",
  USER_JOINED: "user-joined",
};

export const COUNTDOWN = 60;
export const DEFAULT_WORD_COUNT = 60;

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
export const RESET_TYPING_STATE = "RESET_TYPING_STATE";

export const CREATE_ROOM = "CREATE_ROOM";
export const JOIN_ROOM = "JOIN_ROOM";
export const SET_USERS = "SET_USERS";
export const LEAVE_ROOM = "LEAVE_ROOM";
export const RESET_ROOM_STATE = "RESET_ROOM_STATE";

export const START_GAME = "START_GAME";
export const END_GAME = "END_GAME";
export const SET_DARK_MODE = "SET_DARK_MODE";
export const RESET_GAME_STATE = "RESET_GAME_STATE";
