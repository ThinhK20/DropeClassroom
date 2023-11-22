import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Classroom, User } from "../../models/User";
import Header from "./header/Header";
import Sidebar from "./side3/Sidebar";
import { faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SideBarItem from "./side3/SideBarItem";
import { SideNavItem } from "../../shared/type/types";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AvatarCustom from "./avatar/AvatarCustom";

export default function Home() {

   const [isActiceClass, setIsActiveClass] = useState<boolean>(false);
   const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);
   const [isGoToHomePage, setIsGoToHomePage] = useState<boolean>(true);

   const user: User = {
      fullName: 'Minh An',
   }

   const classroom: Classroom = {
      className: 'Nestjs tutorial',
      // title: 'Beginner'
   }

   return (
      <div>
         <Header  fullName={user.fullName} 
                  actionOpenSideBar={() => {setIsOpenSideBar(!isOpenSideBar)}}>

            { isActiceClass && <div className="flex items-center gap-4 group">
               <FontAwesomeIcon icon={faChevronRight} className="text-gray-500/50"/>
               <div className="flex flex-col justify-start group-hover:underline-offset-2 group-hover:underline cursor-pointer">
                  <h2 className={`${(classroom.title == undefined) ? 'medium-20' : 'medium-16'} font-medium`}>{classroom.className}</h2>
                  {(classroom.title != undefined) && <label className="mb-2 text-sm">{classroom.title}</label>}
               </div>
            </div>}
         </Header>


         <main className={`flex flex-row ${isOpenSideBar ? 'md:pl-80' : 'md:pl-20'}`}>
            <Sidebar isOpen={isOpenSideBar}>
               {/* SideBar Items */}
               <div className="border-b-2 border-gray-200 py-2">
                  {/* Home */}
                  <SideBarItem item={{
                     name: "Home",
                     icon: <HomeOutlinedIcon sx={{ fontSize: 28, color: `black` }} />,
                     submenu: false,
                     actionGoDo: () => {setIsGoToHomePage(!isGoToHomePage)},
                  } as SideNavItem}
                     isActive={true}
                  >
                  </SideBarItem>
                  {/* Canlendar */}
                  <SideBarItem item={{
                     name: "Schedule",
                     icon: <CalendarTodayIcon sx={{ fontSize: 28, color: `black` }} />,
                     submenu: false,
                     actionGoDo: () => {setIsGoToHomePage(!isGoToHomePage)},
                  } as SideNavItem}
                     isActive={false}
                  >
                  </SideBarItem>
               </div>

               {/* SideBar Items if class list not null */}
               <div className="border-b-2 border-gray-200 py-2">
                  {/* Erolled */}
                  <SideBarItem item={{
                        name: "Erolled",
                        icon: <SchoolOutlinedIcon sx={{ fontSize: 28, color: `black` }} />,
                        submenu: true,
                        actionGoDo: () => {setIsGoToHomePage(!isGoToHomePage)},
                     } as SideNavItem}
                        isActive={false}
                     >
                     
                     <SideBarItem item={{
                        name: classroom.className,
                        icon: <AvatarCustom name={classroom.className} classroomAvatar={true}/>,
                        submenu: false,
                        actionGoDo: () => {setIsActiveClass(!isActiceClass)},
                     } as SideNavItem}
                        isActive={false} />

                     <SideBarItem item={{
                        name: "React Js tutorial 20CLC01aaaaaaaaaaa",
                        icon: <AvatarCustom name={"React Js tutorial 20CLC01"} classroomAvatar={true}/>,
                        submenu: false,
                        title: "Beginner",
                        actionGoDo: () => {setIsActiveClass(!isActiceClass)},
                     } as SideNavItem}
                        isActive={false} />

                  </SideBarItem>
               </div>

               {/* SideBar Items */}
               <div className=" py-2">
                  {/* Archived classes*/}
                  <SideBarItem item={{
                     name: "Setting",
                     icon: <ArchiveOutlinedIcon sx={{ fontSize: 28, color: `black` }} />,
                     submenu: false,
                     actionGoDo: () => {setIsGoToHomePage(!isGoToHomePage)}, 
                  } as SideNavItem}
                     isActive={false}
                  >
                  </SideBarItem>
                  {/* Setting */}
                  <SideBarItem item={{
                     name: "Setting",
                     icon: <SettingsIcon sx={{ fontSize: 28, color: `black` }} />,
                     submenu: false,
                     actionGoDo: () => {setIsGoToHomePage(!isGoToHomePage)}, 
                  } as SideNavItem}
                     isActive={false}
                  >
                  </SideBarItem>
               </div>

            </Sidebar>
            <div className="h-full pt-10 px-6 md:px-16 max-w-full">
               <img src="/src/assets/2.jpg"/>
               <img src="/src/assets/2.jpg"/>
               <img src="/src/assets/2.jpg"/>
               <img src="/src/assets/2.jpg"/>
               <img src="/src/assets/2.jpg"/>
               <img src="/src/assets/2.jpg"/>
            </div> 
         </main>

      </div>
   );
}
