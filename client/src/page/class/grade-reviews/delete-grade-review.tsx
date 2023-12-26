/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Modal, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { GradeReview } from "../../../models/GradeReview";
import {
   deleteGradeReviewApi,
   getAllGradeReviewsByClassIdApi,
} from "../../../apis/gradeReviewsApis";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../hooks/hooks";
import { setGradeReviews } from "../../../store/gradeReviewsSlice";

interface Props {
   children?: React.ReactElement;
   gradeReview?: GradeReview;
}

export default function DeleteGradeReview(props: Props) {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const dispatch = useAppDispatch();

   const handleSubmit = () => {
      if (!props.gradeReview) return;
      deleteGradeReviewApi(props.gradeReview?._id)
         .then(() => {
            toast.success("Delete successfully.");
            fetchGradeReviewsApi();
         })
         .catch((err) => toast.error(err))
         .finally(() => {
            handleClose();
         });
   };

   function getClassId() {
      const inputString = location.pathname;

      // Find the index of "/c/" and "/gb/"
      const startIndex = inputString.indexOf("/c/") + 3;
      const endIndex = inputString.indexOf("/gr/");

      // Extract the substring between the indices
      const result = inputString.slice(startIndex, endIndex);
      return result;
   }

   function fetchGradeReviewsApi() {
      getAllGradeReviewsByClassIdApi(getClassId()).then((res) => {
         dispatch(setGradeReviews(res.data));
      });
   }

   return (
      <>
         <Tooltip title="Delete a grade request">
            <div onClick={handleOpen}>{props.children}</div>
         </Tooltip>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box className="bg-white top-1/3 left-1/2 -translate-x-1/2 p-6 rounded-xl absolute">
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete this request ?
               </Typography>
               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  This action cannot be undone.
               </Typography>
               <div className="pt-4 flex justify-end gap-4">
                  <Button variant="text" onClick={handleClose}>
                     Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSubmit}>
                     Yes
                  </Button>
               </div>
            </Box>
         </Modal>
      </>
   );
}
