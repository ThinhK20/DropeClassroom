import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
   GroupStudentAssignmentsByAssignmentId,
   GroupStudentAssignmentsByStudentId,
} from "../models/StudentAssignment";

export type StudentAssignmentSliceType = {
   data: {
      groupStudentAssignmentsByStudentId: GroupStudentAssignmentsByStudentId[];
      groupStudentAssignmentsByAssignmentId: GroupStudentAssignmentsByAssignmentId;
   };
};

const initialState: StudentAssignmentSliceType = {
   data: {
      groupStudentAssignmentsByStudentId: [],
      groupStudentAssignmentsByAssignmentId: {},
   },
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
      setGroupStudentAssignmentsByAssignmentId(
         state,
         action: PayloadAction<GroupStudentAssignmentsByAssignmentId>
      ) {
         state.data.groupStudentAssignmentsByAssignmentId = action.payload;
      },
   },
});

export const {
   setGroupStudentAssignmentsByStudentId,
   setGroupStudentAssignmentsByAssignmentId,
} = studentAssignmentSlice.actions;
export default studentAssignmentSlice.reducer;
