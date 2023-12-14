import { createSlice } from "@reduxjs/toolkit";

export interface CreateAssignmentState {
  isOpen: boolean;
}

const initialState: CreateAssignmentState = {
  isOpen: false,
};

export const CreateAssignmentSlice = createSlice({
  initialState,
  name: "CreateAssignmentState",
  reducers: {
    onOpenCreateAssignment: (state) => {
      state.isOpen = true;
    },
    onCloseCreateAssignment: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpenCreateAssignment, onCloseCreateAssignment } =
  CreateAssignmentSlice.actions;
export default CreateAssignmentSlice.reducer;
