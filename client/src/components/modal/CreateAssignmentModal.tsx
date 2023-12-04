import React from "react";

import { Assignment } from "../../helper/assignment_helper";

import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { CalendarViewMonth } from "@mui/icons-material";

const style = {
  width: "600px",
  height: "350px",
  bgcolor: "background.paper",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "5%",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateAssignmentModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [assignmentName, setAssignmentName] = React.useState("");
  const [assignmentDescription, setAssignmentDescription] = React.useState("");

  const randomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const newAssignment: Assignment = {
    assignmentId: randomId(),
    assignmentName: assignmentName,
    assignmentDescription: assignmentDescription,
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
    <div>
      <Modal
        open={props.isOpen}
        onClose={() => props.onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Assignment
          </Typography>
          <TextField
            id="outlined-basic"
            label="Assignment Name"
            variant="outlined"
            style={{ width: "100%", marginTop: "5%" }}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Assignment Description"
            variant="outlined"
            style={{ width: "100%", marginTop: "5%" }}
            onChange={(e) => setAssignmentDescription(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              style={{ width: "100%", marginTop: "5%" }}
              onClick={() => {
                createAssignment(newAssignment);
                props.onClose();
              }}
            >
              Create
            </Button>
            <Button
              variant="contained"
              style={{ width: "100%", marginTop: "5%", marginLeft: "5%" }}
              onClick={() => props.onClose()}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
