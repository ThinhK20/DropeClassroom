import { User } from "../../models/User";
import Header from "../../components/header/Header";
import Container from "../../components/Container";
import Sidebar from "../../components/side3/Sidebar";
import { useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";

import CreateClassModal from "../../components/modal/CreateClassModal";
import JoinClassModal from "../../components/modal/JoinClassModal";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";

export default function Home() {
   const [isOpenSideBar, setIsOpenSideBar] = useState(true);
   const user: User = useAppSelector(
      (state: RootState) => state.users.data
   ) as User;

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
               className={`flex flex-row ${
                  isOpenSideBar ? "md:pl-80" : "md:pl-20"
               }`}
            >
               <Sidebar isOpen={isOpenSideBar} />
               <Container>
                  <h1>Hello schedule</h1>
               </Container>
            </main>
         </ClientWrapper>
      </>
   );
}
