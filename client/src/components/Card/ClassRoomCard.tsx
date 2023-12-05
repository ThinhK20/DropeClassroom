import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Avatar } from "@mui/material";
import ClassCardDropDown from "../DropDown/ClassCardDropDown";
import { useNavigate } from "react-router-dom";
import { ObjectUserClassRoom } from "../../models";

interface ClassroomCardProps {
  classroom: ObjectUserClassRoom;
}

function ClassRoomCard({ classroom }: ClassroomCardProps) {
  const navigate = useNavigate();
  const pathClassRoom = "/c/" + classroom.classId._id;

  return (
    <article className="col-span-1 group">
      <div className="relative flex flex-col w-full rounded-xl">
        <div className="border aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            src={classroom.classId.coverImage}
            className="w-full h-2/5 object-fill"
            alt="classroom"
          />
        </div>

        <div className="absolute top-0 left-0 aspect-square w-3/4 h-2/5 flex flex-col justify-between z-[10]">
          <div
            className="overflow-hidden flex flex-col w-full text-white hover:underline-offset-1 hover:underline cursor-pointer "
            onClick={() => {
              navigate(pathClassRoom);
            }}
          >
            <h1 className="text-3xl md:text-xl lg:text-lg xl:text-2xl font-medium truncate pl-4">
              {classroom.classId.className}
            </h1>
            <p className="text-xl md:text-base lg:text-sm xl:text-base pl-5">
              {classroom.classId.section}
            </p>
          </div>
          {(classroom.role !== 'owner') &&
            <div className="overflow-hidden w-full pl-4 text-white pb-1 hover:underline-offset-1 hover:underline cursor-pointer">
              <p className="text-2xl md:text-lg lg:text-sm xl:text-xl">
                {classroom.classId.owner.username}
              </p>
            </div>
          }
        </div>

        <div className="absolute top-0 left-0 aspect-square w-full flex flex-col justify-between">
          <div className="flex justify-end items-center pr-4 py-2">
            <ClassCardDropDown />
          </div>

          {(classroom.role !== 'owner') && 
            <div className="flex justify-end items-center mr-4">
              <div className="flex justify-between items-center w-ful -mt-14">
                <Avatar
                  src="/src/assets/testimonial-03.jpg"
                  sx={{ height: 65, width: 65 }}
                />
              </div>
            </div>
          }

          <div className="flex justify-end items-center pr-4 py-1 border-t gap-1">

            {(classroom.role === 'student') && 
              <button className="w-12 h-12 hover:bg-gray-500/10 rounded-full">
                <BadgeOutlinedIcon sx={{ fontSize: 28 }} />
              </button>
            }


            {(classroom.role === 'teacher' || classroom.role === 'owner') &&
              <button className="w-12 h-12 hover:bg-gray-500/10 rounded-full">
                <TrendingUpOutlinedIcon sx={{ fontSize: 28 }} />
              </button>
            }

            <button className="w-12 h-12 hover:bg-gray-500/10 rounded-full">
              <FolderOutlinedIcon sx={{ fontSize: 28 }} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ClassRoomCard;
