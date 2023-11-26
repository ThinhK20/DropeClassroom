import { useEffect, useState } from "react";
import ReactPortalCustom from "../portal/ReactPortalCustom";
import { Container, Modal } from "@mui/material";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

function CreateClassModal({ isOpen, handleClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);


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
    <ReactPortalCustom wrapperId="react-portal-create-modal-container">
      <Container>
        
      </Container>
    </ReactPortalCustom>
  );
}

export default CreateClassModal;
