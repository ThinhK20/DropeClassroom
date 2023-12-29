/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  MenuItem,
  Select,
  Slide,
  TextField,
  TextareaAutosize,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { useLocation } from "react-router-dom";
import {
  CreateGradeReviewType,
  GradeReview,
} from "../../../models/GradeReview";
import {
  acceptGradeReviewApi,
  createGradeReviewApi,
  getAllGradeReviewsByClassIdApi,
  updateGradeReviewApi,
} from "../../../apis/gradeReviewsApis";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGradeReviews } from "../../../store/gradeReviewsSlice";
import { AssignmentStatusEnum } from "../../../shared/enums/StudentAssignment";
import { createNotification } from "../../../apis/notificationApis";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  gradeReview?: GradeReview;
  isEdit?: boolean;
  children?: React.ReactElement;
}

export default function CreateGradeReview(props: Props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const assignments = useAppSelector((state) => state.assignment).assignments;
  const groupStudentAssignmentsByStudentId = useAppSelector(
    (state) => state.studentAssignments
  ).data.groupStudentAssignmentsByStudentId;

  const [assignmentId, setAssignmentId] = useState<string>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [submitData, setSubmitData] = useState<CreateGradeReviewType>();

  useEffect(() => {
    setSubmitData(props.gradeReview! as any);
    setAssignmentId(props.gradeReview?.studentAssignment as any);
  }, []);

  const currentUser = useAppSelector((state) => state.users.data);

  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  function getClassId() {
    const inputString = location.pathname;

    // Find the index of "/c/" and "/gb/"
    const startIndex = inputString.indexOf("/c/") + 3;
    const endIndex = inputString.indexOf("/gr/");

    // Extract the substring between the indices
    const result = inputString.slice(startIndex, endIndex);
    return result;
  }

  function handleSubmit() {
    if (!submitData) {
      console.error("Create grade review is empty.");
    }

    const modifiedData = {
      ...submitData,
      classId: getClassId(),
      studentAssignment: groupStudentAssignmentsByStudentId[0].assignments.find(
        (val) => (val.assignmentId as any) === assignmentId?.toString()
      )?._id,
    };
    if (props.gradeReview) {
      updateGradeReviewApi(modifiedData as any)
        .then(() => {
          toast.success("Updated successfully");
          createNotification({
            title: "Grade review updated",
            content: "Grade review updated",
            studentId: currentUser?._id as string,
            classId: getClassId(),
          });
          fetchGradeReviewsApi();
        })
        .catch((err) => toast.error(err))
        .finally(() => handleClose());
    } else {
      createGradeReviewApi(modifiedData as CreateGradeReviewType)
        .then(() => {
          toast.success("Request successfully.");
          createNotification({
            title: "Grade review created",
            content: "Grade review created",
            studentId: currentUser?._id as string,
            classId: getClassId(),
          });
          fetchGradeReviewsApi();
        })
        .catch((err) => toast.error(err))
        .finally(() => {
          handleClose();
        });
    }
  }

  function fetchGradeReviewsApi() {
    getAllGradeReviewsByClassIdApi(getClassId()).then((res) => {
      dispatch(setGradeReviews(res.data));
    });
  }

  function handleAccept() {
    if (!submitData) {
      console.error("Accept grade review is empty.");
    }

    const modifiedData = {
      ...submitData,
      classId: getClassId(),
      studentAssignment: groupStudentAssignmentsByStudentId[0].assignments.find(
        (val) => (val.assignmentId as any) === assignmentId?.toString()
      )?._id,
    };

    acceptGradeReviewApi(modifiedData as any)
      .then(() => {
        toast.success("Request successfully.");
        fetchGradeReviewsApi();
      })
      .catch((err) => toast.error(err))
      .finally(() => handleClose());
  }

  const tooltipTitle = !props.isEdit
    ? "View grade request"
    : "Create a new grade request";

  return (
    <div className="pt-2">
      {groupStudentAssignmentsByStudentId.length > 0 && (
        <Tooltip title={tooltipTitle}>
          {props.children ? (
            <div onClick={handleOpen}>{props.children}</div>
          ) : (
            <Button variant="outlined" color="primary" onClick={handleOpen}>
              Create
            </Button>
          )}
        </Tooltip>
      )}
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Request Grade Review
            </Typography>
            {props.isEdit && (
              <Button variant="outlined" color="inherit" onClick={handleSubmit}>
                Submit
              </Button>
            )}
            {props.gradeReview?.status !== AssignmentStatusEnum.Completed &&
              currentClass?.role !== "student" && (
                <Button
                  variant="outlined"
                  color="inherit"
                  style={{ marginLeft: "20px" }}
                  onClick={handleAccept}
                >
                  Accept
                </Button>
              )}
            <Button
              autoFocus
              style={{ marginLeft: "20px" }}
              color="inherit"
              onClick={() => {
                handleClose();
              }}
            >
              Close
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
              <div className=" border-gray-900/10 pb-12">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Request Assignment
                    </label>
                    <div className="mt-2">
                      <Select
                        placeholder="Assignment name"
                        onChange={(e) =>
                          setAssignmentId(e.target.value as string)
                        }
                        defaultValue={
                          props.gradeReview?.studentAssignment?.assignmentId
                            ?._id
                        }
                        disabled={!props?.isEdit}
                        className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                      >
                        {assignments.map((assignment) => (
                          <MenuItem key={assignment._id} value={assignment._id}>
                            {assignment.assignmentName}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Student Explaination
                    </label>
                    <div className="mt-2">
                      <TextareaAutosize
                        name="studentExplanation"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        minRows={3}
                        disabled={!props?.isEdit}
                        value={submitData?.studentExplanation}
                        onChange={(e) =>
                          setSubmitData({
                            ...submitData,
                            studentExplanation: e.target.value.toString(),
                          } as any)
                        }
                      />
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Give the reasons for this request review.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Grade Expectation
                    </label>
                    <div className="mt-2">
                      <TextField
                        name="gradeExpectation"
                        type="number"
                        disabled={!props?.isEdit}
                        inputProps={{ min: 0, max: 100 }}
                        defaultValue={0}
                        value={submitData?.gradeExpectation}
                        className="block w-fit rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          setSubmitData({
                            ...submitData,
                            gradeExpectation: e.target.value,
                          } as any)
                        }
                      />
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Give a grade that you want to have.
                      </p>
                    </div>
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
                          {props.gradeReview?.studentAssignment?.studentId
                            ?.userId?.username || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}
