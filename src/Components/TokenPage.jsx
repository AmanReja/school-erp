import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTokenValidity } from "../redux/action";
import { Theme } from "../Contexts/Theme";
import { 
  ChevronLeft, ChevronRight, 
  Search, RefreshCw, ArrowLeft, 
  Key, ShieldCheck, Clock, AlertCircle, Globe 
} from "lucide-react";
import Contentloader from "../Components/Contentloader";

const TokenPage = () => {
  const { theme } = useContext(Theme);
  const { corpid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local States
  const [load, setLoad] = useState(false);
  const [searchtr, setSearchtr] = useState("");
  const [fstatus, setfstatus] = useState("All");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Redux Selectors - Updated path
  const tokenState = useSelector((state) => state.entityIps?.token);
  
  const tokenList = tokenState?.data || [];
  const pagination = tokenState?.pagination || { totalPages: 1, totalRecords: 0, pageSize: 10 };

  useEffect(() => {
    fetchData();
  }, [dispatch, corpid, page, perPage, searchtr, fstatus]);

  const fetchData = async () => {
    setLoad(true);
    await dispatch(getTokenValidity(corpid, page, perPage, searchtr, fstatus));
    setLoad(false);
  };

  // Status Badge Component - Updated for "Active" and "Inactive"
  const StatusBadge = ({ status }) => {
    const s = status?.toLowerCase();
    const config = {
      active: { bg: "bg-emerald-500", text: "text-white", icon: <ShieldCheck size={12} /> },
      inactive: { bg: "bg-rose-500", text: "text-white", icon: <AlertCircle size={12} /> },
      pending: { bg: "bg-amber-500", text: "text-white", icon: <Clock size={12} /> },
    };

    const current = config[s] || config.pending;

    return (
      <span className={`${current.bg} ${current.text} flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider w-fit`}>
        {current.icon}
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
      theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
    }`}>
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col gap-[20px] mt-[20px] px-[2px] sm:px-[20px]">
          
          {/* Header Card */}
          <div className={`flex w-full items-center justify-between rounded-xl p-6 shadow-sm border ${
            theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
          }`}>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className={`p-2 rounded-lg border transition ${
                theme === "dark" ? "border-gray-700 hover:bg-gray-800 text-gray-400" : "border-gray-200 hover:bg-gray-50 text-gray-600"
              }`}>
                <ArrowLeft size={20} />
              </button>
              <div className="flex flex-col gap-1">
                <h1 className={`text-2xl font-bold tracking-tight ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
                  Token Logs
                </h1>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  History for Corp ID: <span className="text-blue-600 font-bold uppercase">{corpid}</span>
                </p>
              </div>
            </div>

            <button onClick={fetchData} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg active:scale-95">
              <RefreshCw size={16} className={load ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          {/* Table Container */}
          <div className={`w-full rounded-xl overflow-hidden border ${
            theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
          }`}>
            
            {/* Filter Bar */}
            <div className={`flex justify-between items-center p-5 flex-wrap gap-4 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Key size={18} className="text-blue-600"/> Generation History
              </h2>
              
              <div className="flex gap-3 items-center flex-wrap">
                <div className={`relative flex items-center border rounded-xl px-3 py-1.5 ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-700"
                }`}>
                  <Search size={16} className="text-gray-400 mr-2" />
                  <input
                    onChange={(e) => setSearchtr(e.target.value)}
                    type="text" placeholder="Search IP Address..."
                    className="outline-none text-sm bg-transparent w-[200px]"
                  />
                </div>

                <div className={`flex items-center border rounded-xl px-3 py-1.5 ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-700"
                }`}>
                  <select
                    onChange={(e) => setfstatus(e.target.value)}
                    className="text-sm bg-transparent outline-none cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left">
              <thead className={`text-[11px] uppercase border-b ${
                theme === "dark" ? "bg-gray-700 text-gray-300 border-gray-600" : "bg-[#fcfcfc] text-gray-400 border-gray-300"
              }`}>
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">IP Address</th>
                  <th className="px-6 py-4">Generation Date</th>
                  <th className="px-6 py-4">Metadata</th>
                 
                </tr>
              </thead>
              <tbody className={`text-[12px] font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                {load ? (
                  Array.from({ length: 5 }).map((_, i) => <Contentloader key={i} />)
                ) : tokenList.length > 0 ? (
                  tokenList.map((token, i) => (
                    <tr key={i} className={`border-b transition ${
                      theme === "dark" ? "border-gray-700 hover:bg-gray-700/60" : "border-gray-100 hover:bg-gray-50"
                    }`}>
                      <td className="px-6 py-4">
                        <StatusBadge status={token.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Globe size={14} className="text-gray-400" />
                          <span className="font-mono text-blue-600">{token.ip_address}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(token.token_gen_date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td className="px-6 py-4 italic text-gray-400">
                        {token.free_text1 || "---"}
                      </td>
                      {/* <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:underline transition font-bold">
                          Logs
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-gray-400 italic">
                      No token logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination - Updated to match backend "pageSize" key */}
            {pagination.totalPages > 0 && (
              <div className={`flex items-center justify-between px-6 py-4 border-t text-sm ${
                theme === "dark" ? "bg-gray-900 text-gray-300 border-gray-700" : "bg-white text-gray-600 border-gray-200"
              }`}>
                <div>
                  Rows: 
                  <select className="ml-2 bg-transparent border rounded p-1 outline-none" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="font-medium">
                    {(page - 1) * perPage + 1}-{Math.min(page * perPage, pagination.totalRecords)} of {pagination.totalRecords}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-1 disabled:opacity-20 hover:text-blue-600 transition">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={page === pagination.totalPages} className="p-1 disabled:opacity-20 hover:text-blue-600 transition">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TokenPage;