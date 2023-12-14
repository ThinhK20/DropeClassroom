import { ObjectUser } from "../../models";
import AvatarCustom from "../avatar/AvatarCustom";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

interface Props {
  user: ObjectUser;
  removePeople: (u: ObjectUser) => void;
}

function PeopleBox({ user, removePeople }: Props) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6 px-4 py-2">
          <AvatarCustom
            name={user.userId.username}
            classroomAvatar={false}
            height={38}
            width={38}
            fontSize={20}
          />
          <div>{user.userId.username}</div>
        </div>
        <div className="flex items-center py-2">
          <button
            className={`mr-2 w-11 h-11 rounded-full hover:bg-gray-500/20 ${
              user.role === "owner" ? "hidden" : "flex"
            } items-center justify-center`}
          >
            <MailOutlineOutlinedIcon />
          </button>
          <button
            className={`mr-2 w-11 h-11 rounded-full text-3xl hover:bg-gray-500/20 ${
              user.role === "owner" ? "hidden" : "flex"
            } items-center justify-center pb-1`}
            onClick={() => removePeople(user)}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
}

export default PeopleBox;
