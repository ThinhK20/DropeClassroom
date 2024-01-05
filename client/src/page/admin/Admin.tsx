import { useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";
import Header from "../../components/header/Header";
import SidebarAdmin from "../../components/side3/SidebarAdmin";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

function Admin() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  const user = useAppSelector((state) => state.users.data);

  if(!user) return <></>;

  return (
    <>
      <ClientWrapper>
        <Header
          user={user}
          handleToggle={() => setIsOpenSideBar(!isOpenSideBar)}
        />
        <main
          className={`flex flex-row ${isOpenSideBar ? "md:pl-80" : "md:pl-20"}`}
        >
          <SidebarAdmin isOpen={isOpenSideBar} />
          <main className="relative w-full h-full flex flex-col items-start overflow-hidden">
            <Outlet />
          </main>
        </main>
      </ClientWrapper>
    </>
  );
}

export default Admin;
