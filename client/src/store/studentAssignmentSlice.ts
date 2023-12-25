import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GroupStudentAssignmentsByStudentId } from "../models/StudentAssignment";

export type StudentAssignmentSliceType = {
   data: {
      groupStudentAssignmentsByStudentId: GroupStudentAssignmentsByStudentId[];
   };
};

const initialState: StudentAssignmentSliceType = {
   data: { groupStudentAssignmentsByStudentId: [] },
};

const studentAssignmentSlice = createSlice({
   initialState,
   name: "studentAssignments",
   reducers: {
      setGroupStudentAssignmentsByStudentId(
         state,
         action: PayloadAction<GroupStudentAssignmentsByStudentId[]>
      ) {
         state.data.groupStudentAssignmentsByStudentId = action.payload;
      },
   },
});

export const { setGroupStudentAssignmentsByStudentId } =
   studentAssignmentSlice.actions;
export default studentAssignmentSlice.reducer;
