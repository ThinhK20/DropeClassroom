

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  name: string | undefined;
  title: string | undefined;
}

function HeaderHeading({ name, title }: Props) {
  if(name === undefined) return null;

  return (
    <div className="hidden md:flex items-center gap-4 group">
      <FontAwesomeIcon icon={faChevronRight} className="text-gray-500/50" />
      <div className="flex flex-col justify-start group-hover:underline-offset-2 group-hover:underline cursor-pointer">
        <h2
          className={`${
            title == undefined ? "medium-20" : "medium-16"
          } font-medium`}
        >
          {name}
        </h2>
        {title != undefined && (
          <label className="mb-2 text-sm">{title}</label>
        )}
      </div>
    </div>
  );
}

export default HeaderHeading;
