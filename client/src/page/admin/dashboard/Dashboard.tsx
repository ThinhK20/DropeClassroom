import Widget from "../../../components/Card/Widget";
import Chart from "../../../components/chart/Chart";
import ChartCircle from "../../../components/chart/Chart-Circle";
import BarChartCustom from "../../../components/chart/bar-chart";

const barChartBoxVisit = {
  title: "Total Visit",
  color: "#8884d8",
  dataKey: "visit",
  chartData: [
    {
      name: "Sun",
      visit: 4000,
    },
    {
      name: "Mon",
      visit: 3000,
    },
    {
      name: "Tue",
      visit: 2000,
    },
    {
      name: "Wed",
      visit: 2780,
    },
    {
      name: "Thu",
      visit: 1890,
    },
    {
      name: "Fri",
      visit: 2390,
    },
    {
      name: "Sat",
      visit: 3490,
    },
  ],
};

function Dashboard() {
  return (
    <div className="relative w-full h-full pt-5 pb-16 px-6 flex flex-col flex-1 items-start overflow-hidden ">
      <div className="flex p-[20px] gap-[20px] w-full">
        <Widget type="user" />
        <Widget type="class" />
        <BarChartCustom {...barChartBoxVisit}/>
        {/* <Widget type="balance"/> */}
      </div>
      <div className="w-full charts p-[20px] flex gap-[20px]">
        <ChartCircle />
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
