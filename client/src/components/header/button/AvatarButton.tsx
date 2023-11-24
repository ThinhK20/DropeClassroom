import { useState } from "react";
import { User } from "../../../models/User";
import AvatarCustom from "../../avatar/AvatarCustom";

function AvatarButton(user: User) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className="items-center hidden md:block rounded-full ring ring-transparent ring-offset-1 focus:ring-gray-500/40 hover:ring-gray-500/30"
      type="button"
      aria-label="Profile setting"
      onClick={() => setIsOpen(isOpen)}
    >
      <div className="object-cover relative overflow-hidden">
        {user.avatar === undefined ? (
          <AvatarCustom name={user.fullName} classroomAvatar={false} />
        ) : (
          <AvatarCustom
            name={user.fullName}
            url={user.avatar}
            classroomAvatar={false}
          />
        )}
      </div>
    </button>
  );
}

export default AvatarButton;
