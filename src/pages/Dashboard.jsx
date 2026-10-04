import React from "react";

import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import { useSettings } from "../Contexts/SettingsContext";

const Dashboard = () => {
  const { theme } = useSettings();
  const isDark = theme === "dark";
  return (
    <div className="h-screen overflow-hidden bg-white text-gray-900">
      <div className="flex h-screen overflow-hidden">
        {/* LEFT SIDEBAR */}
        <DashboardSidebar />

        {/* CENTER AREA */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* HEADER */}
          <DashboardHeader />

          {/* ONLY THIS AREA SCROLLS */}
          <main className="min-h-0 flex-1 overflow-y-auto bg-white">
            <Outlet />
          </main>

          {/* FOOTER */}
          <Footer />
        </div>

        {/* RIGHT ACTIVITY PANEL */}
        {/* <DashboardActivity /> */}
      </div>
    </div>
  );
};

export default Dashboard;
