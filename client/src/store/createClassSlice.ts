import { createSlice } from "@reduxjs/toolkit";

export interface CreateClassState {
  isOpen: boolean;
}

const initialState: CreateClassState = {
  isOpen: false,
};

export const CreateClassSlice = createSlice({
  initialState,
  name: "CreateClassState",
  reducers: {
    onOpenCreateClass: (state) => {
      state.isOpen = true;
    },
    onCloseCreateClass: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpenCreateClass, onCloseCreateClass } = CreateClassSlice.actions;
export default CreateClassSlice.reducer;
