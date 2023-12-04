import { useEffect, useRef, useState } from "react"
import FunctionDropDown from "../../DropDown/FunctionDropDown"
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';


function FunctionButton() {

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const nodeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutPopover(this: Document, ev: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        setIsOpenDropDown(false);
      }
    }

    document.addEventListener("click", handleClickOutPopover);

    return () => {
      document.removeEventListener("click", handleClickOutPopover);
    };
  }, [isOpenDropDown]);

  return (
    <>
      <button className="regular-20 text-black/50 pb-2 rounded-full hover:bg-gray-500/10 hover:text-black/70 cursor-pointer -ml-3 hidden md:block focus:bg-gray-500/40 items-center w-11 h-11 transition-all focus:rotate-6"
              onClick={() => setIsOpenDropDown(!isOpenDropDown)}
              ref={nodeRef}
      >
        <NotificationsNoneOutlinedIcon />
      </button>
      <FunctionDropDown isOpen={isOpenDropDown}/>
    </>

  )
}

export default FunctionButton