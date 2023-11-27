import { createSlice } from "@reduxjs/toolkit";

export interface joinClassState {
  isOpen: boolean;
}

const initialState: joinClassState = {
  isOpen: false,
};

export const joinClassSlice = createSlice({
  initialState,
  name: "JoinClassState",
  reducers: {
    onOpenJoinClass: (state) => {
      state.isOpen = true;
    },
    onCloseJoinClass: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpenJoinClass, onCloseJoinClass } = joinClassSlice.actions;
export default joinClassSlice.reducer;
