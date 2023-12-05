import { configureStore } from "@reduxjs/toolkit";
import createClassSlice from "./createClassSlice";
import joinClassSlice from "./joinClassSlice";
import userClassroomSlice from "./userClassroomSlice";
import userSlice from "./userSlice";



export const store = configureStore({
   reducer: {
      users: userSlice,
      createClass: createClassSlice,
      joinClass: joinClassSlice,
      userClassroom: userClassroomSlice  
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
