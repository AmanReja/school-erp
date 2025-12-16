
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Titlecontroller() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    
    const routeTitles = {
      "/": "Sign In",
      "/otpverification": "Otpverification",
      "/forgotpass": "Forgotpass",
      
      "/dashboard/merchant": "Merchants",
      "/dashboard/getallsettlements": "All Settlements",
      "/dashboard/getalltxn": "All Transactions",
      "/dashboard/servicelist": "Commercial"
     
     
    };

    const defaultTitle = "busybox";
    const pageTitle = routeTitles[path] || "busybox";

    document.title = `${pageTitle} | | ${defaultTitle}`;
  }, [location]);
}
