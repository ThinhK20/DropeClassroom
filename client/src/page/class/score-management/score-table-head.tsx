/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableCell, Typography } from "@mui/material";
import { Assignment } from "../../../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { updateAssignmentStatusApi } from "../../../apis/assignmentApis";
import { AssignmentStatusEnum } from "../../../shared/enums/StudentAssignment";
import { toast } from "react-toastify";
import ViewAssigmentModal from "../../../components/modal/ViewAssignmentModal";
import { useDispatch } from "react-redux";
import { setAssignments } from "../../../store/assignmentSlice";
import { createNotification } from "../../../apis/notificationApis";
import { useAppSelector } from "../../../hooks/hooks";
import { DraggableComponent } from "./drag-&-drop/draggable-component";
import ExportScoreTemplate from "./excels/export-score-template";
import ImportScoreTemplate from "./excels/import-score-template";
import { BASE_API_URL } from "../../../apis/axiosInterceptor";

interface Props {
  assignment: Assignment | undefined;
  index?: number;
}

export default function ScoreTableHead(props: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  // const [openMarkFinishConfirm, setOpenMarkFinishConfirm] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useAppSelector((state) => state.users.data);

  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );

  useEffect(() => {
    //  click outside menu to close
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  function getClassId() {
    const inputString = location.pathname;

    // Find the index of "/c/" and "/gb/"
    const startIndex = inputString.indexOf("/c/") + 3;
    const endIndex = inputString.indexOf("/gb/");

    // Extract the substring between the indices
    const result = inputString.slice(startIndex, endIndex);
    return result;
  }

  const getAllAssignments = async () => {
    await fetch(`${BASE_API_URL}/assignment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: Assignment[]) => {
        dispatch(
          setAssignments(
            data.filter(
              (assignment) => assignment.assignmentClassId === getClassId()
            )
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function markAssignmentToFinish() {
    updateAssignmentStatusApi(
      props.assignment?._id?.toString() as string,
      AssignmentStatusEnum.Completed
    )
      .then(() => {
        getAllAssignments();
        toast.success(
          `Mark assignment ${props.assignment?.assignmentName} as completed successfully.`
        );
        createNotification({
          title: "Assignment completed",
          content: `Assignment ${props.assignment?.assignmentName} was completed by ${currentUser?.username}`,
          classId: getClassId(),
          studentId: currentUser?._id as string,
          link: `/c/${getClassId()}/gb/all`,
        });
      })
      .catch((err) => toast.error(err));
  }

  return (
    <TableCell
      className="flex flex-col h-[200px]"
      component={DraggableComponent(
        props.assignment?._id.toString() as string,
        props.index as number
      )}
    >
      <div className="flex items-center justify-between relative">
        <div>
          <Typography fontSize={12}>No submission deadline</Typography>
          <Typography>{props.assignment?.assignmentName}</Typography>
          <Typography fontSize={12}>Max score: 100</Typography>
        </div>
        <div>
          {props.assignment?.assignmentStatus ===
            AssignmentStatusEnum.Completed && (
            <Typography
              className="bg-green-600 px-2 text-center rounded py-1 text-white"
              fontSize={12}
            >
              {props.assignment?.assignmentStatus}
            </Typography>
          )}
        </div>
        <div className="relative">
          {/* button relative and absolute menu dont use MUI */}
          <button
            aria-label="more"
            id="long-button"
            aria-haspopup="true"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
            className="relative z-10 block rounded p-2 "
          >
            <FontAwesomeIcon icon={faEllipsisVertical} size={"lg"} />
          </button>
          {openMenu && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20"
              ref={menuRef}
            >
              {props.assignment?.assignmentStatus !==
                AssignmentStatusEnum.Completed &&
                currentClass?.role !== "student" && (
                  <div
                    className="block px-4 py-2 text-sm text-gray-200 cursor-pointer hover:bg-gray-200 hover:text-white"
                    style={{
                      color: "black",
                    }}
                    onClick={() => {
                      markAssignmentToFinish();
                    }}
                  >
                    Mark as completed
                  </div>
                )}

              {/* <div
                className="block px-4 py-2 text-sm text-gray-200 cursor-pointer hover:bg-gray-200 hover:text-white"
                style={{
                  color: "black",
                }}
              >

              </div> */}
              <ViewAssigmentModal
                assignment={props.assignment as any}
                isOpen={true}
                onClose={() => {
                  // setShowModal(false);
                }}
                title="View"
                role={""}
              />
              <div className="p-4 hover:bg-gray-200 ">
                <ExportScoreTemplate assignment={props.assignment} />
              </div>
              <div className="p-4 hover:bg-gray-200 ">
                <ImportScoreTemplate assignment={props.assignment} />
              </div>
            </div>
          )}
        </div>
      </div>
    </TableCell>
  );
}
