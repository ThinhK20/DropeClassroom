import { useDispatch } from "react-redux";
import { onOpenCreateClass } from "../../store/createClassSlice";
import { onOpenJoinClass } from "../../store/joinClassSlice";

function DefaultHome() {
  const dispatch = useDispatch();

  return (
    <main className="relative w-full h-full pt-5 pb-16 px-6 md:px-10 flex flex-col flex-1 items-start m-10">
      <div className="flex flex-col w-full mt-[30px] items-center my-5">
        <div className="w-1/2">
          <img src="/src/assets/gg5.png" className="object-cover" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center mb-5">
        <h1 className="text-3xl">Add a class to get started</h1>
      </div>
      <div className="flex w-full justify-center items-center gap-5">
        <button
          className="px-5 py-2  medium-18 text-blue-500 hover:bg-blue-50/50 rounded"
          onClick={() => dispatch(onOpenCreateClass())}
        >
          Create class
        </button>
        <button
          className="px-5 py-2  bg-blue-600 medium-18 text-white rounded hover:bg-blue-700"
          onClick={() => dispatch(onOpenJoinClass())}
        >
          Join class
        </button>
      </div>
    </main>
  );
}

export default DefaultHome;
