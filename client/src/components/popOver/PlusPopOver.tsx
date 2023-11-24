import ReactPortalCustom from "../portal/ReactPortalCustom";

interface PlusPopOverProps {
  isOpen: boolean;
  toggleCreate?: () => void;
  toggleJoin?: () => void;
}

function PlusPopOver({ isOpen, toggleCreate, toggleJoin }: PlusPopOverProps) {
  console.log("rendering Plus Poover");

  if (typeof document === "undefined") return null;
  if (!isOpen) return null;

  return (
    <>
      <ReactPortalCustom wrapperId="react-portal-PopOver-container">
        <div className="fixed right-[148px] top-[44px] bg-white shadow-xl rounded-sm z-PopOver w-48">
          <ul className="flex flex-col gap-2 py-2">
            <li
              className="regular-20 inline-block hover:bg-gray-500/10 hover:text-black/70 px-4 py-2 cursor-pointer"
              onClick={toggleCreate}
            >
              <span> Create class </span>
            </li>

            <li
              className="regular-20 inline-block hover:bg-gray-500/10 hover:text-black/70 px-4 py-2 cursor-pointer"
              onClick={toggleJoin}
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
