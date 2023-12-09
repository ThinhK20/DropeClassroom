import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddIcon from '@mui/icons-material/Add';
import { TransitionProps } from "@mui/material/transitions";

import { Assignment } from "../../helper/assignment_helper";

import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAssignmentModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [assignmentName, setAssignmentName] = React.useState("");
  const [assignmentDescription, setAssignmentDescription] = React.useState("");

  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  const newAssignment: Assignment = {
    _id: Object(),
    assignmentName: assignmentName,
    assignmentDescription: assignmentDescription,
    // assignmentDueDate: new Date().getTime(),
    assignmentStatus: "",
    assignmentCreatedBy: "",
    assignmentUpdatedBy: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    assignmentGrade: 0,
    assignmentGradeComment: "",
    assignmentPercentage: 0,
    assignmentClassId: currentClass?.classId._id as string,
  };

  const createAssignment = async (assignment: Assignment) => {
    await fetch("http://localhost:8000/assignment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignment),
    })
      .then((res: any) => {
        return res.json();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpen} startIcon={<AddIcon />} sx={{borderRadius: `60px`, padding: `20px`}}>
        Create Assignment
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
              Create Assignment
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                createAssignment(newAssignment);
                props.onClose();
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
          <div
            className="max-w-md mx-auto"
            style={{
              marginTop: "5%",
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Assignment Name</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Assignment Name"
                  onChange={(e) => setAssignmentName(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Assignment Description</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Assignment Description"
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                />
              </label>
            </div>
          </div>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
