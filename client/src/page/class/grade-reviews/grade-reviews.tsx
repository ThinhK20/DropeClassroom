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
         <CreateGradeReview />
         <TableContainer sx={{ maxHeight: 440 }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Id</TableCell>
                     <TableCell>Assignment</TableCell>
                     <TableCell>Student Name</TableCell>
                     <TableCell>Grade Expectation</TableCell>
                     <TableCell>Student Explanation</TableCell>
                     <TableCell>Status</TableCell>
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
                        <TableCell>{gradeReview.studentExplanation}</TableCell>
                        <TableCell>
                           {gradeReview.studentAssignment.status}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Paper>
   );
}
