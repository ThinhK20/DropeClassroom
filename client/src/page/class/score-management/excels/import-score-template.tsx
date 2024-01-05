/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
   getAllStudentAssignmentsByClassId,
   updateStudentAssignmentByStudentAndAssignmentIdApi,
} from "../../../../apis/studentAssignmentApis";
import { Assignment } from "../../../../models";
import CSVSelector from "../../../../components/CSVSelector/CSVSelector";
import { toast } from "react-toastify";
import { getAllAssignments } from "../../../../store/assignmentSlice";
import { useAppDispatch } from "../../../../hooks/hooks";
import {
   setGroupStudentAssignmentsByAssignmentId,
   setGroupStudentAssignmentsByStudentId,
} from "../../../../store/studentAssignmentSlice";

interface Props {
   assignment: Assignment | undefined;
}

interface ImportStudentAssignmentScore {
   studentId: string;
   assignmentId: string;
   grade: number;
}

export default function ImportScoreTemplate(props: Props) {
   const dispatch = useAppDispatch();
   async function handleSubmit(
      queryData: Array<Array<ImportStudentAssignmentScore>>
   ) {
      const cloneQueryData = [...queryData].map((data) => [...data]);
      cloneQueryData.shift();
      const submitDataArray = cloneQueryData
         .map((data: ImportStudentAssignmentScore[]) => {
            return {
               studentId: data[0],
               assignmentId: props.assignment?._id,
               grade: data[data.length - 1],
            };
         })
         .filter((s) => (s.studentId as any) !== "");

      submitDataArray.map(async (student) => {
         return await updateStudentAssignmentByStudentAndAssignmentIdApi(
            student
         );
      });

      await Promise.all(submitDataArray)
         .then(() => {
            fetchStudentAssignments();
            toast.success(`Upload all grades for assignment successfully.`);
         })
         .catch((err) => toast.error(err));
   }

   function getClassId() {
      const inputString = location.pathname;

      // Find the index of "/c/" and "/gb/"
      const startIndex = inputString.indexOf("/c/") + 3;
      const endIndex = inputString.indexOf("/gb/");

      // Extract the substring between the indices
      const result = inputString.slice(startIndex, endIndex);
      return result;
   }

   function fetchStudentAssignments() {
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

   return (
      <>
         <CSVSelector
            title="score template"
            onChange={async (data: any) => await handleSubmit(data)}
         />
      </>
   );
}
