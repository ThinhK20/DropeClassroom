/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Menu, MenuItem, TableCell } from "@mui/material";
import SetStudentScore from "./set-student-score";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Props {
   score: number;
   assignmentId?: string;
}

export default function ScoreTableCell(props: Props) {
   const [subMenuEl, setSubMenuEl] = useState(null);
   const open = Boolean(subMenuEl);
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
               <label>{props.score}</label>
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
                     <SetStudentScore id={props.assignmentId as string} />
                  </MenuItem>
                  <MenuItem>View</MenuItem>
                  <MenuItem>Accept reasons</MenuItem>
               </Menu>
            </div>
         </div>
      </TableCell>
   );
}
