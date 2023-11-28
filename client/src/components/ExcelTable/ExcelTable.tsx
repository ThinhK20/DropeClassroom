/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTable } from "react-table";
import userData from "./users.json";
import { useEffect, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import CSVSelector from "../CSVSelector/CSVSelector";

const columns = [
   { Header: "ID", accessor: "id" },
   { Header: "Name", accessor: "name" },
   { Header: "Username", accessor: "username" },
   { Header: "Email", accessor: "email" },
   { Header: "Phone", accessor: "phone" },
   { Header: "Website", accessor: "website" },
] as any;

export default function ExcelTable() {
   const data = useMemo(() => userData, []);

   const [importCsvData, setImportCsvData] = useState<string[][]>([]);

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });

   // The code for read csv file

   // The code for export csv file
   const csvData = [
      ["ID", "Name", "Username", "Email", "Phone", "Website"],
      ...data.map(({ id, name, username, email, phone, website }) => [
         id,
         name,
         username,
         email,
         phone,
         website,
      ]),
   ];

   useEffect(() => {}, [importCsvData]);

   return (
      <div className="App">
         <CSVSelector onChange={(_data) => setImportCsvData(_data)} />
         {importCsvData && (
            <table>
               <thead>
                  <tr>
                     {importCsvData?.[0]?.map((header, id) => {
                        return <th key={id}>{header}</th>;
                     })}
                  </tr>
               </thead>
               <tbody>
                  {importCsvData?.slice(1)?.map((rowData, i) => {
                     return (
                        <tr key={i}>
                           {rowData?.map?.((data, i) => {
                              return <td key={i}>{data}</td>;
                           })}
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         )}

         <CSVLink filename="my-file.csv" data={csvData}>
            Export to CSV
         </CSVLink>

         <table {...getTableProps()}>
            <thead>
               {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                           {column.render("Header")}
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {rows.map((row) => {
                  prepareRow(row);
                  return (
                     <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                           <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                           </td>
                        ))}
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}
