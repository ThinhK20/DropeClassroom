import { User } from "../../models/User";
import AvatarCustom from "../avatar/AvatarCustom";
import ReactPortalCustom from "../portal/ReactPortalCustom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAppDispatch } from "../../hooks/hooks";
import { setLogout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

interface DropDownProps {
   user: User;
   isOpen: boolean;
}

function AvatarDropDown({ user, isOpen }: DropDownProps) {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   if (!isOpen) return null;

   const logOutHandler = () => {
      dispatch(setLogout());
      navigate("/signin");
   };

   return (
      <ReactPortalCustom wrapperId="react-portal-drop-down-Avatar-container">
         <div className="fixed w-[400px] right-[12px] top-[64px] shadow-xl border z-PopOver rounded-3xl bg-blue-50 px-4 pt-4 overflow-hidden hide-scrollbar animation-translateFromX2Y flex flex-col">
            <div className="flex justify-center items-center">
               <p>{user.email}</p>
            </div>

            <div className="flex justify-center items-center pt-8">
               <AvatarCustom
                  name={user?.username}
                  classroomAvatar={false}
                  url={""}
                  width={80}
                  height={80}
                  fontSize={42}
               />
               <div className="absolute right-[158px] top-[129px] cursor-pointer">
                  <button className="w-7 h-7 rounded-full p-1 bg-white flex justify-center items-center hover:bg-blue-50 group">
                     <ModeEditOutlineOutlinedIcon
                        sx={{ fontSize: 18 }}
                        className="group-hover:text-blue-800"
                     />
                  </button>
               </div>
            </div>

            <div className="flex justify-center items-center pt-3">
               <h2 className="regular-24">{`Hello ${user.username},`}</h2>
            </div>

            <div className="w-full bg-white rounded-3xl my-3 flex flex-col divide-y-4 divide-blue-50">
               <button
                  onClick={logOutHandler}
                  className="flex gap-4 py-4 px-4 items-center flex-1 hover:bg-gray-500/20 rounded-3xl"
               >
                  <LogoutOutlinedIcon sx={{ fontSize: 32 }} />
                  <p className="text-2xl pb-1">Log out</p>
               </button>
            </div>
         </div>
      </ReactPortalCustom>
   );
}

export default AvatarDropDown;
