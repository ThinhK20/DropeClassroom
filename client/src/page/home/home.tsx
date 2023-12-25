import { User } from "../../models/User";
import Header from "../../components/header/Header";
import Container from "../../components/Container";
import Sidebar from "../../components/side3/Sidebar";
import { useEffect, useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";

import CreateClassModal from "../../components/modal/CreateClassModal";
import JoinClassModal from "../../components/modal/JoinClassModal";
import MainPage from "./mainPage";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { getAllUserClassroom } from "../../store/userClassroomSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  const user: User = useAppSelector(
    (state: RootState) => state.users.data
  ) as User;

  useEffect(() => {
    // setIsLoading(true);
    const promise = dispatch(getAllUserClassroom());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      <Container>
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
          <Container>
            <MainPage />
          </Container>
        </main>
      </ClientWrapper>
    </>
  );
}
