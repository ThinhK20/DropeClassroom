import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Classroom } from "../../../models";
import AvatarCustom from "../../../components/avatar/AvatarCustom";
import SecurityIcon from "@mui/icons-material/Security";
import { getClassByAdminApi } from "../../../apis/classroomApis";
import { AxiosError } from "axios";

function Classrooms() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Classroom[]>([]);
  const [isFetch, setIsFetch] = useState<boolean>(false);

  const deleteUser = useCallback(
    (id: string) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      });
    },
    []
  );

  const toggleActive = useCallback(
    (id: string) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === id ? { ...row, isActive: !row.isActive } : row
        )
      );
    },
    []
  );

  const columns = useMemo<GridColDef<Classroom>[]>(
    () => [
      {
        field: "classCode",
        headerName: "Class Code",
        width: 120,
      },
      {
        field: "className",
        headerName: "Class Name",
        width: 150,
      },
      {
        field: "owner",
        headerName: "Owner",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="flex items-center justify-center gap-[10px]">
              <AvatarCustom
                classroomAvatar={false}
                name={params.row.owner.username}
                height={30}
                width={30}
              />
              <p>{params.row.owner.username}</p>
            </div>
          );
        },
      },
      {
        field: "email",
        headerName: "Email",
        width: 260,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.owner.email || ""}`,
      },
      {
        field: "isActive",
        headerName: "Status",
        width: 150,
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
            onClick={toggleActive(params.row._id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleActive, navigate]
  );

  useEffect(() => {
    if (!isFetch) {
      const ctrl = new AbortController();

      getClassByAdminApi(ctrl.signal).then((data)=> {
        setRows(data.data);
        ctrl.abort();
      }).catch((err: AxiosError) => {
        console.log(err);
        ctrl.abort();
      })

      setIsFetch(false);
    }
  }, [isFetch]);

  return (
    <div className="relative w-full h-full pt-5 pb-10 px-6 md:px-10 flex flex-col flex-1 items-start overflow-hidden ">
      <div className=" w-full listContainer p-[20px] shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)]">
        <div className="listTitle mb-2 flex justify-between items-center">
          <p className="font-[500] text-gray-600 text-2xl">List Classrooms</p>
          <div
            className={
              "cursor-pointer link flex justify-between items-center gap-2 text-blue-600 border-2 p-[5px] rounded-md border-blue-600 hover:text-blue-800"
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

export default Classrooms;
