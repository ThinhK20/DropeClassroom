/* eslint-disable @typescript-eslint/no-explicit-any */
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  GroupStudentAssignmentsByStudentId,
  StudentAssignment,
} from "../../../models/StudentAssignment";
import { getAllStudentAssignmentsByClassId } from "../../../apis/studentAssignmentApis";
import { useLocation } from "react-router-dom";
import ExportScoreBoard from "./excels/export-score-board";
import ScoreTableHead from "./score-table-head";
import ScoreTableCell from "./score-table-cell";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  setGroupStudentAssignmentsByAssignmentId,
  setGroupStudentAssignmentsByStudentId,
} from "../../../store/studentAssignmentSlice";
import { getUserClassroomApi } from "../../../apis/userClassroomApis";
import { Assignment, User, UserClassRoom } from "../../../models";
import { setAssignments } from "../../../store/assignmentSlice";
import { DroppableComponent } from "./drag-&-drop/droppable-component";
import { DropResult } from "react-beautiful-dnd";
import { BASE_API_URL } from "../../../apis/axiosInterceptor";

export default function ScoreManagement() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<(User & { studentId: string })[]>([]);

  const assignments = useAppSelector((state) => state.assignment).assignments;
  const groupStudentAssignmentsByAssignmentId = useAppSelector(
    (state) => state.studentAssignments
  ).data.groupStudentAssignmentsByAssignmentId;
  const groupStudentAssignmentsByStudentId = useAppSelector(
    (state) => state.studentAssignments
  ).data.groupStudentAssignmentsByStudentId;

  function getClassId() {
    const inputString = location.pathname;

    // Find the index of "/c/" and "/gb/"
    const startIndex = inputString.indexOf("/c/") + 3;
    const endIndex = inputString.indexOf("/gb/");

    // Extract the substring between the indices
    const result = inputString.slice(startIndex, endIndex);
    return result;
  }

  useEffect(() => {
    setGroupByStudentIdState([...groupStudentAssignmentsByStudentId]);
  }, [groupStudentAssignmentsByStudentId]);

  const [groupByStudentIdState, setGroupByStudentIdState] = useState<
    GroupStudentAssignmentsByStudentId[]
  >([]);

  const [calculateAverageScores, setCalculateAverageScores] = useState<
    (
      | {
          assignmentId: Assignment;
          averageScore: number;
          studentAssignments: StudentAssignment[];
        }
      | undefined
    )[]
  >([]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const existedGroupIds = [] as string[];
    const averageScores = assignments.map((assignment) => {
      const group =
        groupStudentAssignmentsByAssignmentId?.[
          assignment._id.toString() as string
        ];
      // Calculate total score
      if (group) {
        const totalScore = group.reduce(
          (sum: number, assignment: StudentAssignment) =>
            sum + assignment.grade,
          0
        );

        // Calculate average score
        const averageScore = totalScore / group.length || 0;

        existedGroupIds.push(assignment._id.toString());
        return {
          assignmentId: assignment,
          averageScore,
          studentAssignments: group,
        };
      }
    });

    const otherGroups = assignments
      .filter((x) => existedGroupIds.indexOf(x._id) === -1)
      .map((x) => ({
        assignmentId: x,
        averageScore: 0,
        studentAssignments: [],
      }));

    setCalculateAverageScores([...averageScores, ...otherGroups]);
  }, [assignments, groupStudentAssignmentsByAssignmentId]);

  async function getAllUsers() {
    if (groupStudentAssignmentsByStudentId?.length <= 0) return;
    return Promise.all(
      groupStudentAssignmentsByStudentId.map(async (value) => {
        const data = (await getUserClassroomApi(value.studentId))
          .data as UserClassRoom;
        return { ...data.userId, studentId: data._id };
      })
    );
  }

  useEffect(() => {
    getAllUsers().then((value) => setUsers(value as any));
  }, [groupStudentAssignmentsByStudentId]);

  function getTotalScore(group: GroupStudentAssignmentsByStudentId) {
    let num = 0;
    let deno = 0;
    group.assignments.forEach((studentAssignment) => {
      num +=
        studentAssignment.grade *
        studentAssignment.assignmentId?.assignmentPercentage;
      deno += studentAssignment.assignmentId?.assignmentPercentage;
    });
    if (deno <= 0) deno = 1;
    return Math.floor(num / deno);
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

  function init() {
    const promises = [
      getAllStudentAssignmentsByClassId(true, getClassId()),
      getAllStudentAssignmentsByClassId(true, getClassId(), true),
    ];

    getAllAssignments();

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

  function renderTableSummaryCell() {
    const getTotalSummaryScore = () => {
      let num = 0;
      let deno = 0;
      calculateAverageScores.forEach((avgScore) => {
        const averageScore = avgScore?.averageScore as number;
        const assignmentPercent = avgScore?.assignmentId
          ?.assignmentPercentage as number;
        num += averageScore * assignmentPercent;
        deno += assignmentPercent;
      });
      if (deno <= 0) deno = 1;
      return Math.floor(num / deno);
    };

    return (
      <>
        {calculateAverageScores.map((avgScore, key) => (
          <TableCell
            className="flex flex-row"
            align="left"
            key={key}
            scope="row"
          >
            <label>{avgScore?.averageScore}</label>
            <label>/100</label>
          </TableCell>
        ))}
        <TableCell>
          <span className="font-bold">{getTotalSummaryScore()}/100</span>
        </TableCell>
        <TableCell></TableCell>
      </>
    );
  }

  function handleDragEnd(result: DropResult) {
    // Swap headers
    const cloneCalculateAverageScores = [...calculateAverageScores];
    const temp = cloneCalculateAverageScores[result.source.index];
    cloneCalculateAverageScores[result.source.index] =
      cloneCalculateAverageScores[result.destination?.index as any];
    cloneCalculateAverageScores[result.destination?.index as any] = temp;
    setCalculateAverageScores(cloneCalculateAverageScores);

    // Swap body
    const cloneGroupByStudentIdState = [...groupByStudentIdState].map((row) => {
      const assignments = [...row.assignments];
      const temp2 = assignments[result.source.index];
      assignments[result.source.index] =
        assignments[result.destination?.index as any];
      assignments[result.destination?.index as any] = temp2;

      row = { ...row, assignments };

      return row;
    });
    setGroupByStudentIdState(cloneGroupByStudentIdState);
  }

  return (
    <>
      <div className="fixed bottom-10 right-2 flex flex-col gap-5 z-50">
        <ExportScoreBoard />
      </div>

      <TableContainer component={Paper} className="relative w-full pt-[50px]">
        <div
          style={{
            width: "110%",
            overflowX: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow component={DroppableComponent(handleDragEnd)}>
                <TableCell></TableCell>
                {calculateAverageScores.map((averageScore, key) => {
                  const assignment = assignments.find(
                    (x) => x._id === averageScore?.assignmentId?._id
                  );
                  return (
                    <ScoreTableHead
                      key={key}
                      assignment={assignment}
                      index={key}
                    />
                  );
                })}
                <TableCell>Total Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={"score-avg"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography>
                    <FontAwesomeIcon
                      icon={faUser}
                      size="2xl"
                      className="mr-2"
                    />
                    Class average score
                  </Typography>
                </TableCell>
                {renderTableSummaryCell()}
              </TableRow>
              {groupByStudentIdState.map((row: any) => {
                return (
                  row?.studentId && (
                    <TableRow
                      key={row?.studentId}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="flex items-center"
                      >
                        <Typography>
                          {
                            users?.find(
                              (user) => user.studentId === row.studentId
                            )?.username
                          }
                        </Typography>
                      </TableCell>
                      {row.assignments.map((assignment: any, key: number) => {
                        if (!assignment)
                          return (
                            <>
                              <ScoreTableCell key={key} score={0} />
                            </>
                          );
                        return (
                          <>
                            <ScoreTableCell
                              score={assignment?.grade}
                              studentAssignment={assignment}
                              key={key}
                            />
                          </>
                        );
                      })}
                      <TableCell>
                        <span className="font-bold">
                          {getTotalScore(row)}/100
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                );
              })}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </>
  );
}
