import React, { useState } from "react";
import { SideNavItem } from "../../shared/type/types";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

interface SideBarItemProps {
  item: SideNavItem;
  isActive: boolean;
  children?: React.ReactNode;
}

function SideBarItem({ item, isActive, children }: SideBarItemProps) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <>
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
          <div className="flex flex-col">
            <span>{item.name}</span>
            <span className="text-sm text-gray-500">{item.title}</span>
          </div>
        </div>
      </div>
      {subMenuOpen && children}
    </>
  );
}

export default SideBarItem;
