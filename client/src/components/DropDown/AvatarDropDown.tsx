import ReactPortalCustom from "../portal/ReactPortalCustom";

interface DropDownProps {
  isOpen: boolean;
}

function AvatarDropDown({ isOpen }: DropDownProps) {
  if (!isOpen) return null;

  return (
    <ReactPortalCustom wrapperId="react-portal-drop-down-Avatar-container">
      <div className="fixed w-[400px] h-[400px] right-[12px] top-[64px] shadow-xl border z-PopOver rounded-3xl bg-blue-50 px-4 pt-4 overflow-x-hidden overflow-y-auto hide-scrollbar animation-translateFromX2Y">
        
        <div>dafadsf</div>
        <div className="relative w-full h-full bg-white"></div>
      </div>
    </ReactPortalCustom>
  );
}

export default AvatarDropDown;
