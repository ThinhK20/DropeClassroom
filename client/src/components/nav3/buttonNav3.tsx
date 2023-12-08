import { NavLink, useLocation } from "react-router-dom";

interface Props {
  path: string;
  name: string;
}

function ButtonNav3({ path, name }: Props) {
  const navLocaiton = useLocation();

  const isActive = () => {
    if (navLocaiton.pathname == path) return true;
    return false;
  };

  return (
    <NavLink
      to={path}
      className={`flex flex-col text-black/70 hover:bg-gray-400/10 hover:text-black ${
        isActive() ? "text-blue-600" : ""
      }`}
    >
      <span className="px-5 py-3">{name}</span>
      <div
        className={`w-ful border-2 border-transparent rounded-t-full ${
          isActive() ? "border-blue-600" : ""
        }`}
      ></div>
    </NavLink>
  );
}

export default ButtonNav3;
