import { React, useState ,useContext,useEffect} from "react";
import Navbar from "./Navbar";
import busybox from "../assets/icons/busybox.png";
import i5 from "../assets/images/5.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import Arrow from "../assets/icons/arrow.svg";
import { ToastContainer } from "react-toastify";
import Subfooter from "./Subfooter";
import { Theme } from "../Contexts/Theme";
import { LoadDetails } from "../Contexts/LoadDetails";
import { useLocation ,useNavigate,useParams} from "react-router-dom";


const Dashbord = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { merchantId } = useParams();
  console.log(19, merchantId);
  
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
  const [expend,setExpend] =useState(false)
  const {loadD,setLoadD} =useContext(LoadDetails)


  useEffect(() => {
    if (location.pathname.startsWith("/dashboard/settlement/")) {
      setLoadD(true);
    } else {
      setLoadD(false);
    }
  }, [location.pathname]);

  console.log(loadD);
  
  const items = [
    {
      to: "/dashboard/merchant",
      icon: "fa-chart-simple",
      label: "Marchants",
      show: shows,
      setShow: setShows,
    },
    {
      to: "/dashboard/getallsettlements",
      icon: "fa-arrow-right -rotate-[50deg]",
      label: "All settlements",
      show: showp,
      setShow: setShowp,
    },
   
   
  ];



  

  return (
    <>
  <div
  className={`w-full h-screen flex flex-col gap-[20px] items-center sm:overflow-y-hidden overflow-y-auto overflow-x-hidden 
  ${theme === "dark"
    ? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100"
    : "bg-gradient-to-b from-indigo-500 to-violet-500 text-gray-900"
  }`}
>
  <Navbar />

  <div className="w-full flex-col h-screen pb-0 sm:pb-[100px] sm:flex-row flex">

    {/* 🌈 Sidebar */}
    <div
      className={`flex sm:flex-col flex-row sm:h-full h-[70px] ${
        !expend ? "sm:w-[220px]" : "sm:w-[90px]"
      } w-full bg-gradient-to-b from-indigo-500 to-violet-500 rounded-r-3xl sm:px-3 px-4 sm:py-6 py-2 items-center justify-between sm:justify-start sm:gap-6 gap-4  transition-all duration-500 ease-in-out`}
    >
      {items.map(({ to, icon, label, show, setShow }) => (
        <div
          key={to}
          className={`relative flex items-center sm:flex-row flex-col sm:justify-start justify-center group transition-all duration-300 ${
            !expend ? "sm:w-[190px]" : "sm:w-[60px]"
          }`}
        >
          {/* Icon */}
          <NavLink
            to={to}
            end
            // onClick={() => setExpend((prev) => !prev)}yytg
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className={({ isActive }) =>
              `flex justify-center items-center w-11 h-11 rounded-2xl transition-all duration-300 shadow-md ${
                isActive
                  ? "bg-white text-blue-600 scale-110 shadow-blue-300"
                  : "bg-white/20 hover:bg-white/40 text-white hover:scale-105"
              }`
            }
          >
            <i className={`fa-solid ${icon} text-[16px]`}></i>
          </NavLink>

          {/* Expanded Label */}
          {!expend && (
            <span
              className={`hidden sm:block ml-3 text-sm font-semibold text-white whitespace-nowrap transition-all duration-300 ${
                !expend ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              {label}
            </span>
          )}

          {/* Tooltip when collapsed */}
          {expend && (
            <div
              className={`absolute sm:block hidden left-[110%] top-1/2 -translate-y-1/2 px-3 py-1 text-xs rounded-md font-medium transition-all duration-200 bg-black/80 text-white shadow-md whitespace-nowrap ${
                show
                  ? "opacity-100 visible translate-x-1"
                  : "opacity-0 invisible -translate-x-2"
              }`}
            >
              {label}
            </div>
          )}

          {/* Mobile label */}
          <span className="sm:hidden text-[10px] text-white font-medium mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>

    {/* 🌤️ Main Section */}
    <div
      className={`ml-0 sm:ml-1 w-full sm:w-[94%] h-full rounded-3xl border border-transparent shadow-lg transition-all duration-300
      ${theme === "dark"
        ? "bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 shadow-blue-900/30"
        : "bg-gradient-to-br from-white via-blue-50 to-indigo-50 shadow-blue-200/40"
      }`}
    >
      {/* Header */}
      <header
        className={`w-full sm:h-[54px] h-[90px] border-b flex  items-center
        ${theme === "dark"
          ? "border-gray-700/70"
          : "border-gray-300/70"
        }`}
      >
        <div
          style={{ fontFamily: "Montserrat" }}
          className="w-[80%] h-full flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-8 px-4 py-2 text-sm whitespace-nowrap"
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
              show: openpayots,
              setShow: setOpenpayots,
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
              show: opencollection,
              setShow: setOpencollection,
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
              show: opensubscription,
              setShow: setOpensubscription,
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
              show: openverification,
              setShow: setOpenverification,
            },
          ].map(({ label, items, setShow, show }, idx) => (
            <div key={idx} className="relative group">
              <button
                onClick={() => setShow((prev) => !prev)}
                className={`flex items-center cursor-pointer font-medium transition duration-300 ${
                  theme === "dark"
                    ? "text-gray-100 hover:text-indigo-400"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {label}
                <img
                  className={`ml-2 w-3 h-3 transition-transform duration-200 ${
                    show ? "rotate-180" : "rotate-90"
                  }`}
                  src={Arrow}
                  alt=""
                />
              </button>

              <div
                className={`absolute top-[35px] left-0 w-[250px] shadow-2xl rounded-lg p-4 z-50 transition-all duration-300 ${
                  show
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                } ${
                  theme === "dark"
                    ? "bg-gray-800/95 text-gray-200"
                    : "bg-white text-gray-700"
                }`}
              >
                <div className="flex flex-col gap-2 text-sm">
                  {items.map((item, i) =>
                    item.to ? (
                      <NavLink
                        key={i}
                        to={item.to}
                        onClick={() => setShow(false)}
                        className={`px-3 py-2 rounded-md transition ${
                          theme === "dark"
                            ? "hover:bg-indigo-600/30"
                            : "hover:bg-blue-100"
                        }`}
                      >
                        {item.text}
                      </NavLink>
                    ) : (
                      <a
                        key={i}
                        href={item.href}
                        className={`px-3 py-2 rounded-md transition ${
                          theme === "dark"
                            ? "hover:bg-indigo-600/30"
                            : "hover:bg-blue-100"
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

        
        </div>
        {loadD?<button onClick={()=>{navigate(`/dashboard/transactionmaster/${merchantId}`)}} className="bg-blue-500 text-white p-2 rounded-xl">Transaction Table</button>:""}
        
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
                   
