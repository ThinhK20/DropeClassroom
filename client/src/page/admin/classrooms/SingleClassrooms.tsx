import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Classroom } from "../../../models";
import { findClassByIdApi } from "../../../apis/classroomApis";
import { AxiosError } from "axios";
import AvatarCustom from "../../../components/avatar/AvatarCustom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import SectionClassrooms from "./SectionClassrooms";
import TablePeople from "./tablePeople";

function SingleClassrooms() {
  const params = useParams();
  const [classroom, setClassroom] = useState<Classroom>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      const ctrl = new AbortController();

      findClassByIdApi(params.id, ctrl.signal)
        .then((data) => {
          setClassroom(data.data);
          ctrl.abort();
        })
        .catch((err: AxiosError) => {
          console.log(err.message);
          setError(err.message);
          ctrl.abort();
        });
    }
  }, [params.id]);

  if (error !== "") return <div className="">{error}</div>;
  if (!classroom) return;

  return (
    <div className="relative w-full h-full pt-5 pb-5 px-6 md:px-10 flex flex-col flex-1 items-start overflow-hidden ">
      <div className="top flex gap-[20px] w-full">
        <div className="left infor__owner relative flex-1 h-full flex flex-col gap-[20px]">
          <div className="shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] p-[20px]">
            <h1 className="title text-2xl font-[600]">Information Owner</h1>

            <div className="item flex gap-[20px] px-[20px] py-[10px]">
              <div className="relative img">
                <AvatarCustom
                  classroomAvatar={false}
                  name={classroom?.owner.username || "hhman"}
                  url={""}
                  height={80}
                  width={80}
                  fontSize={40}
                />

                <button className="absolute right-0 bottom-0 bg-blue-50 rounded-full w-7 h-7 flex justify-center items-center hover:bg-blue-100 transition-all">
                  <ModeEditOutlineOutlinedIcon />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-2xl font-[500]">
                  {classroom?.owner.username}
                </div>
                <div className="">Email: {classroom?.owner.email}</div>
              </div>
            </div>
          </div>

          <div className="shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] p-[20px]">
            <TablePeople clr={classroom as Classroom} />
          </div>
        </div>

        <div className="left infor__owner shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] p-[20px] flex-1">
          <SectionClassrooms clr={classroom as Classroom} />
        </div>
      </div>
    </div>
  );
}

export default SingleClassrooms;
