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
import { getAllClassesApi } from "../../apis/classroomApis";
import { AxiosError } from "axios";
import { Alert } from "@mui/material";

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

  // console.log("user: ", user);

  // const user: User = {
  //   _id: "6566115223c81cf1bc4e7f15",
  //   createdDate: "",
  //   dateOfBirth: "",
  //   email: "anhoang483@gmail.com",
  //   gender: "m",
  //   isActive: true,
  //   password: "",
  //   role: "admin",
  //   updatedDate: "",
  //   username: "Minh An",
  // };

  const [error, setError] = useState<string>("");
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    const controller = new AbortController();

    getAllClassesApi("c/all", controller.signal)
      .then((res) => {
        // setListClasses(res);
        console.log(res)
        dispatch({
          type:'userClassrooms/getAllSuccess',
          payload: res
        })
      })
      .catch((err: AxiosError) => {
        setError(err.message as string);
        console.log(err);
        if(!(err.code === 'ERR_CANCELED')){
          dispatch({
            type: 'userClassrooms/getAllFailed'
          })
        }
      })
      .finally(() => {
        // setIsLoading(false);
      });

    return () => {
      controller.abort()
    }
  }, [dispatch]);

  return (
    <>
      <Container>
        {error && <Alert severity="error">{error}</Alert>}
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
          <Sidebar
            isOpen={isOpenSideBar}
          />
          <Container>
            <MainPage />
          </Container>
        </main>
      </ClientWrapper>
    </>
  );
}
