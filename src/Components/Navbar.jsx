import { React, useState, useContext,useEffect } from "react";
import busybox from "../assets/icons/busybox.png";
import i5 from "../assets/images/5.png";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { admin_details } from "../redux/action";
import { useSelector,useDispatch } from "react-redux";

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { theme, setTheme } = useContext(Theme)

  const [open, setOpen] = useState(false);

  const handelOpen = () => {
    setOpen((prev) => !prev)
  }





  const logOut = async () => {





    localStorage.removeItem("token")
    navigate("/")
  }

  console.log(31, theme);

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


const admindata = useSelector((state)=>state.admindetails.admindetails?.data
);
console.log(52,admindata);



  useEffect(() => {
    dispatch(admin_details())
  
  }, [])
  

  return (
    <div
  className={`w-[100%] ${
    theme === "dark" ? "" : "bg-transparent"
  } h-[40px] flex justify-between px-[10px] sm:px-[40px] items-center mt-[20px]`}
>
 
  <div
    style={{ fontFamily: "Righteous" }}
    className={`flex tracking-wide transition-all duration-300 animate-gradient-x h-[53px] relative sm:text-5xl text-2xl font-normal ${theme==="dark"?"text-white":"text-black"}`}
  >
    busybox
  </div>

  <div className="flex items-center gap-[20px]">
   

    
    <img
      onClick={handelOpen}
      className="w-[30px] h-[30px] rounded-full cursor-pointer border-2 border-blue-400 hover:scale-105 transition"
      src={i5}
      alt=""
    />
  </div>


  <div
  className={`absolute right-10 top-[70px] w-[320px] z-40 
    rounded-3xl p-6 border backdrop-blur-xl
    transition-all duration-300 transform
    shadow-[0_8px_30px_rgb(0,0,0,0.12)]
    ${theme === "dark" ? "bg-gray-800/70 border-gray-700" : "bg-white/70 border-gray-200"}
    ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
  `}
>
  {/* Avatar Section */}
  <div className="flex flex-col items-center">
    <img
      src={i5}
      className="w-24 h-24 rounded-full border-4 border-lime-400 shadow-lg"
    />

    <h1 className="mt-3 text-xl font-semibold">
      {admindata?.fullName}
    </h1>

    <p className="text-gray-500 text-sm">
      {admindata?.email}
    </p>
  </div>

  {/* Buttons */}
  <div className="mt-6 space-y-3">
    <button
      onClick={() => navigate("/dashboard/profile")}
      className="w-full py-2.5 rounded-xl text-white font-medium
                 bg-gradient-to-r from-violet-500 to-violet-600
                 hover:shadow-lg hover:scale-[1.02] active:scale-95 
                 transition-all duration-200"
    >
      Edit Profile
    </button>

    <button
      onClick={() => navigate("/dashboard/updatepass")}
      className="w-full py-2.5 rounded-xl font-medium
                 bg-blue-200 dark:bg-gray-700 
                 hover:shadow-lg hover:scale-[1.02] active:scale-95 
                 transition-all duration-200"
    >
      Update Password
    </button>

    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`w-full ${theme === "dark" ? "bg-gray-800/70 border-gray-700" : "bg-white/70 border-gray-200"} py-2.5 rounded-xl font-medium
                 bg-gray-100 dark:bg-gray-700 
                 hover:shadow-lg hover:scale-[1.02] active:scale-95 
                 transition-all duration-200`}
    >
      {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>

    <button
      onClick={logOut}
      className="w-full py-2.5 rounded-xl text-white font-medium
                 bg-gradient-to-r from-green-500 to-green-600
                 hover:shadow-lg hover:scale-[1.02] active:scale-95 
                 transition-all duration-200"
    >
      Logout
    </button>
  </div>
</div>




</div>

  );
};

export default Navbar;
