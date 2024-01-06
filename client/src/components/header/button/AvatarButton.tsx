import { useEffect, useRef, useState } from "react";
import { User } from "../../../models/User";
import AvatarCustom from "../../avatar/AvatarCustom";
import AvatarDropDown from "../../DropDown/AvatarDropDown";

function AvatarButton(user: User) {
   const [isOpen, setIsOpen] = useState(false);

   const nodeRef = useRef<HTMLButtonElement>(null);

   useEffect(() => {
      function handleClickOutPopover(this: Document, ev: MouseEvent) {
         if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
            setIsOpen(false);
         }
      }

      document.addEventListener("click", handleClickOutPopover);

      return () => {
         document.removeEventListener("click", handleClickOutPopover);
      };
   }, [isOpen]);

   return (
      <>
         <button
            className="items-center hidden md:block rounded-full ring ring-transparent ring-offset-1 focus:ring-gray-500/40 hover:ring-gray-500/30 -ml-1"
            type="button"
            aria-label="Profile setting"
            ref={nodeRef}
            onClick={() => setIsOpen(!isOpen)}
         >
            <div className="object-cover relative overflow-hidden">
               <AvatarCustom name={user.username} classroomAvatar={false} />

               {/* {user.avatar === undefined ? (
            <AvatarCustom name={user.username} classroomAvatar={false} />
          ) : (
            <AvatarCustom
              name={user.username}
              url={user.avatar}
              classroomAvatar={false}
            />
          )} */}
            </div>
         </button>

         <AvatarDropDown isOpen={isOpen} user={user} />
      </>
   );
}

export default AvatarButton;
