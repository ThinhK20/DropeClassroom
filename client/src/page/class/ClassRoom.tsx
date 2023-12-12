import { User } from "../../models/User";
import Header from "../../components/header/Header";
import Container from "../../components/Container";
import Sidebar from "../../components/side3/Sidebar";
import { useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";

import CreateClassModal from "../../components/modal/CreateClassModal";
import JoinClassModal from "../../components/modal/JoinClassModal";
import NavClass from "../../components/nav3/nav3Class";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { Outlet } from "react-router-dom";

// import { Alert } from "@mui/material";

export default function ClassRoom() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const user: User = useAppSelector(
    (state: RootState) => state.users.data
  ) as User;
  const currentClass = useAppSelector((state) => state.userClassroom.currentClass);

  // const user: User = {
  //   _id: "6566115223c81cf1bc4e7f15",
  //   username: "Minh An",
  //   email: "anhoang483@gmail.com",
  //   isActive: true,
  //   gender: "m",
  //   role: "admin",
  //   createdDate: "2023-11-28T16:11:01.769Z",
  //   updatedDate: "2023-11-28T16:11:01.769Z",
  // };

  // const [error, setError] = useState<string>("");

  // const [isLoading, setIsLoading] = useState(false);

  if(currentClass === null) return(<></>);

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
            <NavClass />
            <Outlet />
          </main>

        </main>
      </ClientWrapper>
    </>
  );
}
