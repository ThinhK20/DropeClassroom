/* eslint-disable @typescript-eslint/no-explicit-any */
import AutoFixNormalOutlinedIcon from "@mui/icons-material/AutoFixNormalOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import { useAppSelector } from "../../../hooks/hooks";
import { useEffect, useState } from "react";
import { Assignment } from "../../../models";
import { List, ListItem, ListItemAvatar } from "@mui/material";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import ClassCode from "../../../components/box/ClassCode";
import JoinClass from "../../../components/box/JoinClass";
import AsignmentComming from "../../../components/box/AsignmentComming";
import UpdateAssignmentModal from "../../../components/modal/UpdateAssignmentModal";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewAssigmentModal from "../../../components/modal/ViewAssignmentModal";
import React from "react";
import { BASE_API_URL } from "../../../apis/axiosInterceptor";
import { createNotification } from "../../../apis/notificationApis";

function Stream() {
  const [showModal, setShowModal] = React.useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const getAllAssignments = async () => {
    await fetch(`${BASE_API_URL}/assignment`, {
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

  const deleteAssignment = async (id: string) => {
    await fetch(`${BASE_API_URL}/assignment/${id}`, {
      method: "DELETE",
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

  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  const currentClassId = currentClass?.classId._id;

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
                {currentClass?.role !== "student" && (
                  <div className="absolute right-0 mr-3 cursor-pointer">
                    <UpdateAssignmentModal
                      assignment={assignment}
                      isOpen={showModal}
                      onClose={() => {
                        setShowModal(false);
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        createNotification({
                          title: "Assignment deleted",
                          content: `An assignment at ${currentClass?.classId.className} name ${assignment.assignmentName} has been deleted`,
                          classId: currentClass?.classId._id as string,
                          studentId: currentClass?.classId.owner._id as string,
                          link: `/c/${currentClass?.classId._id}/w/t/all`,
                        });
                        deleteAssignment(assignment._id);
                        window.location.reload();
                      }}
                    />
                  </div>
                )}
              </ListItem>
            )
        )}
      </List>
    );
  };

  return (
    <div className="w-full h-full flex flex-col flex-1 items-start overflow-hidden pt-16 px-2 xl:px-28 ">
      {/* cover image */}
      <div className="relative w-full h-60">
        <img
          src={currentClass?.classId.coverImage}
          className="relative w-full h-full object-cover rounded-xl"
        />
        <div className="absolute w-full h-full flex flex-col justify-between py-3 px-4 left-0 top-0">
          <div className="flex justify-end">
            <button className="flex items-center justify-center space-x-1 bg-white/90 py-2 px-4 rounded-lg shadow hover:bg-white">
              <AutoFixNormalOutlinedIcon />
              <span className="">Customize</span>
            </button>
          </div>

          <div className="flex flex-row w-full">
            <div className="flex flex-col">
              <p className="bold-32 text-white">
                {" "}
                {currentClass?.classId.className}{" "}
              </p>
              <p className="regular-18 text-white">
                {" "}
                {currentClass?.classId.section}{" "}
              </p>
            </div>

            <div className="flex justify-end items-end flex-1">
              <button className="w-9 h-9 hover:bg-gray-500/30 flex items-center justify-center rounded-full">
                <ErrorOutlineOutlinedIcon sx={{ color: "white" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* notification + classcode + assignment */}
      <div className="relative grid grid-cols-5 w-full h-full mt-7 gap-6">
        <div className="col-span-1">
          {currentClass?.role !== "student" && (
            <ClassCode classCode={currentClass?.classId.classCode as string} />
          )}
          {currentClass?.role === "student" && <JoinClass />}
          <AsignmentComming />
        </div>

        <div className="col-span-4 -mt-3 flex flex-col flex-1">
          <AssignmentList />
        </div>
      </div>
    </div>
  );
}

export default Stream;
