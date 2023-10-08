import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./commentSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    comment: commentSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
