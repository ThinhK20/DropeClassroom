import { ClassRoom } from "../../models/ClassRoom"
import ClassRoomCard from "./ClassRoomCard";

interface ClassroomCardProps {
  classroom: ClassRoom;
}

function ListClassRoomCard({classroom}: ClassroomCardProps) {
  return (
    <>
      <ClassRoomCard />
    </>
  )
}

export default ListClassRoomCard