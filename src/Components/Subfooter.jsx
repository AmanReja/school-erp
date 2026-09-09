import React, { useContext } from "react"; // 1. Added useContext
import { Theme } from "../Contexts/Theme";

const Subfooter = () => {
  // 2. Consume the theme context (assuming it returns { theme })
  const { theme } = useContext(Theme);

  return (
    <>
      <footer 
        className={`w-full p-2 rounded-b-2xl relative flex px-[20px] justify-between items-center transition-colors duration-300 
        ${theme === "dark" ? "bg-slate-900 border-t border-slate-800" : "bg-gray-50"}`}
      >
        <h1 className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-[14px]`}>
          2025© Busybox
        </h1>
        
        <div
          style={{ fontFamily: "montserrat" }}
          className={`flex min-w-[235px] text-[14px] w-[235px] h-full items-center gap-[10px] justify-between
          ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          <a href="" className="hover:text-blue-500">Docs</a>
          <a href="" className="hover:text-blue-500">FAQ</a>
          <a href="" className="hover:text-blue-500">Support</a>
          <a href="" className="hover:text-blue-500">License</a>
        </div>
      </footer>
    </>
  );
};

export default Subfooter;