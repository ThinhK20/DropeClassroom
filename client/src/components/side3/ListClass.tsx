import { useNavigate } from "react-router-dom";
import { ObjectUserClassRoom } from "../../models";
import SideBarItem from "./SideBarItem";
import AvatarCustom from "../avatar/AvatarCustom";
import { SideNavItem } from "../../shared/type/types";
import { useAppDispatch } from "../../hooks/hooks";
import { setCurrentClass } from "../../store/userClassroomSlice";

function ListClass({
  classes,
  name,
  icon,
}: {
  classes: ObjectUserClassRoom[];
  name: string;
  icon: JSX.Element;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (classes.length == 0) return <></>;

  return (
    <>
      <SideBarItem
        item={
          {
            name: name,
            icon: icon,
            submenu: true,
          } as SideNavItem
        }
      >
        {classes.map((c, id) => {
          return (
            <SideBarItem
              key={id}
              item={
                {
                  name: c.classId.className,
                  title: c.classId.section,
                  icon: (
                    <AvatarCustom
                      name={c.classId.className}
                      classroomAvatar={true}
                    />
                  ),
                  path: "/c/" + c.classId._id,
                  actionGoDo: () => {
                    navigate("/c/" + c.classId._id);
                    dispatch(setCurrentClass(c));
                  },
                  submenu: false,
                } as SideNavItem
              }
            />
          );
        })}
      </SideBarItem>
    </>
  );
}

export default ListClass;
