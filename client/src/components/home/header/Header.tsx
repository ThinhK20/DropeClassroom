import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WaterDropOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useState } from "react";

interface Props {
  fullName: string;
  avatar?: string;
}

function Header(props: Props) {
  const [isCreateClick, setIsCreateClick] = useState(false);
  const [isButtonMenu, setIsButtonMenu] = useState(false);
    
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <header className="relative flex flex-row items-center justify-between z-4 h-14 w-full border-b py-3 px-4 border-theme-divider-tertiary">
      {/* Half Left */}
      <div className="w-1/2 flex items-center justify-start gap-4">
        {/* button sidebar */}
        <button className="bg-transparent border-none outline-none p-1 rounded-md group  hover:bg-gray-400/10 flex items-center justify-center">
          <FontAwesomeIcon icon={faBars} className="text-black/50 w-5 h-5" />
        </button>

        {/* logo */}
        <a className="hidden md:flex flex-1 items-center text-black/50 cursor-pointer group ">
          <h1 className="medium-24 border-b-2 border-transparent duration-300 transform group-hover:border-blue-600 group-hover:text-blue-600">
            DROPE
            <WaterDropOutlined />
            <span>CLASSROOM.</span>{" "}
          </h1>
        </a>
      </div>

      {/* Half Right */}
      <div className="w-1/2 flex items-center justify-end gap-1 md:gap-2">
        {/* create class */}
        <a className="regular-20 text-black/50 rounded-full px-4 py-2 hover:bg-gray-500/10 hover:text-black/70 cursor-pointer"
           onClick={() => {
            setIsCreateClick(!isCreateClick);
            console.log(isCreateClick);
           }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </a>

        <div className="regular-20 text-black/50 px-2 py-2 rounded-full hover:bg-gray-500/10 hover:text-black/70 cursor-pointer -ml-1 hidden md:block">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none h-7 w-7"><path d="M7.833 13a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005H6.167a3.167 3.167 0 01-3.162-2.987L3 17.833v-1.666a3.167 3.167 0 012.987-3.162l.18-.005h1.666zm10 0a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005h-1.666a3.167 3.167 0 01-3.162-2.987l-.005-.18v-1.666a3.167 3.167 0 012.987-3.162l.18-.005h1.666zm-10 1.5H6.167c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152v-1.666c0-.872-.67-1.588-1.523-1.66l-.144-.007zm10 0h-1.666c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152v-1.666c0-.872-.67-1.588-1.523-1.66l-.144-.007zM7.833 3a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005H6.167a3.167 3.167 0 01-3.162-2.987L3 7.833V6.167a3.167 3.167 0 012.987-3.162L6.167 3h1.666zm12.528 3.259a.75.75 0 01-.009 1.484l-.102.007h-2.5v2.5a.75.75 0 01-1.491.111l-.009-.11V7.75h-2.5l-.111-.009a.75.75 0 01.009-1.484l.102-.007h2.5v-2.5a.75.75 0 011.491-.111l.009.11V6.25h2.5l.111.009zM7.833 4.5H6.167c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152V6.167c0-.872-.67-1.588-1.523-1.66L7.833 4.5z" fill="currentcolor" fill-rule="evenodd"></path>
        </svg>

        </div>

        {/* avatar */}
        <button
          className="items-center hidden md:block rounded-full ring ring-transparent ring-offset-1 focus:ring-gray-500/40 hover:ring-gray-500/30"
          type="button"
          aria-label="Profile setting"
          onClick={() => {
            setIsButtonMenu(!isButtonMenu);
            console.log(isButtonMenu);
          }}
        >
          <div className="object-cover relative overflow-hidden">
            {props.avatar === undefined ? (
              <Avatar
                {...stringAvatar(props.fullName)}
                alt={`${props.fullName} Profile`}
              />
            ) : (
              <Avatar alt={`${props.fullName} Profile`} src={props.avatar} />
            )}
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
