import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", thisYear: 12000, lastYear: 5000 },
  { month: "Feb", thisYear: 8000, lastYear: 13000 },
  { month: "Mar", thisYear: 14000, lastYear: 20000 },
  { month: "Apr", thisYear: 23000, lastYear: 7000 },
  { month: "May", thisYear: 25000, lastYear: 14000 },
  { month: "Jun", thisYear: 21000, lastYear: 25000 },
  { month: "Jul", thisYear: 24000, lastYear: 31000 },
];

const TrafficOverview = () => {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">

      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-5">

          <h3 className="text-sm font-semibold">
            Total Users
          </h3>

          <button className="text-sm text-gray-400">
            Total Projects
          </button>

          <button className="text-sm text-gray-400">
            Operating Status
          </button>

        </div>

        <div className="flex items-center gap-4 text-xs">

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-900" />
            This year
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            Last year
          </span>

        </div>

      </div>

      {/* CHART */}
      <div className="h-[290px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#eeeeee"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#999",
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#999",
              }}
              tickFormatter={(value) =>
                `${value / 1000}K`
              }
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="thisYear"
              stroke="#111111"
              strokeWidth={1.5}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#b7cfff"
              strokeWidth={1.5}
              strokeDasharray="3 4"
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default TrafficOverview;