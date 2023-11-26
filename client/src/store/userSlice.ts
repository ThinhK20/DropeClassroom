import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

export type UserSliceType = {
   data: User | null;
   token: string;
};

const initialState: UserSliceType = {
   data: null,
   token: "",
};

const userSlice = createSlice({
   initialState,
   name: "user",
   reducers: {
      setLogin(state, action: PayloadAction<User>) {
         state.data = action.payload;
      },
      setUser(state, action: PayloadAction<User>) {
         state.data = action.payload;
      },
      setToken(state, action: PayloadAction<string>) {
         state.token = action.payload;
      },
      setLogout(state) {
         state.data = initialState.data;
         state.token = initialState.token;
      },
   },
});

export const { setLogin, setUser, setToken, setLogout } = userSlice.actions;
export default userSlice.reducer;
