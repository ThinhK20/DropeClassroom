import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { TransitionProps } from "@mui/material/transitions";

import {
  convertDateToString,
  convertStringToDate,
} from "../../helper/assignment_helper";

import { Assignment } from "../../models";

import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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
  role: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  const updatedAssignment: Assignment = {
    _id: Object(),
    assignmentName: props.assignment.assignmentName,
    assignmentDescription: props.assignment.assignmentDescription,
    assignmentDueDate: props.assignment.assignmentDueDate,
    assignmentStatus: props.assignment.assignmentStatus,
    assignmentCreatedBy: props.assignment.assignmentCreatedBy,
    assignmentUpdatedBy: props.assignment.assignmentUpdatedBy,
    assignmentGrade: props.assignment.assignmentGrade,
    assignmentGradeComment: props.assignment.assignmentGradeComment,
    assignmentPercentage: props.assignment.assignmentPercentage,
    assignmentClassId: currentClass?.classId._id as string,
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{
          border: "0px solid #3f51b5",
        }}
      >
        {props.assignment.assignmentName}
      </Button>
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
            style={{
              paddingLeft: "30%",
              paddingRight: "30%",
              marginTop: "5%",
              marginBottom: "5%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AssignmentIcon />
              <Typography variant="h6" component="div">
                {props.assignment.assignmentName}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography component="div">
                {props.assignment.assignmentCreatedBy || "No one"}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginRight: "50px",
              }}
            >
              <CalendarTodayIcon />
              <Typography component="div">
                {convertDateToString(
                  convertStringToDate(props.assignment.assignmentDueDate)
                )}
              </Typography>
              <AssignmentTurnedInIcon />
              <Typography component="div">
                {props.assignment.assignmentStatus}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography component="div">
                {props.assignment.assignmentDescription}
              </Typography>
            </div>
          </div>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
