import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { TransitionProps } from "@mui/material/transitions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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
import { Edit } from "@mui/icons-material";

const updateAssignment = async (assignment: Assignment) => {
  await fetch(`http://localhost:8000/assignment/${assignment._id}`, {
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateAssignmentModal(props: {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [assignment, setAssignment] = React.useState({
    ...props.assignment,
  });

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
      <Button onClick={handleOpen}>
        <Edit
          style={{
            border: "0px solid #3f51b5",
          }}
        />
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
              Update Assignment {assignment.assignmentName}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                updateAssignment(assignment);
                handleClose();
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 10,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Assignment Name"
            variant="outlined"
            sx={{ width: 700, mb: 3 }}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                assignmentName: e.target.value,
              })
            }
          />
          <textarea
            x-data="autoGrow()"
            name="message"
            placeholder="Assignment Description"
            className="flex h-auto min-h-[80px] px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) =>
              setAssignment({
                ...assignment,
                assignmentDescription: e.target.value,
              })
            }
            style={{ width: 700, marginBottom: 20, height: 400 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              ml: 10,
              mr: 10,
            }}
          >
            <TextField
              id="datetime-local"
              label="Due Date"
              type="datetime-local"
              defaultValue={new Date().toISOString().slice(0, 16)}
              sx={{ width: 300, mb: 3 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  assignmentDueDate: e.target.value,
                })
              }
              style={{
                marginRight: 100,
              }}
            />

            <TextField
              id="outlined-basic"
              label="Percentage"
              type="number"
              variant="outlined"
              sx={{ width: 300, mb: 3 }}
              defaultValue={assignment.assignmentPercentage}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  assignmentPercentage: Number(e.target.value),
                })
              }
              style={{
                marginLeft: 5,
              }}
            />
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
