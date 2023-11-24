import { useEffect, useRef, useState } from "react";
import PlusPopOver from "../../popOver/PlusPopOver";

interface Props {
  actionCreateClass?: () => void;
  actionJoinedClass?: () => void;
}

function PlusButton({ actionCreateClass, actionJoinedClass }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  console.log("rendering Plus Button");

  const nodeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutPopover(this: Document, ev: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutPopover);

    return () => {
      document.removeEventListener("click", handleClickOutPopover);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className=" text-black/50 hover:bg-gray-500/10 hover:text-black/70 cursor-pointer focus:bg-gray-500/20 focus:text-black/80 flex items-center justify-center w-11 h-11 rounded-full regular-40 pb-2"
        onClick={() => setIsOpen(!isOpen)}
        ref={nodeRef}
      >
        +
      </button>

      {isOpen && (
        <PlusPopOver
          isOpen={isOpen}
          toggleCreate={actionCreateClass}
          toggleJoin={actionJoinedClass}
        />
      )}
    </div>
  );
}

export default PlusButton;
