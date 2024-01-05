import React, { useEffect, useState } from "react";
import { SideNavItem } from "../../shared/type/types";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useMatches } from "react-router-dom";

interface SideBarItemProps {
  item: SideNavItem;
  children?: React.ReactNode;
}

function SideBarItem({ item, children }: SideBarItemProps) {
  const params = useMatches();
  const [subMenuOpen, setSubMenuOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  useEffect(() => {

    const isLocation = params.findIndex((p) => p.pathname === item.path);

    if(isLocation < 0) setIsActive(false);
    else setIsActive(true);
    // if (params[0].pathname === item.path) setIsActive(true);
    // else setIsActive(false);
  }, [params]);

  return (
    <div className="py-1">
      <div
        className={`h-12 w-[97%] ${item.submenu ? "" : "pl-6"} pr-2 ${
          isActive ? "bg-blue-300/25" : "hover:bg-gray-100"
        } flex flex-row items-center medium-16 text-black/75 truncate rounded-r-full cursor-pointer`}
        onClick={item.submenu ? toggleSubMenu : item.actionGoDo}
      >
        {item.submenu && (
          <ChevronRightOutlinedIcon
            sx={{ fontSize: 24, color: `black` }}
            className={`${subMenuOpen ? "rotate-90" : ""}`}
          />
        )}
        <div className="flex flex-row items-center space-x-6 overflow-hidden">
          {item.icon}
          <div className="flex flex-col" onClick={item.actionGoDo}>
            <span>{item.name}</span>
            <span className="text-sm text-gray-500">{item.title}</span>
          </div>
        </div>
      </div>
      {subMenuOpen && children}
    </div>
  );
}

export default SideBarItem;
