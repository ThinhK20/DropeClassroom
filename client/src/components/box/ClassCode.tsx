import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
interface Props {
    classCode: string;
}
function ClassCode({classCode}: Props) {
  return (
    <div className="w-full border rounded-lg flex flex-col pl-3 pr-1 py-3">
      <div className="flex flex-row justify-between items-center">
        <span className="text-lg">Class code</span>
        <button className="flex justify-center items-center w-11 h-11 hover:bg-gray-500/20 rounded-full">
          <MoreVertOutlinedIcon sx={{ fontSize: 28 }} className="text-black" />
        </button>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <span className="medium-24">{classCode}</span>
        <button
          className="flex justify-center items-center w-9 h-9 hover:bg-gray-500/20 rounded-full"
          onClick={() =>
            navigator.clipboard.writeText(
              classCode 
            )
          }
        >
          <ContentCopyOutlinedIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  );
}

export default ClassCode;
