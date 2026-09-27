
import React, { useContext } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Clock3,
  CalendarDays,
  GraduationCap,
  ClipboardCheck,
  TrendingUp,
  ArrowUpRight,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import {useSettings} from "../Contexts/SettingsContext";

const DashboardSummary = () => {
  const{theme} =useSettings()

  const isDark = theme === "dark";

  /*
   * Replace these with Redux/API data later.
   */
  const summary = {
    totalStaff: 48,
    teachers: 32,
    staff: 16,
    presentToday: 41,
    absentToday: 4,
    onLeave: 3,
    attendancePercentage: 85.4,
  };

  const recentAttendance = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Teacher",
      time: "09:02 AM",
      status: "Present",
    },
    {
      id: 2,
      name: "Priya Das",
      role: "Teacher",
      time: "08:56 AM",
      status: "Present",
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Staff",
      time: "09:21 AM",
      status: "Late",
    },
    {
      id: 4,
      name: "Sneha Roy",
      role: "Teacher",
      time: "—",
      status: "Absent",
    },
    {
      id: 5,
      name: "Arjun Singh",
      role: "Staff",
      time: "08:48 AM",
      status: "Present",
    },
  ];

  const cardClass = `
    rounded-2xl
    border
    ${
      isDark
        ? "bg-gray-900 border-gray-800"
        : "bg-white border-gray-200"
    }
  `;

  const textPrimary = isDark
    ? "text-gray-100"
    : "text-gray-800";

  const textSecondary = "text-gray-500";

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";

      case "Late":
        return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";

      case "Absent":
        return "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      className={`
        min-h-screen
        p-5 md:p-6
        ${
          isDark
            ? "bg-gray-950"
            : "bg-gray-50"
        }
      `}
    >

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <p className="text-xs text-gray-500 mb-1">
            Dashboard
          </p>

          <h1
            className={`text-2xl font-semibold ${textPrimary}`}
          >
            Good Morning 👋
          </h1>

          <p className={`text-sm ${textSecondary} mt-1`}>
            Here's what's happening with your organization today.
          </p>
        </div>

        <div className="flex items-center gap-2">

          <Link
            to="/dashboard/create-staff"
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              text-xs
              font-semibold
              transition
            "
          >
            <Plus size={15} />
            Create Staff
          </Link>

        </div>

      </div>

      {/* =====================================================
          TOP SUMMARY CARDS
      ====================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

        {/* Total Staff */}
        <div className={`${cardClass} p-4`}>

          <div className="flex items-start justify-between">

            <div>
              <p className="text-xs text-gray-500">
                Total Staff
              </p>

              <h2
                className={`text-2xl font-semibold mt-2 ${textPrimary}`}
              >
                {summary.totalStaff}
              </h2>

              <div className="flex items-center gap-1 mt-2">
                <TrendingUp
                  size={12}
                  className="text-emerald-500"
                />

                <span className="text-[11px] text-emerald-500">
                  8.2%
                </span>

                <span className="text-[11px] text-gray-500">
                  this month
                </span>
              </div>
            </div>

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-indigo-50
                dark:bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
                flex items-center justify-center
              "
            >
              <Users size={19} />
            </div>

          </div>

        </div>

        {/* Present */}
        <div className={`${cardClass} p-4`}>

          <div className="flex items-start justify-between">

            <div>
              <p className="text-xs text-gray-500">
                Present Today
              </p>

              <h2
                className={`text-2xl font-semibold mt-2 ${textPrimary}`}
              >
                {summary.presentToday}
              </h2>

              <p className="text-[11px] text-emerald-500 mt-2">
                {summary.attendancePercentage}% attendance
              </p>
            </div>

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-emerald-50
                dark:bg-emerald-500/10
                text-emerald-600
                dark:text-emerald-400
                flex items-center justify-center
              "
            >
              <UserCheck size={19} />
            </div>

          </div>

        </div>

        {/* Absent */}
        <div className={`${cardClass} p-4`}>

          <div className="flex items-start justify-between">

            <div>
              <p className="text-xs text-gray-500">
                Absent Today
              </p>

              <h2
                className={`text-2xl font-semibold mt-2 ${textPrimary}`}
              >
                {summary.absentToday}
              </h2>

              <p className="text-[11px] text-red-500 mt-2">
                Needs attention
              </p>
            </div>

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-red-50
                dark:bg-red-500/10
                text-red-600
                dark:text-red-400
                flex items-center justify-center
              "
            >
              <UserX size={19} />
            </div>

          </div>

        </div>

        {/* Leave */}
        <div className={`${cardClass} p-4`}>

          <div className="flex items-start justify-between">

            <div>
              <p className="text-xs text-gray-500">
                On Leave
              </p>

              <h2
                className={`text-2xl font-semibold mt-2 ${textPrimary}`}
              >
                {summary.onLeave}
              </h2>

              <p className="text-[11px] text-amber-500 mt-2">
                Today
              </p>
            </div>

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-amber-50
                dark:bg-amber-500/10
                text-amber-600
                dark:text-amber-400
                flex items-center justify-center
              "
            >
              <CalendarDays size={19} />
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ===================================================
            ATTENDANCE OVERVIEW
        ==================================================== */}
        <div className={`${cardClass} xl:col-span-2`}>

          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">

            <div className="flex items-center justify-between">

              <div>
                <h2
                  className={`text-sm font-semibold ${textPrimary}`}
                >
                  Attendance Overview
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  Today's attendance summary
                </p>
              </div>

              <Link
                to="/dashboard/attendance"
                className="
                  text-[11px]
                  font-medium
                  text-indigo-600
                  dark:text-indigo-400
                  flex
                  items-center
                  gap-1
                "
              >
                View Details
                <ArrowUpRight size={13} />
              </Link>

            </div>

          </div>

          <div className="p-5">

            {/* Attendance Circle */}
            <div className="flex flex-col sm:flex-row items-center gap-8">

              <div className="relative w-36 h-36">

                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className={
                      isDark
                        ? "text-gray-800"
                        : "text-gray-100"
                    }
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    strokeDashoffset={
                      314 -
                      (314 *
                        summary.attendancePercentage) /
                        100
                    }
                    className="text-indigo-600"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                  <span
                    className={`text-2xl font-semibold ${textPrimary}`}
                  >
                    {summary.attendancePercentage}%
                  </span>

                  <span className="text-[10px] text-gray-500">
                    Attendance
                  </span>

                </div>

              </div>

              {/* Attendance Stats */}
              <div className="flex-1 w-full grid grid-cols-2 gap-4">

                <div
                  className={`
                    p-4 rounded-xl
                    ${
                      isDark
                        ? "bg-gray-800/50"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                    <span className="text-xs text-gray-500">
                      Present
                    </span>

                  </div>

                  <p
                    className={`text-xl font-semibold mt-2 ${textPrimary}`}
                  >
                    {summary.presentToday}
                  </p>
                </div>

                <div
                  className={`
                    p-4 rounded-xl
                    ${
                      isDark
                        ? "bg-gray-800/50"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 rounded-full bg-red-500" />

                    <span className="text-xs text-gray-500">
                      Absent
                    </span>

                  </div>

                  <p
                    className={`text-xl font-semibold mt-2 ${textPrimary}`}
                  >
                    {summary.absentToday}
                  </p>
                </div>

                <div
                  className={`
                    p-4 rounded-xl
                    ${
                      isDark
                        ? "bg-gray-800/50"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 rounded-full bg-amber-500" />

                    <span className="text-xs text-gray-500">
                      Leave
                    </span>

                  </div>

                  <p
                    className={`text-xl font-semibold mt-2 ${textPrimary}`}
                  >
                    {summary.onLeave}
                  </p>
                </div>

                <div
                  className={`
                    p-4 rounded-xl
                    ${
                      isDark
                        ? "bg-gray-800/50"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 rounded-full bg-blue-500" />

                    <span className="text-xs text-gray-500">
                      Total
                    </span>

                  </div>

                  <p
                    className={`text-xl font-semibold mt-2 ${textPrimary}`}
                  >
                    {summary.totalStaff}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            STAFF BREAKDOWN
        ==================================================== */}
        <div className={`${cardClass}`}>

          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">

            <h2
              className={`text-sm font-semibold ${textPrimary}`}
            >
              Staff Breakdown
            </h2>

            <p className="text-[11px] text-gray-500 mt-1">
              Employees by role
            </p>

          </div>

          <div className="p-5 space-y-5">

            {/* Teachers */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-2">

                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <GraduationCap size={16} />
                  </div>

                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Teachers
                  </span>

                </div>

                <span className={`text-sm font-semibold ${textPrimary}`}>
                  {summary.teachers}
                </span>

              </div>

              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${
                      (summary.teachers /
                        summary.totalStaff) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* Staff */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-2">

                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Users size={16} />
                  </div>

                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Other Staff
                  </span>

                </div>

                <span className={`text-sm font-semibold ${textPrimary}`}>
                  {summary.staff}
                </span>

              </div>

              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${
                      (summary.staff /
                        summary.totalStaff) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* Total */}
            <div
              className={`
                rounded-xl
                p-4
                ${
                  isDark
                    ? "bg-indigo-500/10"
                    : "bg-indigo-50"
                }
              `}
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <ClipboardCheck
                    size={17}
                    className="text-indigo-600 dark:text-indigo-400"
                  />

                  <span className="text-xs text-gray-500">
                    Total Employees
                  </span>

                </div>

                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  {summary.totalStaff}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT ATTENDANCE + QUICK ACTIONS
      ====================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">

        {/* Recent Attendance */}
        <div className={`${cardClass} xl:col-span-2`}>

          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">

            <div className="flex items-center justify-between">

              <div>
                <h2
                  className={`text-sm font-semibold ${textPrimary}`}
                >
                  Recent Attendance
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  Latest check-ins today
                </p>
              </div>

              <Link
                to="/dashboard/attendance"
                className="
                  text-[11px]
                  text-indigo-600
                  dark:text-indigo-400
                  flex
                  items-center
                  gap-1
                "
              >
                View All
                <ChevronRight size={13} />
              </Link>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead
                className={
                  isDark
                    ? "bg-gray-800/50"
                    : "bg-gray-50"
                }
              >
                <tr>

                  <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">
                    Employee
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">
                    Role
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">
                    Check In
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody
                className={
                  isDark
                    ? "divide-y divide-gray-800"
                    : "divide-y divide-gray-100"
                }
              >

                {recentAttendance.map((item) => (
                  <tr
                    key={item.id}
                    className={
                      isDark
                        ? "hover:bg-gray-800/40"
                        : "hover:bg-gray-50"
                    }
                  >

                    <td className="px-5 py-3">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-8 h-8
                            rounded-lg
                            bg-indigo-50
                            dark:bg-indigo-500/10
                            text-indigo-600
                            dark:text-indigo-400
                            flex
                            items-center
                            justify-center
                            text-xs
                            font-semibold
                          "
                        >
                          {item.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span
                          className={`text-xs font-medium ${textPrimary}`}
                        >
                          {item.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-3 text-xs text-gray-500">
                      {item.role}
                    </td>

                    <td className="px-5 py-3">

                      <div className="flex items-center gap-1.5 text-xs text-gray-500">

                        <Clock3 size={13} />

                        {item.time}

                      </div>

                    </td>

                    <td className="px-5 py-3">

                      <span
                        className={`
                          inline-flex
                          px-2
                          py-1
                          rounded-md
                          text-[10px]
                          font-semibold
                          ${getStatusClass(item.status)}
                        `}
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Quick Actions */}
        <div className={`${cardClass}`}>

          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">

            <h2
              className={`text-sm font-semibold ${textPrimary}`}
            >
              Quick Actions
            </h2>

            <p className="text-[11px] text-gray-500 mt-1">
              Frequently used actions
            </p>

          </div>

          <div className="p-4 space-y-2">

            <Link
              to="/dashboard/create-staff"
              className={`
                flex
                items-center
                justify-between
                p-3
                rounded-xl
                transition
                ${
                  isDark
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-50"
                }
              `}
            >

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <UserCheck size={16} />
                </div>

                <div>
                  <p
                    className={`text-xs font-medium ${textPrimary}`}
                  >
                    Add Staff
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Create employee account
                  </p>
                </div>

              </div>

              <ChevronRight
                size={15}
                className="text-gray-400"
              />

            </Link>

            <Link
              to="/dashboard/attendance"
              className={`
                flex
                items-center
                justify-between
                p-3
                rounded-xl
                transition
                ${
                  isDark
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-50"
                }
              `}
            >

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ClipboardCheck size={16} />
                </div>

                <div>
                  <p
                    className={`text-xs font-medium ${textPrimary}`}
                  >
                    Attendance
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Manage today's attendance
                  </p>
                </div>

              </div>

              <ChevronRight
                size={15}
                className="text-gray-400"
              />

            </Link>

            <Link
              to="/dashboard/leave"
              className={`
                flex
                items-center
                justify-between
                p-3
                rounded-xl
                transition
                ${
                  isDark
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-50"
                }
              `}
            >

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <CalendarDays size={16} />
                </div>

                <div>
                  <p
                    className={`text-xs font-medium ${textPrimary}`}
                  >
                    Leave Requests
                  </p>

                  <p className="text-[10px] text-gray-500">
                    Review leave applications
                  </p>
                </div>

              </div>

              <ChevronRight
                size={15}
                className="text-gray-400"
              />

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardSummary;
