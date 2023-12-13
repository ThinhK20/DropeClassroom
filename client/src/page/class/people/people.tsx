import AvatarCustom from "../../../components/avatar/AvatarCustom";
import { User } from "../../../models";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
function People() {
  const user: User = {
    _id: "6566115223c81cf1bc4e7f15",
    username: "Minh An",
    email: "anhoang483@gmail.com",
    isActive: true,
    gender: "m",
    role: "admin",
    createdDate: "2023-11-28T16:11:01.769Z",
    updatedDate: "2023-11-28T16:11:01.769Z",
  };
  return (
    <div className="w-full h-full flex flex-col flex-1 items-start overflow-hidden pt-5 px-2 xl:px-44 ">
      {/* Teacher */}
      <div className="w-full flex justify-between items-center border-b-2 border-blue-600 mt-10">
        <p className="text-blue-600 medium-32 ml-2 mb-4">Teachers</p>
        <button className="mr-2 w-11 h-11  rounded-full text-blue-600 text-3xl hover:bg-blue-50 flex items-center justify-center">
          <PersonAddAltOutlinedIcon />
        </button>
      </div>

      <div className="w-full divide-y flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6 px-4">
            <AvatarCustom
              name={user.username}
              classroomAvatar={false}
              height={38}
              width={38}
              fontSize={20}
            />
            <div>{user.username}</div>
          </div>
          <div className="flex items-center py-2">
            <button className="mr-2 w-11 h-11 rounded-full hover:bg-gray-500/20 flex items-center justify-center pb-1">
              <MailOutlineOutlinedIcon />
            </button>
            <button className="mr-2 w-11 h-11 rounded-full text-3xl hover:bg-gray-500/20 flex items-center justify-center pb-1">
              -
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6 px-4">
            <AvatarCustom
              name={user.username}
              classroomAvatar={true}
              height={38}
              width={38}
              url="/src/assets/testimonial-03.jpg"
              fontSize={20}
            />
            <div>{user.username}</div>
          </div>
          <div className="flex items-center py-2">
            <button className="mr-2 w-11 h-11 rounded-full hover:bg-gray-500/20 flex items-center justify-center pb-1">
              <MailOutlineOutlinedIcon />
            </button>
            <button className="mr-2 w-11 h-11 rounded-full text-3xl hover:bg-gray-500/20 flex items-center justify-center pb-1">
              -
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center border-b-2 border-blue-600 mt-10">
        <p className="text-blue-600 medium-32 ml-2 mb-4">Students</p>

        <div className="flex items-center gap-4">
          <p className="text-blue-600 medium-14 pr-2">{`${78} students`}</p>
          <button className="mr-2 w-11 h-11  rounded-full text-blue-600 text-3xl hover:bg-blue-50 flex items-center justify-center">
            <PersonAddAltOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default People;
