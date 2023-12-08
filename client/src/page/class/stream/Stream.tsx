import AutoFixNormalOutlinedIcon from "@mui/icons-material/AutoFixNormalOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { useAppSelector } from "../../../hooks/hooks";

function Stream() {
  const currentClass = useAppSelector((state) => state.userClassroom.currentClass);

  return (
    <div className="w-full h-full flex flex-col flex-1 items-start overflow-hidden pt-5 px-2 xl:px-28 ">
      {/* cover image */}
      <div className="relative w-full h-60">
        <img
          src={currentClass?.classId.coverImage}
          className="relative w-full h-full object-cover rounded-xl"
        />
        <div className="absolute w-full h-full flex flex-col justify-between py-3 px-4 left-0 top-0">
          <div className="flex justify-end">
            <button className="flex items-center justify-center space-x-1 bg-white/90 py-2 px-4 rounded-lg shadow hover:bg-white">
              <AutoFixNormalOutlinedIcon />
              <span className="">Customize</span>
            </button>
          </div>

          <div className="flex flex-row w-full">
            <div className="flex flex-col">
              <p className="bold-32 text-white"> {currentClass?.classId.className} </p>
              <p className="regular-18 text-white"> {currentClass?.classId.section} </p>
            </div>

            <div className="flex justify-end items-end flex-1">
              <button className="w-9 h-9 hover:bg-gray-500/30 flex items-center justify-center rounded-full">
                <ErrorOutlineOutlinedIcon sx={{ color: "white" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* notification + classcode + assignment */}
      <div className="relative grid grid-cols-5 w-full h-full mt-7 gap-6">
        <div className="col-span-1">
          <div className="w-full border rounded-lg flex flex-col pl-2 py-4">
            <div className="flex flex-row justify-between items-center">
              <span>Class code</span>
              <button className="flex justify-center items-center w-11 h-11 hover:bg-gray-500/20 rounded-full">
                <MoreVertOutlinedIcon sx={{ fontSize: 28 }} className="text-black" />

              </button>
            </div>
            
            <div className="flex flex-row gap-2 items-center">
              <span className="medium-24">{currentClass?.classId.classCode}</span>
              <button className="flex justify-center items-center w-9 h-9 hover:bg-gray-500/20 rounded-full">
                <ContentCopyOutlinedIcon sx={{ fontSize: 18 }}/>
              </button>
            </div>
          </div>

        </div>

        <div className="col-span-4 -mt-3 flex flex-col flex-1">
          list Assignment here 
        
        </div>
      </div>
    </div>
  );
}

export default Stream;
