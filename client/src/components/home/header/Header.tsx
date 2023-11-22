import { faBars} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WaterDropOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  fullName: string;
  avatar?: string;
  children?: React.ReactNode;
  actionOpenSideBar: () => void;
}

type Coords = {
  x: number,
  y: number,
  width: number,
  height: number,
}

function Header({fullName, avatar, children, actionOpenSideBar}: Props) {
  const [isCreateClick, setIsCreateClick] = useState<boolean>(false);
  const [isButtonMenu, setIsButtonMenu] = useState(false);
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })

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

  const handleClickCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const node = e.target as HTMLElement;

    const clientRect = node.getBoundingClientRect() as DOMRect;

    console.log('App ~~ client React ', clientRect);

    setCoords({
      x: clientRect.left,
      y: clientRect.top + window?.scrollY,
      width: clientRect.width,
      height: clientRect.height,
    });
    
    setIsCreateClick(!isCreateClick);
  }

  const nodeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutPopover (this: Document, ev: MouseEvent) {
      if(nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        setIsCreateClick(false);
      }
    }

    document.addEventListener("click", handleClickOutPopover)

    return () => {
      document.removeEventListener("click", handleClickOutPopover);
    }
  })

  return (
    <header className="relative md:sticky md:top-0 md:left-0 z-40 flex flex-row items-center justify-between h-16 md:w-full border-b border-btransition-all border-gray-200 bg-white py-3 px-4">

      {/* Half Left */}
      <div className="w-1/2 flex items-center gap-4">
        {/* button sidebar */}
        <div className="relative hidden md:block">
          <button className="bg-transparent border-none outline-none group  hover:bg-gray-400/10 flex items-center justify-center h-11 w-11 rounded-full"
                  onClick={actionOpenSideBar}>
            <FontAwesomeIcon icon={faBars} className="text-black/50 w-5 h-5" />
          </button>
        </div>

        {/* logo */}
        <a className="flex items-center text-black/50 cursor-pointer group ">
          <h1 className="medium-18 md:medium-24 border-b-2 border-transparent duration-300 transform group-hover:border-blue-600 group-hover:text-blue-600">
            DROPE
            <WaterDropOutlined />
            <span>CLASSROOM.</span>{" "}
          </h1>
        </a>

        {children}
      </div>

      {/* Half Right */}
      <div className="w-1/2 flex items-center justify-end gap-1 md:gap-5">
        
        {/* create class */}
        <div className="relative">
          <button className=" text-black/50  hover:bg-gray-500/10 hover:text-black/70 cursor-pointer focus:bg-gray-500/20 focus:text-black/80 flex items-center justify-center w-11 h-11 rounded-full regular-40 pb-2"
                  onClick={handleClickCreate}
                  ref={nodeRef}
          >
            +
          </button>

          {isCreateClick && <Createfunction coords={coords}/>}
        </div>

        {/* other funciton */}
        <div className="regular-20 text-black/50 px-2 py-2 rounded-full hover:bg-gray-500/10 hover:text-black/70 cursor-pointer -ml-3 hidden md:block">
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
            {avatar === undefined ? (
              <Avatar
                {...stringAvatar(fullName)}
                alt={`${fullName} Profile`}
              />
            ) : (
              <Avatar alt={`${fullName} Profile`} src={avatar} />
            )}
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;

function Createfunction({coords}:{coords: Coords}) {
  
  if(typeof document === "undefined") return null;
  
  return createPortal(

    <div className="absolute bg-white shadow-xl rounded-sm z-10 w-48"
         style={{
          left: coords.x  - 169,
          top: coords.y + coords.height - 9,
         }}
    >
      <ul className="flex flex-col gap-2 py-2">
        <li className="regular-20 inline-block hover:bg-gray-500/10 hover:text-black/70 px-4 py-2 cursor-pointer">
          <span> Create class </span>
        </li>

        <li className="regular-20 inline-block hover:bg-gray-500/10 hover:text-black/70 px-4 py-2 cursor-pointer">
          <span> Join class</span>
        </li>
      </ul>
    </div>,

    document.getElementById('root') as HTMLElement
  );
}
