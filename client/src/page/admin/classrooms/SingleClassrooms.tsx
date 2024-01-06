import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Classroom } from "../../../models";
import { findClassByIdApi } from "../../../apis/classroomApis";
import { AxiosError } from "axios";
import AvatarCustom from "../../../components/avatar/AvatarCustom";

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

  return (
    <div className="relative w-full h-full pt-5 pb-10 px-6 md:px-10 flex flex-col flex-1 items-start overflow-hidden ">
      <div className="top flex gap-[20px]">
        <div className="left infor__owner relative shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] p-[20px] flex-1">
          <h1 className="title text-2xl">Information Owner</h1>

          <div className="item flex">
            <div className="img ">
              <AvatarCustom
                classroomAvatar={false}
                name={classroom?.owner.username || "hhman"}
                url={""}
                height={150}
                width={150}
                fontSize={100}
              />
            </div>

            <div className="">{classroom?.owner.email}</div>
          </div>
        </div>
      </div>
      SingleClassrooms
    </div>
  );
}

export default SingleClassrooms;
