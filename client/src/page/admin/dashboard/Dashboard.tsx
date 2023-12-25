import Widget from "../../../components/Card/Widget";

function Dashboard() {
  return (
    <div className="relative w-full h-full pt-5 pb-16 px-6 md:px-10 flex flex-col flex-1 items-start overflow-hidden ">
      <div className="flex p-[20px] gap-[20px] w-full">
        <Widget type="user"/>
        <Widget type="class"/> 
        <Widget type="earning"/>
        <Widget type="balance"/>
      </div>
    </div>
  );
}

export default Dashboard;
