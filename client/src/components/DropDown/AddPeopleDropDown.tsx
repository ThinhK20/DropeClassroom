import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useEffect, useRef, useState } from "react";
import { User } from "../../models";
import AvatarCustom from "../avatar/AvatarCustom";

interface Props {
  userNotIn: User[];
  role: "teacher" | "student" | "owner"
  addPeople: (u: User, role: "teacher" | "student" | "owner") => void;
}

function AddPeopleDropDown({ userNotIn, role, addPeople }: Props) {
  const nodeRef = useRef<HTMLButtonElement>(null);
  const [isDropDown, setIsDropDown] = useState(false);

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
    <div className="relative">
      <button
        ref={nodeRef}
        className="mr-2 w-11 h-11 rounded-full text-blue-600 text-3xl hover:bg-blue-50 flex items-center justify-center focus:bg-blue-50"
        onClick={() => setIsDropDown(!isDropDown)}
      >
        <PersonAddAltOutlinedIcon />
      </button>

      <div
        className={`absolute transition duration-200 ${
          isDropDown ? "block opacity-100" : "hidden opacity-0"
        } bg-white z-[99] border rounded shadow-lg top-8 right-8 overflow-y-auto hide-scrollbar max-h-56 `}
      >
        <ul className="flex flex-col py-2 divide-y-2">
          {userNotIn.map((u, idx) => {
            return (
              <li className="flex items-center py-2 px-4 hover:bg-gray-500/20 space-x-6 cursor-pointer" key={idx}
                  onClick={() => addPeople(u, role)}
              >
                <AvatarCustom
                  name={u.username}
                  classroomAvatar={false}
                  height={38}
                  width={38}
                  fontSize={20}
                />
                <div className="whitespace-nowrap">{u.email}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AddPeopleDropDown;
