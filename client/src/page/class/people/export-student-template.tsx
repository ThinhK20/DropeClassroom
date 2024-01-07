/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSVLink } from "react-csv";
import { useLocation } from "react-router-dom";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function ExportStudentTemplate() {
   const location = useLocation();

   function convertToReport() {
      return [["ClassId", "UserId", "StudentId"]];
   }

   return (
      <CSVLink
         filename={`student-template.csv`}
         className="w-fit block"
         data={convertToReport()}
      >
         <Typography fontSize={14} width={"100%"}>
            <Tooltip placement="left" title="Export student template" arrow>
               <Avatar sx={{ bgcolor: "green", cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faDownload} />
               </Avatar>
            </Tooltip>
         </Typography>
      </CSVLink>
   );
}
