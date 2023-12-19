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

interface Props {
   assignment: Assignment | undefined;
}

export default function ScoreTableHead(props: Props) {
   const [subMenuEl, setSubMenuEl] = useState(null);
   const open = Boolean(subMenuEl);
   const handleClick = (event: any) => {
      setSubMenuEl(event.currentTarget);
   };

   const handleClose = () => {
      setSubMenuEl(null);
   };

   return (
      <TableCell className="flex flex-col h-[200px]">
         <div className="flex items-center justify-between">
            <div>
               <Typography fontSize={12}>No submission deadline</Typography>
               <Typography>{props.assignment?.assignmentName}</Typography>
               <Typography fontSize={12}>Max score: 100</Typography>
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
                  <MenuItem>Mark to finish</MenuItem>
               </Menu>
            </div>
         </div>
      </TableCell>
   );
}
