import React from "react";
import {
  Eye,
  Users,
  UserPlus,
  Activity,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Views",
    value: "7,265",
    percentage: "+11.01%",
    icon: Eye,
  },
  {
    title: "Visits",
    value: "3,671",
    percentage: "-0.03%",
    icon: Activity,
  },
  {
    title: "New Users",
    value: "256",
    percentage: "+15.03%",
    icon: UserPlus,
  },
  {
    title: "Active Users",
    value: "2,318",
    percentage: "+6.08%",
    icon: Users,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => (
        <StatCard
          key={item.title}
          {...item}
        />
      ))}

    </div>
  );
};

const StatCard = ({
  title,
  value,
  percentage,
  icon: Icon,
}) => {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-600">
            {title}
          </p>

          <div className="mt-3 flex items-end gap-3">

            <h2 className="text-2xl font-semibold tracking-tight">
              {value}
            </h2>

            <div className="mb-1 flex items-center gap-1 text-xs text-gray-600">
              {percentage}

              <TrendingUp size={12} />
            </div>

          </div>
        </div>

        <div className="hidden rounded-lg bg-white p-2 shadow-sm sm:block">
          <Icon size={17} className="text-gray-500" />
        </div>

      </div>

    </div>
  );
};

export default DashboardStats;