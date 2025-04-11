const initialState = {
  gameStarted: false,
  startTime: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gameStarted: true, startTime: action.payload };

    case "END_GAME":
      return { ...state, gameStarted: false, startTime: null };

    default:
      return state;
  }
};

export default gameReducer;
