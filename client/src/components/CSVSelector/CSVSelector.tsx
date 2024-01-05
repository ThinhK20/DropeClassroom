import React from "react";
import Papa from "papaparse";
import { Typography } from "@mui/material";
type Props = {
   onChange(data: string[][]): void;
   title?: string;
};

const CSVSelector = ({ onChange, title }: Props) => {
   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         try {
            const file = e.target.files[0];

            Papa.parse<string[]>(file, {
               worker: true, // use a web worker so that the page doesn't hang up
               complete({ data }) {
                  onChange(data);
               },
            });
         } catch (error) {
            console.error(error);
         }
      }
   };
   return (
      <>
         <Typography
            component="label"
            fontSize={14}
            width={"100%"}
            className="cursor-pointer"
            htmlFor="importExcel"
         >
            Import {title}
         </Typography>
         <input
            id="importExcel"
            name="importExcel"
            hidden
            type="file"
            accept=".csv"
            onChange={handleFileChange}
         />
      </>
   );
};

export default CSVSelector;
