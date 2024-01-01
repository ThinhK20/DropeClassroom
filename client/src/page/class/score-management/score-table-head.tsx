/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   IconButton,
   Menu,
   MenuItem,
   TableCell,
   Typography,
} from "@mui/material";
import { Assignment } from "../../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { updateAssignmentStatusApi } from "../../../apis/assignmentApis";
import { AssignmentStatusEnum } from "../../../shared/enums/StudentAssignment";
import { toast } from "react-toastify";
import ViewAssigmentModal from "../../../components/modal/ViewAssignmentModal";
import { useDispatch } from "react-redux";
import { setAssignments } from "../../../store/assignmentSlice";
import { createNotification } from "../../../apis/notificationApis";
import { useAppSelector } from "../../../hooks/hooks";
import { DraggableComponent } from "./drag-&-drop/draggable-component";

interface Props {
   assignment: Assignment | undefined;
   index?: number;
}

export default function ScoreTableHead(props: Props) {
   const [subMenuEl, setSubMenuEl] = useState(null);
   // const [openMarkFinishConfirm, setOpenMarkFinishConfirm] = useState(false);
   const open = Boolean(subMenuEl);
   const dispatch = useDispatch();
   const handleClick = (event: any) => {
      setSubMenuEl(event.currentTarget);
   };

   const handleClose = () => {
      setSubMenuEl(null);
   };

   const currentUser = useAppSelector((state) => state.users.data);

   const currentClass = useAppSelector(
      (state) => state.userClassroom.currentClass
   );

   function getClassId() {
      const inputString = location.pathname;

      // Find the index of "/c/" and "/gb/"
      const startIndex = inputString.indexOf("/c/") + 3;
      const endIndex = inputString.indexOf("/gb/");

      // Extract the substring between the indices
      const result = inputString.slice(startIndex, endIndex);
      return result;
   }

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

   function markAssignmentToFinish() {
      updateAssignmentStatusApi(
         props.assignment?._id?.toString() as string,
         AssignmentStatusEnum.Completed
      )
         .then(() => {
            getAllAssignments();
            toast.success(
               `Mark assignment ${props.assignment?.assignmentName} as completed successfully.`
            );
            createNotification({
               title: "Assignment completed",
               content: `Assignment ${props.assignment?.assignmentName} was completed by ${currentUser?.username}`,
               classId: getClassId(),
               studentId: currentUser?._id as string,
            });
         })
         .catch((err) => toast.error(err));
   }

   return (
      <TableCell
         className="flex flex-col h-[200px]"
         component={DraggableComponent(
            props.assignment?._id.toString() as string,
            props.index as number
         )}
      >
         <div className="flex items-center justify-between relative">
            <div>
               <Typography fontSize={12}>No submission deadline</Typography>
               <Typography>{props.assignment?.assignmentName}</Typography>
               <Typography fontSize={12}>Max score: 100</Typography>
            </div>
            <div>
               {props.assignment?.assignmentStatus ===
                  AssignmentStatusEnum.Completed && (
                  <Typography
                     className="bg-green-600 px-2 text-center rounded py-1 text-white"
                     fontSize={12}
                  >
                     {props.assignment?.assignmentStatus}
                  </Typography>
               )}
            </div>
            <div>
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
                  {props.assignment?.assignmentStatus !==
                     AssignmentStatusEnum.Completed &&
                     currentClass?.role !== "student" && (
                        <MenuItem onClick={markAssignmentToFinish}>
                           Mark to finish
                        </MenuItem>
                     )}
                  <ViewAssigmentModal
                     assignment={props.assignment as any}
                     isOpen={true}
                     onClose={() => {
                        // setShowModal(false);
                     }}
                     title="View"
                     role={""}
                  />
               </Menu>
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
            </div>
         </div>
      </TableCell>
   );
}
