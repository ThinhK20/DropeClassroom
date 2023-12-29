import { useState } from "react";
import Modal from "./Modal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAppDispatch } from "../../hooks/hooks";
import { User } from "../../models";
import AvatarCustom from "../avatar/AvatarCustom";

interface Props {
  userNotIn: User[];
  label?: string;
  isOpen: boolean;
  type?: string;
  handleClose: () => void;
}

function InvitePeopleModal({
  userNotIn,
  label = "Teacher",
  isOpen = false,
  type = "teacher",
  handleClose,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async () => {};

  const headerContent = (
    <div>
      {type === "student" && (
        <div className="border-b mt-5 pb-4">
          <div className="px-2 medium-18">Invite URL</div>
          <div className="flex items-center justify-centergap-2 px-2 overflow-auto">
            <span className="text-sm truncate">{`https://classroom.google.com/c/NjQyODI3NTAwODY2?cjc=sjbguhz`}</span>
            <div>
              <div className="flex items-center justify-center text-blue-600 cursor-pointer h-12 w-12 rounded-full hover:bg-gray-500/20 mx-2 transition-all z-50">
                <ContentCopyIcon sx={{ fontSize: 20 }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="my-2 max-h-36 overflow-y-auto hide-scrollbar">
        <div className="flex flex-wrap gap-2 p-1">
          <div className="flex items-center gap-2 border-2 rounded-full pl-[1.2px]">
            <AvatarCustom
              name={"hhman"}
              classroomAvatar={false}
              height={30}
              width={30}
              fontSize={16}
            />
            <div>{"hhman240602@gmail.com"}</div>
            <div className="text-xl pr-2 cursor-pointer pb-1">x</div>
          </div>
          <div className="flex items-center gap-2 border-2 rounded-full pl-[1.2px]">
            <AvatarCustom
              name={"hhman"}
              classroomAvatar={false}
              height={30}
              width={30}
              fontSize={16}
            />
            <div>{"hhman240602@gmail.com"}</div>
            <div className="text-xl pr-2 cursor-pointer pb-1">x</div>
          </div>
          <div className="flex flex-grow max-w-fit items-center gap-2 border-2 rounded-full pl-[1.2px]">
            <AvatarCustom
              name={"hhman"}
              classroomAvatar={false}
              height={30}
              width={30}
              fontSize={16}
            />
            <div>{"hhma"}</div>
            <div
              className="text-xl pr-2 cursor-pointer pb-1"
              placeholder="enter email"
            >
              x
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const bodyContent = (
    <div
      className={`bg-white border-t border-b border-gray-500/20 overflow-y-auto hide-scrollbar max-h-56 `}
    >
      {userNotIn.length > 0 && (
        <ul className={`flex flex-col`}>
          {userNotIn.map((u, idx) => {
            return (
              <li
                className="flex items-center py-2 px-4 hover:bg-gray-500/20 space-x-6 cursor-pointer"
                key={idx}
                onClick={() => {}}
              >
                <AvatarCustom
                  name={u.username}
                  classroomAvatar={false}
                  height={38}
                  width={38}
                  fontSize={20}
                />
                <div>
                  <div className="whitespace-nowrap">{u.email}</div>
                  <div className="whitespace-nowrap text-sm text-gray-500">
                    {u.username}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  const footerContent = (
    <div className="mt-5 px-5 text-gray-500/80">
      Teachers can do everything except delete classes and invite
    </div>
  );

  return (
    <Modal
      title={`Invite ${label}`}
      disabled={isLoading}
      isOpen={isOpen}
      onClose={handleClose}
      header={headerContent}
      body={bodyContent}
      footer={type === "teacher" ? footerContent : <></>}
      labelSubmit="Invite"
      onSubmit={onSubmit}
      animationFirst="scale-100 opacity-100"
      animationSecond="scale-90 opacity-0"
      width="500px"
    />
  );
}

export default InvitePeopleModal;
