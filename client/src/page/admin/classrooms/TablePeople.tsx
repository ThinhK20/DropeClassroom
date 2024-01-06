import { useEffect, useMemo, useState } from "react";
import { Classroom, ObjectUserClassRoom } from "../../../models";
import { AxiosError } from "axios";
import { getAllUsersClassApi } from "../../../apis/classroomApis";
import AvatarCustom from "../../../components/avatar/AvatarCustom";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Table from "../../../components/table/Table";
interface Props {
  clr: Classroom;
}
function TablePeople({ clr }: Props) {
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [rows, setRows] = useState<ObjectUserClassRoom[]>([]);

  const columns = useMemo<GridColDef<ObjectUserClassRoom>[]>(
    () => [
      {
        field: "userId",
        headerName: "User Name",
        width: 150,
        // valueFormatter: ({ value }) => `${value.}`,
        renderCell: (params) => {
          return (
            <div className="flex items-center justify-center gap-[10px]">
              <AvatarCustom
                classroomAvatar={false}
                name={params.row.userId.username}
                height={30}
                width={30}
              />
              <p>{params.row.userId.username}</p>
            </div>
          );
        },
      },
      {
        field: "email",
        headerName: "Email",
        width: 230,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.userId.email || ""}`,
      },
      {
        field: "role",
        headerName: "Role",
        width: 90,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.role || ""}`,
      },
    ],
    []
  );

  useEffect(() => {
    if (!isFetch) {
      const ctrl = new AbortController();
      getAllUsersClassApi(clr._id, ctrl.signal)
        .then((data) => {
          setRows(data);
          setIsFetch(true);
          ctrl.abort();
        })
        .catch((err: AxiosError) => {
          console.log(err);
          setIsFetch(true);
          ctrl.abort();
        });
    }
  }, [isFetch]);

  if (!clr) return;

  return (
    <>
      <p className="font-[600] text-2xl py-2">Peoples</p>
      <Table rows={rows} columns={columns} tableNumber={4} height="205"/>
    </>
  );
}

export default TablePeople;
