import { React, useState, useContext,useEffect } from "react";
import busybox from "../assets/icons/busybox.png";
import i5 from "../assets/images/5.png";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { admin_details } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

import {Sun, Moon} from "lucide-react"



const Navbar = () => {
  
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const { theme, setTheme } = useContext(Theme)

  const [open, setOpen] = useState(false);

  const handelOpen = () => {
    setOpen((prev) => !prev)
  }





  const logOut = async () => {





    localStorage.removeItem("token")
    navigate("/")
  }

  
  
  const admindata = useSelector((state) => state.admindetails.admindetails?.data);


useEffect(()=>{dispatch(admin_details())},[dispatch]);






  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);



  return (
    <div
  className={`w-[100%] ${
    theme === "dark" ? "" : "bg-gray-200 "
  } h-[40px] flex justify-between px-[10px] sm:px-[40px] items-center mt-[20px]`}
>
 
  <div
    style={{ fontFamily: "Righteous" }}
    className={`flex tracking-wide transition-all duration-300 animate-gradient-x h-[53px] relative sm:text-5xl text-2xl font-normal ${theme==="dark"?"text-white":"text-[#0A0C2C]"}`}
  >
    busybox
  </div>

  <div className="flex items-center gap-[20px]">
    

    <i className="fa-regular fa-bell"></i>
    <img
      onClick={handelOpen}
      className="w-[30px] h-[30px] rounded-full cursor-pointer border-2 border-lime-400 hover:scale-105 transition"
      src={i5}
      alt=""
    />
  </div>


  <div
  className={`absolute right-10 top-[65px] w-[260px] flex flex-col z-40 backdrop-blur-xl 
  ${
    theme === "dark"
      ? "bg-gray-900/85 border-gray-700 text-gray-100"
      : "bg-white/80 border-gray-200 text-gray-800"
  }
  border shadow-xl rounded-xl p-4 transform transition-all duration-300
  ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
  animate-fadeIn`}
>

  {/* PROFILE */}
  <div className="flex flex-col items-center text-center border-b border-gray-300/30 pb-3">
    <img
      src={i5}
      alt="Avatar"
      className="w-[55px] h-[55px] rounded-full shadow-md border-2 border-transparent bg-lime-200 p-[2px]"
    />

    <h1 className="mt-2 text-sm font-semibold bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
      {admindata?.fullName || "User Name"}
    </h1>

    <p className="text-[11px] text-gray-500">{admindata?.email}</p>
  </div>

  {/* OPTIONS */}
  <div className="mt-3 flex flex-col gap-1.5">

    {[
      { icon: "fa-solid fa-gear", label: "Update Password",rout:"/dashboard/updatepass" },
      // { icon: "fa-solid fa-bolt-lightning", label: "Dev Tools",rout:"/dashboard/settings/developertooles" },
      { icon: "fa-solid fa-user", label: "Profie",rout:"/dashboard/profile" },
    
      
    ].map((item, i) => (
      <div onClick={()=>{navigate(item.rout)}}
        key={i}
        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[13px] transition-all 
        ${
          theme === "dark"
            ? "hover:bg-gray-800 hover:text-violet-300"
            : "hover:bg-gray-100 hover:text-violet-600"
        }`}
      >
        <i  className={`${item.icon} text-[13px]`}></i>
        <p>{item.label}</p>
      </div>
    ))}
<div className="w-full p-2  flex items-center justify-between">
      <span className="font-medium">Mode</span>

      {/* Icon Switch Button */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow
                 hover:shadow-md transition-all"
      >
        {theme === "light" ? (
          <div className="flex items-center gap-1">
            <Sun size={18} className="text-yellow-500" />
            <span className="text-sm">Light</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Moon size={18} className="text-blue-400" />
            <span className="text-sm text-gray-800">Dark</span>
          </div>
        )}
      </button>
    </div>
  </div>

  {/* LOGOUT */}
  <div className="flex justify-center mt-4">
    <button
      onClick={logOut}
      className="px-6 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
      text-white text-sm font-medium rounded-lg shadow-md transition-transform hover:scale-105"
    >
      Logout
    </button>
  </div>
</div>



</div>

  );
};

export default Navbar;
