import { ClassRoom } from "../../models/ClassRoom";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { Avatar } from "@mui/material";


interface ClassroomCardProps {
  classroom: ClassRoom;
}

function ClassRoomCard({classroom}: ClassroomCardProps) {
  return (
    <article className="col-span-1 cursor-pointer group"
             onClick={() => {}}
    >
      <div className="relative flex flex-col w-full rounded-xl">
        <div className="border aspect-square w-full relative overflow-hidden rounded-xl">
          <img src={classroom.coverImage} className="w-full h-2/5 object-fill" alt="classroom"/>
        </div>

        <div className="absolute top-0 left-0 aspect-square w-3/4 h-2/5 flex flex-col justify-between z-20">
          <div className="overflow-hidden flex flex-col w-full p-4 text-white hover:underline-offset-1 hover:underline">
            <h1 className="medium-24 truncate">{classroom.name}</h1>
            <p className="text-sm">{classroom.title}</p>
          </div>
          <div className="overflow-hidden w-full pl-4 text-white pb-2 hover:underline-offset-1 hover:underline">
            <p>{'Nguyen Khanh Huy'}</p>
          </div>
        </div>

        <div className="absolute top-0 left-0 aspect-square w-full flex flex-col justify-between z-10">

          <div className="flex justify-end items-center pr-4 py-2">
            <button className="w-12 h-12 hover:bg-gray-500/50 rounded-full">
              <MoreVertOutlinedIcon sx={{ fontSize: 28}} className="text-white"/>
            </button>
          </div>

          <div className="flex justify-end items-center mr-4">
            <div className="flex justify-between items-center w-ful -mt-14">
              <Avatar src="/src/assets/testimonial-03.jpg" 
                      sx={{height: 65, width: 65}}/>
            </div>

          </div>

          <div className="flex justify-end items-center pr-4 py-2 border-t gap-1">
            <button className="w-12 h-12 hover:bg-gray-500/5 rounded-full">
              <BadgeOutlinedIcon sx={{ fontSize: 28}}/>
            </button>
            <button className="w-12 h-12 hover:bg-gray-500/5 rounded-full">
              <TrendingUpOutlinedIcon sx={{ fontSize: 28}}/>
            </button>
            <button className="w-12 h-12 hover:bg-gray-500/5 rounded-full">
              <FolderOutlinedIcon sx={{ fontSize: 28}}/>
            </button>
          </div>

        </div>

      </div>
    </article>
  )
}

export default ClassRoomCard