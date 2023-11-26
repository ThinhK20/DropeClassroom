import { User } from "../../models/User";
import Header from "../../components/header/Header";
import Container from "../../components/Container";
import Sidebar from "../../components/side3/Sidebar";
import { useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";

import ReactPortalCustom from "../../components/portal/ReactPortalCustom";
import Modal from "../../components/modal/Modal";

export default function Home() {
   const user = {
      username: "Minh An",
   } as User;

   const [isOpenSideBar, setIsOpenSideBar] = useState(true);
   const [isCreateModal, setIsCreateModal] = useState(false);
   const [isJoinModal, setIsJoinModal] = useState(false);

   console.log("is Open Create class", isCreateModal);

  return (
    <>
      <ReactPortalCustom wrapperId="react-portal-create-modal-container">
        <Container>
          <Modal
            isOpen={isCreateModal}
            title="Create class"
            onClose={() => {
              console.log("set state is create modal");
              setIsCreateModal(!isCreateModal);
            }}
          />
        </Container>
      </ReactPortalCustom>

      <ClientWrapper>
        <Header
          user={user}
          handleToggle={() => setIsOpenSideBar(!isOpenSideBar)}
          showPlusButton={true}
          handleCreateClass={() => setIsCreateModal(!isCreateModal)}
          handleJoinClass={() => setIsJoinModal(!isJoinModal)}
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
