import { createBrowserRouter } from "react-router-dom";

import Home from "../page/home/home";
import Schedule from "../page/schedule/Schedule";
import Archived from "../page/achieved/Achived";
import Setting from "../page/setting/Setting";
import App from "../App";
import ClassRoom from "../page/class/ClassRoom";
import SignUp from "../page/signup/signup";
import SignIn from "../page/signin/signin";
import TeacherMarkPage from "../page/markPage/teacher";
import StudentMarkPage from "../page/markPage/student";
import ExcelTable from "../components/ExcelTable/ExcelTable";

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
      path: "/user/teacher/course/mark",
      element: <TeacherMarkPage />,
   },
   {
      path: "/user/student/course/mark",
      element: <StudentMarkPage />,
   },
   {
      path: "/testing",
      element: <ExcelTable />,
   },
]);
