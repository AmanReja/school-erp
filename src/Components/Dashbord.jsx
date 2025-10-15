import { React, useState ,useContext,useEffect} from "react";
import Navbar from "./Navbar";
import busybox from "../assets/icons/busybox.png";
import i5 from "../assets/images/5.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import Arrow from "../assets/icons/arrow.svg";
import { ToastContainer } from "react-toastify";
import Subfooter from "./Subfooter";
import { Theme } from "../Contexts/Theme";

const Dashbord = () => {
  const {theme,setTheme} =useContext(Theme)
  const [shows, setShows] = useState(false);
  const [showp, setShowp] = useState(false);
  const [showc, setShowc] = useState(false);
  const [showv, setShowv] = useState(false);
  const [showca, setShowca] = useState(false);
  const [showk, setShowk] = useState(false);
  const [showd, setShowd] = useState(false);
  const [showset, setShowset] = useState(false);
  const [showPayoutimg, setShowPayoutimg] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [openpayots,setOpenpayots] =useState(false)
  const [opencollection,setOpencollection] =useState(false)
  const [opensubscription,setOpensubscription] =useState(false)
  const [openverification,setOpenverification] =useState(false)
  const items = [
    {
      to: "/dashboard/merchant",
      icon: "fa-chart-simple",
      label: "Summary",
      show: shows,
      setShow: setShows,
    },
    {
      to: "/dashboard/payout",
      icon: "fa-arrow-right -rotate-[50deg]",
      label: "Payout",
      show: showp,
      setShow: setShowp,
    },
    {
      to: "/dashboard/collection",
      icon: "fa-arrow-right rotate-[130deg]",
      label: "Collection",
      show: showc,
      setShow: setShowc,
    },
    {
      to: "/dashboard/verification",
      icon: "fa-circle-check",
      label: "Verification",
      show: showv,
      setShow: setShowv,
    },
    {
      to: "/dashboard/card",
      icon: "fa-credit-card",
      label: "Card",
      show: showca,
      setShow: setShowca,
    },
    {
      to: "/dashboard/keys",
      icon: "fa-code",
      label: "Keys",
      show: showk,
      setShow: setShowk,
    },
   
    {
      to: "https://documenter.getpostman.com/view/2871565/2s93sZ7u6G",
      icon: "fa-file-import",
      label: "Document",
      show: showd,
      setShow: setShowd,
    },
    {
      to: "/dashboard/settings/accounts",
      icon: "fa-solid fa-gear",
      label: "Settings",
      show: showset,
      setShow: setShowset,
    },
  ];



  

  return (
    <>
      <div
  className={`w-full h-screen flex flex-col gap-[20px] items-center sm:overflow-y-hidden overflow-y-auto overflow-x-hidden 
  ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}
>
  <Navbar />

  <div className="w-full flex-col h-screen pb-0 sm:pb-[100px] sm:flex-row flex">
 
    <div className="flex flex-row h-full sm:w-[4%] sm:px-0 px-[30px] sm:flex-col sm:justify-normal justify-center items-center gap-[5px] mb-2 sm:gap-[20px] w-full">
      {items.map(({ to, icon, label, show, setShow }) => (
        <NavLink
          key={to}
          to={to}
          end
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={({ isActive }) =>
            `group relative  w-[30px] h-[30px] flex justify-center items-center transition duration-200 rounded-full ${
              theme === "dark"
                ? isActive
                  ? "bg-gray-800"
                  : "hover:bg-gray-800"
                : isActive
                ? "bg-white"
                : "hover:bg-white"
            }`
          }
        >
          <i
            className={`fa-solid ${icon} sm:text-[12px] text-[12px] ${
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            }`}
          ></i>

         
          <div
            className={`absolute sm:block hidden left-[120%] top-1/2 -translate-y-1/2 text-xs z-40 px-2 py-1 rounded shadow-md transition duration-200 whitespace-nowrap ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-black text-white"
            } ${show ? "visible opacity-100" : "invisible opacity-0"}`}
          >
            {label}
          </div>
        </NavLink>
      ))}
    </div>

    
    <div
      className={`ml-0 sm:ml-1 w-full sm:w-[94%] h-full rounded-2xl border-[1px] 
      ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
    >
    
      <header
        className={`w-full sm:h-[54px] h-[90px] border-b-[1px] 
        ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}
      >
        <div
          style={{ fontFamily: "Montserrat" }}
          className="w-full h-full flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8 px-4 py-2 text-sm whitespace-nowrap"
        >
        
          {[
            {
              label: "Payouts",
              items: [
                { to: "/dashboard/payout", text: "Single payout" },
                { to: "/dashboard/bulkpayout", text: "Bulk payout" },
                { to: "/dashboard/report", text: "Report" },
                { to: "/dashboard/invoice", text: "Invoices" },
              ],
              show:openpayots,
              setShow:setOpenpayots
            },
            {
              label: "Collection",
              items: [
                { to: "/dashboard/virtualaccount", text: "Virtual Account" },
                { href: "#", text: "UPI-Static QR" },
                { href: "#", text: "UPI-Dynamic QR" },
                { href: "#", text: "Report" },
                { href: "#", text: "Invoices" },
              ],
              show:opencollection,
              setShow:setOpencollection
            },
            {
              label: "Subscription",
              items: [
                { to: "/dashboard/singleenath", text: "Single eNach" },
                { href: "#", text: "Bulk eNach" },
                { href: "#", text: "Cancel eNach" },
                { to: "/dashboard/transactionreport", text: "Transaction Report" },
                { href: "#", text: "Invoices" },
              ],
              show:opensubscription,
              setShow:setOpensubscription
            },
            {
              label: "Verification",
              items: [
                { href: "#", text: "Aadhaar eKYC" },
                { href: "#", text: "PAN Verification" },
                { href: "#", text: "Bank Account - Penny Drop" },
                { href: "#", text: "Report" },
                { href: "#", text: "Invoices" },
              ],
              show:openverification,
              setShow:setOpenverification
            },
          ].map(({ label, items,setShow,show }, idx) => (
            <div key={idx}  className={`relative group`}>
              <a href="#" className="flex items-center cursor-pointer">
                {label}
                <img onClick={()=>{setShow(prev=>!prev)}} className="rotate-90 ml-2 w-3 h-3" src={Arrow} alt="" />
              </a>
              <div
                className={`absolute top-[30px] left-0 w-[250px] shadow-lg rounded-lg p-4 z-50 opacity-0 ${show?"opacity-100 visible ":"invisible opacity-0"} invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 
                ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}`}
              >
                <div className="flex flex-col gap-2 text-sm ">
                  {items.map((item, i) =>
                    item.to ? (
                      <NavLink
                        key={i}
                        to={item.to}
                        onClick={()=>{setShow(false)}}
                        className={`px-3 py-2 rounded-md transition ${
                          theme === "dark"
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.text}
                      </NavLink>
                    ) : (
                      <a
                        key={i}
                        href={item.href}
                        className={`px-3 py-2 rounded-md transition  ${
                          theme === "dark"
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.text}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}

          
          <NavLink
            className="flex justify-center items-center cursor-pointer"
            to={"/dashboard/ledger"}
          >
            Ledger
          </NavLink>
        </div>
      </header>

      <Outlet />
      <Subfooter />
    </div>
  </div>
</div>

    </>
  );
};

export default Dashbord;
