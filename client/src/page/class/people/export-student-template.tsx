/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSVLink } from "react-csv";
import { Tooltip, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export default function ExportStudentTemplate() {
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
               <button className="flex justify-center items-center w-11 h-11 rounded-full text-blue-600 text-3xl hover:bg-blue-50 focus:bg-blue-50">
                  <DownloadOutlinedIcon />
               </button>
            </Tooltip>
         </Typography>
      </CSVLink>
   );
}
