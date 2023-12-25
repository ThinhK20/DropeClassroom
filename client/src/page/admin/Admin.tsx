import { useState } from "react";
import ClientWrapper from "../../components/ClientWrapper";
import Header from "../../components/header/Header";
import { User } from "../../models";
import SidebarAdmin from "../../components/side3/SidebarAdmin";
import { Outlet } from "react-router-dom";

function Admin() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);

  const user: User = {
    _id: "6566115223c81cf1bc4e7f15",
    username: "Minh An",
    email: "anhoang483@gmail.com",
    isActive: true,
    gender: "m",
    role: "admin",
    createdDate: "2023-11-28T16:11:01.769Z",
    updatedDate: "2023-11-28T16:11:01.769Z",
  };

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
