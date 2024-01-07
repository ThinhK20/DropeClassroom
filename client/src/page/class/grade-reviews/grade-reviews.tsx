import {
   Chip,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { getAllGradeReviewsByClassIdApi } from "../../../apis/gradeReviewsApis";
import { useLocation } from "react-router-dom";
import { setGradeReviews } from "../../../store/gradeReviewsSlice";
import CreateGradeReview from "./create-grade-review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteGradeReview from "./delete-grade-review";
import { AssignmentStatusEnum } from "../../../shared/enums/StudentAssignment";

export default function GradeReviews() {
   const dispatch = useAppDispatch();
   const gradeReviews = useAppSelector((state) => state.gradeReviews).data;
   const location = useLocation();

   const currentUserClassroom = useAppSelector(
      (state) => state.userClassroom
   ).currentUserClassroom;

   function getClassId() {
      const inputString = location.pathname;

      // Find the index of "/c/" and "/gb/"
      const startIndex = inputString.indexOf("/c/") + 3;
      const endIndex = inputString.indexOf("/gr/");

      // Extract the substring between the indices
      const result = inputString.slice(startIndex, endIndex);
      return result;
   }

   useEffect(() => {
      getAllGradeReviewsByClassIdApi(getClassId()).then((res) => {
         dispatch(setGradeReviews(res.data));
      });
   }, []);

   const currentClass = useAppSelector(
      (state) => state.userClassroom.currentClass
   );

   return (
      <Paper sx={{ width: "100%", paddingTop: "50px" }}>
         <div className="ml-4">
            {currentClass?.role === "student" && (
               <CreateGradeReview isEdit={true} />
            )}
         </div>
         <TableContainer>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Id</TableCell>
                     <TableCell>Assignment</TableCell>
                     <TableCell>Student Name</TableCell>
                     <TableCell>Current Grade</TableCell>
                     <TableCell>Grade Expectation</TableCell>
                     <TableCell>Student Explanation</TableCell>
                     <TableCell>Created At</TableCell>
                     <TableCell>Status</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {gradeReviews.map((gradeReview, index) => {
                     if (
                        currentUserClassroom?.role === "student" &&
                        gradeReview.studentAssignment.studentId._id?.toString() !==
                           currentUserClassroom._id?.toString()
                     )
                        return;
                     return (
                        <TableRow key={gradeReview._id}>
                           <TableCell>{index + 1}</TableCell>
                           <TableCell>
                              {
                                 gradeReview.studentAssignment?.assignmentId
                                    ?.assignmentName
                              }
                           </TableCell>
                           <TableCell>
                              {
                                 gradeReview.studentAssignment?.studentId
                                    ?.userId?.username
                              }
                           </TableCell>
                           <TableCell>
                              {gradeReview.studentAssignment?.grade}
                           </TableCell>
                           <TableCell>{gradeReview.gradeExpectation}</TableCell>
                           <TableCell className="max-w-[200px]">
                              {gradeReview.studentExplanation}
                           </TableCell>
                           <TableCell>
                              {gradeReview.createdAt
                                 ? new Date(
                                      gradeReview.createdAt
                                   ).toLocaleString()
                                 : new Date().toLocaleString()}
                           </TableCell>
                           <TableCell>
                              {gradeReview.status ===
                                 AssignmentStatusEnum.Completed && (
                                 <Chip
                                    label={gradeReview.status}
                                    color="success"
                                    variant="filled"
                                 />
                              )}
                              {gradeReview.status ===
                                 AssignmentStatusEnum.Pending && (
                                 <Chip
                                    label={gradeReview.status}
                                    color="warning"
                                    variant="filled"
                                 />
                              )}
                              {gradeReview.status ===
                                 AssignmentStatusEnum.Dismissed && (
                                 <Chip
                                    label={gradeReview.status}
                                    color="error"
                                    variant="filled"
                                 />
                              )}
                           </TableCell>
                           <TableCell>
                              <div className="flex items-center gap-4">
                                 <div className="cursor-pointer">
                                    <CreateGradeReview
                                       gradeReview={gradeReview}
                                       isEdit={false}
                                    >
                                       <FontAwesomeIcon
                                          icon={faEye}
                                          className="hover:opacity-75"
                                       />
                                    </CreateGradeReview>
                                 </div>
                                 <div className="cursor-pointer">
                                    {gradeReview.status ===
                                       AssignmentStatusEnum.Pending &&
                                       currentClass?.role === "student" && (
                                          <CreateGradeReview
                                             gradeReview={gradeReview}
                                             isEdit={true}
                                          >
                                             <FontAwesomeIcon
                                                icon={faPencil}
                                                className="hover:opacity-75"
                                             />
                                          </CreateGradeReview>
                                       )}
                                 </div>
                                 <div className="cursor-pointer">
                                    {gradeReview.status ===
                                       AssignmentStatusEnum.Pending &&
                                       currentClass?.role === "student" && (
                                          <DeleteGradeReview
                                             gradeReview={gradeReview}
                                          >
                                             <FontAwesomeIcon
                                                icon={faTrash}
                                                className="hover:opacity-75"
                                             />
                                          </DeleteGradeReview>
                                       )}
                                 </div>
                              </div>
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
      </Paper>
   );
}
