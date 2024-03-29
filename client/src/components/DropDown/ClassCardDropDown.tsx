import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useEffect, useRef, useState } from "react";
import { ObjectUserClassRoom } from "../../models";
import UpdateClassModal from "../modal/UpdateClassModal";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteClassUser } from "../../store/userClassroomSlice";

interface Props {
  userClass: ObjectUserClassRoom;
}

function ClassCardDropDown({ userClass }: Props) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutPopover(this: Document, ev: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        setIsDropDown(false);
      }
    }

    document.addEventListener("click", handleClickOutPopover);

    return () => {
      document.removeEventListener("click", handleClickOutPopover);
    };
  }, [isDropDown]);

  return (
    <>
      <div className="relative" ref={nodeRef}>
        <button
          className="w-12 h-12 hover:bg-gray-500/40 rounded-full focus:bg-gray-500/50"
          onClick={() => setIsDropDown(!isDropDown)}
        >
          <MoreVertOutlinedIcon sx={{ fontSize: 28 }} className="text-white" />
        </button>

        <div
          className={`absolute transition duration-200 ${
            isDropDown ? "block opacity-100" : "hidden opacity-0"
          } bg-white z-[99] rounded shadow-lg top-12 -left-32 cursor-pointer w-44`}
        >
          <ul className="flex flex-col py-2">
            {userClass.role === "owner" && (
              <>
                <li
                  className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10"
                  onClick={() => {
                    setIsDropDown(!isDropDown);
                    navigator.clipboard.writeText(
                      import.meta.env.VITE_CLIENT_URL +
                        "/" +
                        userClass.classId.inviteLink
                    );
                  }}
                >
                  Copy URL Invitation
                </li>
                <li
                  className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10"
                  onClick={() => {
                    setUpdate(!isUpdate);
                    setIsDropDown(!isDropDown);
                  }}
                >
                  Adjusting
                </li>
                <li className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10">
                  Archieved
                </li>
                <li
                  className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10"
                  onClick={() => {
                    console.log(userClass.classId._id);
                    setIsDropDown(!isDropDown);
                    dispatch(deleteClassUser(userClass.classId._id));
                  }}
                >
                  Delete
                </li>
              </>
            )}
            {userClass.role === "student" && (
              <li className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10">
                Unenroll
              </li>
            )}
            {userClass.role === "teacher" && (
              <>
                <li
                  className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10"
                  onClick={() => {
                    setIsDropDown(!isDropDown);
                    navigator.clipboard.writeText(
                      import.meta.env.VITE_API_URL +
                        "/" +
                        userClass.classId.inviteLink
                    );
                  }}
                >
                  Copy URL Invitation
                </li>
                <li className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10">
                  Leave
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <UpdateClassModal
        isOpen={isUpdate}
        currentClass={userClass}
        handleClose={() => setUpdate(!isUpdate)}
      />
    </>
  );
}

export default ClassCardDropDown;
