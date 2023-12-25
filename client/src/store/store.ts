import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createClassSlice from "./createClassSlice";
import joinClassSlice from "./joinClassSlice";
import userClassroomSlice from "./userClassroomSlice";
import userSlice from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import assignmentSlice from "./assignmentSlice";
import updateAssignmentSlice from "./updateAssignmentSlice";
import createAssignmentSlice from "./createAssignmentSlice";
import gradeReviewsSlice from "./gradeReviewsSlice";
import studentAssignmentSlice from "./studentAssignmentSlice";

const rootReducer = combineReducers({
   users: userSlice,
   createClass: createClassSlice,
   joinClass: joinClassSlice,
   userClassroom: userClassroomSlice,
   createAssignment: createAssignmentSlice,
   updateAssignment: updateAssignmentSlice,
   assignment: assignmentSlice,
   gradeReviews: gradeReviewsSlice,
   studentAssignments: studentAssignmentSlice,
});

const persistConfig = {
   key: "root",
   storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
