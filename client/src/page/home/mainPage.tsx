
import ClassRoomCard from "../../components/Card/ClassRoomCard";
import ListClassRoomCard from "../../components/Card/ListClassRoomCard";
import ClientWrapper from "../../components/ClientWrapper";
import { ClassRoom } from "../../models/ClassRoom";
import DefaultHome from "./DefaultHome";

function MainPage() {
    // call list class
    const empty = false;
    const ClassLists:ClassRoom[] = [
        {
            classId:"123",
            name: "React tutorial 2023",
            title: "Beginner",
            owner: "Nguyen Huy Khanh",
            coverImage: "/src/assets/gg1.png"
        },
        {
            classId:"123",
            name: "React tutorial 2023",
            title: "Beginner",
            owner: "Nguyen Huy Khanh",
            coverImage: "/src/assets/gg3.png"
        },
        {
            classId:"123",
            name: "React tutorial 2023",
            title: "Beginner",
            owner: "Nguyen Huy Khanh",
            coverImage: "/src/assets/gg2.png"
        },
        {
            classId:"123",
            name: "React tutorial 2023",
            title: "Beginner",
            owner: "Nguyen Huy Khanh",
            coverImage: "/src/assets/gg1.png"
        },
        {
            classId:"123",
            name: "React tutorial 2023",
            title: "Beginner",
            owner: "Nguyen Huy Khanh",
            coverImage: "/src/assets/gg4.png"
        },
        {
            classId:"123",
            name: "React tutorial 2023",
            title: "Beginner",
            owner: "Nguyen Huy Khanh",
            coverImage: "/src/assets/gg3.png"
        },
        {
            classId:"123",
            name: "React tutorial 2023",
            title: "Beginner",
            owner: "Nguyen Huy Khanh",
            coverImage: "/src/assets/gg2.png"
        },
    ]

    if(empty) {
        return(
            <ClientWrapper>
                <DefaultHome />
            </ClientWrapper>
        );
    }

    return (
        <main className="relative w-full h-full pt-5 pb-16 px-6 md:px-10 flex flex-col flex-1 items-start">
            <div className="flex flex-col w-full md:mx-auto">
                <div className="relative mx-auto">
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {ClassLists.map((classroom, idx) => {
                            return(
                                <ClassRoomCard 
                                    key={idx}
                                    classroom={classroom}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}   

export default MainPage;
