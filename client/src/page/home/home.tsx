import { User } from "../../models/User";
import Header from "../../components/header/Header";
import Container from "../../components/Container";
import Sidebar from "../../components/side3/Sidebar";
import { useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";

import CreateClassModal from "../../components/modal/CreateClassModal";
import JoinClassModal from "../../components/modal/JoinClassModal";
import DefaultHome from "./DefaultHome";

export default function Home() {
  const user = {
    username: "Minh An",
  } as User;

  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

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

            <DefaultHome />
            
          </Container>
        </main>
      </ClientWrapper>
    </>
  );
}
