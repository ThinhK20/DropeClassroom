import { User } from "../../models/User";
import Logo from "./Logo";
import PlusButton from "./button/PlusButton";
import SideBarButton from "./button/SideBarButton";
import CurrentClassHeading from "./HeaderHeading";
import FunctionButton from "./button/FunctionButton";
import AvatarButton from "./button/AvatarButton";
import { useMatches } from "react-router-dom";
import { HeadingName } from "../../shared/type/types";


interface Props {
  user: User;
  handleToggle: () => void;
}

function Header({
  user,
  handleToggle,
}: Props) {
  // console.log("Rendering header");
  
  const [url] = useMatches();
  const headingName = ():HeadingName => {

    if(Number(url.id) === 2) return {name: "Schedule", title: undefined};
    if(Number(url.id) === 3) return {name: "Archived", title: undefined};
    if(Number(url.id) === 4) return {name: "Setting", title: undefined};

    return {name: undefined, title: undefined};
  }
  
  return (
    <header className="relative md:sticky md:top-0 md:left-0 z-header flex flex-row items-center justify-between h-16 md:w-full border-b transition-all border-gray-200 bg-white py-3 px-4">
      {/* Half Left */}
      <div className="w-1/2 flex items-center gap-4">
        {/* button sidebar */}
        <SideBarButton actionHandleToggle={handleToggle} />
        {/* logo */}
        <Logo />
        {/* Current Class */}
        <CurrentClassHeading  name={headingName().name} title={headingName().title}/>
      </div>

      {/* Half Right */}
      <div className="w-1/2 flex items-center justify-end gap-1 md:gap-5">
        {/* create class */}

        <PlusButton />
 
        {/* other funciton */}
        <FunctionButton />

        {/* avatar */}
        <AvatarButton {...user} />
      </div>
    </header>
  );
}

export default Header;
