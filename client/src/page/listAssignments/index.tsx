import { List, ListItem, ListItemAvatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import CreateAssignmentModal from "../../components/modal/CreateAssignmentModal";
import { Assignment } from "../../helper/assignment_helper";
import { useAppSelector } from "../../hooks/hooks";

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

  const castObjectToString = (obj: any) => {
    const result = JSON.stringify(obj);
    return result.substring(1, result.length - 1);
  };

  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  const currentClassId = currentClass?.classId._id;

  const AssignmentList = () => {
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {assignments.map(
          (assignment: Assignment) =>
            assignment.assignmentClassId === currentClassId && (
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
              </ListItem>
            )
        )}
      </List>
    );
  };

  return (
    <>
      <div>
        <div className="flex flex-row">
          <CreateAssignmentModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
        <AssignmentList />
      </div>
    </>
  );
}
