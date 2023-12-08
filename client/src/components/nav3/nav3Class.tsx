import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ButtonNav3 from "./buttonNav3";

function NavClass() {

  return (
    <div className="relative w-full flex flex-row justify-between border-b border-gray-200">
      {/* right */}

      <ul className="flex flex-row pl-5 cursor-pointer">
        <ButtonNav3 path={"/c/656ddad52bcdf62b79a88fc3"} name="Stream"/>
        <ButtonNav3 path={"/c/656ddad52bcdf62b79a88fc3/w/t/all"} name="Assignment"/>
        <ButtonNav3 path={"/c/656ddad52bcdf62b79a88fc3/uic/all"} name="People"/>
        <ButtonNav3 path={"/c/656ddad52bcdf62b79a88fc3/gb/all"} name="Grade"/>
      </ul>

      {/* left */}
      <div className="w-1/3 flex flex-row justify-end items-center space-x-1 pr-4">
        <button className="w-10 h-10 hover:bg-gray-400/10 rounded-full flex items-center justify-center">
          <FolderOutlinedIcon sx={{ height: 20, width: 20 }} />
        </button>

        <button className="w-10 h-10 hover:bg-gray-400/10 rounded-full flex items-center justify-center">
          <TodayOutlinedIcon sx={{ height: 20, width: 20 }} />
        </button>

        <button className="w-10 h-10 hover:bg-gray-400/10 rounded-full flex items-center justify-center">
          <SettingsOutlinedIcon sx={{ height: 20, width: 20 }} />
        </button>
      </div>
    </div>
  );
}

export default NavClass;
