import { ObjectUser, User } from "../../../models";
import AddPeopleDropDown from "../../../components/dropDown/AddPeopleDropDown";
import { useAppSelector } from "../../../hooks/hooks";
import {
  addUserToClassApi,
  deleteUserClassApi,
  getAllUsersClassApi,
} from "../../../apis/classroomApis";
import PeopleBox from "../../../components/box/PeopleBox";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getAllUsersNotInClassApi } from "../../../apis/userApis";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

function People() {
  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  const [listUser, setListUser] = useState<ObjectUser[]>([]);
  const [listUserNotIn, setListUserNotIn] = useState<User[]>([]);
  const [isFetch, setIsFetch] = useState<boolean>(false);

  // const user: User = {
  //   _id: "6566115223c81cf1bc4e7f15",
  //   username: "Minh An",
  //   email: "anhoang483@gmail.com",
  //   isActive: true,
  //   gender: "m",
  //   role: "admin",
  //   createdDate: "2023-11-28T16:11:01.769Z",
  //   updatedDate: "2023-11-28T16:11:01.769Z",
  // };

  const removePeople = (u: ObjectUser) => {
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

  const addPeople2Class = (u: User, role: "teacher" | "student" | "owner") => {
    if (!currentClass) return;

    const updateList = listUserNotIn.filter(
      (user) => user._id.toString() !== u._id.toString()
    );
    const controller = new AbortController();
    addUserToClassApi(
      currentClass?.classId._id as string,
      {
        userId: u,
        role: role,
      },
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

    setListUserNotIn(updateList);
    setListUser([...listUser, { userId: u, role }]);
  };

  const countStudent = (u: ObjectUser[]): number => {
    let count = 0;
    u.find((_u) => {
      if (_u.role === "student") count += 1;
    });

    return count;
  };

  useEffect(() => {
    if (!isFetch) {
      if (!currentClass) return;
      const controller = new AbortController();
      getAllUsersClassApi(currentClass.classId._id, controller.signal)
        .then((data) => {
          setListUser(data);
          const controller_post = new AbortController();
          getAllUsersNotInClassApi({ users: [...data] }, controller_post.signal)
            .then((data) => {
              setListUserNotIn(data);
              console.log(data);
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
  });

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
            addPeople={addPeople2Class}
          />
        )}
      </div>

      <div className="w-full divide-y flex flex-col">
        <div className="w-full flex items-center justify-between">
          <PeopleBox
            currentRole={currentClass}
            user={{
              userId: currentClass.classId.owner,
              role: "owner",
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

        {(listUser.length > 0) ? listUser.map((u, idx) => {
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
        }) : <></>}
      </div>

      <div className="w-full flex justify-between items-center border-b-2 border-blue-600 mt-10">
        <p className="text-blue-600 medium-32 ml-2 mb-4">Students</p>

        <div className="flex items-center gap-4">
          <p className="text-blue-600 medium-14 pr-2">{`${countStudent(
            listUser
          )} students`}</p>
          {currentClass.role === "owner" && (
            <AddPeopleDropDown
              userNotIn={listUserNotIn}
              role="student"
              addPeople={addPeople2Class}
            />
          )}
        </div>
      </div>

      <div className="w-full divide-y flex flex-col">
        {(listUser.length > 0) ? listUser.map((u, idx) => {
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
        }) : <></>}
      </div>
    </div>
  );
}

export default People;
