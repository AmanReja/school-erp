import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import { Login } from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Staff from "./pages/Staff";
import Student from "./pages/Student";
import Attendance from "./pages/Attendance";

import { SettingsProvider } from "./Contexts/SettingsContext.jsx";
import DashboardSummary from "./pages/DashboardSummary.jsx";

if (import.meta.env.PROD) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* AUTH */}
      <Route path="/" element={<Login />} />

      {/* DASHBOARD PARENT */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardSummary />} />
        <Route path="staff" element={<Staff />} />

        <Route path="student" element={<Student />} />

        <Route path="attendance" element={<Attendance />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </SettingsProvider>
  </StrictMode>,
);
