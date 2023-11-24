import { ClassRoom } from "../../models/ClassRoom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  classroom: ClassRoom | null;
}

function CurrentClassHeading({ classroom }: Props) {
  return classroom !== null ? (
    <div className="hidden md:flex items-center gap-4 group">
      <FontAwesomeIcon icon={faChevronRight} className="text-gray-500/50" />
      <div className="flex flex-col justify-start group-hover:underline-offset-2 group-hover:underline cursor-pointer">
        <h2
          className={`${
            classroom.title == undefined ? "medium-20" : "medium-16"
          } font-medium`}
        >
          {classroom.name}
        </h2>
        {classroom.title != undefined && (
          <label className="mb-2 text-sm">{classroom.title}</label>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default CurrentClassHeading;
