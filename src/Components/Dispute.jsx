import React, { useEffect, useState, useRef, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  
  
   dispute_get_by_corpid, 
} from "../redux/action";
import "../App.css";
import "flatpickr/dist/themes/airbnb.css";
import flatpickr from "flatpickr";
import Contentloader from "./Contentloader";

import { Theme } from "../Contexts/Theme";
import { ChevronDown, Check,ChevronLeft ,ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";

const Dispute = () => {



  const {corpid} =useParams()



  const { theme, setTheme } = useContext(Theme);
  const [load, setLoad] = useState(false);
  const [searchtr, setSearchtr] = useState("");
  const [trstatus, setTrstatus] = useState("All");
  const [disputetype, setDisputetype] = useState("collection");
  const [formdatastr, setFormdatastr] = useState("");
  const [formdataend, setFormdataend] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);

  const [disputeopen,setDisputeopen] = useState(false);
  const [activedisputetxnid,setActivedisputetxnid] =useState(null);
  const [showremarks, setShowremarks] = useState(null);
  const [selectedremarks, setSelectedremarks] = useState(null);
  








  const [date, setDate] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    const today = new Date();
    setSelected("Today");
    setDate({ startDate: today, endDate: today });
    setFormdatastr(formatDate(today));
    setFormdataend(formatDate(today));
  }, []);

  const formatDate = (date) => new Intl.DateTimeFormat("en-CA").format(date);

  useEffect(() => {
    if (date.startDate && date.endDate) {
      setFormdatastr(formatDate(date.startDate));
      setFormdataend(formatDate(date.endDate));
    }
  }, [date]);

  const options = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range",
  ];

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




  const disputedata = useSelector ((state)=>state.coldispute.coldispute?.data)

  const disputesummary = useSelector ((state)=>state.coldispute.coldispute?.summary
  )
  const totalpage = useSelector(
    (state) => state.coldispute.coldispute.pagination?.totalPages
  );


  const totaldata = useSelector(
    (state) => state.coldispute.coldispute.pagination?.totalRecords
  );







 
 
  

  
  



  useEffect(() => {
    if (!corpid || !formdatastr || !formdataend) return;
  
    dispatch(
      dispute_get_by_corpid(
        corpid,
        searchtr,
        trstatus,
        disputetype,
        formdatastr,
        formdataend,
        page,
        perPage,
        false
      )
    );
  }, [
    corpid,
    searchtr,
    trstatus,
    disputetype,
    formdatastr,
    formdataend,
    page,
    perPage,
  ]);

  // console.log(111,disputedata);
  






  const downloadexcel = () => {
    dispatch(
      dispute_get_by_corpid(corpid,searchtr,trstatus,disputetype, formdatastr,formdataend,page,perPage,true)
    );
  };



  const [disputeform,setDisputeform] =useState({
    dispute_remarks:"",
    dispute_amount: "",

  
  })

  const [disputetxnid,setDisputetxnid] =useState(null);



  //  const handeldisputeCreate = () =>{

  //   console.log(151,disputeform);


  //   try {
  //     dispatch(dispute_creacte(disputetxnid,disputeform))
  //   } catch (error) {
  //     console.log(error);
  //   } finally{
  //     setDisputeform({
  //       dispute_remarks:"",
  //       dispute_amount: "",
       
  //     })
  //     setActivedisputetxnid(null)
  //   }
   
  //  }
 


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
            className={`w-full h-[80px] flex items-center px-5 rounded-xl ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex flex-col w-full mb-4">
              {/* Title */}
              <h1
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Dispute Report
              </h1>

              {/* Subtitle */}
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
              Track and manage all disputed transactions with real-time status updates, amounts, and resolution details in one centralized view.
              </p>

              {/* Decorative Divider */}
              <div
                className={`mt-3 h-[1px] w-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-5 rounded-xl p-5 ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            {" "}
            {
  load
    ? Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 min-h-[60px] animate-pulse rounded-lg p-3 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          }`}
        />
      ))
    : [
        {
          label: "Total",
          value: disputesummary?.total_disputes || 0,
          desc: "All disputes raised",
          color: "text-purple-500",
        },
        {
          label: "Open",
          value: disputesummary?.open || 0,
          desc: "Awaiting action",
          color: "text-amber-500",
        },
        {
          label: "Review",
          value: disputesummary?.under_review || 0,
          desc: "Under verification",
          color: "text-blue-500",
        },
        {
          label: "Resolved",
          value: disputesummary?.resolved || 0,
          desc: "Successfully closed",
          color: "text-emerald-600",
        },
        {
          label: "Rejected",
          value: disputesummary?.rejected || 0,
          desc: "Declined cases",
          color: "text-red-600",
        },
      ].map((item, index) => (
        <div
          key={index}
          className={`flex-1 rounded-lg p-3 border transition hover:shadow-md ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${item.color}`}>
              {item.label}
            </span>
            <span className="text-lg font-bold">
              {item.value}
            </span>
          </div>

          <p
            className={`text-[11px] mt-1 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {item.desc}
          </p>
        </div>
      ))
}
          </div>
          <div className="w-full px-[20px] mt-[20px]">
            <div
              className={`flex w-full h-full flex-col rounded-xl overflow-y-auto border ${
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
                  Disputes
                </h2>

                <div className="flex gap-3 flex-wrap items-center">
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
                        className={`fixed open top-[48%] w-[200px] left-[400px] right-0 mt-2 rounded-lg shadow-lg border z-20 max-h-80 overflow-y-auto ${
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
                      placeholder="Search Dispute..."
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
                    value={trstatus}
                      onChange={(e) => setTrstatus(e.target.value)}
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
                        All Disputes
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="open"
                      >
                        Open
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="under_review"
                      >
                        Under Review
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="resolved"
                      >
                        resolved
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="rejected"
                      >
                        rejected
                      </option>
                    </select>
                  </div>

                  {/* ⬇️ Download Button */}
                  {/* <button
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
                  </button> */}
                  <div
                    className={`px-4 py-1 rounded-lg border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >
  <select
                      onChange={(e) => setDisputetype(e.target.value)}
                      value={disputetype}
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
                        value="payout"
                      >
                       Payout
                      </option>
                      <option
                        className={`${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }`}
                        value="collection"
                      >
                        Collection
                      </option>
                    
                    </select>

                  </div>
                

                </div>
              </div>

              <table
                className={`w-full text-sm text-left ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <thead
                  className={`text-[11px] uppercase border-b border-t ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-400 border-gray-700"
                      : "bg-gray-50 text-gray-400 border-gray-300"
                  }`}
                >
                  <tr>
  <th className="px-4 py-3">Status</th>
  <th className="px-4 py-3">Dispute Date</th>
  <th className="px-4 py-3">Transaction</th>
  {/* <th className="px-4 py-3">Bank Details</th> */}
  <th className="px-4 py-3">Dispute Amount</th>
  <th className="px-4 py-3 text-center">Dispute Type</th>
  <th className="px-4 py-3">Remarks</th>
  <th className="px-4 py-3 text-center">Action</th>
</tr>
                </thead>
                <tbody className="text-[12px] font-semibold">
  {load ? (
    Array.from({ length: 3 }).map((_, i) => <Contentloader key={i} />)
  ) : Array.isArray(disputedata) && disputedata.length > 0 ? (
    disputedata.map((item, i) => (
      <tr
        key={item.id}
        className={`border-b ${
          theme === "dark"
            ? "border-gray-700 hover:bg-gray-800"
            : "border-gray-100 hover:bg-gray-50"
        }`}
      >
        {/* Status */}
        <td className="px-4 py-3">
  <span
    className={`uppercase px-3 py-[4px] rounded-md text-[11px] font-semibold text-white
      ${
        item.status?.toLowerCase() === "open"
          ? "bg-amber-500"
          : item.status?.toLowerCase() === "under_review"
          ? "bg-blue-500"
          : item.status?.toLowerCase() === "resolved"
          ? "bg-emerald-600"
          : item.status?.toLowerCase() === "rejected"
          ? "bg-red-600"
          : "bg-gray-500"
      }`}
  >
    {item.status?.replace("_", " ")}
  </span>
</td>

        {/* Dispute Date */}
        <td className="px-4 py-3">
          {item.dispute_date
            ? new Date(item.dispute_date).toLocaleString()
            : "-"}
        </td>

        {/* Transaction Details */}
        <td className="px-4 py-3">
          <div className="flex flex-col">
            <p>Txn ID: {item.transaction_id}</p>
            <p>{`${item.rrn?"RRN":"UTR"}`}: {item.rrn?item.rrn:item.utr}</p>
          </div>
        </td>

        {/* Bank Details */}
        {/* <td className="px-4 py-3">
          <div className="flex flex-col">
            <p>Bank: {item.bank_name}</p>
            <p>A/C: {item.account_no}</p>
            <p>IFSC: {item.ifsc_code}</p>
          </div>
        </td> */}

        {/* Dispute Amount */}
        <td className="px-4 py-3">
          ₹{Number(item.dispute_amount || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}
        </td>

        {/* Dispute Type */}
        <td className="px-4 py-3  text-center align-middle">
  <span>
    {item.dispute_type
      ? item.dispute_type.charAt(0).toUpperCase() +
        item.dispute_type.slice(1)
      : "-"}
  </span>
</td>

        {/* Remarks */}
        <td className="px-4 py-3">
          {`${item.dispute_remarks.slice(0,8)}...` || "-"}
        </td>
        <td className="px-4 py-3 relative text-center align-middle">
          {item.dispute_remarks.length>10&&        <button onClick={()=>{
          setShowremarks(showremarks===item.transaction_id?null:item.transaction_id),setSelectedremarks(item.dispute_remarks)
        }}
  className="px-4 py-2 text-[12px] font-medium
             bg-gradient-to-r from-blue-600 to-indigo-600
             text-white rounded-md
             shadow-md hover:shadow-lg
             hover:from-blue-700 hover:to-indigo-700
             transition-all duration-200"
>
  Show Full Remarks
</button>}



{showremarks === item.transaction_id  && (
  <div className="absolute top-14 right-[100px] w-[280px]
                  bg-white rounded-xl shadow-xl
                  border border-gray-200
                  p-3 z-50">
    
    <p className="text-[12px] font-semibold text-gray-700 mb-2">

      {selectedremarks}
    </p>

   

    <div className="flex justify-end gap-2 mt-3">
      <button
        onClick={() => setShowremarks(null)}
        className="px-3 py-1 text-[11px]
                   bg-gray-200 rounded-md"
      >
        Cancel
      </button>

    
    </div>
  </div>
)}

</td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="text-center py-4 text-gray-500">
        No disputes found
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

export default Dispute;
