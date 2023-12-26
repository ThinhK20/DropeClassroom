import { NavLink } from "react-router-dom";
import Table from "../../../components/table/Table";

function Users() {
  return (
    <div className="relative w-full h-full pt-5 pb-12 px-6 md:px-10 flex flex-col flex-1 items-start overflow-hidden ">
      <div className=" w-full listContainer p-[20px] shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)]">
        <div className="listTitle  mb-2 flex justify-between items-center">
          <p className="font-[500] text-gray-600 text-2xl">List Users</p>
          <NavLink
            to={"/ad/u/add-new"}
            className={
              "link flex justify-between items-center gap-2 text-blue-600 border-2 p-[5px] rounded-md border-blue-600 hover:text-blue-800"
            }
          >
            {/* <AddCircleOutlineOutlinedIcon /> */}
            Add new
          </NavLink>
        </div>
        <Table />
      </div>
    </div>
  );
}

export default Users;
