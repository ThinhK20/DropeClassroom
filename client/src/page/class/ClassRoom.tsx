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
   accpetJoinClassByLink,
   setCurrentUserClassroom,
} from "../../store/userClassroomSlice";
import AcceptInvitation from "./invitation-authen/AcceptInvitation";
import { joinClassByLink_v1Api } from "../../apis/classroomApis";
import { AxiosError } from "axios";
import { getUserClassroomByUserIdAndClassIdApi } from "../../apis/userClassroomApis";

// import { Alert } from "@mui/material";

export default function ClassRoom() {
   const [isOpenSideBar, setIsOpenSideBar] = useState(true);
   const [acceptComponent, setAcceptComponent] = useState(false);

   const user: User = useAppSelector(
      (state: RootState) => state.users.data
   ) as User;
   const currentClass = useAppSelector(
      (state) => state.userClassroom.currentClass
   );

   const dispatch = useAppDispatch();
   const location = useLocation();
   const param = useParams();
   const navigate = useNavigate();

   const continueClass = () => {
      const searchParams = new URLSearchParams(location.search);
      const cjcValue = searchParams.get("cjc");
      const roleValue = searchParams.get("role");

      if (!cjcValue) return;

      if (roleValue) {
         const isValidRole = /^(student|teacher)$/.test(roleValue as string);
         if (!isValidRole) return;
         dispatch(
            accpetJoinClassByLink({
               pathName: location.pathname,
               classCode: cjcValue,
               role: roleValue as "student" | "teacher",
            })
         )
            .then(() => {
               navigate(`/c/${param.id}`);
               dispatch(setCheckParam(param.id as string));
               setAcceptComponent(false);
            })
            .catch((err: AxiosError) => {
               console.log(err);
               setAcceptComponent(false);
            });
      }
   };

   useEffect(() => {
      dispatch(setCheckParam(param.id as string));
   }, []);

   useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const cjcValue = searchParams.get("cjc");
      const roleValue = searchParams.get("role");

      if (!cjcValue) {
         setAcceptComponent(false);
         return;
      }

      if (!roleValue) {
         setAcceptComponent(false);
         return;
      }

      const isValidFormat = /^[a-zA-Z0-9]{6}$/.test(cjcValue as string);
      const isValidRole = /^(student|teacher)$/.test(roleValue as string);

      if (!isValidFormat || !isValidRole) {
         setAcceptComponent(false);
      } else if (isValidFormat && isValidRole) {
         const controller = new AbortController();
         joinClassByLink_v1Api(
            `${location.pathname}/v1${location.search}`,
            controller.signal
         )
            .then(() => {
               setAcceptComponent(true);
            })
            .catch((err) => {
               console.log(err);
               setAcceptComponent(false);
            })
            .finally(() => {
               controller.abort();
            });
      }
   }, [location]);

   useEffect(() => {
      if (!user || !currentClass || !user._id || !currentClass.classId?._id)
         return;
      getUserClassroomByUserIdAndClassIdApi(
         user._id,
         currentClass.classId._id
      ).then((res) => {
         dispatch(setCurrentUserClassroom(res.data));
      });
   }, [user, currentClass]);

   if (!currentClass && !acceptComponent) return <div>Errors</div>;

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
               className={`flex flex-row ${
                  isOpenSideBar ? "md:pl-80" : "md:pl-20"
               }`}
            >
               <Sidebar isOpen={isOpenSideBar} />
               <main className="relative w-full h-full flex flex-col items-start overflow-hidden">
                  {acceptComponent ? (
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
