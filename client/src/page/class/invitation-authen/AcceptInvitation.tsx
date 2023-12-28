import AvatarCustom from "../../../components/avatar/AvatarCustom";
import { User } from "../../../models";

interface Props {
  user: User;
  action?: () => void;
}

function AcceptInvitation({
  user,
  action = () => {
    console.log("do it something");
  },
}: Props) {
  return (
    <div className="w-full h-full flex flex-col flex-1 items-start pt-16 px-2 xl:px-28">
      <div className="w-full flex justify-center">
        <div className="w-[600px] h-[500px] border overflow-hidden rounded-lg shadow-lg">
          <div className="bg-gray-500/10 h-3/5 flex flex-col items-center justify-center">
            <img
              src="/src/assets/invite2.png"
              className="w-[350px] object-cover"
            />
            <div className="whitespace-nowrap flex gap-2 my-2">
              <h1 className="text-3xl font-[600]">Drope</h1>
              <h1 className="text-3xl font-[500] text-gray-500">
                {" "}
                Classrooms{" "}
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center text-gray-500">
              <p>
                Classroom help classes communicate, save time, and stay
                organized
              </p>
              <p className="text-blue-600 cursor-pointer underline">
                Learn more
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-4 border p-2 truncate my-4">
              <AvatarCustom
                classroomAvatar={false}
                name={user.username}
                url={""}
                height={50}
                width={50}
              />
              <div className="truncate max-w-[120px]">
                <span className="font-[500]">{user.username}</span>
                <p className="truncate text-sm text-gray-500/80">
                  {user.email}
                </p>
              </div>
              <div className="flex items-center text-xl transition-all rotate-90 cursor-pointer">
                {`>`}
              </div>
            </div>
            <span className="text-xs">
              You are joining the class as a student
            </span>
            <button
              className="px-4 py-2 border bg-blue-600 medium-18 text-white rounded-md text-center my-4 focus:bg-blue-800 hover:bg-blue-700"
              onClick={() => {
                action();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcceptInvitation;
