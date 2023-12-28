import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import {
  Classroom,
  CreateClassroom,
  ObjectUserClassRoom,
  UpdateClassroom,
  UserClassRoom,
} from "../models";
import {
  createClassApi,
  getAllClassesApi,
  joinClassByLink_v2Api,
  updateClassApi,
  userJoinClassByCodeApi,
} from "../apis/classroomApis";

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
  async (body: CreateClassroom, thunkAPI): Promise<ObjectUserClassRoom> => {
    const res = await createClassApi("c", body, thunkAPI.signal);

    return {
      classId: res,
      role: "owner",
    };
  }
);

export const updateUserClass = createAsyncThunk(
  "userClassroom/update",
  async (
    { path, body }: { path: string; body: UpdateClassroom },
    thunkAPI
  ): Promise<Classroom> => {
    const res = await updateClassApi(path, body, thunkAPI.signal);
    return res.data;
  }
);

export const userJoinClassByCode = createAsyncThunk(
  "userClassoom/joinClassByCode",
  async (
    body: { classCode: string },
    thunkAPI
  ): Promise<ObjectUserClassRoom> => {
    const res = await userJoinClassByCodeApi(body, thunkAPI.signal);

    return res.data;
  }
);

export const userJoinClassByLink = createAsyncThunk(
  "userClassoom/userJoinClassByLink",
  async (
    body: {
      pathName: string;
      classCode: string;
      role: "teacher" | "student";
    },
    thunkAPI
  ): Promise<ObjectUserClassRoom> => {
    const res = await joinClassByLink_v2Api(
      `${body.pathName}/v2/?cjc=${body.classCode}&role=${body.role}`,
      thunkAPI.signal
    );
    console.log(res);
    return res.data;
  }
);

const UserClassroomSlice = createSlice({
  initialState,
  name: "userClassroom",
  reducers: {
    setCurrentClass(state, action: PayloadAction<ObjectUserClassRoom>) {
      if (state.currentClass !== action.payload)
        state.currentClass = action.payload;
    },
    setCheckParam(state, action: PayloadAction<string>) {
      const classes = [
        ...state.classes.erolled_class,
        ...state.classes.owner_class,
        ...state.classes.teaching_class,
      ];

      const cl = classes.findIndex((c) => c.classId._id === action.payload);
      if (cl === -1) state.currentClass = null;

      state.currentClass = classes[cl];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUserClassroom.fulfilled, (state, action) => {
        state.classes = action.payload;
      })
      .addCase(createUserClass.fulfilled, (state, action) => {
        state.classes.count += 1;
        state.classes.owner_class.push(action.payload);
      })
      .addCase(updateUserClass.fulfilled, (state, action) => {
        // console.log('update class', action.payload._id);
        state.classes.owner_class.find((c, index) => {
          console.log(c.classId._id);
          if (c.classId._id === action.payload._id) {
            state.classes.owner_class[index].classId = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(userJoinClassByCode.fulfilled, (state, action) => {
        state.classes.erolled_class.push(action.payload);
      })
      .addCase(userJoinClassByLink.fulfilled, (state, action) => {
        if (action.payload.role === "student") {
          state.classes.erolled_class.push(action.payload);
        }
        if (action.payload.role === "teacher") {
          state.classes.teaching_class.push(action.payload);
        }

        state.currentClass = action.payload;
      })
      .addMatcher(
        (action) => action.type.includes("cancel"),
        (state, action) => {
          console.log(current(state), action);
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type ${action.type}`, current(state));
      });
  },
});

export const { setCurrentClass, setCheckParam } = UserClassroomSlice.actions;
export default UserClassroomSlice.reducer;
