import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SideBarButton({actionHandleToggle}:{actionHandleToggle: () => void}) {  
  return (
    <div className="relative hidden md:block">
      <button
        className="bg-transparent border-none outline-none group  hover:bg-gray-400/10 flex items-center justify-center h-11 w-11 rounded-full"
        onClick={actionHandleToggle}
      >
        <FontAwesomeIcon icon={faBars} className="text-black/50 w-5 h-5" />
      </button>
    </div>
  );
}

export default SideBarButton;
