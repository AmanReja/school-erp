import { React, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
// import.meta.env.VITE_PRODUCTION_URL;
// import.meta.env.VITE_LOCAL_URL;



const baseurl = import.meta.env.VITE_PROD_URL;
console.log(baseurl);
const Protectedroutes = () => {
  const [authenticated, setAuthenticated] = useState(true);

  async function fetchData() {
    const token = localStorage.getItem("token");

    

    // ("192.168.1.43");


  

    const res = await fetch(`${baseurl}/v1/admin/merchant/check/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    
    if (res.status === 401) {
      setAuthenticated(false);
      localStorage.removeItem("token");
      return;
    }
  }

  useEffect(() => {
    fetchData();
  }, [authenticated]);

  return <div>{authenticated ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export default Protectedroutes;
