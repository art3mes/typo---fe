import { END_GAME, RESET_GAME, START_GAME } from "../../utils/constants";


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
