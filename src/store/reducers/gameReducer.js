const initialState = {
  gameStarted: false,
  startTime: null,
  gameEnded: false,
  darkMode: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gameStarted: true, startTime: action.payload };

    case "RESET_GAME":
      return {
        ...state,
        gameStarted: false,
        startTime: null,
        gameEnded: false,
      };

    case "END_GAME":
      return { ...state, gameStarted: false, gameEnded: true };

    case "SET_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };

    default:
      return state;
  }
};

export default gameReducer;
