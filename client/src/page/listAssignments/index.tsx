import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

interface Assignment {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  course: string;
}

const assignments: Assignment[] = [
  {
    id: 1,
    name: "Assignment 1",
    description: "Assignment 1 description",
    dueDate: new Date(),
    course: "Course 1",
  },
  {
    id: 2,
    name: "Assignment 2",
    description: "Assignment 2 description",
    dueDate: new Date(),
    course: "Course 2",
  },
  {
    id: 3,
    name: "Assignment 3",
    description: "Assignment 3 description",
    dueDate: new Date(),
    course: "Course 3",
  },
  {
    id: 4,
    name: "Assignment 4",
    description: "Assignment 4 description",
    dueDate: new Date(),
    course: "Course 4",
  },
  {
    id: 5,
    name: "Assignment 5",
    description: "Assignment 5 description",
    dueDate: new Date(),
    course: "Course 5",
  },
  {
    id: 6,
    name: "Assignment 6",
    description: "Assignment 6 description",
    dueDate: new Date(),
    course: "Course 6",
  },
];

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ListAssignments() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Assignments
      </Typography>
      {assignments.map((assignment) => (
        <Demo>
          <List dense={dense}>
            {generate(
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={assignment.name}
                  secondary={secondary ? "Secondary text" : null}
                />
                <ListItemText
                  primary={assignment.course}
                  secondary={secondary ? "Secondary text" : null}
                />
                <ListItemText
                  primary={assignment.dueDate.toString()}
                  secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            )}
          </List>
        </Demo>
      ))}
    </div>
  );
}
