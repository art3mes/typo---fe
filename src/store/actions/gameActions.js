export const START_GAME = "START_GAME";
export const RESET_GAME = "RESET_GAME";
export const END_GAME = "END_GAME";

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
