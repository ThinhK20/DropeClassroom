/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAllStudentAssignmentsByClassId,
  getStudentAssignmentById,
  updateStudentAssignmentApi,
} from "../../../apis/studentAssignmentApis";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  setGroupStudentAssignmentsByAssignmentId,
  setGroupStudentAssignmentsByStudentId,
} from "../../../store/studentAssignmentSlice";
import { createNotification } from "../../../apis/notificationApis";

type Props = {
  id: string;
};

export default function SetStudentScore(props: Props) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState<any>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentUserName = useAppSelector((state) => state.users.data?.username);

  const currentClassName = useAppSelector(
    (state) => state.userClassroom.currentClass?.classId.className
  );

  const handleSubmit = () => {
    updateStudentAssignmentApi(student._id, student)
      .then(() => {
        toast.success("Updated successfully.");
        init();
      })
      .catch((err) => toast.error(err))
      .finally(() => handleClose());
  };

  function getClassId() {
    const inputString = location.pathname;

    // Find the index of "/c/" and "/gb/"
    const startIndex = inputString.indexOf("/c/") + 3;
    const endIndex = inputString.indexOf("/gb/");

    // Extract the substring between the indices
    const result = inputString.slice(startIndex, endIndex);
    return result;
  }

  function init() {
    const promises = [
      getAllStudentAssignmentsByClassId(true, getClassId()),
      getAllStudentAssignmentsByClassId(true, getClassId(), true),
    ];

    Promise.all(promises)
      .then(([groupAssignments1, groupAssignments2]) => {
        dispatch(
          setGroupStudentAssignmentsByAssignmentId(groupAssignments1.data)
        );
        dispatch(setGroupStudentAssignmentsByStudentId(groupAssignments2.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getStudentAssignmentById(props.id)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  function handleChangeScore(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setStudent({ ...student, grade: e.target.value });
  }

  return (
    <>
      <button onClick={handleOpen}>Set student score</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-white top-1/3 left-1/2 -translate-x-1/2 p-6 rounded-xl absolute">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit the student assignment's score ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Student will be received notifications and can be check the
            assignment's score.
          </Typography>
          <div className="flex items-center gap-4 pt-4">
            <Typography>{student?.studentId?.username}</Typography>
            <TextField
              type="number"
              value={student?.grade}
              onChange={handleChangeScore}
            ></TextField>
          </div>
          <div className="pt-4 flex justify-end gap-4">
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit();
                createNotification({
                  title: currentUserName as string,
                  content: `updated your score in assignment in ${currentClassName}`,
                  studentId: student?.studentId,
                  classId: getClassId(),
                  assignmentId: student?.assignments?.assignmentId,
                  link: `/c/${getClassId()}/gb/all`,
                });
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
