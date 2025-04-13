import {
  END_GAME,
  RESET_GAME,
  START_GAME,
  SET_DARK_MODE,
} from "../../utils/constants";

export const startGame = () => ({
  type: START_GAME,
  payload: Date.now(),
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const endGame = () => ({
  type: END_GAME,
});

export const setDarkMode = () => ({
  type: SET_DARK_MODE,
});
