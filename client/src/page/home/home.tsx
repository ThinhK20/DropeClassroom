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
  // const [listClasses, setListClasses] = useState<UserClassRoom>({
  //   count: 0,
  //   erolled_class: [],
  //   teaching_class: [],
  //   owner_class: [],
  // });
  const user: User = useAppSelector(
    (state: RootState) => state.users.data
  ) as User;

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
  // // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    console.log("mount home");
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
