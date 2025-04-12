import { configureStore } from "@reduxjs/toolkit";
import typingReducer from "./reducers/typingReducer";
import gameReducer from "./reducers/gameReducer";
import roomReducer from "./reducers/roomReducer";

const store = configureStore({
  reducer: {
    typing: typingReducer,
    game: gameReducer,
    room: roomReducer,
  },
});

export default store;
