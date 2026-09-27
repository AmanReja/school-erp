import React from "react";

import {
  Routes,
  Route,
  BrowserRouter,
  Router,
  Outlet,
  useLocation,
} from "react-router-dom";



import { Toaster } from "sonner";

const App = () => {

  return (
    <>
<Toaster
  position="top-right"
  expand
  closeButton
  theme="light"
  toastOptions={{
    className:
      "rounded-xl shadow-2xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  }}
/>
      <Outlet></Outlet>
    </>
  );
};

export default App;
