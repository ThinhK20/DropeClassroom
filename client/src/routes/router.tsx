import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TeacherMarkPage from "../components/markPage/teacher";
import StudentMarkPage from "../components/markPage/student";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user/teacher/course/mark",
    element: <TeacherMarkPage />,
  },
  {
    path: "/user/student/course/mark",
    element: <StudentMarkPage />,
  },
]);
