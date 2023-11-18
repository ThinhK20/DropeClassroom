import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WaterDropOutlined } from '@mui/icons-material';

function Header() {
  return (
    <header className="relative flex flex-row items-center justify-between z-4 h-14 w-full border-b py-3 px-4 border-theme-divider-tertiary">
        {/* Half Left */}
        <div className="w-1/2 flex items-center justify-start gap-4">
            {/* button sidebar */}
            <button className="bg-transparent border-none outline-none p-1 rounded-md group  hover:bg-gray-400/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faBars} className="text-black/50 w-5 h-5"/>
            </button>

            {/* logo */}
            <a className="flex flex-1 items-center text-black/50 cursor-pointer group ">
                <h1 className="medium-24 mb-1 group-hover:text-blue-600 group-hover:border-b-2 group-hover:border-blue-600">DROPE<WaterDropOutlined/><span>CLASSROOM.</span> </h1>
            </a>
        </div>

        {/* Half Right */}
        <div className="w-1/2 flex items-center justify-end gap-4">
            <div>
                avatar
            </div>

            <div>
                other
            </div>

            <div>
                create class
            </div>
        </div>
    </header>
  )
}

export default Header