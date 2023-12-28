import { createSlice } from "@reduxjs/toolkit";

export interface inviteClassState {
  isOpen: boolean;
}

const initialState: inviteClassState = {
  isOpen: false,
};

export const inviteClassSlice = createSlice({
  initialState,
  name: "InviteClassState",
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = inviteClassSlice.actions;
export default inviteClassSlice.reducer;