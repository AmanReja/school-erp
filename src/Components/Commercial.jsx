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
    update_Txn_data,getall_txn_data,getPkgMasters,createPkgMaster,deletePkgMaster,create_Pkg_cms_Master,getPkg_cms_Masters,update_Pkg_cms_Master,delete_Pkg_cms_Master

} from "../redux/action";

const Commercial = () => {



  const [load, setLoad] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });









  const { pkgid,serviceid} = useParams();
 


  const { theme } = useContext(Theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();





  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [isDownloading, setIsDownloading] = useState(false);




  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");



  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

const [modelopen, setModelopen] = useState(false);
const [createmodelopen, setCreatemodelopen] = useState(false);
// const [pkgId, setPkgId] = useState("");        
// const [serviceId, setServiceId] = useState(""); 
const [fromVal, setFromVal] = useState("");    
const [toVal, setToVal] = useState("");        
const [amount, setAmount] = useState("");     
const [mch, setMch] = useState("");            
const [pkgType, setPkgType] = useState("");    


const [plusbutton,setPlusbutton] =useState(false)
const[iseditingcom,setIseditingcom] =useState(false)
const[currentcomid,setCurrentcomid] =useState(false)
const[service_id,setService_id] =useState(serviceid)
const[pkg_id,setPkg_id] =useState(pkgid)










//   const handelupdate = (txn)=>{

//   setUpadtedstatus(txn.status)
//   setUpdatedremarkes(txn.message)
//   setCurrenttxnid(txn.txn_id)
//   setUpdatedrrn(txn.rrn)
//   seUpadtedpaytmid(txn.paytmOrderId)




 

// }
//   const update = async()=>{



//   const updateddata ={
//     paytmOrderId:upadtedpaytmid,
//     rrn:updatedrrn,

//     status
// :upadtedstatus,
    
// message:updatedremarkes,


//   }


//  await dispatch(update_Txn_data(currenttxnid,updateddata,setUpdateload))
 

// }





const handelcommercialCreate = (e) => {
  e.preventDefault();

  try {
    const formdata = {
     

      pkg_id: pkg_id,
      service_id: service_id,
      fromval: fromVal,
      toval: toVal,
      amount: amount,
      mch: mch,
      type: pkgType
    };

    dispatch(create_Pkg_cms_Master(formdata, setCreatemodelopen));

  } catch (error) {
    console.log(error);
  }
};



 const pkgcmsData = useSelector((state)=>state.pkgcmsMasters?.pkgcmsMasters?.data);
 console.log(156,pkgcmsData);

 const pkgcmsTotalpages = useSelector((state)=>state.pkgcmsMasters.pkgcmsMasters?.
 totalPages
 );
 console.log(156,pkgcmsData);

 const pkgcmsCurrentpage = useSelector((state)=>state.pkgcmsMasters.pkgcmsMasters?.page
 );
 console.log(156,pkgcmsData);

 const pkgcmsTotalrecords = useSelector((state)=>state.pkgcmsMasters.pkgcmsMasters?.total
 );
 console.log(156,pkgcmsData);

    // if (pkgcmsData.length>0) {
    //   setPlusbutton(true)
    // }









  useEffect(() => {
   
      dispatch(getPkg_cms_Masters(searchTerm,page,perPage,searchStatus));

       
    
  }, [dispatch,searchTerm,page,perPage,searchStatus]);





  useEffect(() => {
    setPage(1);
  }, [searchTerm, searchStatus, dateRange.startDate,
    dateRange.endDate]);



 

const handleDelete =(pkgid)=>{

dispatch(deletePkgMaster(pkgid))




}


const handelEditcom =(pkg)=>{

  setPkg_id(pkg.pkg_id),
  setService_id(pkg.service_id)
  setFromVal(pkg.fromval),
  setToVal(pkg.toval
    ),
  setAmount(pkg.amount),
  setMch(pkg.mch),
  setPkgType(pkg.type),
  setCurrentcomid(pkg.id)


 

}

const handelUpdate =()=>{

  try {
    const updatedFormdata = {
     

      pkg_id: pkgid,
        service_id: serviceid,
        fromval: fromVal,
        toval: toVal,
        amount: amount,
        mch: mch,
        type: pkgType
    };
    dispatch(update_Pkg_cms_Master(currentcomid,updatedFormdata))
  } catch (error) {
    console.log(error);
  } finally{
    setPkg_id("");
    setService_id("");
    setFromVal("");
    setToVal("");
    setAmount("");
    setMch("");
    setPkgType("");

    
    setCurrentcomid("");

   
    setCreatemodelopen(false);

    
    setIseditingcom(false);
  }

  
  
}

   

const handelcomDelete =(com)=>{

  dispatch(delete_Pkg_cms_Master(com.id))

}



const handleDownload = async () => {
  try {
    setIsDownloading(true)

    await dispatch(
      
      getPkg_cms_Masters(searchTerm,page,perPage,searchStatus, true)
    );
    
    
    setIsDownloading(false)

  } catch (error) {
    console.log("Download error:", error);

  };
}




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
              {/* <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
                Transaction list
              </h2> */}

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
{Array.isArray(pkgcmsData)&&pkgcmsData.length===0&&<button onClick={()=>{setCreatemodelopen(true)}} className=" rounded-[5px] text-[13px] p-1 w-[120px] text-white bg-amber-500">Create Commercial</button>}
                {/* 📋 Status Dropdown */}
                <select onChange={(e) => { setSearchStatus(e.target.value) }}
                  value={searchStatus}
                  className="border border-gray-200 rounded-[5px] px-4 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-400 outline-none transition-all duration-300 ease-in-out shadow-sm cursor-pointer"
                  defaultValue=""
                >
                  <option selected value="">ALL</option>
                  <option value="FLAT">FLAT</option>

                  <option value="PERCENTAGE">PERCENTAGE</option>
                  
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



            <div className={`overflow-x-auto bg-white rounded-lg shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              
            {createmodelopen && (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="bg-white w-[420px] rounded-lg shadow-xl border border-gray-200 animate-fadeIn">

      {/* HEADER */}
      <div className="px-5 py-3 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{iseditingcom?"Edit Commercial":"Create Commercial"}</h2>
        <button 
          onClick={() =>{ setCreatemodelopen(false), setIseditingcom(false)}}
          className="text-gray-500 hover:text-red-500 text-lg font-bold"
        >
          ✕
        </button>
      </div>

      {/* if (step !== 3) return: */}

      {/* BODY */}
      <form
        onSubmit={(e) => { 

          if (step!==3) return
{
          iseditingcom?handelUpdate(e)
          
         
         :
          handelcommercialCreate(e)}
        }}
        className="px-5 py-4 space-y-4"
      >

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mb-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`w-3 h-3 rounded-full ${
                step === n ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* ---------------- STEP 1 ---------------- */}
        {step === 1 && (
          <div className="flex flex-col gap-3">

            {/* pkg_id */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Package ID
              </label>
              <input
                type="text"
                value={pkg_id}
                // onChange={(e) => setPkgId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
                readOnly
              />
            </div>

            {/* service_id */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Service ID
              </label>
              <input
                type="text"
                value={service_id}
                // onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required 
                readOnly
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (!pkgid || !serviceid) {
                  alert("All fields must be filled");
                  return;
                }
                nextStep();
              }}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        )}

        {/* ---------------- STEP 2 ---------------- */}
        {step === 2 && (
          <div className="flex flex-col gap-3">

            {/* fromVal */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                From Value
              </label>
              <input
                type="number"
                value={fromVal}
                onChange={(e) => setFromVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            {/* toVal */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                To Value
              </label>
              <input
                type="number"
                value={toVal}
                onChange={(e) => setToVal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            {/* amount */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            <div className="flex justify-between mt-3">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!fromVal || !toVal || !amount) {
                    alert("Please fill all fields");
                    return;
                  }
                  nextStep();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP 3 ---------------- */}
        {step === 3 && (
          <div className="flex flex-col gap-3">

            {/* mch */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                MCH
              </label>
              <input
                type="text"
                value={mch}
                onChange={(e) => setMch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>

            {/* type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Type
              </label>
              <select  value={pkgType}   onChange={(e) => setPkgType(e.target.value)}  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required name="type" id="">

                  <option value="Select Type">Select Type</option>
                  <option value="FLAT">FLAT</option>
                  <option value="PERCENTAGE">PERCENTAGE</option>
                
               

              </select>
           
            </div>

            <div className="flex justify-between mt-3">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Back
              </button>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  </div>
)}




            <table className="w-full text-sm text-left text-gray-600 border border-gray-200 overflow-hidden">
        <thead className="text-[11px] text-gray-500 uppercase bg-[#f9f9f9] border-b border-gray-300">
        <tr>
  <th className="py-2 px-3 text-left">Package Info</th>
 
 
  <th className="py-2 px-3 text-left">Service ID</th>
  <th className="py-2 px-3 text-left">Service Name</th>
  <th className="py-2 px-3 text-left">From Value</th>
  <th className="py-2 px-3 text-left">To Value</th>
  <th className="py-2 px-3 text-left">Amount</th>
  <th className="py-2 px-3 text-left">MCH</th>
  <th className="py-2 px-3 text-left">Type</th>
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
          {Array.isArray(pkgcmsData) && pkgcmsData.length > 0 ? (
            pkgcmsData.map((pkg, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 transition-colors text-[13px] border-b border-gray-100"
              >
                <td className="px-4 py-3">
                    <div className="space-y-[2px]">
                      <p className="text-[12px] text-gray-700">
                        PKG ID: <span className="font-medium">{pkg.pkg_id}</span>
                      </p>
                      <p className="text-[12px] text-gray-700">
                        PKG Name: <span className="font-medium">{pkg.pkg_name}</span>
                      </p>
                    </div>
                  </td>

                <td className="px-4 py-3 text-gray-800">{pkg.service_id}</td>
                <td className="px-4 py-3 text-gray-800">{pkg.service_name}</td>
               
                <td className="px-4 py-3 text-gray-800">{pkg.fromval}</td>
                <td className="px-4 py-3 text-gray-800">{pkg.toval}</td>
                <td className="px-4 py-3 text-gray-800">{pkg.amount}</td>
                <td className="px-4 py-3 text-gray-800">{pkg.mch}</td>
                <td className="px-4 py-3 text-gray-800">{pkg.type}</td>
        
                {/* Actions (keep your buttons) */}
                <td className="px-4 py-3 flex gap-2 items-center">

                  {
                        
                        
                i===pkgcmsData.length - 1 && <button
                      onClick={()=>{setCreatemodelopen(true)}}
                    className="bg-orange-500 hover:bg-amber-600 text-white text-[12px] font-medium px-3 py-[5px] rounded-md transition-all shadow-sm flex items-center gap-1"
                  >
                    <FaEdit size={12} />
                    +
                  </button>}

                 
        
                  <button
                    onClick={() => {setIseditingcom(true),setCreatemodelopen(true),handelEditcom(pkg)}}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-[12px] font-medium px-3 py-[5px] rounded-md transition-all shadow-sm flex items-center gap-1"
                  >
                    <FaEdit size={12} />
                    Edit
                  </button>
        
                  <button
                    onClick={() => handelcomDelete(pkg)}
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
              <td colSpan="10" className="py-10">
                <div className="flex justify-center items-center w-full">
                  <div>No Package Data Found</div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
        
        )}

      </table>
      
      
      {pkgcmsTotalpages > 0 ? (
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
    {(page - 1) * perPage + 1}-{Math.min(page * perPage, pkgcmsTotalrecords)} of {pkgcmsTotalrecords}
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
    .filter((num) => num > 1 && num < pkgcmsTotalpages)
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
  {page < pkgcmsTotalpages - 2 && <span className="px-2">...</span>}

  {/* Last Page */}
  {pkgcmsTotalpages > 1 && (
    <button
      onClick={() => setPage(pkgcmsTotalpages)}
      className={`px-3 py-1 rounded-md ${
        page === pkgcmsTotalpages
          ? theme === "dark"
            ? "bg-gray-700 font-semibold"
            : "bg-gray-200 font-semibold"
          : theme === "dark"
          ? "hover:bg-gray-800"
          : "hover:bg-gray-100"
      }`}
    >
      {pkgcmsTotalpages}
    </button>
  )}

  {/* Next Button */}
  <button
    onClick={() => setPage(page + 1)}
    disabled={page === pkgcmsTotalpages}
    className={`px-3 py-1 rounded-md ${
      page === pkgcmsTotalpages
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