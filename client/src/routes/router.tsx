import { Navigate, createBrowserRouter } from "react-router-dom";

import Home from "../page/home/home";
import Schedule from "../page/schedule/Schedule";
import Archived from "../page/achieved/Achived";
import Setting from "../page/setting/Setting";
import App from "../App";
import ClassRoom from "../page/class/ClassRoom";
import SignUp from "../page/signup/signup";
import SignIn from "../page/signin/signin";
import Stream from "../page/class/stream/Stream";
import ListAssignments from "../page/listAssignments";
import People from "../page/class/people/people";
import ScoreManagement from "../page/class/score-management/score-management";
import GradeReviews from "../page/class/grade-reviews/grade-reviews";
import Admin from "../page/admin/Admin";
import Dashboard from "../page/admin/dashboard/Dashboard";
import Users from "../page/admin/users/Users";
import Classrooms from "../page/admin/classrooms/Classrooms";
import ForgotPassword from "../page/forgot-password/forgot-password";
import SingleUser from "../page/admin/users/SingleUser";
import SingleClassrooms from "../page/admin/classrooms/SingleClassrooms";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      errorElement: <Navigate to={"/signin"} />,
   },
   {
      path: "/h",
      element: <Home />,
      errorElement: <Navigate to={"/signin"} />,
   },
   {
      path: "/schedule",
      element: <Schedule />,
      errorElement: <Navigate to={"/signin"} />,
   },
   {
      path: "/h/archived",
      element: <Archived />,
      errorElement: <Navigate to={"/signin"} />,
   },
   {
      path: "/s",
      element: <Setting />,
      errorElement: <Navigate to={"/signin"} />,
   },
   {
      path: "/c/:id",
      element: <ClassRoom />,
      errorElement: <Navigate to={"/signin"} />,
      children: [
         {
            path: "/c/:id",
            element: <Stream />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "w/t/all",
            element: <ListAssignments />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "uic/all",
            element: <People />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "gb/all",
            element: <ScoreManagement />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "gr/all",
            element: <GradeReviews />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "/c/:id",
            errorElement: <Navigate to={"/signin"} />,
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
      path: "/forgot-password",
      element: <ForgotPassword />,
   },
   {
      path: "/ad",
      element: <Admin />,
      errorElement: <Navigate to={"/signin"} />,
      children: [
         {
            path: "/ad/db",
            element: <Dashboard />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "/ad/u",
            element: <Users />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "/ad/u/:id",
            element: <SingleUser />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "/ad/cr",
            element: <Classrooms />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "/ad/cr/:id",
            element: <SingleClassrooms />,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "/ad/stats",
            element: <div>stats</div>,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "/ad/notifi",
            element: <div>Hello Notifications</div>,
            errorElement: <Navigate to={"/signin"} />,
         },
         {
            path: "/ad/s",
            element: <div>Hello Settings</div>,
            errorElement: <Navigate to={"/signin"} />,
         },
      ],
   },
]);
