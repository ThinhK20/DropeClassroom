/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSVLink } from "react-csv";
import { getAllStudentAssignmentsByClassId } from "../../../../apis/studentAssignmentApis";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentAssignment } from "../../../../models/StudentAssignment";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFile } from "@fortawesome/free-solid-svg-icons";

export default function ExportScoreTemplate() {
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
         // const filteredData = [...res.data].map((data: any) => {
         //    data.username = data.studentId.userId.username;
         //    data.email = data.studentId.userId.email;
         //    data.studentId = data.studentId._id;
         //    const { isActive, createdAt, updatedAt, __v, ...result } = data;
         //    return result;
         // });

         setStudentAssignments(res.data);
      });
   }, []);

   function convertToReport() {
      return studentAssignments.map((studentAssignment) => ({
         studentId: studentAssignment.studentId._id,
         username: studentAssignment.studentId.userId?.username,
         email: studentAssignment.studentId.userId?.email,
         grade: studentAssignment.grade,
         status: studentAssignment.status,
      }));
   }

   return (
      <CSVLink
         filename="grade-board.csv"
         className="w-fit block"
         data={convertToReport()}
      >
         <Typography fontSize={14} width={"100%"}>
            Download template
         </Typography>
      </CSVLink>
   );
}
