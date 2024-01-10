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
import AvatarCustom from "../../components/avatar/AvatarCustom";
import AccountInfo from "./accountInfo/AccountInfo";
import AccountSetting from "./accountInfo/AccountSetting";

// import { Alert } from "@mui/material";

export default function Setting() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const user: User = useAppSelector(
    (state: RootState) => state.users.data
  ) as User;

  if (!user) return null;

  return (
    <>
      <Container>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
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
          <main className="relative w-full h-full flex flex-col items-start overflow-hidden">
            <div className="w-full h-full flex flex-col flex-1 items-start overflow-x-hidden pt-5 px-2 xl:px-52">
              {/* Profile */}
              <div className="w-full border rounded-lg py-5 px-7 mb-5">
                <h1 className="bold-32 mb-1">Profile</h1>
                <p className="medium-24 my-1">Profile picture</p>
                <div className="relative flex items-center gap-1 py-1 max-w-fit hover:bg-blue-50/50 group cursor-pointer rounded-lg">
                  <AvatarCustom
                    classroomAvatar={false}
                    name={user.username}
                    url={"/src/assets/noavatar.png"}
                    height={40}
                    width={40}
                  />

                  <button
                    className="text-blue-600 p-2 group-hover:text-blue-800"
                    onClick={() => {}}
                  >
                    Change
                  </button>
                </div>
                <AccountInfo user={user} />
                <AccountSetting user={user} />
              </div>

              <div className="w-full border rounded-lg py-5 px-7 divide-y-0 mb-14">
                <div>
                  <h1 className="medium-24 mb-1">Notifications</h1>

                  <h2 className="medium-24 mt-5">Email</h2>
                  <p className="mb-3">
                    These settings apply to the notifications you get by email
                  </p>
                  <div>
                    <div className="flex items-center justify-between">
                      <p>Allow email notifications</p>
                      <label
                        htmlFor="check__email"
                        className="relative cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          id="check__email"
                          className="appearance-none bg-gray-500/50 checked:bg-blue-500/70 transition-all duration-200 w-10 h-4 rounded-full peer"
                        />
                        <span className="absolute left-0 top-0 -translate-x-1 -translate-y-[0.85px] w-6 h-6 peer-checked:bg-blue-600 bg-gray-500 rounded-full peer-checked:translate-x-5 transition-all duration-200"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </main>
      </ClientWrapper>
    </>
  );
}
