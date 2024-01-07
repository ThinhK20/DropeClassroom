import { WaterDropOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Logo() {
   return (
      <Link
         to="/h"
         className="flex items-center text-black/50 cursor-pointer group "
      >
         <h1 className="medium-18 md:medium-24 border-b-2 border-transparent duration-300 transform group-hover:border-blue-600 group-hover:text-blue-600">
            DROPE
            <WaterDropOutlined />
            <span>CLASSROOM.</span>{" "}
         </h1>
      </Link>
   );
}

export default Logo;
