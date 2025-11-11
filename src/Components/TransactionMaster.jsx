import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { X, Undo2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";








import {
  getTransactions_by_companyid,update_Txn_status

} from "../redux/action";

const TransactionMaster = () => {



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
  const [updatedremarkes, setUpdatedremarkes] = useState("");
  const [currenttxnid, setCurrenttxnid] = useState("");
  const [updateload, setUpdateload] = useState(false);


  console.log(72,upadtedstatus,updatedremarkes);





  const handelupdate = (txn)=>{

  setUpadtedstatus(txn.status)
  setUpdatedremarkes(txn.message)
  setCurrenttxnid(txn.txn_id)

  const updateddata ={

    status
:upadtedstatus,
    
message:updatedremarkes,


  }


 

}
  const update = ()=>{



  const updateddata ={

    status
:upadtedstatus,
    
message:updatedremarkes,


  }


  dispatch(update_Txn_status(merchantId,currenttxnid,updateddata,setUpdateload))

}








  const transactionData = useSelector((state) => state.transactions?.transactions || []);
  console.log(52, transactionData);

  const transactionDataArray = transactionData
    ?.map(item => item.data || [])
    .flat();
  console.log(57, transactionDataArray);


  const totalRecords = transactionData[0]?.pagination.totalRecords;
  console.log(totalRecords);




  const totalPages = transactionData[0]?.pagination.totalPages;

  ;



  useEffect(() => {
    if (merchantId) {
      dispatch(getTransactions_by_companyid(merchantId, searchTerm, searchStatus, page, perPage, false, setLoad, dateRange.startDate,
        dateRange.endDate));
    }
  }, [merchantId, searchTerm, searchStatus, dispatch, page, perPage, dateRange.startDate,
    dateRange.endDate]);


  const handleDownload = async () => {
    try {


      await dispatch(
        getTransactions_by_companyid(
          merchantId, searchTerm, searchStatus, page, perPage, true, setLoad, dateRange.startDate,
          dateRange.endDate
        )
      );



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
                disabled={isDownloading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                {isDownloading ? "Downloading..." : "Download Excel"}
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
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // handle your save action here
            setOpen(false),update()
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

            <div className={`overflow-x-auto bg-white rounded-lg shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              {/* <table className="w-full table-auto text-xs">
  <thead className={`uppercase ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} text-[10px]`}>
    <tr>
      <th className="py-2 px-3 text-left">Bank Name</th>
      <th className="py-2 px-3 text-left">Account No</th>
      <th className="py-2 px-3 text-left">Txn Mode</th>
      <th className="py-2 px-3 text-left">St Amounts</th>
      <th className="py-2 px-3 text-left">Date</th>
      <th className="py-2 px-3 text-left">IFSC</th>
      <th className="py-2 px-3 text-left">RRN</th>
      <th className="py-2 px-3 text-left">Txn Id</th>
      <th className="py-2 px-3 text-left">Status</th>
    </tr>
  </thead>


  <tbody>
  {load ? (
    <tr>
      <td colSpan="9" className="py-10">
        <div className="flex justify-center items-center w-full">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </td>
    </tr>
  ) : (
    <>
      {Array.isArray(transactionDataArray) && transactionDataArray.length > 0 ? (
        transactionDataArray.map((transaction, i) => (
          <tr
            key={i}
            className={`border-b ${
              theme === "dark"
                ? "border-gray-700 hover:bg-gray-800"
                : "border-gray-200 hover:bg-gray-100"
            } text-[11px]`}
          >
            <td className="py-2 px-3">{transaction.bank_name}</td>
            <td className="py-2 px-3">{transaction.account_no}</td>
            <td className="py-2 px-3">{transaction.mode}</td>

            <td className="py-2 px-3">
              <div className="space-y-1">
                <p className="text-[10px]">Amt: <span className="font-medium">{transaction.settlement_amount}</span></p>
                <p className="text-[10px]">Chg: <span className="font-medium">{transaction.settlement_charge}</span></p>
              </div>
            </td>

            <td className="py-2 px-3">{transaction.txn_date}</td>
            <td className="py-2 px-3">{transaction.ifsc_code}</td>
            <td className="py-2 px-3">{transaction.rrn}</td>
            <td className="py-2 px-3">{transaction.txn_id}</td>

            <td className="py-2 px-3">
              <span
                className={`px-2 py-[3px] rounded-full text-[10px] ${
                  transaction.status === "SUCCESS"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : transaction.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {transaction.status}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9" className="text-center py-3 text-gray-400 text-xs">
            No settlements found.
          </td>
        </tr>
      )}
    </>
  )}
</tbody>



</table> */}
              <table className="w-full text-sm text-left text-gray-600 border border-gray-200  overflow-hidden">
                <thead className="text-[11px] text-gray-500 uppercase bg-[#f9f9f9] border-b border-gray-300">
                  <tr>
                    <th className="py-2 px-3 text-left">Bank Name</th>
                    <th className="py-2 px-3 text-left">Account No</th>
                    <th className="py-2 px-3 text-left">Txn Mode</th>
                    <th className="py-2 px-3 text-left">St Amounts</th>
                    <th className="py-2 px-3 text-left">Date</th>
                    <th className="py-2 px-3 text-left">IFSC</th>
                    <th className="py-2 px-3 text-left">RRN</th>
                    <th className="py-2 px-3 text-left">Txn Id</th>
                    <th className="py-2 px-3 text-left">Status</th>
                    <th className="py-2 px-3 text-left">Action</th>

                  </tr>
                </thead>
                {load ? (
                  <tr>
                    <td colSpan="9" className="py-10">
                      <div className="flex justify-center items-center w-full">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : (<tbody className="text-[13px] font-medium">
                  {transactionDataArray.length > 0 ? transactionDataArray.map((txn, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-4 align-top">
                        {txn.bank_name
                        }
                      </td>

                      <td className="px-4 py-4">{txn.account_no
                      }</td>

                      <td className="px-4 py-4">{txn.mode}</td>

                      <td className="px-4 py-4"> <div className="space-y-1">
                        <p className="text-[10px]">Amt: <span className="font-medium">{txn.settlement_amount}</span></p>
                        <p className="text-[10px]">Chg: <span className="font-medium">{txn.settlement_charge}</span></p>
                      </div></td>

                      <td className="px-4 py-4">
                        {txn.txn_date}
                      </td>
                      <td className="px-4 py-4">
                        {txn.ifsc_code}
                      </td>
                      <td className="px-4 py-4">
                        {txn.rrn}
                      </td>
                      <td className="px-4 py-4">
                        {txn.txn_id
                        }
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`text-white rounded-[4px] px-3 py-1 min-w-[80px] text-center inline-block font-bold text-[10px] ${txn.status?.toUpperCase() === "SUCCESS"
                              ? "bg-green-500"
                              : txn.status.toUpperCase() === "PENDING"
                                ? "bg-yellow-400 text-black"
                                : "bg-red-400"
                            }`}
                        >
                          {txn.status?.toUpperCase()}
                        </span>
                      </td>
                      {txn.status.toUpperCase() === "PENDING"?<td className="px-4 py-4">
                        <button onClick={()=>{
                          setOpen((prev)=>!prev),handelupdate(txn)
                        }} className="bg-violet-500 text-white p-[5px] rounded-[5px]">UPDATE</button>
                        </td>:""
                        }
                     
                    </tr>
                  )) : <tr>
                    <td colSpan="9" className="py-10">
                      <div className="flex justify-center items-center w-full">
                        <div className="">No Transaction data found</div>
                      </div>
                    </td>
                  </tr>}
                </tbody>)}


              </table>



            </div>

            {totalPages > 0 ? (
              <div
                className={`flex items-center justify-between px-4 py-3 border-t text-sm ${theme === "dark"
                  ? "bg-gray-900 text-gray-300 border-gray-700"
                  : "bg-white text-gray-600 border-gray-200"
                  }`}
              >
                <div>
                  Show{" "}
                  <select
                    className={`rounded border outline-none px-[5px] py-[5px] ${theme === "dark"
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
                    {(page - 1) * perPage + 1}-
                    {Math.min(page * perPage, totalRecords)} of {totalRecords}
                  </p>


                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`px-3 py-1  rounded-md ${page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : theme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-200"
                      }`}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>


                  {Array.from({ length: 3 }, (_, i) => page + i).map((num) => (
                    num <= totalPages && (
                      <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`px-3 py-1  rounded-md ${num === page
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
                    )
                  ))}



                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className={`px-3 py-1  rounded-md ${page === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : theme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-200"
                      }`}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>

              </div>
            ) : (
              ""
            )}

          </div>
        </section>
      </main>


    </div>
  );
};

export default TransactionMaster;