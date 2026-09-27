import React from "react";
import {
  LayoutDashboard,
  Folder,
  FileText,
  Users,
  Megaphone,
  UserRound,
  Building2,
  BookOpen,
  Share2,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useSettings } from "../Contexts/SettingsContext";

const DashboardSidebar = () => {
  const {
    sidebarCollapsed,
    toggleSidebar,
  } = useSettings();

  return (
    <aside
      className={`
        hidden shrink-0 border-r border-gray-200 bg-white
        transition-all duration-300 lg:block
        ${sidebarCollapsed ? "w-[68px]" : "w-[210px]"}
      `}
    >
      <div className="sticky top-0 flex h-screen flex-col">

        {/* LOGO */}
        <div
          className={`
            flex h-[68px] items-center border-b border-gray-100
            ${sidebarCollapsed
              ? "justify-center px-3"
              : "justify-between px-5"
            }
          `}
        >
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <span className="text-sm">👤</span>
              </div>

              <span className="text-sm font-semibold">
                ByeWind
              </span>

            </div>
          )}

          {sidebarCollapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <span className="text-sm">👤</span>
            </div>
          )}

      
        </div>

        {/* SIDEBAR */}
        <div className="flex-1 overflow-y-auto px-3 py-5">

          {/* FAVORITES */}
          <div className="mb-7">

            {!sidebarCollapsed && (
              <div className="mb-3 flex gap-5 px-2 text-xs text-gray-400">
                <span>Favorites</span>
                <span>Recently</span>
              </div>
            )}

            <SidebarItem
              icon={<LayoutDashboard size={15} />}
              label="Overview"
              active
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<Folder size={15} />}
              label="Projects"
              collapsed={sidebarCollapsed}
            />

          </div>

          {/* DASHBOARDS */}
          <SidebarSection
            title="Dashboards"
            collapsed={sidebarCollapsed}
          >

            <SidebarItem
              icon={<LayoutDashboard size={15} />}
              label="Overview"
              active
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<Folder size={15} />}
              label="eCommerce"
              arrow
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<Folder size={15} />}
              label="Projects"
              arrow
              collapsed={sidebarCollapsed}
            />

          </SidebarSection>

          {/* PAGES */}
          <SidebarSection
            title="Pages"
            collapsed={sidebarCollapsed}
          >

            <SidebarItem
              icon={<UserRound size={15} />}
              label="User Profile"
              arrow
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              label="Overview"
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              label="Projects"
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<Megaphone size={15} />}
              label="Campaigns"
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<FileText size={15} />}
              label="Documents"
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<Users size={15} />}
              label="Followers"
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<Building2 size={15} />}
              label="Account"
              arrow
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<Users size={15} />}
              label="Corporate"
              arrow
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<BookOpen size={15} />}
              label="Blog"
              arrow
              collapsed={sidebarCollapsed}
            />

            <SidebarItem
              icon={<Share2 size={15} />}
              label="Social"
              arrow
              collapsed={sidebarCollapsed}
            />

          </SidebarSection>

        </div>
      </div>
    </aside>
  );
};


/* ---------------- SIDEBAR SECTION ---------------- */

const SidebarSection = ({
  title,
  children,
  collapsed,
}) => {
  return (
    <div className="mb-7">

      {!collapsed && (
        <p className="mb-3 px-2 text-xs font-medium text-gray-400">
          {title}
        </p>
      )}

      <div className="space-y-1">
        {children}
      </div>

    </div>
  );
};


/* ---------------- SIDEBAR ITEM ---------------- */

const SidebarItem = ({
  icon,
  label,
  active = false,
  arrow = false,
  collapsed = false,
}) => {
  return (
    <button
      title={collapsed ? label : undefined}
      className={`
        flex w-full items-center rounded-lg
        text-left text-sm transition
        ${
          collapsed
            ? "justify-center px-2 py-2.5"
            : "gap-3 px-3 py-2.5"
        }
        ${
          active
            ? "bg-gray-100 font-medium text-gray-900"
            : "text-gray-600 hover:bg-gray-50"
        }
      `}
    >

      {/* Arrow */}
      {!collapsed && arrow && (
        <ChevronRight
          size={13}
          className="shrink-0 text-gray-400"
        />
      )}

      {/* Icon */}
      {icon && (
        <span className="shrink-0">
          {icon}
        </span>
      )}

      {/* Label */}
      {!collapsed && (
        <span className="truncate">
          {label}
        </span>
      )}

    </button>
  );
};

export default DashboardSidebar;