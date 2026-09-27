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
import CreateStaff from "./pages/CreateStaff";
import CreateStudent from "./pages/CreateStudent";
import StudentAttendance from "./pages/StudentAttendance";
import StaffAttendance from "./pages/StaffAttendance";
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



        <Route
         index
          element={<DashboardSummary />}
        />
        <Route
          path="create-staff"
          element={<CreateStaff />}
        />

        <Route
          path="create-student"
          element={<CreateStudent />}
        />

        <Route
          path="attendance/student"
          element={<StudentAttendance />}
        />

        <Route
          path="attendance/staff"
          element={<StaffAttendance />}
        />

      </Route>

      {/* FALLBACK */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </SettingsProvider>
  </StrictMode>
);