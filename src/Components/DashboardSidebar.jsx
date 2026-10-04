import React from "react";
import {
  LayoutDashboard,
  Users,
  UserRound,
  UserCog,
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Building2,
  Settings,
  ChevronRight,
  School,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSettings } from "../Contexts/SettingsContext";

const DashboardSidebar = () => {
  const { sidebarCollapsed, theme } = useSettings();
  const isDark = theme === "dark";

  return (
    <aside
      className={`
        hidden shrink-0 border-r transition-all duration-300 ease-in-out lg:block
        ${sidebarCollapsed ? "w-[72px]" : "w-[230px]"}
        ${
          isDark
            ? "border-slate-800/80 bg-slate-950/95 text-slate-100"
            : "border-slate-200/80 bg-white/95 text-slate-900"
        }
        backdrop-blur-xl
      `}
    >
      <div className="flex h-screen flex-col">
        {/* ================= BRAND LOGO ================= */}
        <div
          className={`
            flex h-[68px] items-center border-b transition-colors
            ${isDark ? "border-slate-800/80" : "border-slate-100"}
            ${sidebarCollapsed ? "justify-center px-2" : "px-5"}
          `}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Logo Icon with subtle gradient glow */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20">
              <School size={18} strokeWidth={2.2} />
            </div>

            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="truncate text-sm font-semibold tracking-tight">
                  School ERP
                </span>
                <span
                  className={`text-[10px] font-medium tracking-wide uppercase ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Management
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= NAVIGATION CONTENT ================= */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* DASHBOARD */}
          <SidebarSection
            title="Dashboard"
            collapsed={sidebarCollapsed}
            isDark={isDark}
          >
            <SidebarItem
              icon={<LayoutDashboard size={17} strokeWidth={1.9} />}
              label="Overview"
              to="/dashboard"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
          </SidebarSection>

          {/* PEOPLE */}
          <SidebarSection
            title="People"
            collapsed={sidebarCollapsed}
            isDark={isDark}
          >
            <SidebarItem
              icon={<GraduationCap size={17} strokeWidth={1.9} />}
              label="Students"
              to="/dashboard/student"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
            <SidebarItem
              icon={<UserRound size={17} strokeWidth={1.9} />}
              label="Teachers"
              to="/dashboard/teachers"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
            <SidebarItem
              icon={<UserCog size={17} strokeWidth={1.9} />}
              label="Staff"
              to="/dashboard/staff"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
          </SidebarSection>

          {/* ATTENDANCE */}
          <SidebarSection
            title="Attendance"
            collapsed={sidebarCollapsed}
            isDark={isDark}
          >
            <SidebarItem
              icon={<ClipboardCheck size={17} strokeWidth={1.9} />}
              label="Student Attendance"
              to="/dashboard/attendance/students"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
            <SidebarItem
              icon={<ClipboardCheck size={17} strokeWidth={1.9} />}
              label="Staff Attendance"
              to="/dashboard/attendance/staff"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
          </SidebarSection>

          {/* ACADEMIC */}
          <SidebarSection
            title="Academic"
            collapsed={sidebarCollapsed}
            isDark={isDark}
          >
            <SidebarItem
              icon={<Building2 size={17} strokeWidth={1.9} />}
              label="Classes"
              to="/dashboard/classes"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
            <SidebarItem
              icon={<BookOpen size={17} strokeWidth={1.9} />}
              label="Subjects"
              to="/dashboard/subjects"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
            <SidebarItem
              icon={<CalendarDays size={17} strokeWidth={1.9} />}
              label="Timetable"
              to="/dashboard/timetable"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
          </SidebarSection>

          {/* ADMINISTRATION */}
          <SidebarSection
            title="Administration"
            collapsed={sidebarCollapsed}
            isDark={isDark}
          >
            <SidebarItem
              icon={<Building2 size={17} strokeWidth={1.9} />}
              label="School Profile"
              to="/dashboard/school-profile"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
            <SidebarItem
              icon={<Users size={17} strokeWidth={1.9} />}
              label="Users"
              to="/dashboard/users"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
          </SidebarSection>

          {/* SYSTEM */}
          <SidebarSection
            title="System"
            collapsed={sidebarCollapsed}
            isDark={isDark}
          >
            <SidebarItem
              icon={<Settings size={17} strokeWidth={1.9} />}
              label="Settings"
              to="/dashboard/settings"
              collapsed={sidebarCollapsed}
              isDark={isDark}
            />
          </SidebarSection>
        </div>
      </div>
    </aside>
  );
};

/* ---------------- SIDEBAR SECTION ---------------- */

const SidebarSection = ({ title, children, collapsed, isDark }) => {
  return (
    <div className="space-y-1">
      {!collapsed ? (
        <p
          className={`
            px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider
            ${isDark ? "text-slate-500" : "text-slate-400"}
          `}
        >
          {title}
        </p>
      ) : (
        <div
          className={`mx-auto my-2 h-px w-6 ${
            isDark ? "bg-slate-800" : "bg-slate-100"
          }`}
        />
      )}

      <div className="space-y-1">{children}</div>
    </div>
  );
};

/* ---------------- SIDEBAR ITEM ---------------- */

const SidebarItem = ({
  icon,
  label,
  to,
  arrow = false,
  collapsed = false,
  isDark,
}) => {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) => `
        group relative flex items-center rounded-xl text-xs font-medium transition-all duration-200
        ${
          collapsed
            ? "h-10 w-10 justify-center mx-auto"
            : "h-9 w-full gap-2.5 px-3"
        }

        ${
          isActive
            ? isDark
              ? "bg-indigo-500/10 text-indigo-400 font-semibold shadow-xs"
              : "bg-indigo-50 text-indigo-600 font-semibold shadow-xs"
            : isDark
              ? "text-slate-400 hover:bg-slate-900/80 hover:text-slate-200"
              : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
        }
      `}
    >
      {({ isActive }) => (
        <>
          {/* Active Accent Pill on the left edge */}
          {isActive && !collapsed && (
            <span className="absolute -left-1 top-2 bottom-2 w-1 rounded-r-full bg-indigo-500" />
          )}

          {/* Icon */}
          {icon && (
            <span
              className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
              }`}
            >
              {icon}
            </span>
          )}

          {/* Label */}
          {!collapsed && <span className="truncate flex-1">{label}</span>}

          {/* Optional Arrow */}
          {!collapsed && arrow && (
            <ChevronRight
              size={13}
              className={`shrink-0 opacity-40 transition-transform duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            />
          )}

          {/* Collapsed Tooltip Popover */}
          {collapsed && (
            <div
              className={`
                pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg border px-2.5 py-1 text-xs font-medium opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1
                ${
                  isDark
                    ? "border-slate-800 bg-slate-900 text-slate-200"
                    : "border-slate-200 bg-white text-slate-800 shadow-slate-200/50"
                }
              `}
            >
              {label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

export default DashboardSidebar;
