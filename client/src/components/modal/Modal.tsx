import { useCallback, useEffect, useRef, useState } from "react";
import ReactPortalCustom from "../portal/ReactPortalCustom";

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  onClose: () => void;
  labelSubmit: string;
  onSubmit: () => void;
  header?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  animationFirst?: string;
  animationSecond?: string;
  width?: string;
}

function Modal({
  isOpen,
  title,
  onClose,
  labelSubmit,
  onSubmit,
  header,
  body,
  footer,
  disabled,  
  animationFirst =  'translate-y-0 opacity-100',
  animationSecond = 'translate-y-full opacity-0',
  width = `500px`
}: ModalProps) {

  const [showModal, setShowModal] = useState(isOpen);

  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOut(this: Document, ev: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        handleClose();
      }
    }

    if (showModal) document.addEventListener("click", handleClickOut);

    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  });

  // disable scroll on modal load
  useEffect(() => {
    if (!showModal) document.body.style.overflow = "unset";
    else document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  });

  // close modal on click out screen
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      e.key === "Escape" ? handleClose() : null;
    };

    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  });

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) return null;

  return (
    <ReactPortalCustom wrapperId="react-portal-create-modal-container">
      <div className="fixed inset-0 w-screen h-screen z-modal-bg bg-neutral-800 opacity-70" />
      <div className="fixed inset-0 z-modal flex items-center justify-center">
        <div
          ref={nodeRef}
          className={`relative w-[${width}] bg-white rounded-lg shadow-sm flex flex-col transition-all duration-300 ${
            showModal ? animationFirst : animationSecond
          } ml-20 p-4`}
        >
          <div className="w-full flex justify-between">
            <h1 className="medium-20">{title}</h1>
          </div>

          {/* Header */}
          {header}

          {/* Body */}
          {body}

          {/* Footer */}
          {footer}

          <div className="flex justify-end items-center pt-4">
            <button className="boder-none w-[90px] h-10 hover:bg-blue-600/5 hover:text-blue-600 rounded"
                    onClick={handleSubmit}>
              <h2 className="regular-18">{labelSubmit}</h2>
            </button>
            <button
              className="boder-none w-[90px] h-10 hover:bg-blue-600/5 hover:text-blue-600 rounded"
              onClick={handleClose}
            >
              <h2 className="regular-18">Cancel</h2>
            </button>
          </div>

        </div>
      </div>
    </ReactPortalCustom>
  );
}

export default Modal;
