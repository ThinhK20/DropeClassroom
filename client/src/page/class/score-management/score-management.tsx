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
import { getAllStudentAssignmentsByClassId } from "../../../apis/studentAssignmentApis";
import { getAssignmentsByClassId } from "../../../apis/assignmentApis";
import { useLocation } from "react-router-dom";
import SetStudentScore from "./set-student-score";
import { Assignment } from "../../../models";

export default function ScoreManagement() {
   const [groupStudentAssignmentsById, setGroupStudentAssignmentsById] =
      useState<{
         [key: string]: StudentAssignment[];
      }>({});

   const [assignments, setAssignments] = useState<Assignment[]>([]);
   const [
      groupStudentAssignmentsByStudentId,
      setGroupStudentAssignmentsByStudentId,
   ] = useState<any>([]);

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

   const [subMenuEl, setSubMenuEl] = useState(null);
   const open = Boolean(subMenuEl);

   const calculateAverageScores = useMemo(() => {
      const existedGroupIds = [] as string[];
      const averageScores = assignments.map((assignment) => {
         const group = groupStudentAssignmentsById[assignment._id.toString()];
         // Calculate total score
         if (group) {
            const totalScore = group.reduce(
               (sum: number, assignment: StudentAssignment) =>
                  sum + assignment.grade,
               0
            );

            // Calculate average score
            const averageScore = totalScore / group.length || 0;

            existedGroupIds.push(assignment._id.toString());
            return {
               assignmentId: assignment._id.toString(),
               averageScore,
               studentAssignments: group,
            };
         }
      });

      const otherGroups = assignments
         .filter((x) => existedGroupIds.indexOf(x._id) === -1)
         .map((x) => ({
            assignmentId: x._id,
            averageScore: 0,
            studentAssignments: [],
         }));

      return [...averageScores, ...otherGroups];
   }, [assignments, groupStudentAssignmentsById]);

   useEffect(() => {
      const promises = [
         getAllStudentAssignmentsByClassId(getClassId()),
         getAllStudentAssignmentsByClassId(getClassId(), true),
         getAssignmentsByClassId(getClassId()),
      ];

      Promise.all(promises)
         .then(([groupAssignments1, groupAssignments2, assignments]) => {
            setGroupStudentAssignmentsById(groupAssignments1.data);
            setGroupStudentAssignmentsByStudentId(groupAssignments2.data);
            setAssignments(assignments.data);
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }, []);

   function renderHead(id: string) {
      const assignment = assignments.find((x) => x._id === (id as any));
      return (
         <TableCell className="flex flex-col h-[200px]">
            <Typography fontSize={12}>No submission deadline</Typography>
            <Typography>{assignment?.assignmentName}</Typography>
            <Typography fontSize={12}>Max score: 100</Typography>
         </TableCell>
      );
   }

   function renderTableSummaryCell() {
      return calculateAverageScores.map((avgScore) => (
         <TableCell className="flex flex-row" align="left" scope="row">
            <label>{avgScore?.averageScore}</label>
            <label>/100</label>
         </TableCell>
      ));
   }

   function renderTableCell(score: number, assignmentId?: string) {
      const handleClick = (event: any) => {
         setSubMenuEl(event.currentTarget);
      };

      const handleClose = () => {
         setSubMenuEl(null);
      };

      return (
         <TableCell align="left" scope="row">
            <div className="flex items-center justify-between">
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
                        <SetStudentScore id={assignmentId} />
                     </MenuItem>
                     <MenuItem>View</MenuItem>
                     <MenuItem>Accept reasons</MenuItem>
                  </Menu>
               </div>
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
                     return renderHead(
                        averageScore?.assignmentId?.toString() as string
                     );
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
               {groupStudentAssignmentsByStudentId.map((row) => (
                  <TableRow
                     key={row?.studentId}
                     sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                     }}
                  >
                     <TableCell
                        component="th"
                        scope="row"
                        className="flex items-center"
                     >
                        <Typography>Thinh Nguyen</Typography>
                     </TableCell>
                     {row.assignments.map((assignment: any) => {
                        console.log("assignment: ", assignment);
                        if (!assignment) return renderTableCell(0);
                        return renderTableCell(
                           assignment?.averageScore,
                           assignment._id
                        );
                     })}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
