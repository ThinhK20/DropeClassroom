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
        // renderCell: (params) => {
        //   return (
        //     <div className="relative w-full h-full">
        //       <img
        //         src={params.row.coverImage}
        //         alt="img-class"
        //         className="relative object-cover"
        //       ></img>
        //       <p className="absolute inset-0 text-white px-2 flex items-center ">
        //         {params.row.className}
        //       </p>
        //     </div>
        //   );
        // },
      },
    //   {
    //     field: "subject",
    //     headerName: "Subject",
    //   },
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
          _id: "657883e3ea322c82b2db08e0",
          className: "Nest Js Tutorial",
          section: "Junior",
          subject: "Web Advanced Development",
          room: "20CLC01",
          coverImage: "/src/assets/gg3.png",
          owner: {
            _id: "6566115223c81cf1bc4e7f15",
            username: "Minh An",
            email: "anhoang483@gmail.com",
            dateOfBirth: "2002-06-24T00:00:00.000Z",
            isActive: true,
            gender: "m",
            role: "admin",
            about: "Developer HCMUS - intern",
            address: "District 1",
          },
          isActive: true,
          classCode: "08b147",
          createdAt: "2023-12-12T16:01:39.216Z",
          updatedAt: "2023-12-23T14:37:28.204Z",
        },
        {
          _id: "65788463ea322c82b2db08e7",
          className: ".NET Tutorial",
          section: "Beginer",
          subject: "Web Advanced Development",
          room: "20CLC01",
          coverImage: "/src/assets/gg3.png",
          owner: {
            address: "",
            about: "",
            _id: "656f288b65ab6e44490ad976",
            username: "Thinh Nguyen",
            email: "thinhnguyent.2002@gmail.com",
            dateOfBirth: null,
            isActive: true,
            gender: "m",
            role: "user",
          },
          isActive: true,
          classCode: "6eb97d",
          createdAt: "2023-12-12T16:03:47.153Z",
          updatedAt: "2023-12-12T16:03:47.153Z",
        },
        {
          _id: "6579b288feaf8ab7db9e753e",
          className: "Advance Web",
          section: "Technology",
          subject: "Subject 1 ",
          room: "1",
          coverImage: "/src/assets/gg2.png",
          owner: {
            address: "",
            about: "",
            _id: "656c7fa4483f61a479518b10",
            username: "Nighlord",
            email: "nighlord13082002@gmail.com",
            dateOfBirth: "2023-11-10T17:00:00.000Z",
            isActive: true,
            gender: "m",
            role: "user",
          },
          isActive: true,
          classCode: "bd5e6c",
          createdAt: "2023-12-13T13:32:56.846Z",
          updatedAt: "2023-12-13T13:32:56.846Z",
        },
        {
          _id: "6579c5d261a85808d76cceba",
          className: "123dá",
          section: "123",
          subject: "afasf",
          room: "haha",
          coverImage: "/src/assets/gg1.png",
          owner: {
            address: "",
            about: "",
            _id: "656f288b65ab6e44490ad976",
            username: "Thinh Nguyen",
            email: "thinhnguyent.2002@gmail.com",
            dateOfBirth: null,
            isActive: true,
            gender: "m",
            role: "user",
          },
          isActive: true,
          classCode: "c14b10",
          createdAt: "2023-12-13T14:55:14.839Z",
          updatedAt: "2023-12-13T18:13:39.902Z",
        },
      ]);

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
