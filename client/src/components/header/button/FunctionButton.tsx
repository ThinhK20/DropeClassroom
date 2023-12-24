import { useEffect, useRef, useState } from "react";
import FunctionDropDown from "../../dropDown/FunctionDropDown";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { getAllNotifications } from "../../../apis/notificationApis";
import React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { Notification } from "../../../models/Notification";

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
        <NotificationsNoneOutlinedIcon />
        <div className="absolute bottom-auto left-auto z-10 inline-block 0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
          {notificationLength}
        </div>
      </button>
      <FunctionDropDown isOpen={isOpenDropDown} />
    </>
  );
}

export default FunctionButton;
