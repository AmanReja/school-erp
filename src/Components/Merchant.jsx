import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { useDispatch, useSelector } from "react-redux";
import {
  createMerchant, getDetails, updateMerchant, deleteMerchant,
  getmarchentent_by_companyid, delete_entity, getmarchentent_by_companyid_deleted
} from "../redux/action";
import {
  X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Search, Plus, Users, BadgeCheck, Pencil, Trash2, Info,
  Landmark, Wallet, FileText, ReceiptText, ArrowUpRight
} from "lucide-react";

// ─── Sub-components defined OUTSIDE to prevent remount on re-render ───────────

const KycBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const map = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending:   "bg-amber-50  text-amber-700  border-amber-200",
    rejected:  "bg-red-50    text-red-600    border-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${map[s] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s === "completed" ? "bg-emerald-500" : s === "pending" ? "bg-amber-400" : "bg-red-500"}`} />
      {status || "—"}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const map = {
    active:   "bg-emerald-50 text-emerald-700 border-emerald-200",
    inactive: "bg-amber-50  text-amber-700  border-amber-200",
    deleted:  "bg-red-50    text-red-600    border-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${map[s] || "bg-gray-50 text-gray-500 border-gray-200"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s === "active" ? "bg-emerald-500" : s === "deleted" ? "bg-red-500" : "bg-amber-400"}`} />
      {status || "—"}
    </span>
  );
};

const FormField = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const inputCls = (dark) =>
  `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all
  ${dark
    ? "bg-gray-700 border-gray-600 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
    : "bg-gray-50 border-gray-200 text-gray-800 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"}`;

// ─────────────────────────────────────────────────────────────────────────────

const Merchant = () => {
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [load, setLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [openInfo, setOpenInfo] = useState(false);
  const [corpidforinfo, setCorpidforinfo] = useState("");
  const [corpidforfund, setCorpidforfund] = useState("");
  const [isdeletedentopen, setIsdeletedentopen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: "", wallet_id: "", userid: "", user_pass: "",
    address: "", pan: "", email: "", mobile_number: "", gst: "", kyc_status: ""
  });

  // ── Selectors ──
  const merchantsResponse = useSelector((state) => state.merchants?.merchants || {});
  const merchantsData     = merchantsResponse.data        || [];
  const totalRecords      = merchantsResponse.total       || 0;
  const totalPages        = merchantsResponse.totalPages  || 1;
  const startIndex        = (currentPage - 1) * itemsPerPage;
  const endIndex          = startIndex + itemsPerPage;

  const entdata = useSelector((state) => state.entity.entity?.data);

  // ── Page numbers ──
  const getPageNumbers = () => {
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end   = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  // ── Effects ──
  useEffect(() => {
    async function fetch() {
      setLoad(true);
      await dispatch(getDetails(currentPage, itemsPerPage, searchTerm));
      setLoad(false);
    }
    fetch();
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  useEffect(() => {
    if (!corpidforinfo) return;
    isdeletedentopen
      ? dispatch(getmarchentent_by_companyid_deleted(corpidforinfo))
      : dispatch(getmarchentent_by_companyid(corpidforinfo));
  }, [corpidforinfo, isdeletedentopen, dispatch]);

  // ── Handlers ──
  const handelInfo = (merchant) => {
    setOpenInfo(true);
    setCorpidforinfo(merchant.corp_id);
    setCorpidforfund(merchant.corp_id);
  };

  const handleEdit = (merchant) => {
    setSelectedMerchant(merchant);
    setUpdateFormData({
      name: merchant.name || "", wallet_id: merchant.wallet_id || "",
      userid: merchant.userid || "", user_pass: merchant.user_pass || "",
      address: merchant.address || "", pan: merchant.pan || "",
      email: merchant.email || "", mobile_number: merchant.mobile_number || "",
      gst: merchant.gst || "", kyc_status: merchant.kyc_status || ""
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async () => {
    if (selectedMerchant) {
      await dispatch(updateMerchant(selectedMerchant.corp_id, updateFormData));
      dispatch(getDetails());
      setIsUpdateModalOpen(false);
      setSelectedMerchant(null);
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (merchant) => {
    if (window.confirm("Are you sure you want to delete this merchant?")) {
      await dispatch(deleteMerchant(merchant.corp_id));
    }
  };

  const handelEntdelete = (ent) => dispatch(delete_entity(ent.corp_id, ent.status));

  return (
    <div className={`w-full min-h-full flex flex-col ${isDark ? "bg-gray-950 text-gray-200" : "bg-slate-50 text-gray-800"}`}>

      {/* ── Entity Info Modal ── */}
      {openInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(10,15,30,0.55)", backdropFilter: "blur(3px)" }}>
          <div className={`w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>

            {/* Header */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"}`}>
              <div>
                <h2 className="text-sm font-bold text-gray-800 dark:text-white">
                  {isdeletedentopen ? "Deleted Entities" : "Entity Information"}
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Corp ID: {corpidforinfo}</p>
              </div>
              <button onClick={() => setOpenInfo(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all">
                <X size={14} />
              </button>
            </div>

            {/* Action bar */}
            <div className={`flex flex-wrap items-center gap-2 px-6 py-3 border-b ${isDark ? "border-gray-700 bg-gray-800/60" : "border-gray-100 bg-gray-50/60"}`}>
              <button onClick={() => navigate(`/dashboard/dispute/${corpidforfund}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all">
                <ReceiptText size={11} /> Disputes
              </button>
              <button onClick={() => navigate(`/dashboard/fundbycorp/${corpidforfund}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-lg transition-all">
                <Wallet size={11} /> Manual Funds
              </button>
              <button onClick={() => navigate(`/dashboard/Virfundbycorpid/${corpidforfund}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg transition-all">
                <Landmark size={11} /> Virtual Funds
              </button>
              <div className="ml-auto">
                {!isdeletedentopen ? (
                  <button onClick={() => setIsdeletedentopen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all">
                    <Trash2 size={11} /> Show Deleted
                  </button>
                ) : (
                  <button onClick={() => setIsdeletedentopen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg transition-all">
                    <X size={11} /> Show Active
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto max-h-[360px]">
              <table className="w-full text-sm">
                <thead className={`sticky top-0 text-[10px] uppercase tracking-widest font-semibold ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-400"} border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                  <tr>
                    {["Corp ID", "Status", "Callback URL", "Callback Event", "Created On"].map(h => (
                      <th key={h} className="px-5 py-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                  {Array.isArray(entdata) && entdata.length > 0 ? entdata.map((row, idx) => (
                    <tr key={idx} className={`transition-colors ${isDark ? "hover:bg-gray-800/60" : "hover:bg-slate-50"}`}>
                      <td className={`px-5 py-3 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>{row?.corp_id}</td>
                      <td className="px-5 py-3"><StatusBadge status={row?.status} /></td>
                      <td className={`px-5 py-3 text-xs break-all max-w-[160px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>{row?.callback_url}</td>
                      <td className={`px-5 py-3 text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>{row?.callback_event_name}</td>
                      <td className={`px-5 py-3 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{row?.create_on}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="py-12 text-center text-sm text-gray-400">No data found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Update Merchant Modal ── */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10,15,30,0.55)", backdropFilter: "blur(3px)" }}>
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}>

            <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"}`}>
              <div>
                <h2 className="text-sm font-bold text-gray-800 dark:text-white">Update Merchant</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">{selectedMerchant?.name}</p>
              </div>
              <button onClick={() => setIsUpdateModalOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-all">
                <X size={14} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Name",          name: "name",          type: "text" },
                { label: "Wallet ID",     name: "wallet_id",     type: "text" },
                { label: "Email",         name: "email",         type: "email" },
                { label: "Mobile Number", name: "mobile_number", type: "tel" },
                { label: "PAN",           name: "pan",           type: "text" },
                { label: "GST",           name: "gst",           type: "text" },
              ].map(({ label, name, type }) => (
                <FormField key={name} label={label}>
                  <input type={type} name={name} value={updateFormData[name]}
                    onChange={handleUpdateInputChange} className={inputCls(isDark)} />
                </FormField>
              ))}

              <div className="md:col-span-2">
                <FormField label="Address">
                  <textarea name="address" value={updateFormData.address}
                    onChange={handleUpdateInputChange} rows={3} className={inputCls(isDark)} />
                </FormField>
              </div>

              <div className="md:col-span-2">
                <FormField label="KYC Status">
                  <select name="kyc_status" value={updateFormData.kyc_status}
                    onChange={handleUpdateInputChange} className={inputCls(isDark)}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </FormField>
              </div>
            </div>

            <div className={`flex justify-end gap-3 px-6 py-4 border-t ${isDark ? "border-gray-700 bg-gray-800/60" : "border-gray-100 bg-gray-50"}`}>
              <button onClick={() => setIsUpdateModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">
                Cancel
              </button>
              <button onClick={handleUpdate}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all">
                Update Merchant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col p-6 gap-5">

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <Users size={18} className="text-violet-600" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Merchant List</h1>
              <p className="text-[11px] text-gray-400">Manage all registered merchants</p>
            </div>
          </div>
          <button onClick={() => navigate("/dashboard/createmerchants")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 active:scale-95 rounded-lg shadow-sm transition-all">
            <Plus size={13} /> Create Merchant
          </button>
        </div>

        {/* Table Card */}
        <div className={`flex-1 flex flex-col rounded-2xl border overflow-hidden shadow-sm ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>

          {/* Toolbar */}
          <div className={`flex items-center gap-3 px-5 py-3.5 border-b ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-gray-50/80"}`}>
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search merchants…"
                className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none transition-all
                  ${isDark
                    ? "bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-violet-500"
                    : "bg-white border-gray-200 text-gray-700 placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"}`} />
            </div>
            <div className="ml-auto text-xs text-gray-400">{totalRecords} merchants total</div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr className={`text-[10px] uppercase tracking-widest font-semibold border-b
                  ${isDark ? "bg-gray-800/60 text-gray-400 border-gray-800" : "bg-gray-50 text-gray-400 border-gray-100"}`}>
                  {["Name", "Corp ID", "Wallet ID", "Email", "Mobile", "KYC Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>

              {load ? (
                <tbody>
                  <tr><td colSpan={7} className="py-16 text-center">
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </td></tr>
                </tbody>
              ) : (
                <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                  {merchantsData.length > 0 ? merchantsData.map((merchant, i) => (
                    <tr key={i} className={`transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-slate-50/80"}`}>
                      <td className={`px-5 py-3.5 font-medium text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>{merchant.name}</td>
                      <td className={`px-5 py-3.5 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>{merchant.corp_id}</td>
                      <td className={`px-5 py-3.5 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>{merchant.wallet_id}</td>
                      <td className={`px-5 py-3.5 text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>{merchant.email}</td>
                      <td className={`px-5 py-3.5 text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>{merchant.mobile_number}</td>
                      <td className="px-5 py-3.5"><KycBadge status={merchant.kyc_status} /></td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button onClick={() => navigate(`/dashboard/getcommercial/${merchant.corp_id}`)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-all">
                            <FileText size={10} /> Commercial
                          </button>
                          <button onClick={() => { navigate(`/dashboard/transactionmaster/${merchant.corp_id}`); localStorage.setItem("corpid", merchant.corp_id); }}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-all">
                            <ArrowUpRight size={10} /> Txns
                          </button>
                          <button onClick={() => handelInfo(merchant)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all">
                            <Info size={10} /> Info
                          </button>
                          <button onClick={() => handleEdit(merchant)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all">
                            <Pencil size={10} /> Edit
                          </button>
                          <button onClick={() => handleDelete(merchant)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all">
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={7} className="py-16 text-center text-sm text-gray-400">No merchants found.</td></tr>
                  )}
                </tbody>
              )}
            </table>
          </div>

          {/* Pagination */}
          <div className={`flex flex-wrap items-center justify-between px-5 py-3 border-t text-xs gap-3
            ${isDark ? "border-gray-800 bg-gray-900 text-gray-400" : "border-gray-100 bg-gray-50/80 text-gray-500"}`}>
            <span>
              Showing {startIndex + 1}–{Math.min(endIndex, totalRecords)} of {totalRecords}
            </span>

            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                  ${currentPage === 1 ? "opacity-40 cursor-not-allowed border-gray-200" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                <ChevronsLeft size={13} />
              </button>
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
                className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                  ${currentPage === 1 ? "opacity-40 cursor-not-allowed border-gray-200" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                <ChevronLeft size={13} />
              </button>

              {getPageNumbers().map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium border transition-all
                    ${p === currentPage
                      ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                      : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                  {p}
                </button>
              ))}

              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
                className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                  ${currentPage === totalPages ? "opacity-40 cursor-not-allowed border-gray-200" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                <ChevronRight size={13} />
              </button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
                className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                  ${currentPage === totalPages ? "opacity-40 cursor-not-allowed border-gray-200" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                <ChevronsRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Merchant;