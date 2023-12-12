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
        element: <div>Hello grades</div>,
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
]);
