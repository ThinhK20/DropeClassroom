import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { CreateClassroom, ObjectUserClassRoom, UserClassRoom } from "../models";
import { createClassApi, getAllClassesApi } from "../apis/classroomApis";

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

export const getAllUserClassroom = createAsyncThunk(
  "userClassroom/getAll",
  async (_, thunkAPI) => {
    const res = await getAllClassesApi("c/all", thunkAPI.signal);
    return res;
  }
);

export const createUserClass = createAsyncThunk(
    "userClassroom/create",
    async(body: CreateClassroom, thunkAPI): Promise<ObjectUserClassRoom> => {
        const res = await createClassApi('c', body, thunkAPI.signal);

        return {
          classId: res,
          role: "owner"
        };
    }
)

const UserClassroomSlice = createSlice({
  initialState,
  name: "userClassroom",
  reducers: {
    createClass() {
      console.log("Hello");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUserClassroom.fulfilled, (state, action) => {
        state.classes = action.payload;
      })
      .addCase(createUserClass.fulfilled, (state, action) => {
        state.classes.owner_class.push(action.payload);
      })
      .addMatcher(
        (action) => action.type.includes("cancel"),
        (state, action) => {
          console.log(current(state), action);
        }
      ).addDefaultCase((state, action) => {
        console.log(`action type ${action.type}`, current(state));
      });
  },
});

export const { createClass } = UserClassroomSlice.actions;
export default UserClassroomSlice.reducer;
