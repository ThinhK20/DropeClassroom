import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import createClassSlice from "./createClassSlice";
import joinClassSlice from "./joinClassSlice";

export const store = configureStore({
   reducer: {
      users: userSlice,
      createClass: createClassSlice,
      joinClass: joinClassSlice  
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
