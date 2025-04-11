const initialState = {
  typedText: "",
  prompt: [],
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

    default:
      return state;
  }
};

export default typingReducer;
