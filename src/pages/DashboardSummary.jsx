import React from "react";
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
  Sparkles,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings } from "../Contexts/SettingsContext";

const DashboardSummary = () => {
  const { theme } = useSettings();
  const isDark = theme === "dark";

  // Data summary (connect to Redux / API whenever ready)
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
      role: "Senior Teacher",
      time: "09:02 AM",
      status: "Present",
    },
    {
      id: 2,
      name: "Priya Das",
      role: "Mathematics Teacher",
      time: "08:56 AM",
      status: "Present",
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Lab Assistant",
      time: "09:21 AM",
      status: "Late",
    },
    {
      id: 4,
      name: "Sneha Roy",
      role: "Science Faculty",
      time: "—",
      status: "Absent",
    },
    {
      id: 5,
      name: "Arjun Singh",
      role: "Admin Executive",
      time: "08:48 AM",
      status: "Present",
    },
  ];

  // Modern dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return {
          pill: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-500/15",
          dot: "bg-emerald-500",
        };
      case "Late":
        return {
          pill: "bg-amber-500/10 text-amber-500 border-amber-500/20 dark:bg-amber-500/15",
          dot: "bg-amber-500",
        };
      case "Absent":
        return {
          pill: "bg-rose-500/10 text-rose-500 border-rose-500/20 dark:bg-rose-500/15",
          dot: "bg-rose-500",
        };
      default:
        return {
          pill: "bg-slate-500/10 text-slate-500 border-slate-500/20",
          dot: "bg-slate-400",
        };
    }
  };

  // Radial chart circumference calculation
  const circleRadius = 52;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circumference - (circumference * summary.attendancePercentage) / 100;

  return (
    <div
      className={`min-h-screen p-5 md:p-8 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50/70 text-slate-900"
      }`}
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 text-[10px] font-semibold text-indigo-500 dark:text-indigo-400">
              <Sparkles size={11} /> Overview
            </span>
            <span
              className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              • Today's Insights
            </span>
          </div>

          <h1 className="mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">
            {getGreeting()}, Admin 👋
          </h1>
          <p
            className={`mt-0.5 text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            Here is a live summary of your staff attendance and operations for
            today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/create-staff"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:bg-indigo-700 active:scale-95"
          >
            <Plus size={16} strokeWidth={2.2} />
            <span>Add Staff Member</span>
          </Link>
        </div>
      </div>

      {/* =====================================================
          TOP STATS GRID
      ====================================================== */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Staff */}
        <div
          className={`group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
            isDark
              ? "border-slate-800/80 bg-slate-900/60 shadow-black/40 hover:border-slate-700"
              : "border-slate-200/80 bg-white/80 shadow-slate-200/50 hover:border-slate-300"
          }`}
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-300 group-hover:scale-125" />
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Total Staff
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 transition-transform duration-200 group-hover:scale-110 dark:bg-indigo-500/20 dark:text-indigo-400">
              <Users size={19} strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight">
              {summary.totalStaff}
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-500">
              <TrendingUp size={11} /> +8.2%
            </span>
          </div>
          <p
            className={`mt-1 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            Active working personnel
          </p>
        </div>

        {/* Present Today */}
        <div
          className={`group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
            isDark
              ? "border-slate-800/80 bg-slate-900/60 shadow-black/40 hover:border-slate-700"
              : "border-slate-200/80 bg-white/80 shadow-slate-200/50 hover:border-slate-300"
          }`}
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-300 group-hover:scale-125" />
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Present Today
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 transition-transform duration-200 group-hover:scale-110 dark:bg-emerald-500/20 dark:text-emerald-400">
              <UserCheck size={19} strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight">
              {summary.presentToday}
            </span>
            <span className="text-[11px] font-semibold text-emerald-500">
              {summary.attendancePercentage}% turn-out
            </span>
          </div>
          <p
            className={`mt-1 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            Checked in before cutoff
          </p>
        </div>

        {/* Absent */}
        <div
          className={`group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
            isDark
              ? "border-slate-800/80 bg-slate-900/60 shadow-black/40 hover:border-slate-700"
              : "border-slate-200/80 bg-white/80 shadow-slate-200/50 hover:border-slate-300"
          }`}
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-500/10 blur-2xl transition-all duration-300 group-hover:scale-125" />
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Absent Today
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 transition-transform duration-200 group-hover:scale-110 dark:bg-rose-500/20 dark:text-rose-400">
              <UserX size={19} strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight">
              {summary.absentToday}
            </span>
            <span className="rounded-md bg-rose-500/10 px-1.5 py-0.5 text-[11px] font-semibold text-rose-500">
              Action needed
            </span>
          </div>
          <p
            className={`mt-1 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            Unexcused absences
          </p>
        </div>

        {/* On Leave */}
        <div
          className={`group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
            isDark
              ? "border-slate-800/80 bg-slate-900/60 shadow-black/40 hover:border-slate-700"
              : "border-slate-200/80 bg-white/80 shadow-slate-200/50 hover:border-slate-300"
          }`}
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all duration-300 group-hover:scale-125" />
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              On Approved Leave
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-transform duration-200 group-hover:scale-110 dark:bg-amber-500/20 dark:text-amber-400">
              <CalendarDays size={19} strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight">
              {summary.onLeave}
            </span>
            <span className="text-[11px] font-semibold text-amber-500">
              Approved
            </span>
          </div>
          <p
            className={`mt-1 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            Sick or planned vacation
          </p>
        </div>
      </div>

      {/* =====================================================
          MIDDLE ROW: ATTENDANCE DIAL + ROLE DISTRIBUTION
      ====================================================== */}
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Attendance Ring Overview */}
        <div
          className={`xl:col-span-2 rounded-2xl border p-6 backdrop-blur-xl transition-all ${
            isDark
              ? "border-slate-800/80 bg-slate-900/60"
              : "border-slate-200/80 bg-white/80 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800/80 border-slate-100">
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                Attendance Metrics
              </h2>
              <p
                className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Real-time turnout percentage for today
              </p>
            </div>
            <Link
              to="/dashboard/attendance"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              Detailed logs <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-8 sm:flex-row">
            {/* SVG Circular Progress Meter */}
            <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                <defs>
                  <linearGradient
                    id="attendanceGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r={circleRadius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className={isDark ? "text-slate-800/80" : "text-slate-100"}
                />
                <circle
                  cx="60"
                  cy="60"
                  r={circleRadius}
                  fill="none"
                  stroke="url(#attendanceGradient)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold tracking-tight">
                  {summary.attendancePercentage}%
                </span>
                <span
                  className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}
                >
                  Turnout
                </span>
              </div>
            </div>

            {/* Quick Micro-Cards */}
            <div className="grid w-full flex-1 grid-cols-2 gap-3">
              <div
                className={`rounded-xl border p-3.5 transition-colors ${
                  isDark
                    ? "border-slate-800/70 bg-slate-950/40"
                    : "border-slate-100 bg-slate-50/70"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />
                  Present
                </div>
                <p className="mt-1.5 text-xl font-bold">
                  {summary.presentToday}
                </p>
                <span className="text-[10px] text-emerald-500 font-medium">
                  On campus
                </span>
              </div>

              <div
                className={`rounded-xl border p-3.5 transition-colors ${
                  isDark
                    ? "border-slate-800/70 bg-slate-950/40"
                    : "border-slate-100 bg-slate-50/70"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-rose-500 shadow-xs shadow-rose-500/50" />
                  Absent
                </div>
                <p className="mt-1.5 text-xl font-bold">
                  {summary.absentToday}
                </p>
                <span className="text-[10px] text-rose-500 font-medium">
                  Unexcused
                </span>
              </div>

              <div
                className={`rounded-xl border p-3.5 transition-colors ${
                  isDark
                    ? "border-slate-800/70 bg-slate-950/40"
                    : "border-slate-100 bg-slate-50/70"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-amber-500 shadow-xs shadow-amber-500/50" />
                  Leave
                </div>
                <p className="mt-1.5 text-xl font-bold">{summary.onLeave}</p>
                <span className="text-[10px] text-amber-500 font-medium">
                  Approved
                </span>
              </div>

              <div
                className={`rounded-xl border p-3.5 transition-colors ${
                  isDark
                    ? "border-slate-800/70 bg-slate-950/40"
                    : "border-slate-100 bg-slate-50/70"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-xs shadow-indigo-500/50" />
                  Total Staff
                </div>
                <p className="mt-1.5 text-xl font-bold">{summary.totalStaff}</p>
                <span className="text-[10px] text-indigo-500 font-medium">
                  Registered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Role Breakdown */}
        <div
          className={`rounded-2xl border p-6 backdrop-blur-xl transition-all ${
            isDark
              ? "border-slate-800/80 bg-slate-900/60"
              : "border-slate-200/80 bg-white/80 shadow-xs"
          }`}
        >
          <div className="border-b pb-4 dark:border-slate-800/80 border-slate-100">
            <h2 className="text-sm font-bold tracking-tight">
              Staff Breakdown
            </h2>
            <p
              className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Workforce distribution by role
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {/* Teachers */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-2 font-medium">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20">
                    <GraduationCap size={13} />
                  </span>
                  Teaching Faculty
                </span>
                <span className="font-bold">
                  {summary.teachers} (
                  {Math.round((summary.teachers / summary.totalStaff) * 100)}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{
                    width: `${(summary.teachers / summary.totalStaff) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Other Staff */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-2 font-medium">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 dark:bg-blue-500/20">
                    <Users size={13} />
                  </span>
                  Administrative & Support
                </span>
                <span className="font-bold">
                  {summary.staff} (
                  {Math.round((summary.staff / summary.totalStaff) * 100)}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${(summary.staff / summary.totalStaff) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Footer Summary Banner */}
            <div
              className={`mt-6 flex items-center justify-between rounded-xl border p-3.5 ${
                isDark
                  ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-300"
                  : "border-indigo-100 bg-indigo-50/70 text-indigo-700"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                <ClipboardCheck size={16} />
                <span>Total Active Headcount</span>
              </div>
              <span className="text-base font-extrabold">
                {summary.totalStaff}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM ROW: RECENT ATTENDANCE TABLE + QUICK ACTIONS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Recent Attendance */}
        <div
          className={`xl:col-span-2 overflow-hidden rounded-2xl border backdrop-blur-xl ${
            isDark
              ? "border-slate-800/80 bg-slate-900/60"
              : "border-slate-200/80 bg-white/80 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between border-b px-5 py-4 dark:border-slate-800/80 border-slate-100">
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                Recent Check-ins
              </h2>
              <p
                className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Latest attendance events registered today
              </p>
            </div>
            <Link
              to="/dashboard/attendance"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              View all <ChevronRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b text-[10px] font-semibold uppercase tracking-wider ${
                  isDark
                    ? "border-slate-800/80 bg-slate-900/40 text-slate-400"
                    : "border-slate-100 bg-slate-50 text-slate-500"
                }`}
              >
                <tr>
                  <th className="px-5 py-3">Employee</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${isDark ? "divide-slate-800/60" : "divide-slate-100"}`}
              >
                {recentAttendance.map((item) => {
                  const badge = getStatusBadge(item.status);
                  const initial = item.name.charAt(0).toUpperCase();

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isDark
                          ? "hover:bg-slate-800/40"
                          : "hover:bg-slate-50/70"
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-[11px] font-bold text-white shadow-xs">
                            {initial}
                          </div>
                          <span className="font-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td
                        className={`px-5 py-3.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                      >
                        {item.role}
                      </td>
                      <td className="px-5 py-3.5 text-slate-400">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Clock3 size={12} />
                          {item.time}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badge.pill}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${badge.dot}`}
                          />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div
          className={`rounded-2xl border p-5 backdrop-blur-xl ${
            isDark
              ? "border-slate-800/80 bg-slate-900/60"
              : "border-slate-200/80 bg-white/80 shadow-xs"
          }`}
        >
          <div className="border-b pb-3.5 dark:border-slate-800/80 border-slate-100">
            <h2 className="text-sm font-bold tracking-tight">Quick Actions</h2>
            <p
              className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Frequently accessed admin shortcuts
            </p>
          </div>

          <div className="mt-3.5 space-y-2">
            <Link
              to="/dashboard/create-staff"
              className={`group flex items-center justify-between rounded-xl border p-3 transition-all duration-200 active:scale-[0.98] ${
                isDark
                  ? "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/60"
                  : "border-slate-100 bg-slate-50/70 hover:border-slate-200 hover:bg-white hover:shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-400">
                  <UserCheck size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold group-hover:text-indigo-500 transition-colors">
                    Add New Staff
                  </p>
                  <p
                    className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Register faculty or employees
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-400 transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              to="/dashboard/attendance"
              className={`group flex items-center justify-between rounded-xl border p-3 transition-all duration-200 active:scale-[0.98] ${
                isDark
                  ? "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/60"
                  : "border-slate-100 bg-slate-50/70 hover:border-slate-200 hover:bg-white hover:shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <ClipboardCheck size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold group-hover:text-emerald-500 transition-colors">
                    Mark Attendance
                  </p>
                  <p
                    className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Record today's log entries
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-400 transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              to="/dashboard/leave"
              className={`group flex items-center justify-between rounded-xl border p-3 transition-all duration-200 active:scale-[0.98] ${
                isDark
                  ? "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/60"
                  : "border-slate-100 bg-slate-50/70 hover:border-slate-200 hover:bg-white hover:shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold group-hover:text-amber-500 transition-colors">
                    Leave Requests
                  </p>
                  <p
                    className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Approve or deny applications
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-400 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
