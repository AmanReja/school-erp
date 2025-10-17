import { React, useState, useContext,useEffect } from "react";
import busybox from "../assets/icons/busybox.png";
import i5 from "../assets/images/5.png";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";

const Navbar = () => {
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



  return (
    <div
  className={`w-[100%] ${
    theme === "dark" ? "" : "bg-transparent "
  } h-[40px] flex justify-between px-[10px] sm:px-[40px] items-center mt-[20px]`}
>
 
  <div
    style={{ fontFamily: "Righteous" }}
    className={`flex tracking-wide transition-all duration-300 animate-gradient-x h-[53px] relative sm:text-5xl text-2xl font-normal ${theme==="dark"?"text-white":"text-white"}`}
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
    className={`absolute right-10 top-[70px] w-[300px] flex-col z-40 ${
      theme === "dark" ? "bg-gray-800" : "bg-gray-100"
    } border border-gray-300 shadow-xl rounded-2xl p-4 transform transition-all duration-300 ${
      open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
    }`}
  >

    <div
      className={`border-b-gray-200 gap-[20px] ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100 "
      } border-b-[1px] w-full items-center justify-center flex h-[80px]`}
    >
      <img
        className="w-[50px] border-lime-400 border-[1px] h-[50px] rounded-full"
        src={i5}
        alt=""
      />
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">Aakash</h1>
        <p className="text-sm text-gray-500">aakash@busybox.in</p>
      </div>
      <button
       
        className="p-1 bg-blue-200 rounded-[5px] border-blue-600 border-[1px] text-blue-500 text-sm"
      >
        Pro
      </button>
    </div>

   
    <div className="flex justify-center mt-3">
      <button
        onClick={() => navigate("/dashboard/profile")}
        className="px-5 py-2 bg-violet-400 hover:bg-blue-500  text-white font-medium rounded-lg shadow-md"
      >
        ✏️ Edit Profile
      </button>
    </div>

    
    <div className="flex justify-center items-center mt-4 gap-3">
      <button className="h-12 w-12 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        {theme === "dark" ? (
          <svg
            onClick={() => setTheme("light")}
            className="fill-yellow-500 cursor-pointer"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 
              11-2 0V3a1 1 0 011-1zm4 
              8a4 4 0 11-8 0 4 4 0 
              018 0zm-.464 4.95l.707.707a1 
              1 0 001.414-1.414l-.707-.707a1 
              1 0 00-1.414 1.414zm2.12-10.607a1 
              1 0 010 1.414l-.706.707a1 1 0 
              11-1.414-1.414l.707-.707a1 1 0 
              011.414 0zM17 11a1 1 0 100-2h-1a1 
              1 0 100 2h1zm-7 4a1 1 0 011 
              1v1a1 1 0 11-2 0v-1a1 1 0 
              011-1zM5.05 6.464A1 1 0 106.465 
              5.05l-.708-.707a1 1 0 00-1.414 
              1.414l.707.707zm1.414 8.486l-.707.707a1 
              1 0 01-1.414-1.414l.707-.707a1 1 
              0 011.414 1.414zM4 11a1 1 0 
              100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            onClick={() => setTheme("dark")}
            className="fill-violet-700 cursor-pointer"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 
            016.707 2.707a8.001 8.001 0 
            1010.586 10.586z"></path>
          </svg>
        )}
      </button>
      <span className="text-sm font-medium">
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </span>
    </div>

  
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => {
          logOut();
        }}
        className="px-8 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md"
      >
        Logout
      </button>
    </div>
  </div>
</div>

  );
};

export default Navbar;
