import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  {
    name: "United States",
    value: 52.1,
  },
  {
    name: "Canada",
    value: 22.8,
  },
  {
    name: "Mexico",
    value: 13.9,
  },
  {
    name: "Other",
    value: 11.2,
  },
];

const COLORS = [
  "#111111",
  "#6faaf5",
  "#6fd58a",
  "#9bb8df",
];

const LocationTraffic = () => {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">

      <h3 className="mb-4 text-sm font-semibold">
        Traffic by Location
      </h3>

      <div className="flex h-[220px] items-center justify-center gap-6">

        {/* DONUT */}
        <div className="h-[170px] w-[170px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={2}
              >

                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* LEGEND */}
        <div className="space-y-4">

          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3"
            >

              <span className="h-2 w-2 rounded-full bg-gray-900" />

              <span className="w-28 text-xs text-gray-700">
                {item.name}
              </span>

              <span className="text-xs text-gray-500">
                {item.value}%
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default LocationTraffic;