/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSVLink } from "react-csv";
import { getAllStudentAssignmentsByClassId } from "../../../apis/studentAssignmentApis";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentAssignment } from "../../../models/StudentAssignment";
import { Avatar, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function ExportScoreBoard() {
   const location = useLocation();
   const [studentAssignments, setStudentAssignments] = useState<
      StudentAssignment[]
   >([]);

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
         const filteredData = res.data.map((data: any) => {
            data.username = data.studentId.username;
            data.email = data.studentId.email;
            data.studentId = data.studentId._id;
            const { isActive, createdAt, updatedAt, __v, ...result } = data;
            return result;
         });
         setStudentAssignments(filteredData);
      });
   }, []);

   return (
      <CSVLink
         filename="grade-board.csv"
         className="w-fit block"
         data={studentAssignments}
      >
         <Tooltip title="Export grade board">
            <Avatar sx={{ bgcolor: "green", cursor: "pointer" }}>
               <FontAwesomeIcon icon={faDownload} />
            </Avatar>
         </Tooltip>
      </CSVLink>
   );
}
