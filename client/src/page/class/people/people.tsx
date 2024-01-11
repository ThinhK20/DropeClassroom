import { ObjectUserClassRoom, User, listInviteUser } from "../../../models";
import { useAppSelector } from "../../../hooks/hooks";
import {
   deleteUserClassApi,
   getAllUsersClassApi,
   inviteUsersApi,
} from "../../../apis/classroomApis";
import PeopleBox from "../../../components/box/PeopleBox";
import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { getAllUsersNotInClassApi } from "../../../apis/userApis";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import ExportStudentTemplate from "./export-student-template";
import AddPeopleDropDown from "../../../components/dropDown/AddPeopleDropDown";

function People() {
   const currentClass = useAppSelector(
      (state) => state.userClassroom.currentClass
   );

   const [listUser, setListUser] = useState<ObjectUserClassRoom[]>([]);
   const [listUserNotIn, setListUserNotIn] = useState<User[]>([]);
   const [isFetch, setIsFetch] = useState<boolean>(false);

   const removePeople = (u: ObjectUserClassRoom) => {
      if (!currentClass) return;
      const updateList = listUser.filter(
         (user) => user.userId._id.toString() !== u.userId._id.toString()
      );

      const controller = new AbortController();
      deleteUserClassApi(
         currentClass.classId._id,
         { user: u.userId._id },
         controller.signal
      )
         .then((data) => {
            console.log(data);
         })
         .catch((err: AxiosError) => {
            console.log(err);
            controller.abort();
            return;
         })
         .finally(() => {
            controller.abort();
         });

      setListUser(updateList);
      setListUserNotIn([...listUserNotIn, u.userId]);
   };

   const invitePeople2Class = (u: User[], role: "teacher" | "student") => {
      if (!currentClass) return;
      const updateListNotIn = listUserNotIn.filter((user) => !u.includes(user));
      const body: listInviteUser[] = u.map((u) => {
         return {
            classId: currentClass.classId,
            userId: u,
            role: role,
            isActive: false,
         };
      });

      const controller = new AbortController();
      inviteUsersApi(currentClass.classId._id, body, controller.signal)
         .then((data) => {
            console.log(data.data);
            setListUserNotIn(updateListNotIn);
            setListUser([...listUser, ...data.data]);
            controller.abort();
         })
         .catch((err: AxiosError) => {
            console.log(err);
         });
   };

   const countStudent = useMemo((): number => {
      let count = 0;
      listUser.find((_u) => {
         if (_u.role === "student") count += 1;
      });

      return count;
   }, [listUser]);

   useEffect(() => {
      if (!isFetch) {
         if (!currentClass) return;
         const controller = new AbortController();
         getAllUsersClassApi(currentClass.classId._id, controller.signal)
            .then((data) => {
               setListUser(data);
               const userIds = data.map((u) => u.userId);

               const controller_post = new AbortController();
               getAllUsersNotInClassApi(
                  { users: [...userIds] },
                  controller_post.signal
               )
                  .then((data) => {
                     setListUserNotIn(data);
                  })
                  .catch((err: AxiosError) => {
                     setIsFetch(true);
                     console.log(err);
                  })
                  .finally(() => {
                     controller_post.abort();
                  });
               setIsFetch(true);
            })
            .catch((err: AxiosError) => {
               console.log(err);
               setIsFetch(true);
            })
            .finally(() => {
               controller.abort();
               setIsFetch(true);
            });
      }
   }, []);

   if (!currentClass) return <></>;

   return (
      <div className="w-full min-h-[700px] flex flex-col flex-1 items-start pt-16 px-2 xl:px-44 overflow-auto hide-scrollbar">
         {/* Teacher */}
         <div className="w-full flex justify-between items-center border-b-2 border-blue-600 mt-10">
            <p className="text-blue-600 medium-32 ml-2 mb-4">Teachers</p>
            {currentClass.role === "owner" && (
               <AddPeopleDropDown
                  userNotIn={listUserNotIn}
                  role="teacher"
                  label="Teacher"
                  handleInvite={invitePeople2Class}
               />
            )}
         </div>

         <div className="w-full divide-y flex flex-col">
            <div className="w-full flex items-center justify-between">
               <PeopleBox
                  currentRole={currentClass}
                  user={{
                     classId: currentClass.classId,
                     userId: currentClass.classId.owner,
                     role: "owner",
                     isActive: true,
                  }}
                  removePeople={removePeople}
               />
               {currentClass.role !== "owner" && (
                  <button
                     className={`mr-2 w-11 h-11 rounded-full hover:bg-gray-500/20 flex items-center justify-center`}
                  >
                     <MailOutlineOutlinedIcon />
                  </button>
               )}
            </div>

            {listUser.length > 0 ? (
               listUser.map((u, idx) => {
                  if (u.role === "teacher")
                     return (
                        <PeopleBox
                           currentRole={currentClass}
                           user={u}
                           key={idx}
                           removePeople={removePeople}
                        />
                     );
                  else return <></>;
               })
            ) : (
               <></>
            )}
         </div>

         <div className="w-full flex justify-between items-center border-b-2 border-blue-600 mt-10">
            <p className="text-blue-600 medium-32 ml-2 mb-4">Students</p>

            <div className="flex items-center gap-4">
               <p className="text-blue-600 medium-14 pr-2">{`${countStudent} students`}</p>
               <ExportStudentTemplate />
               {currentClass.role === "owner" && (
                  <AddPeopleDropDown
                     userNotIn={listUserNotIn}
                     role="student"
                     label="Student"
                     handleInvite={invitePeople2Class}
                  />
               )}
            </div>
         </div>

         <div className="w-full divide-y flex flex-col">
            {listUser.length > 0 ? (
               listUser.map((u, idx) => {
                  if (u.role === "student")
                     return (
                        <PeopleBox
                           currentRole={currentClass}
                           user={u}
                           key={idx}
                           removePeople={removePeople}
                        />
                     );
                  else return <></>;
               })
            ) : (
               <></>
            )}
         </div>
      </div>
   );
}

export default People;
