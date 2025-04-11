import { configureStore } from "@reduxjs/toolkit";
import typingReducer from "./reducers/typingReducer";
import gameReducer from "./reducers/gameReducer";

const store = configureStore({
    reducer: {
        typing: typingReducer,
        game: gameReducer,
    },
});

export default store;
