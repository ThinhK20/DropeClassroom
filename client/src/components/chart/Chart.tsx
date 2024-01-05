import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Sun",
    users: 4000,
    Classes: 2400,
    Notifications: 2400,
  },
  {
    name: "Mon",
    users: 3000,
    Classes: 1398,
    Notifications: 2210,
  },
  {
    name: "Tue",
    users: 2000,
    Classes: 9800,
    Notifications: 2290,
  },
  {
    name: "Wed",
    users: 2780,
    Classes: 3908,
    Notifications: 2000,
  },
  {
    name: "Thu",
    users: 1890,
    Classes: 4800,
    Notifications: 2181,
  },
  {
    name: "Fri",
    users: 2390,
    Classes: 3800,
    Notifications: 2500,
  },
  {
    name: "Sat",
    users: 3490,
    Classes: 4300,
    Notifications: 2100,
  },
];

function Chart() {
  return (
    <div className="bigChartBox p-[10px] shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] w-full h-full flex-col justify-between">
      <h1 className="text-2xl">Revenue Analytics</h1>
      <div className="chart w-full h-[347px]">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Notifications"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="Classes"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="users"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
