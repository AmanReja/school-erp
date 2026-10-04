import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sun,
  Moon,
  Bell,
  PanelLeft,
  Star,
  User,
  Settings,
  Shield,
  LogOut,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useSettings } from "../Contexts/SettingsContext";

const DashboardHeader = () => {
  const { sidebarCollapsed, toggleSidebar, theme, setTheme } = useSettings();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const menuRef = useRef(null);

  // Safe user resolution
  const storedUser = (() => {
    try {
      const data = localStorage.getItem("user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })();

  const userType = storedUser?.role || "Administrator";
  const userName = storedUser?.name || "Alex Rivera";
  const userEmail = storedUser?.email || "alex.rivera@example.com";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isDark = theme === "dark";

  // Handle outside clicks to close profile modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header
      className={`relative z-40 flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6 backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-slate-800/80 bg-slate-950/80 text-slate-100"
          : "border-slate-200/90 bg-white/80 text-slate-900"
      }`}
    >
      {/* ================= LEFT SECTION ================= */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 ${
            isDark
              ? "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-100"
              : "border-slate-200/80 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
          }`}
        >
          <PanelLeft size={18} strokeWidth={1.8} />
        </button>

        {/* Favorite Bookmark Button */}
        <button
          onClick={() => setIsStarred(!isStarred)}
          title={isStarred ? "Remove from favorites" : "Add to favorites"}
          className={`hidden h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 sm:flex active:scale-95 ${
            isStarred
              ? isDark
                ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                : "border-amber-200 bg-amber-50 text-amber-500 shadow-sm"
              : isDark
                ? "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-amber-400"
                : "border-slate-200/80 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-amber-500 shadow-sm"
          }`}
        >
          <Star
            size={17}
            strokeWidth={1.8}
            className={isStarred ? "fill-current" : ""}
          />
        </button>

        {/* Breadcrumb Navigation */}
        <nav className="hidden items-center gap-2 text-sm md:flex pl-1">
          <span
            className={`font-medium transition-colors ${
              isDark
                ? "text-slate-500 hover:text-slate-400"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Dashboards
          </span>
          <span className={isDark ? "text-slate-700" : "text-slate-300"}>
            /
          </span>
          <span className="flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold capitalize tracking-wide bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Sparkles size={12} />
            {userType}
          </span>
        </nav>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div
          className={`group hidden h-9 w-48 sm:w-60 items-center gap-2.5 rounded-xl border px-3 transition-all duration-200 focus-within:w-72 focus-within:ring-2 md:flex ${
            isDark
              ? "border-slate-800 bg-slate-900/70 text-slate-200 focus-within:border-indigo-500 focus-within:ring-indigo-500/20"
              : "border-slate-200 bg-slate-50/80 text-slate-800 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-indigo-500/20 shadow-sm"
          }`}
        >
          <Search
            size={15}
            className={`shrink-0 transition-colors ${
              isDark
                ? "text-slate-500 group-focus-within:text-indigo-400"
                : "text-slate-400 group-focus-within:text-indigo-600"
            }`}
          />
          <input
            type="text"
            placeholder="Search resources, actions..."
            className={`w-full bg-transparent text-xs font-medium outline-none ${
              isDark
                ? "text-slate-100 placeholder:text-slate-500"
                : "text-slate-900 placeholder:text-slate-400"
            }`}
          />
          <kbd
            className={`hidden shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold sm:inline-block border ${
              isDark
                ? "border-slate-800 bg-slate-800/60 text-slate-400"
                : "border-slate-200 bg-white text-slate-500 shadow-2xs"
            }`}
          >
            ⌘K
          </kbd>
        </div>

        {/* Theme Switcher Toggle */}
        <div
          className={`flex items-center rounded-xl border p-0.5 ${
            isDark
              ? "border-slate-800 bg-slate-900/80"
              : "border-slate-200 bg-slate-100/90 shadow-2xs"
          }`}
        >
          <button
            onClick={() => setTheme("light")}
            title="Light mode"
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 ${
              !isDark
                ? "bg-white text-amber-500 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sun size={15} strokeWidth={2} />
          </button>
          <button
            onClick={() => setTheme("dark")}
            title="Dark mode"
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 ${
              isDark
                ? "bg-slate-800 text-indigo-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Moon size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Notification Bell */}
        <button
          title="Notifications"
          className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 active:scale-95 ${
            isDark
              ? "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-100"
              : "border-slate-200/80 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-sm"
          }`}
        >
          <Bell size={17} strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
        </button>

        {/* ================= USER PROFILE DROPDOWN / POPUP ================= */}
        <div className="relative pl-1" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            aria-expanded={isUserMenuOpen}
            className={`group flex items-center gap-2 rounded-xl p-1 transition-all duration-200 focus:outline-none ${
              isDark ? "hover:bg-slate-900" : "hover:bg-slate-100"
            }`}
          >
            {/* Avatar with Gradient Border */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 ring-2 ring-white/10">
              {initials}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
            </div>

            <ChevronDown
              size={14}
              className={`hidden text-slate-400 transition-transform duration-200 sm:block ${
                isUserMenuOpen
                  ? "rotate-180 text-indigo-500"
                  : "group-hover:text-slate-600 dark:group-hover:text-slate-200"
              }`}
            />
          </button>

          {/* Popup Modal / Menu */}
          {isUserMenuOpen && (
            <div
              className={`absolute right-0 top-12 w-64 origin-top-right rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl transition-all duration-200 animate-in fade-in zoom-in-95 ${
                isDark
                  ? "border-slate-800 bg-slate-950/95 text-slate-200 shadow-black/60"
                  : "border-slate-200 bg-white/95 text-slate-800 shadow-slate-300/40"
              }`}
            >
              {/* Profile Card Header */}
              <div
                className={`flex items-center gap-3 rounded-xl p-3 border ${
                  isDark
                    ? "border-slate-800/80 bg-slate-900/60"
                    : "border-slate-100 bg-slate-50/80"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-sm">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold">{userName}</p>
                  <p
                    className={`truncate text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {userEmail}
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-2 space-y-0.5">
                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isDark
                      ? "hover:bg-slate-900 hover:text-slate-100"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <User size={15} className="text-slate-400" />
                    <span>View Profile</span>
                  </div>
                  <span className="rounded bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.2 text-[9px] text-slate-500">
                    Ctrl+P
                  </span>
                </button>

                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isDark
                      ? "hover:bg-slate-900 hover:text-slate-100"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Settings size={15} className="text-slate-400" />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={() => setIsUserMenuOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isDark
                      ? "hover:bg-slate-900 hover:text-slate-100"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield size={15} className="text-slate-400" />
                    <span>Role Privileges</span>
                  </div>
                  <span className="text-[10px] text-indigo-500 font-semibold">
                    {userType}
                  </span>
                </button>
              </div>

              <div
                className={`my-1.5 h-px ${
                  isDark ? "bg-slate-800" : "bg-slate-100"
                }`}
              />

              {/* Sign Out Button */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-500 transition-colors hover:bg-rose-500/10 dark:hover:bg-rose-500/15"
              >
                <LogOut size={15} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
