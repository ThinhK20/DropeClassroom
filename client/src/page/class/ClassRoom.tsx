import { User } from "../../models/User";
import Header from "../../components/header/Header";
import Container from "../../components/Container";
import Sidebar from "../../components/side3/Sidebar";
import { useEffect, useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";

import CreateClassModal from "../../components/modal/CreateClassModal";
import JoinClassModal from "../../components/modal/JoinClassModal";
import NavClass from "../../components/nav3/nav3Class";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  setCheckParam,
  userJoinClassByLink,
} from "../../store/userClassroomSlice";
import AcceptInvitation from "./invitation-authen/AcceptInvitation";
import { joinClassByLink_v1Api } from "../../apis/classroomApis";
import { AxiosError } from "axios";

// import { Alert } from "@mui/material";

export default function ClassRoom() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const [isAccept, setIsAccept] = useState(false);

  const user: User = useAppSelector(
    (state: RootState) => state.users.data
  ) as User;
  const currentClass = useAppSelector(
    (state) => state.userClassroom.currentClass
  );
  // const lsClass = useAppSelector((state) => state.userClassroom.classes);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();

  const continueClass = () => {
    const searchParams = new URLSearchParams(location.search);
    const cjcValue = searchParams.get("cjc");
    // console.log(cjcValue);
    const roleValue = searchParams.get("role");
    console.log("role", roleValue);

    if (!cjcValue) return;

    if (roleValue) {
      const isValidRole = /^(student|teacher)$/.test(roleValue as string);
      if (!isValidRole) return;
      dispatch(
        userJoinClassByLink({
          pathName: location.pathname,
          classCode: cjcValue,
          role: roleValue === "student" ? "student" : "teacher",
        })
      )
        .then(() => {
          navigate(`/c/${param.id}`);
        })
        .catch((err: AxiosError) => {
          console.log(err);
        })
        .finally(() => {});
    } else {
      dispatch(
        userJoinClassByLink({
          pathName: location.pathname,
          classCode: cjcValue,
          role: "student",
        })
      )
        .then(() => {
          navigate(`/c/${param.id}`);
        })
        .catch((err: AxiosError) => {
          console.log(err);
        })
        .finally(() => {});
    }
  };

  useEffect(() => {
    // console.log(currentClass?.classId._id);
    // console.log(location.pathname);
    // console.log(param.id);
    dispatch(setCheckParam(param.id as string));

    if (location.search !== "") {
      const searchParams = new URLSearchParams(location.search);
      const cjcValue = searchParams.get("cjc");
      // console.log(cjcValue);
      // console.log(roleValue);
      if (!cjcValue) return;
      const isValidFormat = /^[a-zA-Z0-9]{6}$/.test(cjcValue as string);

      if (isValidFormat) {
        // Xử lý khi giá trị hợp lệ
        // console.log("Valid cjc value:", cjcValue);
        const controller = new AbortController();

        console.log(`${location.pathname}/v1${location.search}`);
        joinClassByLink_v1Api(
          `${location.pathname}/v1${location.search}`,
          controller.signal
        )
          .then((data) => {
            // console.log(data);
            if (!isAccept && data === "isAccepting") {
              // isAccept = false;
              setIsAccept(true);
            } else if (data === "Pending") {
              return;
            }
          })
          .catch((err: AxiosError) => {
            console.log(err);
          })
          .finally(() => {
            controller.abort();
          });
      } else {
        // Xử lý khi giá trị không hợp lệ
        console.log("Invalid cjc value:", cjcValue);
      }
    } else if (location.search === "" && currentClass) {
      setIsAccept(false);
    } else if (location.search === "" && !currentClass) {
      setIsAccept(false);
    }
  }, [isAccept, currentClass, dispatch, location, param.id]);

  if (!currentClass && !isAccept) return <div>Errors</div>;

  return (
    <>
      <Container>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
        <CreateClassModal />
        <JoinClassModal />
      </Container>
      <ClientWrapper>
        <Header
          user={user}
          handleToggle={() => setIsOpenSideBar(!isOpenSideBar)}
        />
        <main
          className={`flex flex-row ${isOpenSideBar ? "md:pl-80" : "md:pl-20"}`}
        >
          <Sidebar isOpen={isOpenSideBar} />
          <main className="relative w-full h-full flex flex-col items-start overflow-hidden">
            {isAccept ? (
              <AcceptInvitation user={user} action={continueClass} />
            ) : (
              <>
                <NavClass />
                <Outlet />
              </>
            )}
          </main>
        </main>
      </ClientWrapper>
    </>
  );
}
