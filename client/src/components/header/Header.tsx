import { User } from "../../models/User";
import { ClassRoom } from "../../models/ClassRoom";
import Logo from "./Logo";
import PlusButton from "./button/PlusButton";
import SideBarButton from "./button/SideBarButton";
import CurrentClassHeading from "./CurrentClassHeading";
import FunctionButton from "./button/FunctionButton";
import AvatarButton from "./button/AvatarButton";

interface Props {
  user: User;
  currentClass: ClassRoom | null;
  showPlusButton: boolean;
  handleToggle: () => void;
  handleCreateClass?: () => void;
  handleJoinClass?: () => void;
}

function Header({
  user,
  currentClass,
  showPlusButton,
  handleCreateClass,
  handleJoinClass,
  handleToggle,
}: Props) {
  console.log("Rendering header");

  return (
    <header className="relative md:sticky md:top-0 md:left-0 z-header flex flex-row items-center justify-between h-16 md:w-full border-b border-btransition-all border-gray-200 bg-white py-3 px-4">
      {/* Half Left */}
      <div className="w-1/2 flex items-center gap-4">
        {/* button sidebar */}
        <SideBarButton actionHandleToggle={handleToggle} />
        {/* logo */}
        <Logo />
        {/* Current Class */}
        <CurrentClassHeading classroom={currentClass} />
      </div>

      {/* Half Right */}
      <div className="w-1/2 flex items-center justify-end gap-1 md:gap-5">
        {/* create class */}

        {showPlusButton && (
          <PlusButton
            actionCreateClass={handleCreateClass}
            actionJoinedClass={handleJoinClass}
          />
        )}

        {/* other funciton */}
        <FunctionButton />

        {/* avatar */}
        <AvatarButton {...user} />
      </div>
    </header>
  );
}

export default Header;
