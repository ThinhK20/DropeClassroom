import ReactPortalCustom from "../portal/ReactPortalCustom";

interface FunctionProps {
  isOpen: boolean;
}

function FunctionDropDown({ isOpen }: FunctionProps) {
  if (!isOpen) return null;

  return (
    <ReactPortalCustom wrapperId="react-portal-drop-down-function-container">
      <div className="fixed  w-96 h-[500px] right-[79px] top-[64px] shadow-xl border z-PopOver rounded-3xl bg-blue-50 px-4 pt-4 overflow-x-hidden overflow-y-auto hide-scrollbar animation-translateFromX2Y">
        <div className="relative w-full h-full bg-white"></div>
      </div>
    </ReactPortalCustom>
  );
}

export default FunctionDropDown;
