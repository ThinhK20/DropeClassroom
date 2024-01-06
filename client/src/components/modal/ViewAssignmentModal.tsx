import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import { Assignment } from "../../models";

import { Box, Button, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewAssigmentModal(props: {
   isOpen: boolean;
   onClose: () => void;
   assignment: Assignment;
   role?: string;
   title?: string;
}) {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <React.Fragment>
         {props.title ? (
            <Button
               variant="text"
               color="inherit"
               className="w-fit text-gray-400"
               onClick={handleOpen}
            >
               {props.title}
            </Button>
         ) : (
            <Button
               variant="outlined"
               onClick={handleOpen}
               style={{
                  border: "0px solid #3f51b5",
               }}
            >
               {props.assignment.assignmentName}
            </Button>
         )}
         <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
         >
            <AppBar sx={{ position: "relative" }}>
               <Toolbar>
                  <IconButton
                     edge="start"
                     color="inherit"
                     onClick={handleClose}
                     aria-label="close"
                  >
                     <CloseIcon />
                  </IconButton>
                  <Typography
                     sx={{ ml: 2, flex: 1 }}
                     variant="h6"
                     component="div"
                  >
                     {props.assignment.assignmentName}
                  </Typography>
                  <Button
                     autoFocus
                     color="inherit"
                     onClick={() => {
                        handleClose();
                     }}
                  >
                     Close
                  </Button>
               </Toolbar>
            </AppBar>
            <Box>
               <div
                  className="w-full h-full flex flex-col flex-1 items-start overflow-hidden pt-5 px-2 xl:px-28"
                  style={{
                     marginBottom: 20,
                  }}
               >
                  <div
                     className="flex items-center w-full"
                     style={{
                        marginTop: 50,
                     }}
                  ></div>
                  <div className="my-5"></div>
                  <div
                     className="w-full border-b-2 border-blue-600"
                     style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                     }}
                  >
                     <span className="medium-32 text-blue-600">
                        {props.assignment.assignmentName}
                     </span>
                     <span className="text-black ml-3">
                        {props.assignment.assignmentDueDate}
                     </span>
                  </div>
                  <div className="my-5">
                     <span className="text-black ml-3 font-bold">
                        {props.assignment.assignmentCreatedBy}
                     </span>
                  </div>
                  <div className="my-3">
                     <span className="text-green-600 ml-3">
                        Maximum: {props.assignment.assignmentGrade} marks
                     </span>
                  </div>
                  <span className="text-black ml-3">
                     {props.assignment.assignmentDescription}
                  </span>
               </div>
            </Box>
         </Dialog>
      </React.Fragment>
   );
}
