import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useRef, useState } from "react";
import { User } from "../../models";
import InvitePeopleModal from "../modal/InvitePeopleModal";

interface Props {
  userNotIn: User[];
  label?: string;
  role: "teacher" | "student";
  handleInvite: (u: User[], role: "teacher" | "student") => void
}

function AddPeopleDropDown({ userNotIn, label = "Teacher", role, handleInvite }: Props) {
  const nodeRef = useRef<HTMLButtonElement>(null);
  const [isDropDown, setIsDropDown] = useState(false);

  return (
    <div className="relative">
      <button
        ref={nodeRef}
        className="mr-2 w-11 h-11 rounded-full text-blue-600 text-3xl hover:bg-blue-50 flex items-center justify-center focus:bg-blue-50"
        onClick={() => setIsDropDown(!isDropDown)}
      >
        <PersonAddAltOutlinedIcon />
      </button>

      <InvitePeopleModal
        isOpen={isDropDown}
        userNotIn={userNotIn}
        label={label}
        handleClose={() => setIsDropDown(!isDropDown)}
        type={role}
        handleInvite={handleInvite}
      />
    </div>
  );
}

export default AddPeopleDropDown;
