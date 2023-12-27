import {
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

   return (
      <Paper sx={{ width: "100%", paddingTop: "50px" }}>
         <div className="ml-4">
            <CreateGradeReview isEdit={true} />
         </div>
         <TableContainer>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Id</TableCell>
                     <TableCell>Assignment</TableCell>
                     <TableCell>Student Name</TableCell>
                     <TableCell>Grade Expectation</TableCell>
                     <TableCell>Student Explanation</TableCell>
                     <TableCell>Status</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {gradeReviews.map((gradeReview, index) => (
                     <TableRow key={gradeReview._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                           {
                              gradeReview.studentAssignment.assignmentId
                                 .assignmentName
                           }
                        </TableCell>
                        <TableCell>
                           {
                              gradeReview.studentAssignment.studentId.userId
                                 ?.username
                           }
                        </TableCell>
                        <TableCell>{gradeReview.gradeExpectation}</TableCell>
                        <TableCell className="max-w-[200px]">
                           {gradeReview.studentExplanation}
                        </TableCell>
                        <TableCell>{gradeReview.status}</TableCell>
                        <TableCell>
                           <div className="flex items-center gap-4">
                              <div className="cursor-pointer">
                                 <CreateGradeReview
                                    gradeReview={gradeReview}
                                    isEdit={false}
                                 >
                                    <FontAwesomeIcon icon={faEye} />
                                 </CreateGradeReview>
                              </div>
                              <div className="cursor-pointer">
                                 {gradeReview.status !==
                                    AssignmentStatusEnum.Completed && (
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
                                 {gradeReview.status !==
                                    AssignmentStatusEnum.Completed && (
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
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Paper>
   );
}
