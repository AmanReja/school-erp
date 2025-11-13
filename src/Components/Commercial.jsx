import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { X, Undo2,ChevronLeft,ChevronRight } from "lucide-react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";








import {
    update_Txn_data,getall_txn_data,getPkgMasters

} from "../redux/action";

const Commercial = () => {



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
  const [modelopen, setModelopen] = useState(false);
  console.log(79,modelopen);


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

  
  const Masters = useSelector((state)=>state.pkgMasters.pkgMasters?.data
  )
  console.log(193,Masters);


  useEffect(() => {
   
      dispatch(getall_txn_data( searchTerm, searchStatus, page, perPage, false, setLoad, dateRange.startDate,
        dateRange.endDate));

        dispatch(getPkgMasters())
    
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
      className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
        }`}
    >


      <main className="w-full h-full flex flex-col overflow-y-scroll">

        <section className="w-full p-2 py-4 px-6 h-[200px]">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* {statusCard.map((card, idx) => (
        <div
          key={idx}
          className={`overflow-hidden rounded-2xl bg-gradient-to-r ${card.gradient} text-white transition-transform duration-300 hover:-translate-y-2`}
        >
          <div className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="opacity-90">{card.credit}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                {card.icon}
              </div>
            </div>
          
          </div>
        </div>
      ))} */}
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col sm:flex-col gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">
          {/* Settlements Table */}

          <div
            className={`flex sm:w-[100%] w-full h-full flex-col rounded-xl overflow-y-auto border ${theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-100 text-gray-800"
              }`}
          >
            <div className="flex justify-between items-center px-6 py-4 h-16 w-full bg-gradient-to-r from-white to-gray-50 shadow-md  border border-gray-100">
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
                Transaction list
              </h2>

              {/* Search Input */}
              <div className="flex items-center gap-4">
                {/* 🔍 Search Input */}
                <div className="relative w-[220px]">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    placeholder="Search Transactions..."
                    className="w-full border outline-none border-gray-200 rounded-[10px] pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-400 transition-all duration-300 ease-in-out shadow-sm"
                  />

                </div>
                <button
                  className="px-3 py-2 text-sm bg-indigo-500 text-white rounded-md"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  {dateRange.startDate && dateRange.endDate
                    ? `${dateRange.startDate} → ${dateRange.endDate}`
                    : "Filter by Date"}
                </button>

                {dateRange.
                  startDate !== null || !"" &&
                  dateRange.endDate !== null||!"" ?
                  <button
                    className="px-3 py-2 text-sm bg-indigo-500 text-white rounded-md"

                    onClick={() => {
                      setDateRange({
                        startDate: null,
                        endDate: null,
                      })   
                    }}

                  >
                    <Undo2></Undo2>
                  </button> : ""}


                {showDatePicker && (
                  <div className="absolute top-[40%]  right-[23%] z-50 bg-white  shadow-lg rounded-md">
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
                        const start = ranges.selection.startDate
                          .toLocaleDateString("en-CA");
                        const end = ranges.selection.endDate
                          .toLocaleDateString("en-CA");

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

                {/* 📋 Status Dropdown */}
                <select onChange={(e) => { setSearchStatus(e.target.value) }}
                  value={searchStatus}
                  className="border border-gray-200 rounded-[5px] px-4 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-400 outline-none transition-all duration-300 ease-in-out shadow-sm cursor-pointer"
                  defaultValue=""
                >
                  <option selected value="">ALL</option>
                  <option value="SUCCESS">SUCCESS</option>

                  <option value="PENDING">PENDING</option>
                  <option value="FAILED">FAILED</option>
                </select>
              </div>

  <button
onClick={handleDownload}

className="w-[140px] h-[42px] bg-green-600 text-white rounded-md hover:bg-green-700 transition"
>
{isDownloading?<div className=" w-full px-4 py-2"><div role="status">
    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div><div/>
</div>:"Download Exel"}
</button>
           

            </div>

            {open && (
  <div
    className="flex text-black items-center justify-center inset-0 fixed bg-black/40 z-50"
    onClick={() => setOpen(false)} // ✅ click outside to close
  >
    <div
      className="bg-white p-6 rounded-2xl shadow-2xl w-[400px]"
      onClick={(e) => e.stopPropagation()} // ✅ prevent close when clicking inside
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Update Details</h2>

      {/* Status Dropdown */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-black mb-1">
          Status Update
        </label>
        <select
          onChange={(e) => setUpadtedstatus(e.target.value)}
          value={upadtedstatus}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>

      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-black mb-1">
          RRN Update
        </label>
        <input
          onChange={(e) => setUpdatedrrn(e.target.value)}
          value={updatedrrn}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        
        </input>

      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-black mb-1">
          Paytm Order ID Update
        </label>
        <input
          onChange={(e) => seUpadtedpaytmid(e.target.value)}
          value={upadtedpaytmid}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
       
        </input>

      </div>





  







      {/* Remarks Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Remarks
        </label>
        <textarea
          value={updatedremarkes}
          onChange={(e) => setUpdatedremarkes(e.target.value)} // ✅ missing handler
          placeholder="Enter remarks"
          rows="3"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setOpen(false)}
          className="bg-gray-400 text-white px-4 text-[13px] py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // handle your save action here
            setOpen(false),update()
          }}
          className="bg-blue-600 text-white text-[13px] px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Manual Update
        </button>
        <button
          onClick={() => {
            // handle your save action here
            setOpen(false)
          }}
          className="bg-blue-600 text-white px-4 py-2 text-[13px] rounded-md hover:bg-blue-700 transition"
        >
        Fetch From Bank
        </button>
      </div>
    </div>
  </div>
)}

            <div className={`overflow-x-auto bg-white rounded-lg shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              
            {modelopen && (
  <div
    className="fixed inset-0 flex justify-center items-center z-50"
  >
    <div className="bg-white w-[420px] rounded-lg shadow-xl border border-gray-200 animate-fadeIn">
      {/* Header */}
      <div className="px-5 py-3 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Add / Edit Package Master
        </h2>
        <button
          onClick={() => setModelopen(false)}
          className="text-gray-500 hover:text-red-500 text-lg font-bold"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <form
        onSubmit={""}
        className="px-5 py-4 space-y-4"
      >
        {/* Package Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Package Name
          </label>
          <input
            type="text"
            name="pkg_name"
            value={""}
            onChange={""}
            placeholder="Enter package name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={""}
            onChange={""}
            placeholder="Enter short description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Status
          </label>
          <select
            name="status"
            value={""}
            onChange={""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => setModelopen(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}


            <table className="w-full text-sm text-left text-gray-600 border border-gray-200 overflow-hidden">
        <thead className="text-[11px] text-gray-500 uppercase bg-[#f9f9f9] border-b border-gray-300">
          <tr>
            <th className="py-2 px-3 text-left">ID</th>
            <th className="py-2 px-3 text-left">Package Name</th>
            <th className="py-2 px-3 text-left">Status</th>
            <th className="py-2 px-3 text-left">Created On</th>
            <th className="py-2 px-3 text-left">Action</th>
          </tr>
        </thead>

        {load ? (
          <tbody>
            <tr>
              <td colSpan="5" className="py-10">
                <div className="flex justify-center items-center w-full">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="text-[13px] font-medium">
            {Masters.length > 0 ? (
              Masters.map((pkg, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition-colors text-[13px] border-b border-gray-100"
                >
                  <td className="px-4 py-3 text-gray-800">{pkg.id}</td>
                  <td className="px-4 py-3 text-gray-700">{pkg.pkg_name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-bold px-[6px] py-[3px] rounded-[6px] text-center tracking-wide ${
                        pkg.status?.toLowerCase() === "active"
                          ? "bg-green-400 text-white border border-green-300"
                          : "bg-red-400 text-white border border-red-300"
                      }`}
                    >
                      {pkg.status?.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{pkg.create_on}</td>
                  <td className="px-4 py-3 flex gap-2 items-center">
                    <button
                      onClick={() => setModelopen((prev)=>!prev)}
                      className="bg-orange-500 hover:bg-amber-600 text-white text-[12px] font-medium px-3 py-[5px] rounded-md transition-all shadow-sm flex items-center gap-1"
                    >
                      <FaEdit size={12} />
                      Set Commercial
                    </button>
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-[12px] font-medium px-3 py-[5px] rounded-md transition-all shadow-sm flex items-center gap-1"
                    >
                      <FaEdit size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-[12px] font-medium px-3 py-[5px] rounded-md transition-all shadow-sm flex items-center gap-1"
                    >
                      <FaTrashAlt size={12} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10">
                  <div className="flex justify-center items-center w-full">
                    <div>No Package Master data found</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>

              {totalPages > 0 ? (
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
    {(page - 1) * perPage + 1}-{Math.min(page * perPage, totalRecords)} of {totalRecords}
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
    .filter((num) => num > 1 && num < totalPages)
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
  {page < totalPages - 2 && <span className="px-2">...</span>}

  {/* Last Page */}
  {totalPages > 1 && (
    <button
      onClick={() => setPage(totalPages)}
      className={`px-3 py-1 rounded-md ${
        page === totalPages
          ? theme === "dark"
            ? "bg-gray-700 font-semibold"
            : "bg-gray-200 font-semibold"
          : theme === "dark"
          ? "hover:bg-gray-800"
          : "hover:bg-gray-100"
      }`}
    >
      {totalPages}
    </button>
  )}

  {/* Next Button */}
  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
    className={`px-3 py-1 rounded-md ${
      page === totalPages
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

export default Commercial;