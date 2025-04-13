import {
  END_GAME,
  START_GAME,
  SET_DARK_MODE,
  RESET_GAME_STATE,
} from "../../utils/constants";

export const startGame = () => ({
  type: START_GAME,
  payload: Date.now(),
});

export const endGame = () => ({
  type: END_GAME,
});

export const setDarkMode = () => ({
  type: SET_DARK_MODE,
});

export const resetGameState = () => ({
  type: RESET_GAME_STATE,
});
