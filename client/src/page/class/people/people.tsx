import { ObjectUser } from "../../../models";
import AddPeopleDropDown from "../../../components/dropDown/AddPeopleDropDown";
import { useAppSelector } from "../../../hooks/hooks";
import { getAllUsersClassApi } from "../../../apis/classroomApis";
import PeopleBox from "../../../components/box/PeopleBox";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

function People() {
  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  const [listUser, setListUser] = useState<ObjectUser[]>([]);
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

  const countStudent = (u: ObjectUser[]): number => {
    let count = 0;
    u.find((_u) => {
      if (_u.role === "student") count += 1;
    });

    return count;
  };

  useEffect(() => {
    if (!isFetch) {
      console.log("home");
      if (!currentClass) return;
      const controller = new AbortController();
      getAllUsersClassApi(currentClass.classId._id, controller.signal)
        .then((data) => {
          setListUser(data);
          setIsFetch(true);
        })
        .catch((err: AxiosError) => {
          console.log(err);
          return [];
        })
        .finally(() => {
          controller.abort();
        });
    }
  });

  if (!currentClass) return <></>;

  return (
    <div className="w-full h-full flex flex-col flex-1 items-start overflow-hidden pt-5 px-2 xl:px-44 ">
      {/* Teacher */}
      <div className="w-full flex justify-between items-center border-b-2 border-blue-600 mt-10">
        <p className="text-blue-600 medium-32 ml-2 mb-4">Teachers</p>
        {currentClass.role === "owner" && <AddPeopleDropDown />}
      </div>

      <div className="w-full divide-y flex flex-col">
        <PeopleBox
          user={{
            userId: currentClass.classId.owner,
            role: "owner",
          }}
        />

        {listUser.map((u, idx) => {
          if (u.role === "teacher") return <PeopleBox user={u} key={idx} />;
          else return <></>;
        })}
      </div>

      <div className="w-full flex justify-between items-center border-b-2 border-blue-600 mt-10">
        <p className="text-blue-600 medium-32 ml-2 mb-4">Students</p>

        <div className="flex items-center gap-4">
          <p className="text-blue-600 medium-14 pr-2">{`${countStudent(
            listUser
          )} students`}</p>
          {currentClass.role === "owner" && <AddPeopleDropDown />}
        </div>
      </div>

      <div className="w-full divide-y flex flex-col">
        {listUser.map((u, idx) => {
          if (u.role === "student") return <PeopleBox user={u} key={idx} />;
          else return <></>;
        })}
      </div>
    </div>
  );
}

export default People;
