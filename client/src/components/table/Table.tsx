import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./table.scss";

interface Props  {
  columns: GridColDef[];
  rows: object[];
  tableNumber?: number;
  height?: string;
}

function Table({columns, rows, tableNumber = 10, height = '500'}: Props) {

  return (
    <div className={`relative h-[${height}px]`}>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: tableNumber },
          },
        }}
        // pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        disableDensitySelector
        disableColumnSelector
    
      />
    </div>
  );
}

export default Table;
