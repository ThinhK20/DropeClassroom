/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { TransitionProps } from "@mui/material/transitions";
import { Assignment } from "../../models";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAssignmentModal(props: {
   isOpen: boolean;
   onClose: () => void;
}) {
   const [open, setOpen] = React.useState(false);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const currentClassId = useAppSelector(
      (state) => state.userClassroom.currentClass?.classId._id
   );

   const [assignment, setAssignment] = React.useState({
      assignmentName: "",
      assignmentDescription: "",
      assignmentDueDate: "",
      assignmentStatus: "Pending",
      assignmentCreatedBy: "",
      assignmentUpdatedBy: "",
      assignmentGrade: 0,
      assignmentGradeComment: "",
      assignmentPercentage: 50,
      assignmentClassId: "",
   });

   const currentClass = useAppSelector(
      (state) => state.userClassroom.currentClass
   );

   const userName = useAppSelector((state) =>
      state.users.data?.username?.toString()
   );

   const newAssignment = {
      assignmentName: assignment.assignmentName,
      assignmentDescription: assignment.assignmentDescription,
      assignmentDueDate: assignment.assignmentDueDate,
      assignmentStatus: assignment.assignmentStatus,
      assignmentCreatedBy: userName,
      assignmentUpdatedBy: assignment.assignmentUpdatedBy,
      assignmentGrade: assignment.assignmentGrade,
      assignmentPercentage: assignment.assignmentPercentage,
      assignmentClassId: currentClass?.classId._id as string,
   };

   const createAssignment = async (assignment: any) => {
      await fetch("http://localhost:8000/assignment/create", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(assignment),
      })
         .then((res: any) => {
            return res.json();
         })
         .then((res: any) => {
            return res.json();
         })
         .catch((err: any) => {
            console.log(err);
         });
   };

   return (
      <React.Fragment>
         <Button
            variant="outlined"
            onClick={handleOpen}
            startIcon={<AddIcon />}
            sx={{
               borderRadius: `60px`,
               padding: `20px`,
               marginBottom: `-20px`,
            }}
         >
            Create Assignment
         </Button>
         <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
         >
            <AppBar sx={{ position: "relative" }}>
               <Toolbar>
                  <IconButton
                     edge="start"
                     color="inherit"
                     onClick={handleClose}
                     aria-label="close"
                  >
                     <CloseIcon />
                  </IconButton>
                  <Typography
                     sx={{ ml: 2, flex: 1 }}
                     variant="h6"
                     component="div"
                  >
                     Create Assignment
                  </Typography>
                  <Button
                     autoFocus
                     color="inherit"
                     onClick={() => {
                        createAssignment(newAssignment);
                        handleClose();
                        //  reload the page
                        window.location.reload();
                     }}
                  >
                     save
                  </Button>
               </Toolbar>
            </AppBar>
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 10,
               }}
            >
               <form className="flex flex-col justify-center items-center w-[80%]">
                  <div className="space-y-12 w-full">
                     <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                           Create Assignment
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                           Create new assignment for{" "}
                           {currentClass?.classId.className}
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                           <div className="sm:col-span-4">
                              <label
                                 htmlFor="username"
                                 className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                 Assignment Name
                              </label>
                              <div className="mt-2">
                                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                       type="text"
                                       name="street-address"
                                       id="street-address"
                                       autoComplete="street-address"
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                       onChange={(e) => {
                                          setAssignment({
                                             ...assignment,
                                             assignmentName: e.target.value,
                                          });
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>

                           <div className="col-span-full">
                              <label
                                 htmlFor="about"
                                 className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                 Assignment Description
                              </label>
                              <div className="mt-2">
                                 <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                       setAssignment({
                                          ...assignment,
                                          assignmentDescription: e.target.value,
                                       });
                                    }}
                                 />
                              </div>
                              <p className="mt-3 text-sm leading-6 text-gray-600">
                                 Brief description for your assignment or
                                 instructions for your students.
                              </p>
                           </div>

                           <div className="col-span-full">
                              <label
                                 htmlFor="photo"
                                 className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                 Created By
                              </label>
                              <div className="mt-2 flex items-center gap-x-3">
                                 <svg
                                    className="h-12 w-12 text-gray-300"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                 >
                                    <path
                                       fill-rule="evenodd"
                                       d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                       clip-rule="evenodd"
                                    />
                                 </svg>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                       {userName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                       {new Date().toLocaleDateString()}
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div className="col-span-full">
                              <label
                                 htmlFor="cover-photo"
                                 className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                 Files
                              </label>
                              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                 <div className="text-center">
                                    <svg
                                       className="mx-auto h-12 w-12 text-gray-300"
                                       viewBox="0 0 24 24"
                                       fill="currentColor"
                                       aria-hidden="true"
                                    >
                                       <path
                                          fill-rule="evenodd"
                                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                          clip-rule="evenodd"
                                       />
                                    </svg>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                       <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                       >
                                          <span>Upload a file</span>
                                          <input
                                             id="file-upload"
                                             name="file-upload"
                                             type="file"
                                             className="sr-only"
                                          />
                                       </label>
                                       <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                       Any file up to 10 MB
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                           Due Date
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                           Set the due date for this assignment.
                        </p>
                        <TextField
                           id="datetime-local"
                           type="datetime-local"
                           defaultValue={new Date().toISOString().slice(0, 16)}
                           sx={{ width: 300, mb: 3 }}
                           InputLabelProps={{
                              shrink: true,
                           }}
                           onChange={(e) =>
                              setAssignment({
                                 ...assignment,
                                 assignmentDueDate: e.target.value,
                              })
                           }
                           style={{
                              marginRight: 100,
                           }}
                        />

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                           <div className="sm:col-span-3">
                              <label
                                 htmlFor="first-name"
                                 className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                 Grade
                              </label>
                              <div className="mt-2">
                                 <input
                                    type="number"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                       setAssignment({
                                          ...assignment,
                                          assignmentGrade: parseInt(
                                             e.target.value
                                          ),
                                       })
                                    }
                                 />
                              </div>
                           </div>
                           <div className="sm:col-span-4">
                              <label
                                 htmlFor="number"
                                 className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                 Percentage
                              </label>
                              <div className="mt-2">
                                 <input
                                    id="number"
                                    name="precetage"
                                    type="number"
                                    autoComplete="number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) =>
                                       setAssignment({
                                          ...assignment,
                                          assignmentPercentage: parseInt(
                                             e.target.value
                                          ),
                                       })
                                    }
                                 />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                           Assignment for
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                           Select the students that this assignment is for.
                        </p>
                        <div className="mt-10 space-y-10">
                           <fieldset>
                              <div className="mt-6 space-y-6">
                                 <div className="flex items-center gap-x-3">
                                    <input
                                       id="push-everything"
                                       name="push-notifications"
                                       type="radio"
                                       className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label
                                       htmlFor="push-everything"
                                       className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                       All students
                                    </label>
                                 </div>
                                 <div className="flex items-center gap-x-3">
                                    <input
                                       id="push-email"
                                       name="push-notifications"
                                       type="radio"
                                       className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label
                                       htmlFor="push-email"
                                       className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                       None (save as draft)
                                    </label>
                                 </div>
                              </div>
                           </fieldset>
                        </div>
                     </div>
                  </div>
               </form>
            </Box>
         </Dialog>
      </React.Fragment>
   );
}
