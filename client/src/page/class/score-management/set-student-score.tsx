/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
   getStudentAssignmentById,
   updateStudentAssignmentApi,
} from "../../../apis/studentAssignmentApis";
import { toast } from "react-toastify";

type Props = {
   id: string;
};

export default function SetStudentScore(props: Props) {
   const [open, setOpen] = useState(false);
   const [student, setStudent] = useState<any>();
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleSubmit = () => {
      updateStudentAssignmentApi(student._id, student)
         .then(() => {
            toast.success("Updated successfully.");
         })
         .catch((err) => toast.error(err))
         .finally(() => handleClose());
   };

   useEffect(() => {
      getStudentAssignmentById(props.id)
         .then((res) => {
            setStudent(res.data);
         })
         .catch((err) => console.log("Error: ", err));
   }, []);

   function handleChangeScore(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) {
      setStudent({ ...student, grade: e.target.value });
   }

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
                  <Typography>{student?.studentId?.username}</Typography>
                  <TextField
                     type="number"
                     value={student?.grade}
                     onChange={handleChangeScore}
                  ></TextField>
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
