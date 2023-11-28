import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useEffect, useRef, useState } from "react";

function ClassCardDropDown() {
  const [isDropDown, setIsDropDown] = useState(false);

  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutPopover(this: Document, ev: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        setIsDropDown(false);
      }
    }

    document.addEventListener("click", handleClickOutPopover);

    return () => {
      document.removeEventListener("click", handleClickOutPopover);
    };
  }, [isDropDown]);

  return (
    <div className="relative" ref={nodeRef}>
      <button
        className="w-12 h-12 hover:bg-gray-500/40 rounded-full focus:bg-gray-500/50"
        onClick={() => setIsDropDown(!isDropDown)}
      >
        <MoreVertOutlinedIcon sx={{ fontSize: 28 }} className="text-white" />
      </button>

      <div
        className={`absolute transition duration-200 ${
          isDropDown ? "opacity-100" : "opacity-0"
        } bg-white z-[99] rounded shadow-lg top-12 -left-32`}
      >
        <ul className="flex flex-col py-2">
          <li className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10">
            Copy URL Invitation
          </li>
          <li className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10">
            Adjusting
          </li>
          <li className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10">
            Achieved
          </li>
          <li className="whitespace-nowrap py-2 px-4 hover:bg-gray-500/10">
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ClassCardDropDown;
