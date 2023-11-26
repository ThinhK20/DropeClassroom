import { useCallback, useEffect, useState } from "react";

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  header?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

function Modal({
  isOpen,
  title,
  onClose,
  onSubmit,
  header,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      console.log("close modal");
      if(onClose) onClose();
    }, 300);
  }, [onClose, disabled]);

  console.log("show model", showModal);
  console.log("is open", isOpen);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen z-modal-bg bg-neutral-800 opacity-50" />
      <div className="fixed inset-0 z-modal flex items-center justify-center">
        <div
          className={`relative shrink w-4/12 bg-white rounded-lg shadow-sm flex flex-col ${
            showModal ? "animation-fade-out" : "animation-fade-in"
          } ml-20 p-4`}
        >
          <div className="w-full flex justify-between">
            <h1 className="medium-20">{title}</h1>
            <button
              className="text-xl h-5 w-5 rounded-full"
              onClick={handleClose}
            >
              x
            </button>
          </div>

          {/* Header */}
          {header}

          {/* Body */}
          {body}

          {/* Footer */}
          {footer}
        </div>
      </div>
    </>
  );
}

export default Modal;
