import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { X, Undo2,ChevronLeft,ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";








import {
    update_Txn_data,getall_txn_data

} from "../redux/action";

const GetallTxn = () => {



  const [load, setLoad] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });








  const { merchantId } = useParams();
  console.log(29, merchantId);


  const { theme } = useContext(Theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();





  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);




  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");




  const [isDownloading, setIsDownloading] = useState(false);
  const [open, setOpen] = useState(false);

 
  const [upadtedstatus, setUpadtedstatus] = useState("");
  const [updatedrrn, setUpdatedrrn] = useState("");
  const [upadtedpaytmid, seUpadtedpaytmid] = useState("");
  const [updatedremarkes, setUpdatedremarkes] = useState("");
  const [currenttxnid, setCurrenttxnid] = useState("");
  const [updateload, setUpdateload] = useState(false);


  console.log(72,upadtedstatus,updatedremarkes);





  const handelupdate = (txn)=>{

  setUpadtedstatus(txn.status)
  setUpdatedremarkes(txn.message)
  setCurrenttxnid(txn.txn_id)
  setUpdatedrrn(txn.rrn)
  seUpadtedpaytmid(txn.paytmOrderId)




 

}
  const update = async()=>{



  const updateddata ={
    paytmOrderId:upadtedpaytmid,
    rrn:updatedrrn,

    status
:upadtedstatus,
    
message:updatedremarkes,


  }


 await dispatch(update_Txn_data(currenttxnid,updateddata,setUpdateload))
 

}








  const transactionData = useSelector((state) => state.transactions?.transactions || []);
  console.log(127, transactionData);
  const transactionDataArray = useSelector((state) => state.transactions?.transactions.data || []);

  console.log(57, transactionDataArray);


  const totalRecords = transactionData?.pagination?.totalRecords
  ;
  console.log(134,totalRecords);




  const totalPages = transactionData?.pagination?.totalPages;

  



  useEffect(() => {
   
      dispatch(getall_txn_data( searchTerm, searchStatus, page, perPage, false, setLoad, dateRange.startDate,
        dateRange.endDate));
    
  }, [merchantId, searchTerm, searchStatus, dispatch, page, perPage, dateRange.startDate,
    dateRange.endDate]);


  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      await dispatch(
        
        getall_txn_data(
           searchTerm, searchStatus, page, perPage, true, setLoad, dateRange.startDate,
          dateRange.endDate
        )
      );
      
      setIsDownloading(false)


    } catch (error) {
      console.log("Download error:", error);

    };
  }


  useEffect(() => {
    setPage(1);
  }, [searchTerm, searchStatus, dateRange.startDate,
    dateRange.endDate]);



  // const statusCard = [
  //   {
  //     title: "Active Accounts",
  //     credit: activeStatus.length,
  //     description: "Accounts currently active and in use",
  //     gradient: "from-[#374151] to-[#6B7280]", 
  //     textColor: "text-white",
  //     icon: (
  //       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     title: "Inactive Accounts",
  //     credit: inactiveStatus.length,
  //     description: "Accounts currently inactive or dormant",
  //     gradient: "from-[#544151] to-[#6B7280]",
  //     textColor: "text-white",
  //     icon: (
  //       <svg height={50} width={50} fill="#ffffff" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm1-8.251V7a1,1,0,0,0-2,0v5a1.00586,1.00586,0,0,0,.11816.47217l1.5,2.79883a1.00029,1.00029,0,0,0,1.76368-.94434Z"></path></g></svg>
  //     ),
  //   },
  //   {
  //     title: "Suspended Accounts",
  //     credit: suspended.length,
  //     description: "Accounts suspended due to policy violations",
  //     gradient: "from-[#214151] to-[#6B7280]", 
  //     textColor: "text-white",
  //     icon: (
  //       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
  //       </svg>
  //     ),
  //   },
  // ];







  return (
  <div
  className={`w-full 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
    theme === "dark"
      ? "bg-gray-900 text-gray-300"
      : "bg-white text-gray-800"
  }`}
>
  <main className="w-full h-full flex flex-col overflow-y-scroll">

    {/* ===================== TOP SECTION ===================== */}
    <section className="w-full p-2 py-4 px-6 h-[200px]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Summary cards can be added here */}
        </div>
      </div>
    </section>

    {/* ===================== TRANSACTION SECTION ===================== */}
    <section className="w-full flex flex-col sm:flex-col gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">

      <div
        className={`flex sm:w-full w-full h-full flex-col rounded-xl overflow-y-auto border ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-300"
            : "bg-white border-gray-100 text-gray-800"
        }`}
      >

        {/* ===================== HEADER ===================== */}
        <div
          className={`flex justify-between items-center px-6 py-4 h-16 w-full shadow-md border ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-gradient-to-r from-white to-gray-50 border-gray-100"
          }`}
        >

          {/* Title */}
          <h2
            className={`text-xl font-semibold tracking-wide ${
              theme === "dark"
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            Transaction list
          </h2>

          {/* ===================== FILTERS ===================== */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="relative w-[220px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Search Transactions..."
                className={`w-full border outline-none rounded-[10px] pl-10 pr-4 py-2 text-sm transition-all duration-300 ease-in-out shadow-sm ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-400"
                    : "bg-gray-50 border-gray-200 text-gray-700 placeholder-gray-400 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-400"
                }`}
              />
            </div>

            {/* Date Button */}
            <button
              className={`px-3 py-2 text-sm rounded-md transition ${
                theme === "dark"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              {dateRange.startDate && dateRange.endDate
                ? `${dateRange.startDate} → ${dateRange.endDate}`
                : "Filter by Date"}
            </button>

            {/* Clear Date */}
            {(dateRange.startDate || dateRange.endDate) && (
              <button
                className={`px-3 py-2 text-sm rounded-md transition ${
                  theme === "dark"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
                onClick={() => {
                  setDateRange({
                    startDate: null,
                    endDate: null,
                  });
                  setPage(1);
                }}
              >
                <Undo2 size={17} />
              </button>
            )}

            {/* ===================== DATE PICKER ===================== */}
            {showDatePicker && (
              <div
                className={`absolute top-[40%] right-[23%] z-50 shadow-lg rounded-md border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <DateRange
                  ranges={[
                    {
                      startDate: dateRange.startDate
                        ? new Date(dateRange.startDate)
                        : new Date(),
                      endDate: dateRange.endDate
                        ? new Date(dateRange.endDate)
                        : new Date(),
                      key: "selection",
                    },
                  ]}
                  moveRangeOnFirstSelection={false}
                  onChange={(ranges) => {
                    const start =
                      ranges.selection.startDate.toLocaleDateString("en-CA");

                    const end =
                      ranges.selection.endDate.toLocaleDateString("en-CA");

                    setDateRange({
                      startDate: start,
                      endDate: end,
                    });

                    setShowDatePicker(false);
                    setPage(1);
                  }}
                />
              </div>
            )}

            {/* ===================== STATUS ===================== */}
            <select
              onChange={(e) => {
                setSearchStatus(e.target.value);
                setPage(1);
              }}
              value={searchStatus}
              className={`border rounded-[5px] px-4 py-2 text-sm outline-none transition-all duration-300 ease-in-out shadow-sm cursor-pointer ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:bg-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-400"
                  : "bg-gray-50 border-gray-200 text-gray-700 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-400"
              }`}
            >
              <option value="">ALL</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILURE">FAILURE</option>
            </select>
          </div>

          {/* ===================== DOWNLOAD ===================== */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`w-[140px] h-[42px] text-white rounded-md transition ${
              isDownloading
                ? "bg-green-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isDownloading ? (
              <div className="w-full px-4 py-2 flex justify-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-7 h-7 text-gray-300 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1894 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1894 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4014 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2751 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.087 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7192 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>

                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              "Download Excel"
            )}
          </button>
        </div>

        {/* ===================== UPDATE MODAL ===================== */}
        {open && (
          <div
            className="flex text-black items-center justify-center inset-0 fixed bg-black/60 z-50"
            onClick={() => setOpen(false)}
          >
            <div
              className={`p-6 rounded-2xl shadow-2xl w-[400px] ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
              }`}
              onClick={(e) => e.stopPropagation()}
            >

              <h2
                className={`text-lg font-semibold mb-4 text-center ${
                  theme === "dark"
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                Update Details
              </h2>

              {/* Status */}
              <div className="mb-3">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  Status Update
                </label>

                <select
                  onChange={(e) => setUpadtedstatus(e.target.value)}
                  value={upadtedstatus}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  <option value="">Select status</option>
                  <option value="success">Success</option>
                  <option value="failure">Failure</option>
                </select>
              </div>

              {/* RRN */}
              <div className="mb-3">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  RRN Update
                </label>

                <input
                  onChange={(e) => setUpdatedrrn(e.target.value)}
                  value={updatedrrn}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                />
              </div>

              {/* Paytm Order ID */}
              <div className="mb-3">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  Paytm Order ID Update
                </label>

                <input
                  onChange={(e) => seUpadtedpaytmid(e.target.value)}
                  value={upadtedpaytmid}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                />
              </div>

              {/* Remarks */}
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  Remarks
                </label>

                <textarea
                  value={updatedremarkes}
                  onChange={(e) => setUpdatedremarkes(e.target.value)}
                  placeholder="Enter remarks"
                  rows="3"
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3">

                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-500 text-white px-4 text-[13px] py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    update();
                  }}
                  className="bg-blue-600 text-white text-[13px] px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Manual Update
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="bg-blue-600 text-white px-4 py-2 text-[13px] rounded-md hover:bg-blue-700 transition"
                >
                  Fetch From Bank
                </button>

              </div>
            </div>
          </div>
        )}

        {/* ===================== TABLE ===================== */}
        <div
          className={`overflow-x-auto rounded-lg shadow ${
            theme === "dark"
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          <table
            className={`w-full text-sm text-left border overflow-hidden ${
              theme === "dark"
                ? "text-gray-300 border-gray-700"
                : "text-gray-600 border-gray-200"
            }`}
          >

            <thead
              className={`text-[11px] uppercase border-b ${
                theme === "dark"
                  ? "text-gray-400 bg-gray-900 border-gray-700"
                  : "text-gray-500 bg-[#f9f9f9] border-gray-300"
              }`}
            >
              <tr>

                <th className="py-2 px-3 text-left">
                  Account No
                </th>

                <th className="py-2 px-3 text-left">
                  St Amounts
                </th>

                <th className="py-2 px-3 text-left">
                  Date
                </th>

                <th className="py-2 px-3 text-left">
                  IFSC
                </th>

                <th className="py-2 px-3 text-left">
                  RRN
                </th>

                <th className="py-2 px-3 text-left">
                  Txn Id
                </th>

                <th className="py-2 px-3 text-left">
                  Status
                </th>

                <th className="py-2 px-3 text-left">
                  Action
                </th>

              </tr>
            </thead>

            {load ? (
              <tbody>
                <tr>
                  <td colSpan="9" className="py-10">
                    <div className="flex justify-center items-center w-full">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody
                className={`text-[13px] font-medium ${
                  theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >

                {transactionDataArray.length > 0 ? (
                  transactionDataArray.map((txn, i) => (

                    <tr
                      key={i}
                      className={`transition-colors text-[13px] border-b ${
                        theme === "dark"
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >

                      {/* Bank & Account */}
                      <td className="px-4 py-3">
                        <div className="space-y-[2px]">

                          <p
                            className={`font-semibold text-[12px] ${
                              theme === "dark"
                                ? "text-gray-100"
                                : "text-gray-800"
                            }`}
                          >
                            BANK:{" "}
                            <span
                              className={
                                theme === "dark"
                                  ? "font-normal text-gray-400"
                                  : "font-normal text-gray-600"
                              }
                            >
                              {txn.bank_name}
                            </span>
                          </p>

                          <p
                            className={
                              theme === "dark"
                                ? "text-gray-400 text-[12px]"
                                : "text-gray-600 text-[12px]"
                            }
                          >
                            A/C:{" "}
                            <span className="font-medium">
                              {txn.account_no}
                            </span>
                          </p>

                          <p
                            className={
                              theme === "dark"
                                ? "text-gray-500 text-[11px]"
                                : "text-gray-500 text-[11px]"
                            }
                          >
                            Paytm ID:{" "}
                            <span className="font-medium">
                              {txn.paytmOrderId}
                            </span>
                          </p>

                          <p
                            className={
                              theme === "dark"
                                ? "text-gray-500 text-[11px]"
                                : "text-gray-500 text-[11px]"
                            }
                          >
                            Corp ID:{" "}
                            <span className="font-medium">
                              {txn.company_id}
                            </span>
                          </p>

                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-3">
                        <div className="space-y-[3px]">

                          <p
                            className={`text-[12px] ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            Amt:&nbsp;

                            <span
                              className={`font-semibold ${
                                theme === "dark"
                                  ? "text-gray-100"
                                  : "text-gray-900"
                              }`}
                            >
                              ₹
                              {Number(
                                txn.settlement_amount || 0
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </p>

                          <p
                            className={`text-[12px] ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            Chg:&nbsp;

                            <span
                              className={`font-semibold ${
                                theme === "dark"
                                  ? "text-gray-100"
                                  : "text-gray-900"
                              }`}
                            >
                              ₹
                              {Number(
                                txn.settlement_charge || 0
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </p>

                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3">
                        {txn.txn_date}
                      </td>

                      {/* IFSC */}
                      <td className="px-4 py-3">
                        {txn.ifsc_code}
                      </td>

                      {/* RRN */}
                      <td className="px-4 py-3">
                        {txn.rrn}
                      </td>

                      {/* Transaction */}
                      <td className="px-4 py-3">
                        <div className="space-y-[2px]">

                          <p className="text-[12px]">
                            Txn ID:{" "}
                            <span className="font-medium">
                              {txn.txn_id}
                            </span>
                          </p>

                          <p className="text-[12px]">
                            Mode:{" "}
                            <span className="font-medium">
                              {txn.mode}
                            </span>
                          </p>

                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">

                        <span
                          className={`text-[11px] font-bold px-[5px] py-[3px] rounded-[6px] text-center tracking-wide ${
                            txn.status?.toUpperCase() === "SUCCESS"
                              ? "bg-green-500 text-white border border-green-400"
                              : txn.status?.toUpperCase() === "PENDING"
                              ? "bg-yellow-500 text-white border border-yellow-400"
                              : "bg-red-500 text-white border border-red-400"
                          }`}
                        >
                          {txn.status?.toUpperCase() || "UNKNOWN"}
                        </span>

                      </td>

                      {/* Action */}
                      {txn.status?.toUpperCase() === "PENDING" ? (
                        <td className="px-4 py-3">

                          <button
                            onClick={() => {
                              setOpen(true);
                              handelupdate(txn);
                            }}
                            className={`text-white text-[12px] font-medium px-3 py-[5px] rounded-md transition-all shadow-sm ${
                              theme === "dark"
                                ? "bg-violet-600 hover:bg-violet-700"
                                : "bg-violet-500 hover:bg-violet-600"
                            }`}
                          >
                            UPDATE
                          </button>

                        </td>
                      ) : (
                        <td className="px-4 py-3">
                          <span
                            className={`text-[11px] ${
                              theme === "dark"
                                ? "text-gray-600"
                                : "text-gray-400"
                            }`}
                          >
                            —
                          </span>
                        </td>
                      )}

                    </tr>

                  ))
                ) : (

                  <tr>
                    <td colSpan="9" className="py-10">

                      <div
                        className={`flex justify-center items-center w-full ${
                          theme === "dark"
                            ? "text-gray-500"
                            : "text-gray-500"
                        }`}
                      >
                        No Transaction data found
                      </div>

                    </td>
                  </tr>

                )}

              </tbody>
            )}

          </table>

          {/* ===================== PAGINATION ===================== */}
          {totalPages > 0 ? (
            <div
              className={`flex items-center justify-between px-4 py-3 border-t text-sm ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-300 border-gray-700"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >

              {/* Per Page */}
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

              {/* Navigation */}
              <div className="flex items-center space-x-2">

                {/* Range */}
                <p>
                  {totalRecords > 0
                    ? `${(page - 1) * perPage + 1}-${Math.min(
                        page * perPage,
                        totalRecords
                      )} of ${totalRecords}`
                    : "0 of 0"}
                </p>

                {/* Navigation Shortcut */}
                <div
                  className={`flex items-center gap-4 px-4 py-2 rounded-xl shadow-sm border w-fit ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >

                  <h1
                    className={`text-sm font-semibold ${
                      theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-700"
                    }`}
                  >
                    Navigation Shortcut
                  </h1>

                  <input
                    type="number"
                    value={page}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      if (
                        value >= 1 &&
                        value <= totalPages
                      ) {
                        setPage(value);
                      }
                    }}
                    min="1"
                    max={totalPages}
                    className={`w-20 px-3 py-1.5 text-center text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:bg-gray-600 focus:ring-gray-400"
                        : "bg-gray-50 border-gray-300 text-gray-700 focus:bg-white focus:ring-black"
                    }`}
                  />

                </div>

                {/* Previous */}
                <button
                  onClick={() =>
                    setPage(Math.max(1, page - 1))
                  }
                  disabled={page === 1}
                  className={`px-3 py-1 rounded-md ${
                    page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {/* First */}
                <button
                  onClick={() => setPage(1)}
                  className={`px-3 py-1 rounded-md ${
                    page === 1
                      ? theme === "dark"
                        ? "bg-gray-700 font-semibold"
                        : "bg-gray-200 font-semibold"
                      : theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  1
                </button>

                {/* Dots */}
                {page > 3 && (
                  <span className="px-2">...</span>
                )}

                {/* Nearby */}
                {Array.from(
                  { length: 3 },
                  (_, i) => page - 1 + i
                )
                  .filter(
                    (num) =>
                      num > 1 && num < totalPages
                  )
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
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </button>
                  ))}

                {/* Dots */}
                {page < totalPages - 2 && (
                  <span className="px-2">...</span>
                )}

                {/* Last */}
                {totalPages > 1 && (
                  <button
                    onClick={() =>
                      setPage(totalPages)
                    }
                    className={`px-3 py-1 rounded-md ${
                      page === totalPages
                        ? theme === "dark"
                          ? "bg-gray-700 font-semibold"
                          : "bg-gray-200 font-semibold"
                        : theme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                {/* Next */}
                <button
                  onClick={() =>
                    setPage(
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={page === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    page === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>

              </div>
            </div>
          ) : null}

        </div>
      </div>
    </section>
  </main>
</div>
  );
};

export default GetallTxn;