import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GradeReview } from "../models/GradeReview";

export type GradeReviewSliceType = {
   data: GradeReview[];
};

const initialState: GradeReviewSliceType = {
   data: [],
};

const gradeReviewsSlice = createSlice({
   initialState,
   name: "gradeReviews",
   reducers: {
      setGradeReviews(state, action: PayloadAction<GradeReview[]>) {
         state.data = action.payload;
      },
   },
});

export const { setGradeReviews } = gradeReviewsSlice.actions;
export default gradeReviewsSlice.reducer;
