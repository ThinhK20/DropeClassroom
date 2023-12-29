import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { UserResponse } from "../../../models";
import AvatarCustom from "../../../components/avatar/AvatarCustom";
import SecurityIcon from "@mui/icons-material/Security";

function Users() {
  const navigate = useNavigate();
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
        width: 230,
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
      { field: "email", headerName: "Email", width: 230 },
      { field: "role", headerName: "Role", width: 90 },
      {
        field: "isActive",
        headerName: "Status",
        width: 120,
        renderCell: (params) => {
          return (
            <div
              className={`cellWithStatus cursor-pointer ${
                params.row.isActive ? "active" : "pending"
              }`}
            >
              {params.row.isActive ? "active" : "pending"}
            </div>
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<img src="/src/assets/view.svg" />}
            label="Delete"
            onClick={() => {
              navigate("ad/user/" + params.row._id);
            }}
          />,
          <GridActionsCellItem
            icon={<img src="/src/assets/delete.svg" />}
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
    [deleteUser, toggleAdmin, navigate]
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
    <div className="relative w-full h-full pt-5 pb-10 px-6 md:px-10 flex flex-col flex-1 items-start overflow-hidden ">
      <div className=" w-full listContainer p-[20px] shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)]">
        <div className="listTitle mb-2 flex justify-between items-center">
          <p className="font-[500] text-gray-600 text-2xl">List Users</p>
          <div
            className={
              "link flex justify-between items-center gap-2 text-blue-600 border-2 p-[5px] rounded-md border-blue-600 hover:text-blue-800"
            }
          >
            {/* <AddCircleOutlineOutlinedIcon /> */}
            Add new
          </div>
        </div>
        <Table rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default Users;