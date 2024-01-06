/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSVLink } from "react-csv";
import { getAllStudentAssignmentsByClassId } from "../../../../apis/studentAssignmentApis";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentAssignment } from "../../../../models/StudentAssignment";
import { Avatar, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../../hooks/hooks";
import { AssignmentStatusEnum } from "../../../../shared/enums/StudentAssignment";

export default function ExportScoreBoard() {
   const location = useLocation();
   const [studentAssignments, setStudentAssignments] = useState<
      StudentAssignment[]
   >([]);
   const currentUserClassroom = useAppSelector(
      (state) => state.userClassroom
   ).currentUserClassroom;

   function getClassId() {
      const inputString = location.pathname;

      // Find the index of "/c/" and "/gb/"
      const startIndex = inputString.indexOf("/c/") + 3;
      const endIndex = inputString.indexOf("/gb/");

      // Extract the substring between the indices
      const result = inputString.slice(startIndex, endIndex);
      return result;
   }

   useEffect(() => {
      getAllStudentAssignmentsByClassId(false, getClassId()).then((res) => {
         setStudentAssignments(res.data);
      });
   }, []);

   function convertToReport() {
      let exportData = null;
      if (currentUserClassroom?.role === "student") {
         exportData = studentAssignments
            .filter(
               (s) =>
                  s.studentId._id === currentUserClassroom._id &&
                  s.assignmentId.assignmentStatus ===
                     AssignmentStatusEnum.Completed
            )
            .map((studentAssignment) => ({
               Username: studentAssignment.studentId.userId?.username,
               Assignment: studentAssignment.assignmentId?.assignmentName,
               Email: studentAssignment.studentId.userId?.email,
               Grade: studentAssignment.grade,
               Status: studentAssignment.status,
            }));
      } else {
         exportData = studentAssignments.map((studentAssignment) => ({
            Username: studentAssignment.studentId.userId?.username,
            Assignment: studentAssignment.assignmentId?.assignmentName,
            Email: studentAssignment.studentId.userId?.email,
            Grade: studentAssignment.grade,
            Status: studentAssignment.status,
         }));
      }
      return exportData;
   }

   return (
      <CSVLink
         filename="grade-board.csv"
         className="w-fit block"
         data={convertToReport()}
      >
         <Tooltip placement="left" title="Export grade board" arrow>
            <Avatar sx={{ bgcolor: "green", cursor: "pointer" }}>
               <FontAwesomeIcon icon={faDownload} />
            </Avatar>
         </Tooltip>
      </CSVLink>
   );
}
