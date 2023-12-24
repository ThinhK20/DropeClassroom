/* eslint-disable @typescript-eslint/no-explicit-any */
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import { Assignment } from "../../../models";
import ExportScoreBoard from "./export-score-board";
import ScoreTableHead from "./score-table-head";
import ScoreTableCell from "./score-table-cell";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setGroupStudentAssignmentsByStudentId } from "../../../store/studentAssignmentSlice";

export default function ScoreManagement() {
   const [groupStudentAssignmentsById, setGroupStudentAssignmentsById] =
      useState<{
         [key: string]: StudentAssignment[];
      }>({});

   const [assignments, setAssignments] = useState<Assignment[]>([]);

   const location = useLocation();
   const dispatch = useAppDispatch();
   const groupStudentAssignmentsByStudentId = useAppSelector(
      (state) => state.studentAssignments
   ).data.groupStudentAssignmentsByStudentId;

   function getClassId() {
      const inputString = location.pathname;

      // Find the index of "/c/" and "/gb/"
      const startIndex = inputString.indexOf("/c/") + 3;
      const endIndex = inputString.indexOf("/gb/");

      // Extract the substring between the indices
      const result = inputString.slice(startIndex, endIndex);
      return result;
   }

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
      init();
   }, []);

   function init() {
      const promises = [
         getAllStudentAssignmentsByClassId(true, getClassId()),
         getAllStudentAssignmentsByClassId(true, getClassId(), true),
         getAssignmentsByClassId(getClassId()),
      ];

      Promise.all(promises)
         .then(([groupAssignments1, groupAssignments2, assignments]) => {
            setGroupStudentAssignmentsById(groupAssignments1.data);
            dispatch(
               setGroupStudentAssignmentsByStudentId(groupAssignments2.data)
            );
            setAssignments(assignments.data);
         })
         .catch((error) => {
            console.error("Error fetching data:", error);
         });
   }

   function renderTableSummaryCell() {
      return calculateAverageScores.map((avgScore, key) => (
         <TableCell
            className="flex flex-row"
            align="left"
            key={key}
            scope="row"
         >
            <label>{avgScore?.averageScore}</label>
            <label>/100</label>
         </TableCell>
      ));
   }

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Sort by Name</TableCell>
                  {calculateAverageScores.map((averageScore, key) => {
                     const assignment = assignments.find(
                        (x) => x._id === averageScore?.assignmentId?.toString()
                     );
                     return (
                        <ScoreTableHead key={key} assignment={assignment} />
                     );
                  })}
                  <TableCell>
                     <ExportScoreBoard />
                     {/* <DownloadAssignmentTemplate /> */}
                  </TableCell>
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
               {groupStudentAssignmentsByStudentId.map((row: any) => {
                  return (
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
                        {row.assignments.map((assignment: any, key: number) => {
                           if (!assignment)
                              return <ScoreTableCell key={key} score={0} />;
                           return (
                              <ScoreTableCell
                                 score={assignment?.averageScore}
                                 assignmentId={assignment._id}
                                 assignmentStatus={assignment?.status}
                                 key={key}
                              />
                           );
                        })}
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
