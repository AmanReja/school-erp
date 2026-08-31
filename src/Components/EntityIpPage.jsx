import React, { useEffect, useState, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEntityIpDetails, updateEntityIp } from "../redux/action";
import "../App.css";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Globe, Clock, RefreshCw, ArrowLeft,Braces } from "lucide-react";
import { Theme } from "../Contexts/Theme";
import { useParams, useNavigate } from "react-router-dom";

const EntityIpPage = () => {
  const { theme } = useContext(Theme);
  const { corpid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const formatToDateTimeLocal = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
  return localISOTime;
};

  // Local States
  const [load, setLoad] = useState(false);
  const [searchtr, setSearchtr] = useState("");
  const [fstatus, setfstatus] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  // Modal States for Update
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentIpId, setCurrentIpId] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("Active");
  const [ip_address, setIp_address] = useState("");
  const [effective_from, setEffective_from] = useState("");


  // const [updatedRemarks, setUpdatedRemarks] = useState(""); // Kept for layout consistency

  // Redux Selectors (Mapping to your specific backend response)
  const entityIpsState = useSelector((state) => state.entityIps.entityIps);
  const ipList = entityIpsState?.data || [];
  const counts = entityIpsState?.counts || { active: 0, inactive: 0, total: 4 };
  const totalPage = entityIpsState?.pagination?.totalPages || 1;
  const totalData = entityIpsState?.pagination?.totalRecords || 0;

  // Fetch Data
  const fetchData = async () => {
    setLoad(true);
    await dispatch(getEntityIpDetails(corpid, page, perPage, searchtr, fstatus));
    setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, corpid, page, perPage, searchtr, fstatus]);

  // Open Update Modal
  const handleEditClick = (ip) => {
    setIsUpdating(true);
    setCurrentIpId(ip.id);
    // setUpdatedStatus(ip.status);
    setIp_address(ip.ip_address);
   

    // setUpdatedRemarks(""); // Reset remarks
  };

  // Submit Update
  const updateForm = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ip_address:ip_address,
        status:updatedStatus, 
        effective_from:effective_from

        // remark: updatedRemarks, // backend might not use this, but kept for UI
      };
      await dispatch(updateEntityIp(corpid, currentIpId, payload));
      fetchData(); // Refresh list
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
      theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
    }`}>
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col gap-[20px] mt-[20px] px-[2px] sm:px-[20px]">
          
          {/* Header Section */}
          <div className={`flex w-full items-center justify-between rounded-xl p-6 shadow-sm ${
            theme === "dark" ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
          }`}>
            <div className="flex items-center gap-4">
               <button onClick={() => navigate(-1)} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"><ArrowLeft size={18}/></button>
               <div className="flex flex-col gap-1">
                <h1 className={`text-2xl font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>IP Management</h1>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Managing allowed IP addresses for Corporation: <span className="text-blue-600 font-bold">{corpid.toUpperCase()}</span></p>
              </div>
            </div>

            <div className="flex gap-[10px]">
               <button onClick={()=>{
                navigate(`/dashboard/token/${corpid}`)
               }} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              <Braces  size={16} className={load ? "animate-spin" : ""} /> Check Token Validity
            </button>
            <button onClick={fetchData} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <RefreshCw size={16} className={load ? "animate-spin" : ""} /> Refresh
            </button>
            </div>
            
           
          </div>

          {/* Stats Cards */}
          <div className="flex flex-col sm:flex-row gap-5 rounded-xl">
            {[
              { label: "Total IPs", value: counts.total, color: "text-blue-500" },
              { label: "Active", value: counts.active, color: "text-emerald-500" },
              { label: "Inactive", value: counts.inactive, color: "text-red-500" }
            ].map((item, index) => (
              <div key={index} className={`flex-1 flex flex-col items-center justify-center text-center rounded-lg p-4 shadow-sm ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white border border-gray-200"
              }`}>
                <h1 className={`text-2xl font-bold ${item.color}`}>{item.value}</h1>
                <p className={`text-xs mt-1 uppercase tracking-wider ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{item.label}</p>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className={`w-full rounded-xl overflow-hidden border ${
            theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
          }`}>
            
            {/* Filter Bar */}
            <div className={`flex justify-between items-center p-4 py-6 flex-wrap gap-4 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}>
              <h2 className="text-lg font-semibold">IP Whitelist</h2>
              <div className="flex gap-3 items-center">
                {/* Search */}
                <div className={`relative border px-2 py-1 rounded-lg ${theme === "dark" ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}>
                  <input
                    onChange={(e) => setSearchtr(e.target.value)}
                    type="text" placeholder="Search IP..."
                    className="pl-2 pr-2 outline-none text-sm bg-transparent"
                  />
                </div>
                {/* Status Filter */}
                <select onChange={(e) => setfstatus(e.target.value)} className={`text-sm bg-transparent border rounded-lg px-3 py-1 outline-none ${
                  theme === "dark" ? "bg-gray-800 border-gray-600" : "border-gray-300"
                }`}>
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left">
              <thead className={`text-[11px] uppercase border-b ${
                theme === "dark" ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-[#fcfcfc] text-gray-400 border-gray-300"
              }`}>
                <tr>
                  <th className="px-6 py-4">IP Address</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Effective from</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`text-[12px] font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                {load ? (
                   <tr><td colSpan={4} className="text-center py-10">Loading records...</td></tr>
                ) : ipList.length > 0 ? (
                  ipList.map((ip) => (
                    <tr key={ip.id} className={`border-b ${theme === "dark" ? "border-gray-700 hover:bg-gray-700/60" : "border-gray-100 hover:bg-gray-50"}`}>
                      <td className="px-6 py-4 font-mono text-blue-600">{ip.ip_address}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white ${
                          ip.status.toLowerCase() === "active" ? "bg-green-500" : ip.status.toLowerCase() === "inactive" ? "bg-red-500" : "bg-yellow-500"
                        }`}>
                          {ip.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(ip.effective_from).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleEditClick(ip)} className="text-white bg-blue-500 p-2 rounded-[5px] hover:underline">Edit Status</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={4} className="text-center py-10 text-gray-500">No IP records found</td></tr>
                )}
              </tbody>
            </table>

            {/* Pagination Footer */}
            {totalPage > 0 && (
              <div className={`flex items-center justify-between px-4 py-3 border-t text-sm ${
                theme === "dark" ? "bg-gray-900 text-gray-300 border-gray-700" : "bg-white text-gray-600 border-gray-200"
              }`}>
                <div>
                  Show <select className="mx-2 border rounded p-1 bg-transparent" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select> per page
                </div>
                <div className="flex items-center space-x-2">
                  <p>{(page - 1) * perPage + 1}-{Math.min(page * perPage, totalData)} of {totalData}</p>
                  <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-1 disabled:opacity-30"><ChevronLeft/></button>
                  <span className="font-bold">{page}</span>
                  <button onClick={() => setPage(page + 1)} disabled={page === totalPage} className="p-1 disabled:opacity-30"><ChevronRight/></button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Update Status Modal (Matching your UI style) */}
{isUpdating && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <form 
      onSubmit={updateForm} 
      className={`w-[400px] rounded-xl shadow-2xl p-6 flex flex-col gap-5 animate-pop ${
        theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          IP Configuration
        </h2>
        <button 
          type="button" 
          onClick={() => setIsUpdating(false)} 
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      {/* Status Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
          Set New Status
        </label>
        <select 
          value={updatedStatus} 
          onChange={(e) => setUpdatedStatus(e.target.value)} 
          className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-300"
          }`}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          {/* <option value="Deleted">Deleted</option>
          <option value="Pending">Pending</option> */}
        </select>
      </div>

      {/* Effective From - Admin Chooses Here */}
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
          Effective From Date & Time
        </label>
        <input 
          type="datetime-local" 
          value={effective_from}
          onChange={(e) => setEffective_from(e.target.value)}
          className={`w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-300"
          }`}
          
        />
        <p className="text-[10px] text-gray-500 italic mt-1">
          * Choose the exact date and time this status becomes active.
        </p>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition active:scale-95"
      >
        Save Changes
      </button>
    </form>
  </div>
)}
    </div>
  );
};

export default EntityIpPage;