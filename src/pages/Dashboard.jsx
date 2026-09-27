import React from "react";

import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashboardStats from "../Components/DashboardStats";
import TrafficOverview from "../Components/TrafficOverview";
import WebsiteTraffic from "../Components/WebsiteTraffic";
import DeviceTraffic from "../Components/DeviceTraffic";
import LocationTraffic from "../Components/LocationTraffic";
import DashboardActivity from "../Components/DashboardActivity";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <div className="flex min-h-screen">

        {/* LEFT SIDEBAR */}
        <DashboardSidebar />

        {/* CENTER AREA */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* HEADER */}
          <DashboardHeader />

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto bg-white">
            <Outlet/>

            
          </main>
          <Footer/>
        </div>

        {/* RIGHT ACTIVITY PANEL */}
        {/* <DashboardActivity /> */}

      </div>
    </div>
  );
};

export default Dashboard;