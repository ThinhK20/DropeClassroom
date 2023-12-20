import { List, ListItem, ListItemAvatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import CreateAssignmentModal from "../../components/modal/CreateAssignmentModal";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Assignment } from "../../models";
import { useAppSelector } from "../../hooks/hooks";
import ViewAssigmentModal from "../../components/modal/ViewAssignmentModal";
import UpdateAssignmentModal from "../../components/modal/UpdateAssignmentModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
export default function ListAssignments() {
  const [showModal, setShowModal] = React.useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const navigate = useNavigate();

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

  const deleteAssignment = async (assignment: Assignment) => {
    await fetch(`http://localhost:8000/assignment/${assignment._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => {
        return res.json();
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

  const link = `/c/${currentClassId}`;

  const AssignmentList = () => {
    return (
      <List sx={{ bgcolor: "background.paper" }} className="w-full">
        {assignments.map(
          (assignment: Assignment) =>
            assignment.assignmentClassId === currentClassId && (
              <ListItem
                className="relative w-full border rounded-xl my-5"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <ListItemAvatar>
                  <div className="w-12 h-12 rounded-full bg-blue-600/90 flex justify-center items-center ml-5 mr-6 ">
                    <ClassOutlinedIcon
                      sx={{ fontSize: 32, color: "whitesmoke" }}
                    />
                  </div>
                </ListItemAvatar>
                {/* <ListItemText
                  primary={assignment.assignmentName}
                  secondary={assignment.assignmentDescription}
                /> */}
                <ViewAssigmentModal
                  assignment={assignment}
                  isOpen={showModal}
                  onClose={() => {
                    setShowModal(false);
                  }}
                  role={""}
                />
                <div className="absolute right-0 mr-3 w-11 h-11 flex row items-center rounded-full cursor-pointer">
                  <UpdateAssignmentModal
                    assignment={assignment}
                    isOpen={showModal}
                    onClose={() => {
                      setShowModal(false);
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      deleteAssignment(assignment);
                      window.location.reload();
                    }}
                  />
                </div>
              </ListItem>
            )
        )}
      </List>
    );
  };

  return (
    <>
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
        >
          <CreateAssignmentModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
        <div className="my-5"></div>
        <div className="w-full border-b-2 border-blue-600">
          <span className="medium-32 text-blue-600">Topic Of Assignment</span>
        </div>
        <AssignmentList />
      </div>
    </>
  );
}
