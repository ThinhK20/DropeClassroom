import { User } from "../../models/User";
import Header from "../../components/header/Header";
import Container from "../../components/Container";
import Sidebar from "../../components/side3/Sidebar";
import { useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";

import CreateClassModal from "../../components/modal/CreateClassModal";

export default function Home() {
  const user = {
    username: "Minh An",
  } as User;

  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  return (
    <>
      <Container>
        <CreateClassModal />
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
            <main className="relative h-full pt-5 pb-16 px-6 md:px-5 max-w-full flex flex-col flex-1 items-start">
              <img src="/src/assets/2.jpg" />
            </main>
          </Container>
        </main>
      </ClientWrapper>
    </>
  );
}
