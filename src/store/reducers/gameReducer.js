const initialState = {
  gameStarted: false,
  startTime: null,
  gameEnded: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gameStarted: true, startTime: action.payload };

    case "RESET_GAME":
      return { ...state, gameStarted: false, startTime: null };

    case "END_GAME":
      return { ...state, gameStarted: false, gameEnded: true };

    default:
      return state;
  }
};

export default gameReducer;
