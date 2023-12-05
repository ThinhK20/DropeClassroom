import { useDispatch } from "react-redux";
import ReactPortalCustom from "../portal/ReactPortalCustom";
import { onOpenCreateClass } from "../../store/createClassSlice";
import { onOpenJoinClass } from "../../store/joinClassSlice";

interface PlusPopOverProps {
  isOpen: boolean;
}

function PlusPopOver({ isOpen }: PlusPopOverProps) {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <>
      <ReactPortalCustom wrapperId="react-portal-PopOver-container">
        <div className="fixed right-[148px] top-[44px] bg-white shadow-xl rounded-sm z-PopOver w-48">
          <ul className="flex flex-col gap-2 py-2">
            <li
              className="regular-20 inline-block hover:bg-gray-500/10 hover:text-black/70 px-4 py-2 cursor-pointer"
              onClick={() => dispatch(onOpenCreateClass())}
            >
              <span> Create class </span>
            </li>

            <li
              className="regular-20 inline-block hover:bg-gray-500/10 hover:text-black/70 px-4 py-2 cursor-pointer"
              onClick={() => dispatch(onOpenJoinClass())}
            >
              <span> Join class</span>
            </li>
          </ul>
        </div>
      </ReactPortalCustom>
    </>
  );
}

export default PlusPopOver;
