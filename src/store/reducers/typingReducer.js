const initialState = {
  typedText: "",
  prompt: [],
  correctCount: 0,
  mistakeCount: 0,
  wpm: 0,
};

const typingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROMPT":
      return { ...state, prompt: action.payload };

    case "SET_TYPED_TEXT":
      return { ...state, typedText: action.payload };

    case "APPEND_CHAR":
      return { ...state, typedText: state.typedText + action.payload };

    case "REMOVE_LAST_CHAR":
      return { ...state, typedText: state.typedText.slice(0, -1) };

    case "RESET_TYPED_TEXT":
      return { ...state, typedText: "" };
      

    case "RESET_PROMPT":
      return { ...state, prompt: [] };

    case "INC_CORRECT_COUNT":
      return { ...state, correctCount: state.correctCount + 1 };

    case "INC_MISTAKE_COUNT":
      return { ...state, mistakeCount: state.mistakeCount + 1 };

    case "RESET_COUNT":
      return { ...state, mistakeCount: 0, correctCount: 0 };

    case "SET_WPM":
      return { ...state, wpm: action.payload };

    case "RESET_TYPING_STATE":
      return {
        ...state,
        typedText: "",
        prompt: [],
        correctCount: 0,
        mistakeCount: 0,
        wpm: 0,
      };

    default:
      return state;
  }
};

export default typingReducer;
