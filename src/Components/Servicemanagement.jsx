import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Settings,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Package,
  Activity,
  Layers,
} from "lucide-react";

import { Theme } from "../Contexts/Theme";

const Servicemanagement = () => {
  const { theme } = useContext(Theme);

  const isDark = theme === "dark";

  const tabs = [
    // {
    //   name: "Service Master",
    //   path: "/dashboard/service/servicemaster",
    //   icon: FileText,
    // },
    {
      name: "Active Services",
      path: "/dashboard/service/activeservice",
      icon: CheckCircle2,
    },
    {
      name: "Active Package",
      path: "/dashboard/service/activepkg",
      icon: CheckCircle2,
    },
    {
      name: "Inactive Services",
      path: "/dashboard/service/inactive",
      icon: XCircle,
    },
    {
      name: "Inactive Package",
      path: "/dashboard/service/inactive",
      icon: XCircle,
    },
  ];

  return (
    <div
      className={`w-full rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <main className="w-full h-full flex flex-col overflow-y-auto overflow-x-hidden">
        <section className="w-full flex flex-col gap-5 mt-5 px-2 sm:px-5 pb-8">

          {/* ================= HERO ================= */}
          <div
            className="
              relative overflow-hidden rounded-3xl
              bg-gradient-to-br from-indigo-950
              via-indigo-900 to-violet-800
              shadow-[0_20px_60px_rgba(79,70,229,0.25)]
              px-6 py-7 md:px-10 md:py-9
            "
          >
            {/* Decorative background */}
            <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -left-24 -bottom-32 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl" />

            <div
              className="
                absolute inset-0 opacity-[0.06]
                bg-[linear-gradient(to_right,#fff_1px,transparent_1px),
                linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                bg-[size:32px_32px]
              "
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

              {/* ================= HERO CONTENT ================= */}
              <div className="w-full lg:max-w-2xl">

                {/* Badge */}
                <div
                  className="
                    inline-flex items-center gap-2
                    px-3 py-1.5 rounded-full
                    bg-white/10 border border-white/10
                    text-indigo-100 text-[11px]
                    font-semibold backdrop-blur-sm
                  "
                >
                  <Settings size={14} />
                  Service Management
                </div>

                {/* Heading */}
                <h1 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Service Management
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm md:text-[15px] text-indigo-100/80 leading-7 max-w-xl">
                  Manage and monitor services from one centralized workspace.
                  Configure service details, track service availability, and
                  maintain complete visibility across your service network.
                </p>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 mt-6">

                  {/* Service Directory */}
                  <div
                    className="
                      flex items-center gap-2
                      px-3.5 py-2 rounded-xl
                      bg-white/10 border border-white/10
                      backdrop-blur-sm
                    "
                  >
                    <Layers size={15} className="text-white" />

                    <span className="text-xs font-medium text-indigo-100">
                      Service Directory
                    </span>
                  </div>

                  {/* Service Activity */}
                  <div
                    className="
                      flex items-center gap-2
                      px-3.5 py-2 rounded-xl
                      bg-white/10 border border-white/10
                      backdrop-blur-sm
                    "
                  >
                    <Activity size={15} className="text-white" />

                    <span className="text-xs font-medium text-indigo-100">
                      Service Activity
                    </span>
                  </div>

                </div>
              </div>

              {/* ================= HERO VISUAL ================= */}
              <div className="relative hidden md:flex items-center justify-center shrink-0">

                {/* Glow */}
                <div className="absolute w-52 h-52 rounded-full bg-white/10 blur-3xl" />

                {/* Main Card */}
                <div
                  className="
                    relative w-48 h-48
                    rounded-[2rem]
                    bg-white/10
                    border border-white/20
                    backdrop-blur-md
                    flex flex-col items-center justify-center
                    shadow-2xl
                  "
                >

                  {/* Icon */}
                  <div
                    className="
                      w-16 h-16 rounded-2xl
                      bg-white/10
                      border border-white/20
                      flex items-center justify-center
                    "
                  >
                    <Settings
                      size={34}
                      className="text-white"
                    />
                  </div>

                  {/* Title */}
                  <p className="mt-4 text-white font-semibold text-sm">
                    Service Center
                  </p>

                  {/* Subtitle */}
                  <p className="mt-1 text-indigo-100/60 text-[11px]">
                    Configured & Organized
                  </p>
                </div>

                {/* Floating Icon */}
                <div
                  className="
                    absolute -right-4 top-5
                    w-10 h-10 rounded-xl
                    bg-white/10
                    border border-white/20
                    backdrop-blur-md
                    flex items-center justify-center
                  "
                >
                  <ArrowUpRight
                    size={18}
                    className="text-white"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* ================= PAGE HEADER ================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div>
              <h2
                className={`text-xl font-semibold ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Service Management
              </h2>

              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Manage service configurations, monitor availability, and
                maintain complete visibility across your services.
              </p>
            </div>

            {/* Status Indicator */}
            <div
              className={`
                inline-flex items-center gap-2
                px-3 py-2 rounded-lg
                border text-xs font-medium
                ${
                  isDark
                    ? "bg-gray-900 border-gray-800 text-gray-400"
                    : "bg-white border-gray-200 text-gray-500"
                }
              `}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>

              Service system active
            </div>
          </div>

          {/* ================= NAVIGATION ================= */}
          <div
            className={`
              w-full rounded-xl border p-1.5
              ${
                isDark
                  ? "bg-gray-900/80 border-gray-800"
                  : "bg-white border-gray-200"
              }
            `}
          >
            <nav className="flex items-center gap-1 overflow-x-auto">

              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    className={({ isActive }) =>
                      `
                      relative flex items-center gap-2
                      whitespace-nowrap
                      px-4 py-2.5
                      rounded-lg
                      text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? isDark
                            ? "bg-indigo-500/15 text-indigo-400 shadow-sm"
                            : "bg-indigo-50 text-indigo-600 shadow-sm"
                          : isDark
                          ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                      }
                    `
                    }
                  >
                    <Icon size={16} />

                    <span>{tab.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* ================= CONTENT ================= */}
          <div
            className={`
              w-full rounded-xl
              ${isDark ? "text-gray-100" : "text-gray-800"}
            `}
          >
            <Outlet />
          </div>

        </section>
      </main>
    </div>
  );
};

export default Servicemanagement;