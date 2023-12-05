import ClassRoomCard from "../../components/Card/ClassRoomCard";
import ClientWrapper from "../../components/ClientWrapper";
import { useAppSelector } from "../../hooks/hooks";
import { UserClassRoom } from "../../models";
import DefaultHome from "./DefaultHome";

function MainPage() {
  // call list class
  const listClasses: UserClassRoom = useAppSelector(
    (state) => state.userClassroom.classes
  );

  if (listClasses.count == 0) {
    return (
      <ClientWrapper>
        <DefaultHome />
      </ClientWrapper>
    );
  }

  return (
    <main className="relative w-full h-full pt-5 pb-16 px-6 md:px-10 flex flex-col flex-1 items-start overflow-hidden">
      <div className="flex flex-col w-full md:mx-auto">
        <div className="relative mx-auto">
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              ...listClasses.owner_class,
              ...listClasses.teaching_class,
              ...listClasses.erolled_class,
            ].map((classroom, idx) => {
              return <ClassRoomCard key={idx} classroom={classroom} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
