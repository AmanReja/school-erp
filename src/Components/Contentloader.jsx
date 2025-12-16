import React, { useEffect, useState, useRef, useContext } from "react";


import { Theme } from "../Contexts/Theme";


const Contentloader = () => {

 const {theme,setTheme} =useContext(Theme)

    const base = `animate-pulse rounded bg-gray-200 dark:bg-gray-700`;
    return (
        <tr
          className={`border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <td className="px-4 py-4">
            <div className={`${base} h-4 w-36 mb-2`} />
            <div className="flex items-center gap-2">
              <div className={`${base} h-6 w-6 rounded-full`} />
              <div className={`${base} h-4 w-20`} />
            </div>
          </td>
          <td className="px-4 py-4">
            <div className={`${base} h-4 w-24`} />
          </td>
          <td className="px-4 py-4">
            <div className={`${base} h-4 w-32 mb-2`} />
            <div className={`${base} h-4 w-28`} />
          </td>
          <td className="px-4 py-4">
            <div className={`${base} h-4 w-24`} />
          </td>
          <td className="px-4 py-4">
            <div className={`${base} h-4 w-32`} />
          </td>
          <td className="px-4 py-4">
            <div className={`${base} h-6 w-16 rounded`} />
          </td>
        </tr>
      );
}

export default Contentloader
