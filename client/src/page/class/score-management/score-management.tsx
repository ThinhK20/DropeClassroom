/* eslint-disable @typescript-eslint/no-explicit-any */
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   IconButton,
   Menu,
   MenuItem,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { StudentAssignment } from "../../../models/StudentAssignment";
import { getAllStudentAssignments } from "../../../apis/studentAssignmentApis";
import { Assignment } from "../../../helper/assignment_helper";
import { getAssignmentsByClassId } from "../../../apis/assignmentApis";
import { useLocation } from "react-router-dom";
import SetStudentScore from "./set-student-score";

export default function ScoreManagement() {
   const [studentAssignments, setStudentAssignments] = useState<
      StudentAssignment[]
   >([]);

   const location = useLocation();

   function getClassId() {
      const inputString = location.pathname;

      // Find the index of "/c/" and "/gb/"
      const startIndex = inputString.indexOf("/c/") + 3;
      const endIndex = inputString.indexOf("/gb/");

      // Extract the substring between the indices
      const result = inputString.slice(startIndex, endIndex);
      return result;
   }

   const [assignments, setAssignments] = useState<Assignment[]>([]);
   const [subMenuEl, setSubMenuEl] = useState(null);
   const open = Boolean(subMenuEl);

   const calculateAverageScores = useMemo(() => {
      const groupedAssignments = studentAssignments.reduce(
         (acc: any, studentAssignment) => {
            if (!acc[studentAssignment.assignmentId]) {
               acc[studentAssignment.assignmentId] = [];
            }

            acc[studentAssignment.assignmentId].push(studentAssignment);
            return acc;
         },
         {}
      );

      const averageScores = Object.keys(groupedAssignments).map(
         (assignmentId) => {
            const assignmentsOfType = groupedAssignments[assignmentId];

            // Calculate total score
            const totalScore = assignmentsOfType.reduce(
               (sum: number, assignment: StudentAssignment) =>
                  sum + assignment.grade,
               0
            );

            // Calculate average score
            const averageScore = totalScore / assignmentsOfType.length;

            return {
               assignmentId,
               averageScore,
            };
         }
      );

      const otherGroups = assignments
         .filter((assignment) =>
            Object.keys(groupedAssignments).find(
               (id) => id !== (assignment._id as any)
            )
         )
         .map((value) => ({
            assignmentId: value._id,
            averageScore: 0,
         }));

      return [...averageScores, ...otherGroups];
   }, [assignments, studentAssignments]);

   useEffect(() => {
      getAllStudentAssignments().then((res) => setStudentAssignments(res.data));
      getAssignmentsByClassId(getClassId()).then((res) =>
         setAssignments(res.data)
      );
   }, []);

   function renderHead(id: string) {
      const assignment = assignments.find((x) => x._id === (id as any));
      return (
         <TableCell className="flex flex-col">
            <Typography fontSize={12}>No submission deadline</Typography>
            <Typography>{assignment?.assignmentName}</Typography>
            <Typography fontSize={12}>Max score: 100</Typography>
         </TableCell>
      );
   }

   function renderTableSummaryCell() {
      return calculateAverageScores.map((avgScore) => (
         <TableCell className="flex flex-row" align="left" scope="row">
            <label>{avgScore.averageScore}</label>
            <label>/100</label>
         </TableCell>
      ));
   }

   function renderTableCell(score: number) {
      const handleClick = (event: any) => {
         setSubMenuEl(event.currentTarget);
      };

      const handleClose = () => {
         setSubMenuEl(null);
      };

      return (
         <TableCell
            style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
            }}
            align="left"
            scope="row"
         >
            <div>
               <label>{score}</label>
               <label>/100</label>
            </div>
            <div>
               <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
               >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
               </IconButton>
               <Menu
                  id="long-menu"
                  MenuListProps={{
                     "aria-labelledby": "long-button",
                  }}
                  anchorEl={subMenuEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                     style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                     },
                  }}
               >
                  <MenuItem>
                     <SetStudentScore />
                  </MenuItem>
                  <MenuItem>View</MenuItem>
                  <MenuItem>Accept reasons</MenuItem>
               </Menu>
            </div>
         </TableCell>
      );
   }

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Sort by Name</TableCell>
                  {calculateAverageScores.map((averageScore) => {
                     return renderHead(averageScore.assignmentId.toString());
                  })}
               </TableRow>
            </TableHead>
            <TableBody>
               <TableRow
                  key={"score-avg"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
               >
                  <TableCell component="th" scope="row">
                     <Typography>
                        <FontAwesomeIcon
                           icon={faUser}
                           size="2xl"
                           className="mr-2"
                        />
                        Class average score
                     </Typography>
                  </TableCell>
                  {renderTableSummaryCell()}
               </TableRow>
               {studentAssignments.map((row) => (
                  <TableRow
                     key={row._id}
                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                     <TableCell
                        component="th"
                        scope="row"
                        className="flex items-center"
                     >
                        <Typography>{row.studentId.username}</Typography>
                     </TableCell>
                     {renderTableCell(row.grade)}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
