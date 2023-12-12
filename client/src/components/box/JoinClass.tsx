import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

function JoinClass() {
  return (
    <div className="w-full border rounded-lg flex flex-col mt-2 mb-2">
      <div className="flex flex-row items-center px-4 py-2 w-full">
        <img
          src="https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-48dp/logo_meet_2020q4_color_1x_web_48dp.png"
          className="h-6 w-6"
        />
        <span className="ml-2">Meet</span>
        <div className="w-full flex justify-end">
          <button className="flex justify-center items-center w-11 h-11 hover:bg-gray-500/20 rounded-full -mr-2">
            <MoreVertOutlinedIcon
              sx={{ fontSize: 28 }}
              className="text-black"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center w-full px-4 pb-4">
        <button
          className="flex justify-center items-center hover:bg-blue-700/90 rounded-sm py-1 w-full bg-blue-600"
          onClick={() => {}}
        >
          <p className="text-white">Join</p>
        </button>
      </div>
    </div>
  );
}

export default JoinClass;
