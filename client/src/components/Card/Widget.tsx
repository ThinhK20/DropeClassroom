import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { NavLink } from "react-router-dom";

interface Props {
  type: string;
  counter?: number;
}

function Widget({ type, counter = 100 }: Props) {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all user",
        goto: '/ad/u',
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon__widget"
            sx={{ fontSize: 32 }}
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "class":
      data = {
        title: "CLASSROOMS",
        isMoney: false,
        link: "View all classroom",
        goto: '/ad/cr',
        icon: (
          <InventoryOutlinedIcon
            className="icon__widget"
            sx={{ fontSize: 32 }}
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        goto: '/ad/db',
        icon: (
          <PaidOutlinedIcon
            className="icon__widget"
            sx={{ fontSize: 32 }}
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        goto: '/ad/db',
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon__widget"
            sx={{ fontSize: 32 }}
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex-1 flex p-[10px] justify-between shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[10px] h-[150px]">
      <div className="left flex flex-col justify-between">
        <span className="text-[14px] font-bold text-gray-600/80">
          {data?.title}
        </span>
        <span className="counter text-[36px] font-[300]">
          {data?.isMoney && "$"} {counter}
        </span>
        <NavLink to={data?.goto as string} className="link text-[12px] border-b-[1px] border-gray-600 w-max">
          {data?.link}
        </NavLink>
      </div>
      <div className="right flex flex-col justify-between">
        <div
          className={`percentage flex items-center text-[14px] text-red-600`}
        >
          <KeyboardArrowUpIcon />
          20 %
        </div>
        {data?.icon}
      </div>
    </div>
  );
}

export default Widget;
