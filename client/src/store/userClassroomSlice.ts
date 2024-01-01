import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
   Classroom,
   CreateClassroom,
   ObjectUserClassRoom,
   UpdateClassroom,
   UserClassRoom,
   listUserClassrooms,
} from "../models";
import {
   createClassApi,
   getAllClassesApi,
   acceptByLinkApi,
   updateClassApi,
   userJoinClassByCodeApi,
} from "../apis/classroomApis";

interface UserClassRoomType {
   classes: listUserClassrooms;
   currentClass: ObjectUserClassRoom | null;
   currentUserClassroom: UserClassRoom | null;
}

const initialState: UserClassRoomType = {
   classes: {
      count: 0,
      erolled_class: [],
      teaching_class: [],
      owner_class: [],
   },

   currentClass: null,
   currentUserClassroom: null,
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
         userId: res.owner,
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

export const accpetJoinClassByLink = createAsyncThunk(
   "userClassoom/accpetJoinClassByLink",
   async (
      body: {
         pathName: string;
         classCode: string;
         role: "teacher" | "student";
      },
      thunkAPI
   ): Promise<ObjectUserClassRoom> => {
      const res = await acceptByLinkApi(
         `${body.pathName}/accept/?cjc=${body.classCode}&role=${body.role}`,
         thunkAPI.signal
      );
      return res.data;
   }
);

const UserClassroomSlice = createSlice({
   initialState,
   name: "userClassroom",
   reducers: {
      setCurrentClass(
         state,
         action: PayloadAction<ObjectUserClassRoom | null>
      ) {
         state.currentClass = action.payload;
      },
      setCheckParam(state, action: PayloadAction<string>) {
         const classes = [
            ...state.classes.erolled_class,
            ...state.classes.owner_class,
            ...state.classes.teaching_class,
         ];

         const cl = classes.findIndex((c) => c.classId._id === action.payload);
         if (cl < 0) state.currentClass = null;

         state.currentClass = classes[cl];
      },
      setCurrentUserClassroom(state, action: PayloadAction<UserClassRoom>) {
         state.currentUserClassroom = action.payload;
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
               if (c.classId._id === action.payload._id) {
                  state.classes.owner_class[index].classId = action.payload;
                  return true;
               }
               return false;
            });
         })
         .addCase(userJoinClassByCode.fulfilled, (state, action) => {
            state.classes.count += 1;
            state.classes.erolled_class.push(action.payload);
         })
         .addCase(accpetJoinClassByLink.fulfilled, (state, action) => {
            state.classes.count += 1;
            if (action.payload.role === "student") {
               state.classes.erolled_class.push(action.payload);
            }
            if (action.payload.role === "teacher") {
               state.classes.teaching_class.push(action.payload);
            }
         });
   },
});

export const { setCurrentClass, setCheckParam, setCurrentUserClassroom } =
   UserClassroomSlice.actions;
export default UserClassroomSlice.reducer;
