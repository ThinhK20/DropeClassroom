import { User } from "../../models/User";
import Header from "../../components/header/Header";
import Container from "../../components/Container";
import Sidebar from "../../components/side3/Sidebar";
import { useEffect, useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";

import CreateClassModal from "../../components/modal/CreateClassModal";
import JoinClassModal from "../../components/modal/JoinClassModal";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { UserClassRoom } from "../../models";
import { getAllClassesApi } from "../../apis/classroomApis";
import { AxiosError } from "axios";
import { Alert } from "@mui/material";

export default function Home() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const [listClasses, setListClasses] = useState<UserClassRoom>({
    count: 0,
    erolled_class: [],
    teaching_class: [],
    owner_class: []
  });
  const user: User = useAppSelector(
    (state: RootState) => state.users.data
  ) as User;
  const [error, setError] = useState<string>("");
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    getAllClassesApi()
      .then((res) => {
        setListClasses(res.data);
      })
      .catch((err: AxiosError) => {
        setError(err.message as string);
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }, []);

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
          <Sidebar isOpen={isOpenSideBar} listClasses={listClasses as UserClassRoom} />
          <Container>
            <h1>Achieved page</h1>
          </Container>
        </main>
      </ClientWrapper>
    </>
  );
}
