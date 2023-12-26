import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import SecurityIcon from "@mui/icons-material/Security";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserResponse } from "../../models";
import AvatarCustom from "../avatar/AvatarCustom";
import { useCallback, useEffect, useMemo, useState } from "react";

function Table() {
  const [rows, setRows] = useState<UserResponse[]>([]);
  const [isFetch, setIsFetch] = useState<boolean>(false);

  const deleteUser = useCallback(
    (id: string) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      });
    },
    []
  );

  const toggleAdmin = useCallback(
    (id: string) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === id ? { ...row, isActive: !row.isActive } : row
        )
      );
    },
    []
  );

  const columns = useMemo<GridColDef<UserResponse>[]>(
    () => [
      {
        field: "_id",
        headerName: "ID",
        width: 260,
        renderHeader: () => <strong className="">{"ID "}</strong>,
      },
      {
        field: "username",
        headerName: "User Name",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="flex items-center justify-center gap-[10px]">
              <AvatarCustom
                classroomAvatar={false}
                name={params.row.username}
                height={30}
                width={30}
              />
              <p>{params.row.username}</p>
            </div>
          );
        },
      },
      { field: "email", headerName: "Email", width: 260 },
      {
        field: "isActive",
        headerName: "Status",
        width: 180,
        renderCell: (params) => {
          return (
            <div
              className={`cellWithStatus cursor-pointer ${
                params.row.isActive ? "active" : "pending"
              }`}
              onClick={() => {
                // const r = rows.findIndex((r) => r._id === params.row._id);
                // if (r === -1) return;
                // const updateRows = [...rows];
                // updateRows[r] = {
                //   ...updateRows[r],
                //   isActive: !params.row.isActive,
                // };
                // setRows(updateRows);
              }}
            >
              {params.row.isActive ? "active" : "pending"}
            </div>
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        width: 90,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.row._id)}
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label={`${params.row.isActive ? "Pending" : "Active"}`}
            onClick={toggleAdmin(params.row._id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleAdmin]
  );

  useEffect(() => {
    if (!isFetch) {
      setRows([
        {
          address: "",
          about: "",
          _id: "656c7fa4483f61a479518b10",
          username: "Nighlord",
          email: "nighlord13082002@gmail.com",
          dateOfBirth: "2023-11-10T17:00:00.000Z",
          isActive: true,
          gender: "m",
          role: "user",
          createdDate: "2023-12-03T12:54:37.167Z",
          updatedDate: "2023-12-03T12:54:37.167Z",
        },
        {
          address: "",
          about: "",
          _id: "656f288b65ab6e44490ad976",
          username: "Thinh Nguyen",
          email: "thinhnguyent.2002@gmail.com",
          dateOfBirth: null,
          isActive: true,
          gender: "m",
          role: "user",
          createdDate: "2023-12-05T13:11:25.656Z",
          updatedDate: "2023-12-05T13:11:25.656Z",
        },
        {
          address: "",
          about: "",
          _id: "65742682e0a8358c649eebc7",
          username: "Tai Nguyen",
          email: "tainguyensanh@gmail.com",
          dateOfBirth: null,
          isActive: false,
          gender: "m",
          role: "user",
          createdDate: "2023-12-09T08:27:02.376Z",
          updatedDate: "2023-12-09T08:27:02.376Z",
        },
      ]);

      setIsFetch(false);
    }
  }, [isFetch]);

  return (
    <div className="relative h-[500px]">
      <DataGrid
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
      />
    </div>
  );
}

export default Table;
