import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { TransitionProps } from "@mui/material/transitions";

import { Assignment } from "../../helper/assignment_helper";

import { Box, Button, Typography } from "@mui/material";
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
  Assignment: Assignment;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{
          border: "0px solid #3f51b5",
        }}
      >
        {props.Assignment.assignmentName}
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
              {props.Assignment.assignmentName}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                handleClose();
              }}
            >
              Update
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
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Assignment Description</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Assignment Description"
                />
              </label>
            </div>
          </div>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
