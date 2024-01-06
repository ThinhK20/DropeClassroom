import { useEffect, useRef, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { getAllNotifications } from "../../../apis/notificationApis";
import React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { Notification } from "../../../models/Notification";
import FunctionDropDown from "../../DropDown/FunctionDropDown";

function FunctionButton() {
   const [isOpenDropDown, setIsOpenDropDown] = useState(false);

   const nodeRef = useRef<HTMLButtonElement>(null);

   useEffect(() => {
      function handleClickOutPopover(this: Document, ev: MouseEvent) {
         if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
            setIsOpenDropDown(false);
         }
      }

      document.addEventListener("click", handleClickOutPopover);

      return () => {
         document.removeEventListener("click", handleClickOutPopover);
      };
   }, [isOpenDropDown]);

   const [notifications, setNotifications] = React.useState<Notification[]>([]);

   useEffect(() => {
      getAllNotifications().then((res) => {
         setNotifications(res.data);
      });
   }, []);

   const currentUserId = useAppSelector((state) => state.users.data?._id);

   const notificationLength = notifications.filter(
      (notification) => notification.studentId === currentUserId
   ).length;

   return (
      <>
         <button
            className="regular-20 text-black/50 pb-2 rounded-full hover:bg-gray-500/10 hover:text-black/70 cursor-pointer -ml-3 hidden md:block focus:bg-gray-500/40 items-center w-11 h-11 transition-all focus:rotate-6"
            onClick={() => setIsOpenDropDown(!isOpenDropDown)}
            ref={nodeRef}
         >
            <div className="relative">
               <NotificationsNoneOutlinedIcon sx={{ fontSize: 30 }} />
               <div
                  className={`${
                     notificationLength < 1 ? "hidden" : "block"
                  } absolute bottom-[15px] right-[7px] z-10 inline-block whitespace-nowrap rounded-full bg-rose-500 transition-all w-[14px] h-[14px]`}
               >
                  <p
                     className={`m-[0.5px] flex items-center justify-center font-bold leading-none text-white ${
                        notificationLength > 10 ? "text-[8px]" : "text-[12px]"
                     } `}
                  >
                     {" "}
                     {notificationLength}
                  </p>
               </div>
            </div>
         </button>
         <FunctionDropDown isOpen={isOpenDropDown} />
      </>
   );
}

export default FunctionButton;
