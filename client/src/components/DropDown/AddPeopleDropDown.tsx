import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";


function AddPeopleDropDown() {
  return (
    <div>
      <button className="mr-2 w-11 h-11  rounded-full text-blue-600 text-3xl hover:bg-blue-50 flex items-center justify-center">
        <PersonAddAltOutlinedIcon />
      </button>
    </div>
  );
}

export default AddPeopleDropDown;
