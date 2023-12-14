import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function SetStudentScore() {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleSubmit = () => {
      handleClose();
   };
   return (
      <>
         <button onClick={handleOpen}>Set student score</button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className="bg-white top-1/3 left-1/2 -translate-x-1/2 p-6 rounded-xl absolute">
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Submit the student assignment's score ?
               </Typography>
               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Student will be received notifications and can be check the
                  assignment's score.
               </Typography>
               <div className="flex items-center gap-4 pt-4">
                  <Typography>Thinh Nguyen</Typography>
                  <TextField type="number" value={0}></TextField>
               </div>
               <div className="pt-4 flex justify-end gap-4">
                  <Button variant="text" onClick={handleClose}>
                     Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSubmit}>
                     Submit
                  </Button>
               </div>
            </Box>
         </Modal>
      </>
   );
}
