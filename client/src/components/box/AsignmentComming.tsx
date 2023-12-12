function AsignmentComming() {
  return (
    <div className="w-full border rounded-lg flex flex-col pl-3 pt-4 pb-2 mt-4">
      <div className="flex flex-row  items-center">
        <span>Up comming</span>
      </div>

      <div className="flex flex-row gap-2 items-center my-4">
        <span className="text-xs text-black/50">Woohoo, no work due soon</span>
      </div>

      <div className="flex flex-row gap-2 items-center justify-end px-2">
        <button
          className="flex justify-center items-center hover:bg-blue-50 rounded-lg p-2"
          onClick={() => {}}
        >
          <p>View All</p>
        </button>
      </div>
    </div>
  );
}

export default AsignmentComming;
