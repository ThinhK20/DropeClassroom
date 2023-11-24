import { useEffect } from "react";
import ReactPortalCustom from "../portal/ReactPortalCustom";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

function CreateClassModal({ children, isOpen, handleClose }: Props) {
  // close modal on click out screen
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      e.key === "Escape" ? handleClose() : null;
    };

    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  // disable scroll on modal load
  useEffect(() => {
    document.body.style.overflow = "hidden";
    console.log("document.body.style.overflow = 'hidden'");
    return () => {
      document.body.style.overflow = "unset";
      console.log("document.body.style.overflow = 'unset'");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortalCustom wrapperId="react-portal-modal-container">
      <>
        <div className="fixed top-0 left-0 w-screen h-screen z-modal-bg bg-neutral-800 opacity-50" />
        <div className="fixed z-modal rounded min-w-fit box-border inset-y-32 inset-x-32 p-5 overflow-hidden flex flex-col animation-fade-out">
          <button
            onClick={handleClose}
            className="py-2 px-8 self-end font-bold hover:bg-violet-800 border rounded"
          >
            x
          </button>
          <div className="box-border h-5/6">{children}</div>
        </div>
      </>
    </ReactPortalCustom>
  );
}

export default CreateClassModal;
