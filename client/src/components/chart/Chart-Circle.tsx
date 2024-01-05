import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Mobile", value: 400, color: "#0088FE" },
  { name: "Desktop", value: 300, color: "#00C49F" },
  { name: "Laptop", value: 300, color: "#FFBB28" },
  { name: "Tablet", value: 200, color: "#FF8042" },
];

export default function ChartCircle() {
  return (
    <div className="pieChartBox p-[10px] shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] w-[30%] h-full">
      <h1 className="text-2xl">Leads by Source</h1>
      <div className="chart flex justify-center items-center w-full h-full">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options flex justify-between gap-[10px] items-center">
        {data.map((item) => (
          <div className="option flex flex-col items-center" key={item.name}>
            <div className="title flex gap-[10px] items-center">
              <div className="dot w-[10px] h-[10px] rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
