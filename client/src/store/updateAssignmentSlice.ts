import { createSlice } from "@reduxjs/toolkit";

export interface UpdateAssignmentState {
  isOpen: boolean;
}

const initialState: UpdateAssignmentState = {
  isOpen: false,
};

export const UpdateAssignmentSlice = createSlice({
  initialState,
  name: "UpdateAssignmentState",
  reducers: {
    onOpenUpdateAssignment: (state) => {
      state.isOpen = true;
    },
    onCloseUpdateAssignment: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpenUpdateAssignment, onCloseUpdateAssignment } =
  UpdateAssignmentSlice.actions;
export default UpdateAssignmentSlice.reducer;
