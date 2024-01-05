import { SideNavItem } from "../../shared/type/types";

import Container from "../Container";
import SideBarItem from "./SideBarItem";

import SettingsIcon from "@mui/icons-material/Settings";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";

import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

function SidebarAdmin({ isOpen }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed -translate-x-80 md:-translate-x-0 left-0 md:top-16 z-sidebar ${
        isOpen ? "md:w-80" : "md:w-20"
      } md:h-[calc(100vh-theme(space.14))] bg-white border-r border-gray-200 transition-[width,transform] duration-300 ease-in-out flex flex-col group`}
    >
      <div className="overflow-x-hidden overflow-y-auto hide-scrollbar h-full w-full flex flex-col space-y-6">
        <nav className="mt-1">
          <Container>
            <div className="py-2">
              <div className="ml-3">MAIN</div>
              <SideBarItem
                item={
                  {
                    name: "DashBoard",
                    icon: <DashboardOutlinedIcon sx={{ fontSize: 28 }} />,
                    submenu: false,
                    path: "/ad/db",
                    actionGoDo: () => {
                      navigate("/ad/db");
                    },
                  } as SideNavItem
                }
              ></SideBarItem>
            </div>

            <div className="py-2">
              <div className="ml-3">LIST</div>
              <SideBarItem
                item={
                  {
                    name: "Users",
                    icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 28 }} />,
                    submenu: false,
                    path: "/ad/u",
                    actionGoDo: () => {
                      navigate("/ad/u");
                    },
                  } as SideNavItem
                }
              ></SideBarItem>

              <SideBarItem
                item={
                  {
                    name: "Classrooms",
                    icon: <InventoryOutlinedIcon sx={{ fontSize: 28 }} />,
                    submenu: false,
                    path: "/ad/cr",
                    actionGoDo: () => {
                      navigate("/ad/cr");
                    },
                  } as SideNavItem
                }
              ></SideBarItem>
            </div>

            <div className="py-2">
              <div className="ml-3">USEFULL</div>
              <SideBarItem
                item={
                  {
                    name: "Stats",
                    icon: <QueryStatsOutlinedIcon sx={{ fontSize: 28 }} />,
                    submenu: false,
                    path: "/ad/stats",
                    actionGoDo: () => {
                      navigate("/ad/stats");
                    },
                  } as SideNavItem
                }
              ></SideBarItem>

              <SideBarItem
                item={
                  {
                    name: "Notifications",
                    icon: (
                      <NotificationsNoneOutlinedIcon sx={{ fontSize: 28 }} />
                    ),
                    submenu: false,
                    path: "/ad/notifi",
                    actionGoDo: () => {
                      navigate("/ad/notifi");
                    },
                  } as SideNavItem
                }
              ></SideBarItem>
            </div>

            <div className="py-2">
              <div className="ml-3">USER</div>
              <SideBarItem
                item={
                  {
                    name: "Setting",
                    icon: (
                      <SettingsIcon sx={{ fontSize: 28, color: `black` }} />
                    ),
                    path: "/ad/s",
                    actionGoDo: () => {
                      navigate("/ad/s");
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

export default SidebarAdmin;
