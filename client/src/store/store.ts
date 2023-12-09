import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createClassSlice from "./createClassSlice";
import joinClassSlice from "./joinClassSlice";
import userClassroomSlice from "./userClassroomSlice";
import userSlice from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
   users: userSlice,
   createClass: createClassSlice,
   joinClass: joinClassSlice,
   userClassroom: userClassroomSlice,
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
