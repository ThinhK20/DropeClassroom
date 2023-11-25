import { createBrowserRouter } from "react-router-dom";

import Home from "../page/home/home";
import Schedule from "../page/schedule/Schedule";
import Archived from "../page/achieved/Archived";
import Setting from "../page/setting/Setting";
import App from "../App";
import ClassRoom from "../page/class/ClassRoom";
import SignUp from "../page/signup/signup";
import SignIn from "../page/signin/signin";

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
      path: "/shedule",
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
      path: "/signup",
      element: <SignUp />,
   },
   {
      path: "/signin",
      element: <SignIn />,
   },

   // {
   //   path: "/user/teacher/course/mark",
   //   element: <TeacherMarkPage />,
   // },
   // {
   //   path: "/user/student/course/mark",
   //   element: <StudentMarkPage />,
   // },
]);
