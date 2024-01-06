import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./table.scss";

interface Props  {
  columns: GridColDef[];
  rows: object[];
}

function Table({columns, rows}: Props) {

  return (
    <div className="relative h-[500px]">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
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
