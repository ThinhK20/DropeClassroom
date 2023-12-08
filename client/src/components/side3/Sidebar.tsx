import { SideNavItem } from "../../shared/type/types";

import Container from "../Container";
import SideBarItem from "./SideBarItem";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SettingsIcon from "@mui/icons-material/Settings";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";

import { useNavigate } from "react-router-dom";
import { UserClassRoom } from "../../models";
import ListClass from "./ListClass";
import { useAppSelector } from "../../hooks/hooks";
// import { useAppSelector } from "../../hooks/hooks";

interface SidebarProps {
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate();
  const listClasses: UserClassRoom = useAppSelector((state) => state.userClassroom.classes);
  // const listClasses: UserClassRoom = {
  //   count: 0,
  //   erolled_class: [],
  //   teaching_class: [],
  //   owner_class: []
  // }

  return (
    <aside
      className={`fixed -translate-x-80 md:-translate-x-0 left-0 md:top-16 z-sidebar ${
        isOpen ? "md:w-80" : "md:w-20"
      } md:h-[calc(100vh-theme(space.14))] bg-white border-r border-gray-200 transition-[width,transform] duration-300 ease-in-out flex flex-col group`}
    >
      <div className="overflow-x-hidden overflow-y-auto hide-scrollbar h-full w-full flex flex-col space-y-6">
        <nav className="mt-1">
          <Container>
            <div className="border-b-2 border-gray-200 py-2">
              <SideBarItem
                item={
                  {
                    name: "Home",
                    icon: (
                      <HomeOutlinedIcon sx={{ fontSize: 28, color: `black` }} />
                    ),
                    submenu: false,
                    path: "/h",
                    actionGoDo: () => {
                      navigate("/h");
                    },
                  } as SideNavItem
                }
              ></SideBarItem>

              <SideBarItem
                item={
                  {
                    name: "Schedule",
                    path: "/schedule",
                    actionGoDo: () => {
                      navigate("/schedule");
                    },
                    icon: (
                      <CalendarTodayIcon
                        sx={{ fontSize: 28, color: `black` }}
                      />
                    ),
                    submenu: false,
                  } as SideNavItem
                }
              ></SideBarItem>
            </div>

            {(listClasses.count > 0) && 
              <div className="border-b-2 border-gray-200">
                <ListClass
                  name="Teaching"
                  classes={[
                    ...listClasses.teaching_class,
                    ...listClasses.owner_class,
                  ]}
                  icon={
                    <CastForEducationOutlinedIcon
                      sx={{ fontSize: 28, color: `black` }}
                    />
                  }
                />
                <ListClass
                  name="Teaching"
                  classes={[...listClasses.erolled_class]}
                  icon={
                    <SchoolOutlinedIcon sx={{ fontSize: 28, color: `black` }} />
                  }
                />
              </div>
            }

            <div className=" py-2">
              <SideBarItem
                item={
                  {
                    name: "Archived classes",
                    icon: (
                      <ArchiveOutlinedIcon
                        sx={{ fontSize: 28, color: `black` }}
                      />
                    ),
                    path: "/h/archived",
                    actionGoDo: () => {
                      navigate("/h/archived");
                    },
                    submenu: false,
                  } as SideNavItem
                }
              ></SideBarItem>

              <SideBarItem
                item={
                  {
                    name: "Setting",
                    icon: (
                      <SettingsIcon sx={{ fontSize: 28, color: `black` }} />
                    ),
                    path: "/s",
                    actionGoDo: () => {
                      navigate("/s");
                    },
                    submenu: false,
                  } as SideNavItem
                }
              ></SideBarItem>
            </div>
          </Container>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
