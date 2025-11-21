import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Merchant from "./Components/Merchant";

import Dashbord from "./Components/Dashbord";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from "./Contexts/Theme";
import { Login } from "./Components/Login";
import {store} from "./redux/store";
import Settlement from "./Components/Settlement";
import Createmerchants from "./Components/Createmerchants";
import Profile from "./Components/Profile";
import Getallsettlements from "./Components/Getallsettlements";
import TransactionMaster from "./Components/TransactionMaster";

import { LoadDetailsProvider } from "./Contexts/LoadDetails";
import GetallTxn from "./Components/GetallTxn";
import Commercial from "./Components/Commercial";
import Packagemaster from "./Components/Packagemaster";
import Servicelist from "./Components/Servicelist";
import Getcommercial from "./Components/Getcommercial";
import Notassigned from "./Components/Notassigned";




const router = createBrowserRouter(
  createRoutesFromElements(

    <Route element={<App />}>
      <Route path="/" element={<Login />} />

      {/* <Route element={<Protectedroute />}> */}
      <Route path="/dashboard" element={<Dashbord />}>
        <Route path="createmerchants" element={<Createmerchants/>}/>
        <Route path="profile" element={<Profile />} />
        <Route path="getallsettlements" element={<Getallsettlements />} />
        <Route path="getalltxn" element={<GetallTxn />} />
        <Route path="transactionmaster/:merchantId" element={<TransactionMaster />} />
        <Route path="merchant" element={<Merchant />} />
        <Route path="settlement/:merchantId" element={<Settlement />} />
        <Route path="commercial/:pkgid/:serviceid" element={<Commercial />} />
        <Route path="servicelist" element={<Servicelist />} />
        <Route path="notassigned" element={<Notassigned />} />
        <Route path="getcommercial/:compid" element={<Getcommercial />} />
        <Route path="packagemaster/:pkgId" element={<Packagemaster />} />
      </Route>
    </Route>


  )
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadDetailsProvider>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>


        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>

      </GoogleOAuthProvider>
    </ThemeProvider>
    </LoadDetailsProvider>

  </StrictMode>
);
