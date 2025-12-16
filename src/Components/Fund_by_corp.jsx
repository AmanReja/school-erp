import React, { useEffect, useState, useRef, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { update_fund_status_by_corp,get_funds_by_Corpid } from "../redux/action";
import "../App.css";
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr";
import Contentloader from "../Components/Contentloader";
import { Check, ChevronDown ,ChevronLeft,ChevronRight} from "lucide-react";
import { Theme } from "../Contexts/Theme";
import { useParams } from "react-router-dom";

const Fund_by_corp = () => {
  const { theme, setTheme } = useContext(Theme);
  const [load, setLoad] = useState(false);
  const [searchtr, setSearchtr] = useState("");
  const [fstatus, setfstatus] = useState("");
  const [formdatastr, setFormdatastr] = useState("");
  const [formdataend, setFormdataend] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);
  const [isupdating, setIsupdating] = useState(false);
  const [updatedstatus, setUpdatedstatus] = useState("");
  const [updatedremarks, setUpdatedremarks] = useState("");
  
  const [currentrequestid, setCurrentrequestid] = useState("");


  




  const {corpid} =useParams()
  

  const handelupdate =(fund)=>{
    setIsupdating(true)
    setUpdatedstatus(fund.status)
    setUpdatedremarks(fund.remark)
  
    setCurrentrequestid(fund.request_id)
   


    
  }

  const updateform =()=>{

    try {
      const payload ={
        status:updatedstatus,
        remark:updatedremarks

  }


dispatch(update_fund_status_by_corp(corpid,currentrequestid,payload))
    } catch (error) {
      console.log(error);
    }finally{
      setIsupdating(false)
    }
   
  

  }








  const options = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range",
  ];

  const [date, setDate] = useState({ startDate: null, endDate: null });

  const formatDate = (date) => new Intl.DateTimeFormat("en-CA").format(date);
  useEffect(() => {
    const today = new Date();
    setSelected("Today");
    setDate({ startDate: today, endDate: today });
    setFormdatastr(formatDate(today));
    setFormdataend(formatDate(today));
  }, []);

  useEffect(() => {
    if (date.startDate && date.endDate) {
      setFormdatastr(formatDate(date.startDate));
      setFormdataend(formatDate(date.endDate));
    }
  }, [date]);

  const dateRangeRef = useRef(null);

  useEffect(() => {
    const toady = new Date();
    flatpickr(dateRangeRef.current, {
      mode: "range",
      dateFormat: "d-m-y",

      defaultDate: [toady, toady],
      value: date,
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          const [start, end] = selectedDates;
          setDate({ startDate: start, endDate: end });
        }
      },
    });
  }, []);

  // const totaldata = useSelector(
  //   (state) => state.ledgerwallet.ledgerwallet.totalpagerecords
  // );

  const dispatch = useDispatch();

  const fundreport = useSelector(
    (state) => state.fund.fund?.summary
  );
  console.log(81,fundreport);


//   const payoutlogdata = useSelector((state) => state.payoutlog.payoutlog?.data);

//   const totalpage = useSelector(
//     (state) => state.payoutlog.payoutlog.pagination?.totalPages
//   );

//   const totaldata = useSelector(
//     (state) => state.payoutlog.payoutlog.pagination?.totalRecords
//   );





  const funddata = useSelector((state) => state.fund.fund?.data)
  console.log(40, funddata);

  const totalpage = useSelector(
      (state) => state.fund.fund.pagination?.totalPages
  );
  // console.log(41, totalpage);


  const totaldata = useSelector(
      (state) => state.fund.fund.pagination?.totalRecords
  );





  // console.log(96,payoutlogdata);

  useEffect(() => {
    if (!formdatastr || !formdataend) return;
    async function fetchdata() {
      setLoad(true);

      await dispatch(
        get_funds_by_Corpid(
            corpid, page, perPage, searchtr, fstatus,formdatastr,formdataend
        )
      );

      setLoad(false);
    }
    fetchdata();
  }, [dispatch, page, perPage, searchtr, fstatus,formdatastr,formdataend]);

  const downloadexcel = () => {
    dispatch(
        get_funds_by_Corpid(corpid,searchtr, searchtr, formdatastr, formdataend, true)
    );
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-wrapper")) {
        setOpen(false);
        
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  
  return (
    <div
      className={`w-[100%]  2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-white text-gray-800"
      }`}
    >
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-col gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">
          <div
            className={`w-full h-auto min-h-[80px] flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 rounded-xl ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            {/* Title */}
            <div className="flex flex-col">
              <h1
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Fund Report
              </h1>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Overview of all fund transfers including status, amount,
                and date.
              </p>
            </div>

            {/* Info stats */}
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-5 rounded-xl p-5 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            {" "}
            {load
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 min-h-[80px] animate-pulse flex flex-col items-center justify-center text-center rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ))
              : [
                  {
                    label: "Fund Value",

                    value:
                      fundreport?.total_amount != null
                        ? Number(
                            fundreport.total_amount
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "0.00",
                  },
                  {
                    label: "Success Amount",
                    value: `${
                      fundreport?.success_amount === undefined
                        ? "00"
                        : fundreport?.success_amount 
                    }`,
                  },
                  {
                    label: "Pending Funds",

                    value:
                      fundreport?.pending_amount != null
                        ? Number(fundreport.pending_amount).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00",
                  },
                  {
                    label: "Failure",

                    value:
                      fundreport?.failed_amount != null
                        ? Number(fundreport.failed_amount).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        : "0.00",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex-1 flex flex-col items-center justify-center text-center rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <h1 className="text-2xl font-semibold">{item.value}</h1>
                    <p
                      className={`text-sm mt-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
          </div>
          {isupdating&&
         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
         <form onSubmit={(e)=>{
updateform(),e.preventDefault()
         }} className="w-[400px] h-[300px] bg-white rounded-xl shadow-xl p-6 flex flex-col gap-5 animate-pop">
           
           <div className="flex justify-between items-center">
           <h2 className="text-lg font-semibold text-gray-800">Update Status</h2> <i onClick={()=>{setIsupdating(false)}} class="fa-solid fa-x"></i>
           </div>
           
       
           <select value={updatedstatus} onChange={(e)=>{setUpdatedstatus(e.target.value)}}
             className="border border-gray-300 rounded-lg p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
           >
             <option selected value="">select status</option>
             <option value="SUCCESS">success</option>
             <option value="PENDING">pending</option>
             <option value="FAILED">failed</option>
           </select>
           <textarea value={updatedremarks} onChange={(e)=>{setUpdatedremarks(e.target.value)}} className="border border-gray-300 rounded-lg p-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" name="" id="" cols="30" rows="10"></textarea>
       
           <button type="submit"
             className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
           >
             Update
           </button>
       
         </form>
       </div>
       
            }
          <div className="w-full px-[20px] mt-[20px]">
            <div
              className={`flex w-full h-full flex-col rounded-xl overflow-y-auto border-[1px] ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <div
                className={`flex justify-between items-center p-4 py-6 w-full flex-wrap gap-4 shadow-sm border-b ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              >
                <h2
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                 Fund Requests
                </h2>

                <div className="flex gap-3 flex-wrap items-center">
                  {/* 📅 Calendar Input */}
                  <div
                    className={`pl-[5px] border-[1px] p-1 rounded flex justify-center items-center gap-2 ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-300"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-calendar-days ${
                        theme === "dark" ? "text-gray-500" : "text-gray-300"
                      }`}
                    ></i>
                    <input
                      className={`w-[180px] text-[14px] bg-transparent outline-none rounded ${
                        theme === "dark" ? "text-gray-300" : "text-gray-400"
                      }`}
                      type="text"
                      ref={dateRangeRef}
                    />
                  </div>

                  {/* 🔽 Dropdown for Quick Ranges */}
                  <div className="relative w-[180px]">
                    <button
                      onClick={() => setOpen(!open)}
                      className={`dropdown-wrapper flex justify-between w-full items-center px-4 py-2 rounded-lg border text-sm transition-all ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-700"
                      }`}
                    >
                      <span>{selected}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {open && (
                      <ul
                        className={`fixed open top-[48%] w-[200px] left-[400px]  right-0 mt-2 rounded-lg shadow-lg border z-20 max-h-80 overflow-y-auto ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-600 text-gray-100"
                            : "bg-white border-gray-200 text-gray-800"
                        }`}
                      >
                        {options.map((option) => (
                          <li
                            key={option}
                            onClick={() => {
                              setSelected(option);
                              setOpen(false);

                              const today = new Date();
                              let start, end;

                              if (option === "Custom Range") {
                                setDate({ startDate: null, endDate: null });
                                setFormdatastr("");
                                setFormdataend("");
                                if (dateRangeRef.current?._flatpickr)
                                  dateRangeRef.current._flatpickr.clear();
                                return;
                              }

                              switch (option) {
                                case "Today":
                                  start = end = today;
                                  break;
                                case "Yesterday":
                                  start = end = new Date(today);
                                  start.setDate(today.getDate() - 1);
                                  break;
                                case "Last 7 Days":
                                  start = new Date(today);
                                  start.setDate(today.getDate() - 6);
                                  end = today;
                                  break;
                                case "Last 30 Days":
                                  start = new Date(today);
                                  start.setDate(today.getDate() - 29);
                                  end = today;
                                  break;
                                case "This Month":
                                  start = new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    1
                                  );
                                  end = new Date(
                                    today.getFullYear(),
                                    today.getMonth() + 1,
                                    0
                                  );
                                  break;
                                case "Last Month":
                                  start = new Date(
                                    today.getFullYear(),
                                    today.getMonth() - 1,
                                    1
                                  );
                                  end = new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    0
                                  );
                                  break;
                                default:
                                  start = end = null;
                              }

                              if (start && end) {
                                setDate({ startDate: start, endDate: end });
                                setFormdatastr(formatDate(start));
                                setFormdataend(formatDate(end));
                                if (dateRangeRef.current?._flatpickr)
                                  dateRangeRef.current._flatpickr.setDate(
                                    [start, end],
                                    true
                                  );
                              }
                            }}
                            className={`px-4 py-2 flex justify-between items-center cursor-pointer text-sm transition-colors ${
                              theme === "dark"
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-100"
                            } ${selected === option ? "font-semibold" : ""}`}
                          >
                            <span>{option}</span>
                            {selected === option && (
                              <Check
                                className={`w-4 h-4 ${
                                  theme === "dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                }`}
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* 🔍 Search Transaction */}
                  <div
                    className={`relative border px-2 py-1 rounded-lg ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >
                    <span
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                      onChange={(e) => setSearchtr(e.target.value)}
                      type="text"
                      placeholder="Search transaction"
                      className={`pl-8 pr-2 outline-none text-sm bg-transparent ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    />
                  </div>

                  {/* 🔽 Status Filter */}
                  <div
                    className={`px-4 py-1 rounded-lg border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >
                    <select
                      onChange={(e) => setfstatus(e.target.value)}
                      className={`text-sm bg-transparent outline-none ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="All"
                      >
                        All funds
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="SUCCESS"
                      >
                        Success
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="PENDING"
                      >
                        Pending
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="FAILURE"
                      >
                        Failure
                      </option>
                    </select>
                  </div>

                  {/* ⬇️ Download Button */}
                  <button
                    onClick={downloadexcel}
                    className={`text-sm font-medium hover:shadow-xl px-4 py-1 rounded-lg transition border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-download ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}
                    ></i>{" "}
                    Download
                  </button>
                </div>
              </div>

              <table className="w-full text-sm text-left">
                            <thead
                                className={`text-[11px] uppercase border-t border-b ${theme === "dark"
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-[#fcfcfc] text-gray-400 border-gray-300"
                                    }`}
                            >
                                <tr>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4">Txn Date</th>
                                    <th className="px-4 py-4">Amount</th>
                                    <th className="px-4 py-4">Details</th>

                                    <th className="px-4 py-4">Remarks</th>
                                    <th className="px-4 py-4">Mode</th>
                                    {/* <th className="px-4 py-4">Action</th> */}

                                </tr>
                            </thead>

                            <tbody
                                className={`text-[12px] font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-800"
                                    }`}
                            >


                                {load ? (
                                    Array.from({ length: 4 }).map((_, i) => <Contentloader />)
                                ) : Array.isArray(funddata) &&
                                    funddata.length > 0 ? (
                                    funddata.map((txn, i) => (
                                        <tr
                                            key={i}
                                            className={`border-b ${theme === "dark"
                                                ? "border-gray-700 hover:bg-gray-700/60"
                                                : "border-gray-100 hover:bg-gray-50"
                                                }`}
                                        >
                                            {/* Status */}
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`text-white rounded-[3px] px-[13px] py-[2px] font-bold text-[12px] ${txn.status?.toLowerCase() === "pending"
                                                        ? "bg-yellow-500"
                                                        : txn.status?.toLowerCase() === "success"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                        }`}
                                                >
                                                    {txn.status?.toUpperCase()}
                                                </span>
                                            </td>

                                            {/* Txn Date */}
                                            <td className="px-4 py-3">{txn.txn_date}</td>

                                            {/* Amount */}
                                            <td className="px-4 py-3">₹{txn.amount}</td>

                                            {/* UTR */}
                                            <td className="px-4 py-3">


                                                <div className="flex flex-col">
                                                    
                                                    <p>UTR: {txn.utr_no}</p>
                                                    <p>[request ID: #{txn.request_id}]</p>
                                                </div>


                                            </td>

                                            {/* Mode */}


                                            <td className="px-4 py-3">{txn.remark}</td>
                                            <td className="px-4 py-3">{txn.mode}</td>
                                            {/* <td className="px-4 py-3"><button onClick={()=>{handelupdate(txn)}} className="p-2 bg-blue-800 text-white font-bold rounded-[5px]">Update</button></td> */}




                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="text-center py-4 text-gray-600"
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                )}






                            </tbody>
                        </table>
              {totalpage > 0 ? (
                <div
                  className={`flex items-center justify-between px-4 py-3 border-t text-sm ${
                    theme === "dark"
                      ? "bg-gray-900 text-gray-300 border-gray-700"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  <div>
                    Show{" "}
                    <select
                      className={`rounded border outline-none px-[5px] py-[5px] ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-200 border-gray-600"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                      value={perPage}
                      onChange={(e) => {
                        setPerPage(Number(e.target.value));
                        setPage(1);
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select>{" "}
                    per page
                  </div>

                  <div className="flex items-center space-x-2">
  {/* Showing range */}
  <p>
    {(page - 1) * perPage + 1}-{Math.min(page * perPage, totaldata)} of {totaldata}
  </p>

  {/* Prev Button */}
  <button
  
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className={`px-3 py-1 rounded-md ${
      page === 1
        ? "opacity-50 cursor-not-allowed"
        : theme === "dark"
        ? "hover:bg-gray-700"
        : "hover:bg-gray-200"
    }`}
  >
  <ChevronLeft/>
  </button>

  {/* First Page */}
  <button
    onClick={() => setPage(1)}
    className={`px-3 py-1 rounded-md ${
      page === 1
        ? theme === "dark"
          ? "bg-gray-700 font-semibold"
          : "bg-gray-200 font-semibold"
        : theme === "dark"
        ? "hover:bg-gray-800"
        : "hover:bg-gray-100"
    }`}
  >
    1
  </button>

  {/* Dots before current group */}
  {page > 3 && <span className="px-2">...</span>}

  {/* Nearby page numbers */}
  {Array.from({ length: 3 }, (_, i) => page - 1 + i)
    .filter((num) => num > 1 && num < totalpage)
    .map((num) => (
      <button
        key={num}
        onClick={() => setPage(num)}
        className={`px-3 py-1 rounded-md ${
          num === page
            ? theme === "dark"
              ? "bg-gray-700 font-semibold"
              : "bg-gray-200 font-semibold"
            : theme === "dark"
            ? "hover:bg-gray-800"
            : "hover:bg-gray-100"
        }`}
      >
        {num}
      </button>
    ))}

  {/* Dots after current group */}
  {page < totalpage - 2 && <span className="px-2">...</span>}

  {/* Last Page */}
  {totalpage > 1 && (
    <button
      onClick={() => setPage(totalpage)}
      className={`px-3 py-1 rounded-md ${
        page === totalpage
          ? theme === "dark"
            ? "bg-gray-700 font-semibold"
            : "bg-gray-200 font-semibold"
          : theme === "dark"
          ? "hover:bg-gray-800"
          : "hover:bg-gray-100"
      }`}
    >
      {totalpage}
    </button>
  )}

  {/* Next Button */}
  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalpage}
    className={`px-3 py-1 rounded-md ${
      page === totalpage
        ? "opacity-50 cursor-not-allowed"
        : theme === "dark"
        ? "hover:bg-gray-700"
        : "hover:bg-gray-200"
    }`}
  >
   <ChevronRight/>
  </button>
</div>

                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Fund_by_corp;
