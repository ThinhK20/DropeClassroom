import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Assignment, CreateAssignment, UpdateAssignment } from "../models";
import {
   createAssignmentApi,
   getAllAssignmentsApi,
   updateAssignmentApi,
} from "../apis/assignmentApis";

interface AssignmentState {
   assignments: Assignment[];
   currentAssignment: Assignment | null;
}

const initialState: AssignmentState = {
   assignments: [],
   currentAssignment: null,
};

export const getAllAssignments = createAsyncThunk(
   "assignment",
   async (_, thunkAPI) => {
      const res = await getAllAssignmentsApi("a/all", thunkAPI.signal);
      return res;
   }
);

export const createAssignment = createAsyncThunk(
   "assignment/create",
   async (body: CreateAssignment, thunkAPI): Promise<Assignment> => {
      const res = await createAssignmentApi("a", body, thunkAPI.signal);

      return res;
   }
);

export const updateAssignment = createAsyncThunk(
   "assignment/update",
   async (
      { path, body }: { path: string; body: UpdateAssignment },
      thunkAPI
   ) => {
      const res = await updateAssignmentApi(path, body, thunkAPI.signal);

      return res;
   }
);

export const assignmentSlice = createSlice({
   initialState,
   name: "assignment",
   reducers: {
      setCurrentAssignment: (state, action: PayloadAction<Assignment>) => {
         state.currentAssignment = action.payload;
      },
      setAssignments: (state, action: PayloadAction<Assignment[]>) => {
         state.assignments = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getAllAssignments.fulfilled, (state, action) => {
         state.assignments = action.payload;
      });
      builder.addCase(createAssignment.fulfilled, (state, action) => {
         state.assignments.push(action.payload);
      });
      builder.addCase(updateAssignment.fulfilled, (state, action) => {
         const index = state.assignments.findIndex(
            (assignment) => assignment._id === action.payload.data._id
         );
         state.assignments[index] = action.payload.data;
      });
   },
});

export const { setCurrentAssignment, setAssignments } = assignmentSlice.actions;

export default assignmentSlice.reducer;
