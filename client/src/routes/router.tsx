import { createBrowserRouter } from "react-router-dom";

import Home from "../page/home/home";
import Schedule from "../page/schedule/Schedule";
import Archived from "../page/achieved/Achived";
import Setting from "../page/setting/Setting";
import App from "../App";
import ClassRoom from "../page/class/ClassRoom";
import SignUp from "../page/signup/signup";
import SignIn from "../page/signin/signin";
import ExcelTable from "../components/ExcelTable/ExcelTable";
import Stream from "../page/class/stream/Stream";
import ListAssignments from "../page/listAssignments";
import People from "../page/class/people/people";
import ScoreManagement from "../page/class/score-management/score-management";
import GradeReviews from "../page/class/grade-reviews/grade-reviews";
import Admin from "../page/admin/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/h",
    element: <Home />,
  },
  {
    path: "/schedule",
    element: <Schedule />,
  },
  {
    path: "/h/archived",
    element: <Archived />,
  },
  {
    path: "/s",
    element: <Setting />,
  },
  {
    path: "/c/:id",
    element: <ClassRoom />,
    children: [
      {
        path: "/c/:id",
        element: <Stream />,
      },
      {
        path: "w/t/all",
        element: <ListAssignments />,
      },
      {
        path: "uic/all",
        element: <People />,
      },
      {
        path: "gb/all",
        element: <ScoreManagement />,
      },
      {
        path: "gr/all",
        element: <GradeReviews />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/testing",
    element: <ExcelTable />,
  },
  {
    path: "/ad",
    element: <Admin />,
    children: [
      {
        path: "/ad/",
        element: <div>Hello DashBoard</div>,
      },
      {
        path: "/ad/u",
        element: <div>Hello Users</div>,
      },
      {
        path: "/ad/cr",
        element: <div>Hello Classrooms</div>,
      },
      {
        path: "/ad/stats",
        element: <div>stats</div>,
      },
      {
        path: "/ad/notifi",
        element: <div>Hello Notifications</div>,
      },
      {
        path: "/ad/s",
        element: <div>Hello Setting</div>,
      },
    ],
  },
]);
