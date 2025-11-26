import React from "react";

import {
  Routes,
  Route,
  BrowserRouter,
  Router,
  Outlet,
  useLocation,
} from "react-router-dom";
import Dashbord from "./Components/Dashbord";
import Navbar from "./Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import Titlecontroller from "./Components/Titlecontroller";

const App = () => {
  Titlecontroller()
  return (
    <>
      <ToastContainer></ToastContainer>
      <Outlet></Outlet>
    </>
  );
};

export default App;
