import { useState } from "react";
import { User } from "../../models/User";
import { ClassRoom } from "../../models/ClassRoom";
import { SideNavItem } from "../../shared/type/types";

import Container from "../Container";
import SideBarItem from "./SideBarItem";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SettingsIcon from "@mui/icons-material/Settings";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import AvatarCustom from "../avatar/AvatarCustom";

interface SidebarProps {
  user?: User;
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  console.log("rendering side bar");

  const [enrolledClass, setEnrolledClass] = useState<ClassRoom[]>([
    {
      name: "Nestjs Backend Tutorial",
      title: "Beginner",
    },
    {
      name: "Nextjs Fullstack Tutorial",
      title: "20CLC01",
    },
  ]);

  const [teachingClass, setTeachingClass] = useState<ClassRoom[]>([
    {
      name: "Java Backend Tutorial",
      title: "Beginner",
    },
    {
      name: "C# Backend Tutorial",
      title: "20CLC01",
    },
  ]);

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
                  } as SideNavItem
                }
                isActive={true}
              ></SideBarItem>

              <SideBarItem
                item={
                  {
                    name: "Schedule",
                    icon: (
                      <CalendarTodayIcon
                        sx={{ fontSize: 28, color: `black` }}
                      />
                    ),
                    submenu: false,
                  } as SideNavItem
                }
                isActive={false}
              ></SideBarItem>
            </div>

            <div className="border-b-2 border-gray-200 py-2">
              {teachingClass.length > 0 && (
                <SideBarItem
                  item={
                    {
                      name: "Teaching",
                      icon: (
                        <CastForEducationOutlinedIcon
                          sx={{ fontSize: 28, color: `black` }}
                        />
                      ),
                      submenu: true,
                    } as SideNavItem
                  }
                  isActive={false}
                >
                  {teachingClass.map((classroom, id) => {
                    return (
                      <SideBarItem
                        key={id}
                        item={
                          {
                            name: classroom.name,
                            icon: (
                              <AvatarCustom
                                name={classroom.name}
                                classroomAvatar={true}
                              />
                            ),
                            submenu: false,
                          } as SideNavItem
                        }
                        isActive={false}
                      />
                    );
                  })}
                </SideBarItem>
              )}

              {enrolledClass.length > 0 && (
                <SideBarItem
                  item={
                    {
                      name: "Enrolled",
                      icon: (
                        <SchoolOutlinedIcon
                          sx={{ fontSize: 28, color: `black` }}
                        />
                      ),
                      submenu: true,
                    } as SideNavItem
                  }
                  isActive={false}
                >
                  {enrolledClass.map((classroom, id) => {
                    return (
                      <SideBarItem
                        key={id}
                        item={
                          {
                            name: classroom.name,
                            icon: (
                              <AvatarCustom
                                name={classroom.name}
                                classroomAvatar={true}
                              />
                            ),
                            submenu: false,
                          } as SideNavItem
                        }
                        isActive={false}
                      />
                    );
                  })}
                </SideBarItem>
              )}
            </div>

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
                    submenu: false,
                  } as SideNavItem
                }
                isActive={false}
              ></SideBarItem>

              <SideBarItem
                item={
                  {
                    name: "Setting",
                    icon: (
                      <SettingsIcon sx={{ fontSize: 28, color: `black` }} />
                    ),
                    submenu: false,
                  } as SideNavItem
                }
                isActive={false}
              ></SideBarItem>
            </div>
          </Container>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
