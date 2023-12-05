import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ObjectUserClassRoom, UserClassRoom } from "../models";

interface UserClassRoomType {
  classes: UserClassRoom;
  currentClass: ObjectUserClassRoom | null;
}

const initialState: UserClassRoomType = {
  classes: {
    count: 0,
    erolled_class: [],
    teaching_class: [],
    owner_class: [],
  },

  currentClass: null,
};

const UserClassroomSlice = createSlice({
  initialState,
  name: "userClassroom",
  reducers: {
    getUserClassroom() {
      console.log("Hello");
    },
  },
  extraReducers(builder) {
    builder.addCase("userClassrooms/getAllSuccess", (state, action: any) => {
      state.classes = action.payload;
    });
  },
});

export const { getUserClassroom } = UserClassroomSlice.actions;
export default UserClassroomSlice.reducer;
