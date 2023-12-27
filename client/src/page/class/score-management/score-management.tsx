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
import { useLocation } from "react-router-dom";
import ExportScoreBoard from "./export-score-board";
import ScoreTableHead from "./score-table-head";
import ScoreTableCell from "./score-table-cell";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
   setGroupStudentAssignmentsByAssignmentId,
   setGroupStudentAssignmentsByStudentId,
} from "../../../store/studentAssignmentSlice";
import { getUserClassroomApi } from "../../../apis/userClassroomApis";
import { Assignment, User, UserClassRoom } from "../../../models";
import { setAssignments } from "../../../store/assignmentSlice";

export default function ScoreManagement() {
   const location = useLocation();
   const dispatch = useAppDispatch();
   const [users, setUsers] = useState<(User & { studentId: string })[]>([]);

   const assignments = useAppSelector((state) => state.assignment).assignments;
   const groupStudentAssignmentsByAssignmentId = useAppSelector(
      (state) => state.studentAssignments
   ).data.groupStudentAssignmentsByAssignmentId;
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
         const group =
            groupStudentAssignmentsByAssignmentId?.[
               assignment._id.toString() as string
            ];
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
   }, [assignments, groupStudentAssignmentsByAssignmentId]);

   useEffect(() => {
      init();
   }, []);

   async function getAllUsers() {
      if (groupStudentAssignmentsByStudentId?.length <= 0) return;
      return Promise.all(
         groupStudentAssignmentsByStudentId.map(async (value) => {
            const data = (await getUserClassroomApi(value.studentId))
               .data as UserClassRoom;
            return { ...data.userId, studentId: data._id };
         })
      );
   }

   useEffect(() => {
      getAllUsers().then((value) => setUsers(value as any));
   }, [groupStudentAssignmentsByStudentId]);

   const getAllAssignments = async () => {
      await fetch("http://localhost:8000/assignment", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((data: Assignment[]) => {
            dispatch(
               setAssignments(
                  data.filter(
                     (assignment) =>
                        assignment.assignmentClassId === getClassId()
                  )
               )
            );
         })
         .catch((err) => {
            console.log(err);
         });
   };

   function init() {
      const promises = [
         getAllStudentAssignmentsByClassId(true, getClassId()),
         getAllStudentAssignmentsByClassId(true, getClassId(), true),
      ];

      getAllAssignments();

      Promise.all(promises)
         .then(([groupAssignments1, groupAssignments2]) => {
            dispatch(
               setGroupStudentAssignmentsByAssignmentId(groupAssignments1.data)
            );
            dispatch(
               setGroupStudentAssignmentsByStudentId(groupAssignments2.data)
            );
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
                           <Typography>
                              {
                                 users.find(
                                    (user) => user.studentId === row.studentId
                                 )?.username
                              }
                           </Typography>
                        </TableCell>
                        {row.assignments.map((assignment: any, key: number) => {
                           if (!assignment)
                              return <ScoreTableCell key={key} score={0} />;
                           return (
                              <ScoreTableCell
                                 score={assignment?.averageScore}
                                 studentAssignment={assignment}
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
