import React from "react";
import {
  Search,
  Sun,
  Moon,
  Bell,
  PanelLeft,
  Star,
} from "lucide-react";

import { useSettings } from "../Contexts/SettingsContext";

const DashboardHeader = () => {
      const {
        sidebarCollapsed,
        toggleSidebar,
      } = useSettings();
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 lg:px-7">

      {/* LEFT */}
      <div className="flex items-center gap-5">

        <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-900">
          <PanelLeft size={18} />
        </button>

        <button className="text-gray-500 hover:text-gray-900">
          <Star size={17} />
        </button>

        <div className="hidden items-center gap-3 text-sm md:flex">
          <span className="text-gray-400">
            Dashboards
          </span>

          <span className="text-gray-300">
            /
          </span>

          <span className="font-medium">
            Default
          </span>
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="hidden h-9 w-[155px] items-center gap-2 rounded-full bg-gray-100 px-3 md:flex">

          <Search
            size={15}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />

          <span className="text-xs text-gray-400">
            /
          </span>

        </div>

        <button className="text-gray-500 hover:text-gray-900">
          <Sun size={17} />
        </button>

        <button className="text-gray-500 hover:text-gray-900">
          <Moon size={17} />
        </button>

        <button className="relative text-gray-500 hover:text-gray-900">
          <Bell size={17} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-black" />
        </button>

      </div>

    </header>
  );
};

export default DashboardHeader;