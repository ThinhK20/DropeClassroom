import Modal from "./Modal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { User } from "../../models";
import AvatarCustom from "../avatar/AvatarCustom";
import Avatar from "@mui/material/Avatar";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";
import { useAppSelector } from "../../hooks/hooks";

interface Props {
  userNotIn: User[];
  label?: string;
  isOpen: boolean;
  type?: "student" | "teacher";
  handleClose: () => void;
  handleInvite: (u: User[], role: "teacher" | "student") => void;
}

function InvitePeopleModal({
  userNotIn,
  label = "Teacher",
  isOpen = false,
  type = "teacher",
  handleClose,
  handleInvite,
}: Props) {
  const clr = useAppSelector((state) => state.userClassroom.currentClass);
  const [chooseUser, setListChooseUser] = useState<User[]>([]);
  const [isChoose, setIsChoose] = useState<boolean[]>([]);

  useEffect(() => {
    setIsChoose(Array(userNotIn.length).fill(false));

    return () => {
      setIsChoose(Array(userNotIn.length).fill(false));
    };
  }, [userNotIn]);

  const onSubmit = async () => {
    if (chooseUser.length < 1) return;
    handleInvite(chooseUser, type);
    setIsChoose(Array(userNotIn.length).fill(false));
    handleClose();
  };

  const headerContent = (
    <div>
      {type === "student" && (
        <div className="border-b mt-5 pb-4">
          <div className="px-2 medium-18">Invite URL</div>
          <div className="flex items-center justify-centergap-2 px-2 overflow-auto">
            <span className="text-sm truncate">
              {import.meta.env.VITE_CLIENT_URL + "/" + clr?.classId.inviteLink + '&role=student'}
            </span>
            <div>
              <div
                className="flex items-center justify-center text-blue-600 cursor-pointer h-12 w-12 rounded-full hover:bg-gray-500/20 mx-2 transition-all z-50"
                onClick={() => {
                  navigator.clipboard.writeText(
                    import.meta.env.VITE_CLIENT_URL +
                      "/" +
                      clr?.classId.inviteLink + '&role=student'
                  );
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 20 }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="my-2 max-h-36 overflow-y-auto hide-scrollbar">
        <div className="flex flex-wrap gap-2 p-1">
          {chooseUser.length > 0 ? (
            chooseUser.map((u, idx) => {
              return (
                <div
                  className="flex items-center gap-2 border-2 rounded-full pl-[1.2px]"
                  key={idx}
                >
                  <AvatarCustom
                    name={u.username}
                    classroomAvatar={false}
                    height={30}
                    width={30}
                    fontSize={16}
                  />
                  <div>{u.email}</div>
                  <div
                    className="text-xl pr-2 cursor-pointer pb-1"
                    onClick={() => {
                      const updateChooseUser = chooseUser.filter(
                        (user) => user._id.toString() !== u._id.toString()
                      );
                      setListChooseUser(updateChooseUser);
                      const newState = [...isChoose];
                      newState[idx] = false;
                      setIsChoose(newState);
                    }}
                  >
                    x
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
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
                onClick={() => {
                  const res = chooseUser.includes(u);
                  if (!res) {
                    setListChooseUser([...chooseUser, u]);
                    const newState = [...isChoose];
                    newState[idx] = true;
                    setIsChoose(newState);
                  }
                }}
              >
                {isChoose[idx] ? (
                  <Avatar sx={{ bgcolor: blue[500], height: 38, width: 38 }}>
                    <CheckOutlinedIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                ) : (
                  <AvatarCustom
                    name={u.username}
                    classroomAvatar={false}
                    height={38}
                    width={38}
                    fontSize={20}
                  />
                )}

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
    <div className="mt-5 px-5 text-gray-500/80 text-center">
      Teachers can do everything except delete classes and invite
    </div>
  );

  return (
    <Modal
      title={`Invite ${label}`}
      isOpen={isOpen}
      onClose={() => {
        handleClose();
        setListChooseUser([]);
        setIsChoose(Array(userNotIn.length).fill(false));
      }}
      header={headerContent}
      body={bodyContent}
      footer={type === "teacher" ? footerContent : <></>}
      labelSubmit="Invite"
      onSubmit={onSubmit}
      animationFirst="scale-100 opacity-100"
      animationSecond="scale-90 opacity-0"
      width="400px"
    />
  );
}

export default InvitePeopleModal;
