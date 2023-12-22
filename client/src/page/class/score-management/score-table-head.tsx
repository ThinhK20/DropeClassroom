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

interface Props {
   assignment: Assignment | undefined;
}

export default function ScoreTableHead(props: Props) {
   const [subMenuEl, setSubMenuEl] = useState(null);
   // const [openMarkFinishConfirm, setOpenMarkFinishConfirm] = useState(false);
   const open = Boolean(subMenuEl);
   const handleClick = (event: any) => {
      setSubMenuEl(event.currentTarget);
   };

   const handleClose = () => {
      setSubMenuEl(null);
   };

   function markAssignmentToFinish() {
      updateAssignmentStatusApi(
         props.assignment?._id?.toString() as string,
         AssignmentStatusEnum.Completed
      )
         .then(() => {
            toast.success(
               `Mark assignment ${props.assignment?.assignmentName} as completed successfully.`
            );
         })
         .catch((err) => toast.error(err));
   }

   return (
      <TableCell className="flex flex-col h-[200px]">
         <div className="flex items-center justify-between">
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
                  {props.assignment?.assignmentStatus !==
                     AssignmentStatusEnum.Completed && (
                     <MenuItem onClick={markAssignmentToFinish}>
                        Mark to finish
                     </MenuItem>
                  )}
                  <MenuItem>View</MenuItem>
               </Menu>
            </div>
         </div>
      </TableCell>
   );
}
