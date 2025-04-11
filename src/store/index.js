// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import typingReducer from "./reducers/typingReducer";

const store = configureStore({
    reducer: {
        typing: typingReducer,
    },
});

export default store;
