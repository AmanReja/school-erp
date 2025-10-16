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




const router = createBrowserRouter(
  createRoutesFromElements(

    <Route element={<App />}>
      <Route path="/" element={<Login />} />

      {/* <Route element={<Protectedroute />}> */}
      <Route path="/dashboard" element={<Dashbord />}>
        <Route path="createmerchants" element={<Createmerchants/>}/>
        <Route path="profile" element={<Profile />} />
        <Route path="getallsettlements" element={<Getallsettlements />} />

              
          {/* <Route path="addmoney" element={<Addmoney />} />
     
         
 
          <Route path="bulkpayout" element={<Bulkpayout />} /> */}
      
        
   <Route path="merchant" element={<Merchant />} />
   <Route path="settlement/:merchantId" element={<Settlement />} />
          {/* <Route path="collection" element={<Collection />} /> */}
      


        {/* </Route> */}
      </Route>
    </Route>


  )
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>


        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>

      </GoogleOAuthProvider>
    </ThemeProvider>

  </StrictMode>
);
