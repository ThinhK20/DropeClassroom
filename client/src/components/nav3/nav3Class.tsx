import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ButtonNav3 from "./buttonNav3";
import { useAppSelector } from "../../hooks/hooks";

function NavClass() {
  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  if (!currentClass) return <></>;

  return (
    <div className="fixed w-[80%] flex flex-row justify-between border-b border-gray-200 bg-white z-50">
      {/* left */}

      <div className="flex flex-row pl-5 cursor-pointer">
        <ButtonNav3 path={`/c/${currentClass.classId._id}`} name="Stream" />
        <ButtonNav3
          path={`/c/${currentClass.classId._id}/w/t/all`}
          name="Assignment"
        />
        <ButtonNav3
          path={`/c/${currentClass.classId._id}/uic/all`}
          name="People"
        />
        <ButtonNav3
          path={`/c/${currentClass.classId._id}/gb/all`}
          name="Grade"
        />
        <ButtonNav3
          path={`/c/${currentClass.classId._id}/gr/all`}
          name="Grade Reviews"
        />
      </div>
      {/* right */}
      <div className="flex flex-row justify-end items-center space-x-1 pr-4 bg-white mr-2">
        <button className="w-10 h-10 hover:bg-gray-400/10 rounded-full flex items-center justify-center">
          <FolderOutlinedIcon sx={{ height: 20, width: 20 }} />
        </button>

        <button className="w-10 h-10 hover:bg-gray-400/10 rounded-full flex items-center justify-center">
          <TodayOutlinedIcon sx={{ height: 20, width: 20 }} />
        </button>

        {currentClass.role === "owner" && (
          <button className="w-10 h-10 hover:bg-gray-400/10 rounded-full flex items-center justify-center">
            <SettingsOutlinedIcon sx={{ height: 20, width: 20 }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default NavClass;
