import ReactPortalCustom from "../portal/ReactPortalCustom";
import { useAppSelector } from "../../hooks/hooks";
import AvatarCustom from "../avatar/AvatarCustom";
import { useEffect } from "react";
import { getAllNotifications } from "../../apis/notificationApis";
import { Notification } from "../../models/Notification";
import React from "react";
interface FunctionProps {
  isOpen: boolean;
}

function FunctionDropDown({ isOpen }: FunctionProps) {
  if (!isOpen) return null;

  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  useEffect(() => {
    getAllNotifications().then((res) => {
      setNotifications(res.data);
    });
  }, []);

  const currentUserId = useAppSelector((state) => state.users.data?._id);

  const NotificationList = () => {
    return (
      notifications.length > 0 &&
      notifications.reverse().map(
        (notification: Notification) =>
          notification.studentId === currentUserId && (
            <div
              id="toast-notification"
              className="w-full  p-4 text-gray-900 bg-gray rounded-lg shadow "
            >
              <div className="flex items-center">
                <div className="relative inline-block shrink-0">
                  <AvatarCustom
                    name={notification.title as string}
                    classroomAvatar={false}
                  />
                </div>
                <div className="ms-3 text-sm font-normal">
                  <div className="text-sm font-semibold text-gray-900">
                    {notification.title}
                  </div>
                  <div className="text-sm font-normal">
                    {notification.content}
                  </div>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                    a few seconds ago
                  </span>
                </div>
              </div>
            </div>
          )
      )
    );
  };

  return (
    <ReactPortalCustom wrapperId="react-portal-drop-down-function-container">
      <div className="fixed  w-96 h-[500px] right-[79px] top-[64px] shadow-xl border z-PopOver rounded-3xl bg-blue-50 px-4 pt-4 overflow-x-hidden overflow-y-auto hide-scrollbar animation-translateFromX2Y">
        <div className="relative w-full h-full bg-white">
          <NotificationList />
        </div>
      </div>
    </ReactPortalCustom>
  );
}

export default FunctionDropDown;
