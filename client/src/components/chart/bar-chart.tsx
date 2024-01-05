import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: object[];
};

function BarChartCustom(props: Props) {
  return (
    <div className="barChartBox flex-1 flex flex-col p-[10px] justify-between shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[10px] h-[150px] w-full">
      <h1 className="text-[14px] font-bold text-gray-600/80">{props.title}</h1>
      <div className="chart h-full">
        <ResponsiveContainer width="99%" height={110}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartCustom;
