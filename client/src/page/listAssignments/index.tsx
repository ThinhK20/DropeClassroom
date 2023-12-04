import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CreateAssignmentModal from "../../components/modal/CreateAssignmentModal";
import { Assignment } from "../../helper/assignment_helper";

export default function ListAssignments() {
  const [showModal, setShowModal] = React.useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const getAllAssignments = async () => {
    await fetch("http://localhost:8000/assignment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then((data: Assignment[]) => {
        setAssignments(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllAssignments();
  }, []);

  const AssignmentList = () => {
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {assignments.map((assignment: Assignment) => {
          return (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={assignment.assignmentName}
                secondary={assignment.assignmentDescription}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={async () => {
                  await fetch(
                    `http://localhost:8000/assignment/${assignment.assignmentId}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res: any) => res.json())
                    .then((data: Assignment[]) => {
                      getAllAssignments();
                    })
                    .catch((err: any) => {
                      console.log(err);
                    });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <>
      <CreateAssignmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div>
        <div
          className="flex flex-row"
          style={{
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Assignments
          </Typography>
          <button onClick={() => setShowModal(true)}>
            <AssignmentIcon />
          </button>
        </div>
        <AssignmentList />
      </div>
    </>
  );
}
