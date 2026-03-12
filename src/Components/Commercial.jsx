import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { X, ChevronLeft, ChevronRight, Search, Download, Plus, FileText, ChevronDown } from "lucide-react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import {
  update_Txn_data, getall_txn_data, getPkgMasters, createPkgMaster, deletePkgMaster,
  create_Pkg_cms_Master_packageid, update_Pkg_cms_Master, delete_Pkg_cms_Master,
  getPkg_cms_Masters_packageid
} from "../redux/action";

// ── Defined OUTSIDE to prevent remount issues ─────────────────────────────────

const TypeBadge = ({ type }) => {
  const isCharge = type?.toUpperCase() === "CHARGE";
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider
      ${isCharge
        ? "bg-orange-50 text-orange-700 border-orange-200"
        : "bg-blue-50 text-blue-700 border-blue-200"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isCharge ? "bg-orange-500" : "bg-blue-500"}`} />
      {type}
    </span>
  );
};

const MchBadge = ({ mch }) => {
  const isFlat = mch?.toUpperCase() === "FLAT";
  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider
      ${isFlat
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-violet-50 text-violet-700 border-violet-200"}`}>
      {mch}
    </span>
  );
};

const FormField = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all placeholder:text-gray-400";

const Spinner = ({ size = 5 }) => (
  <svg className={`w-${size} h-${size} animate-spin`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

const Commercial = () => {
  const { pkgid, serviceid } = useParams();
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [createmodelopen, setCreatemodelopen] = useState(false);
  const [typeopen, setTypeopen] = useState(false);

  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [amount, setAmount] = useState("");
  const [mch, setMch] = useState("");
  const [pkgType, setPkgType] = useState("");
  const [commerciallist, setCommerciallist] = useState([]);
  const [iseditingcom, setIseditingcom] = useState(false);
  const [currentcomid, setCurrentcomid] = useState("");
  const [service_id, setService_id] = useState(serviceid);
  const [pkg_id, setPkg_id] = useState(pkgid);

  const typeOptions = ["CHARGE", "COMMISSION"];

  // ── Selectors ──
  const pkgcmsData         = useSelector((s) => s.pkgcmsMasters?.pkgcmsMasters?.data);
  const pkgcmsTotalpages   = useSelector((s) => s.pkgcmsMasters.pkgcmsMasters?.totalPages);
  const pkgcmsTotalrecords = useSelector((s) => s.pkgcmsMasters.pkgcmsMasters?.total);

  // ── Effects ──
  useEffect(() => {
    dispatch(getPkg_cms_Masters_packageid(searchTerm, page, perPage, searchStatus, false, pkgid, serviceid));
  }, [dispatch, searchTerm, page, perPage, searchStatus]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, searchStatus]);

  // ── Handlers ──
  const handelcommercialCreate = () => {
    if (!fromVal || !toVal || !amount || !mch || !pkgType) {
      alert("Please fill all fields");
      return;
    }
    setCommerciallist((prev) => [...prev, {
      fromval: Number(fromVal), toval: Number(toVal),
      amount: Number(amount), mch, type: pkgType,
    }]);
    setFromVal(""); setToVal(""); setAmount(""); setMch(""); setPkgType("");
  };

  const resetCommercialForm = () => {
    setCommerciallist([]);
    setFromVal(""); setToVal(""); setAmount(""); setMch(""); setPkgType("");
    setCreatemodelopen(false);
  };

  const submitCommercials = () => {
    let finalRanges = [...commerciallist];
    if (fromVal && toVal && amount && mch && pkgType) {
      finalRanges.push({ fromval: Number(fromVal), toval: Number(toVal), amount: Number(amount), mch, type: pkgType });
    }
    dispatch(create_Pkg_cms_Master_packageid(finalRanges, pkgid, serviceid)).then(() => resetCommercialForm());
  };

  const handelEditcom = (pkg) => {
    setPkg_id(pkg.pkg_id);
    setService_id(pkg.service_id);
    setFromVal(pkg.fromval);
    setToVal(pkg.toval);
    setAmount(pkg.amount);
    setMch(pkg.mch);
    setPkgType(pkg.type);
    setCurrentcomid(pkg.id);
  };

  const handelUpdate = () => {
    try {
      dispatch(update_Pkg_cms_Master(currentcomid, {
        pkg_id: pkgid, service_id: serviceid,
        fromval: fromVal, toval: toVal, amount, mch, type: pkgType
      }, service_id, pkg_id));
    } catch (e) { console.log(e); }
    finally {
      setPkg_id(""); setService_id(""); setFromVal(""); setToVal("");
      setAmount(""); setMch(""); setPkgType(""); setCurrentcomid("");
      setCreatemodelopen(false); setIseditingcom(false);
    }
  };

  const handelcomDelete = (com) => dispatch(delete_Pkg_cms_Master(com.id, com.service_id, com.pkg_id));

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await dispatch(getPkg_cms_Masters_packageid(searchTerm, page, perPage, searchStatus, true, pkgid, serviceid));
    } catch (e) { console.log(e); }
    finally { setIsDownloading(false); }
  };

  const closeModal = () => {
    setCreatemodelopen(false);
    setIseditingcom(false);
    resetCommercialForm();
  };

  return (
    <div className={`w-full min-h-full flex flex-col ${isDark ? "bg-gray-950 text-gray-200" : "bg-slate-50 text-gray-800"}`}>

      {/* ── Create / Edit Modal ── */}
      {createmodelopen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10,15,30,0.5)", backdropFilter: "blur(3px)" }}>
          <div className="bg-white w-full max-w-[440px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-100">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-bold text-gray-800">
                  {iseditingcom ? "Edit Commercial" : "Create Commercial"}
                </h2>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  PKG: {pkgid} · Service: {serviceid}
                </p>
              </div>
              <button onClick={closeModal}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all">
                <X size={14} />
              </button>
            </div>

            {/* Saved rows preview */}
            {commerciallist.length > 0 && (
              <div className="px-6 pt-4">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Queued rows ({commerciallist.length})
                </p>
                <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
                  {commerciallist.map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5">
                      <span className="text-indigo-700 font-medium">{r.fromval} → {r.toval}</span>
                      <span className="text-gray-500">₹{r.amount} · {r.mch} · {r.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="From Value">
                  <input type="number" value={fromVal} onChange={(e) => setFromVal(e.target.value)}
                    placeholder="0" className={inputCls} />
                </FormField>
                <FormField label="To Value">
                  <input type="number" value={toVal} onChange={(e) => setToVal(e.target.value)}
                    placeholder="0" className={inputCls} />
                </FormField>
              </div>

              <FormField label="Amount">
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00" className={inputCls} />
              </FormField>

              {/* Type dropdown */}
              <FormField label="Type">
                <div className="relative">
                  <div onClick={() => setTypeopen(!typeopen)}
                    className={`${inputCls} flex items-center justify-between cursor-pointer`}>
                    <span className={pkgType ? "text-gray-800" : "text-gray-400"}>{pkgType || "Select Type"}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${typeopen ? "rotate-180" : ""}`} />
                  </div>
                  {typeopen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                      {typeOptions.map((item) => (
                        <div key={item} onClick={() => { setPkgType(item); setTypeopen(false); }}
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormField>

              <FormField label="MCH">
                <select value={mch} onChange={(e) => setMch(e.target.value)} className={inputCls}>
                  <option value="">Select MCH</option>
                  <option value="FLAT">FLAT</option>
                  <option value="PERCENTAGE">PERCENTAGE</option>
                </select>
              </FormField>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/60 rounded-b-2xl gap-2 flex-wrap">
              <button onClick={closeModal}
                className="px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition-all">
                Cancel
              </button>

              {iseditingcom ? (
                <button onClick={handelUpdate}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all">
                  Update Commercial
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handelcommercialCreate}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all">
                    + Save Row
                  </button>
                  <button onClick={submitCommercials}
                    className="px-4 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm transition-all">
                    {commerciallist.length > 1 ? "Submit Multiple" : "Submit"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col p-6 gap-5">

        {/* Page Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <FileText size={17} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">Commercial List</h1>
              <p className="text-[11px] text-gray-400">PKG: {pkgid} · Service: {serviceid}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {Array.isArray(pkgcmsData) && pkgcmsData.length === 0 && (
              <button onClick={() => setCreatemodelopen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 rounded-lg shadow-sm transition-all">
                <Plus size={13} /> Create Commercial
              </button>
            )}
            <button onClick={handleDownload} disabled={isDownloading}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-lg shadow-sm transition-all disabled:opacity-60">
              {isDownloading ? <><Spinner size={4} /> Downloading…</> : <><Download size={13} /> Export Excel</>}
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className={`flex-1 flex flex-col rounded-2xl border overflow-hidden shadow-sm
          ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>

          {/* Toolbar */}
          <div className={`flex flex-wrap items-center gap-3 px-5 py-3.5 border-b
            ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-gray-50/80"}`}>
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search commercials…"
                className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none transition-all
                  ${isDark
                    ? "bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-indigo-500"
                    : "bg-white border-gray-200 text-gray-700 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"}`} />
            </div>

            <div className="relative">
              <select onChange={(e) => setSearchStatus(e.target.value)} value={searchStatus}
                className={`appearance-none pl-3 pr-7 py-2 text-xs rounded-lg border outline-none cursor-pointer transition-all
                  ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700 focus:border-indigo-400"}`}>
                <option value="">All Types</option>
                <option value="COMMISSION">Commission</option>
                <option value="CHARGE">Charge</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="ml-auto text-xs text-gray-400">{pkgcmsTotalrecords ?? 0} records</div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr className={`text-[10px] uppercase tracking-widest font-semibold border-b
                  ${isDark ? "bg-gray-800/60 text-gray-400 border-gray-800" : "bg-gray-50 text-gray-400 border-gray-100"}`}>
                  {["Package", "Service", "From", "To", "Amount", "MCH", "Type", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>

              {load ? (
                <tbody>
                  <tr><td colSpan={8} className="py-16 text-center">
                    <div className="flex justify-center text-indigo-400"><Spinner size={6} /></div>
                  </td></tr>
                </tbody>
              ) : (
                <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                  {Array.isArray(pkgcmsData) && pkgcmsData.length > 0 ? pkgcmsData.map((pkg, i) => (
                    <tr key={i} className={`transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-slate-50/80"}`}>
                      <td className="px-5 py-3.5">
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-mono text-indigo-600 font-semibold">{pkg.pkg_id}</p>
                          <p className="text-[11px] text-gray-500">{pkg.pkg_name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-mono text-gray-500">{pkg.service_id}</p>
                          <p className="text-[11px] text-gray-400">{pkg.service_name}</p>
                        </div>
                      </td>
                      <td className={`px-5 py-3.5 text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>{pkg.fromval}</td>
                      <td className={`px-5 py-3.5 text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>{pkg.toval}</td>
                      <td className={`px-5 py-3.5 text-sm font-semibold ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
                        {pkg.amount}
                      </td>
                      <td className="px-5 py-3.5"><MchBadge mch={pkg.mch} /></td>
                      <td className="px-5 py-3.5"><TypeBadge type={pkg.type} /></td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {i === pkgcmsData.length - 1 && (
                            <button onClick={() => setCreatemodelopen(true)}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-all">
                              <Plus size={10} /> Add
                            </button>
                          )}
                          <button onClick={() => { setIseditingcom(true); setCreatemodelopen(true); handelEditcom(pkg); }}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all">
                            <FaEdit size={10} /> Edit
                          </button>
                          <button onClick={() => handelcomDelete(pkg)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-all">
                            <FaTrashAlt size={10} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={8} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                          <FileText size={20} className="text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400">No commercial data found</p>
                        <button onClick={() => setCreatemodelopen(true)}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-all">
                          <Plus size={12} /> Create Commercial
                        </button>
                      </div>
                    </td></tr>
                  )}
                </tbody>
              )}
            </table>
          </div>

          {/* Pagination */}
          {pkgcmsTotalpages > 0 && (
            <div className={`flex items-center justify-between px-5 py-3 border-t text-xs flex-wrap gap-3
              ${isDark ? "border-gray-800 bg-gray-900 text-gray-400" : "border-gray-100 bg-gray-50/80 text-gray-500"}`}>
              <div className="flex items-center gap-2">
                <span>Rows:</span>
                <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                  className={`rounded-md border px-2 py-1 text-xs outline-none
                    ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-gray-400 mr-2">
                  {(page - 1) * perPage + 1}–{Math.min(page * perPage, pkgcmsTotalrecords)} of {pkgcmsTotalrecords}
                </span>

                <button onClick={() => setPage(page - 1)} disabled={page === 1}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                    ${page === 1 ? "opacity-40 cursor-not-allowed border-gray-200" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                  <ChevronLeft size={13} />
                </button>

                {/* First */}
                <button onClick={() => setPage(1)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium border transition-all
                    ${page === 1 ? "bg-indigo-600 text-white border-indigo-600" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                  1
                </button>

                {page > 3 && <span className="text-gray-400 px-0.5">…</span>}

                {Array.from({ length: 3 }, (_, i) => page - 1 + i)
                  .filter((n) => n > 1 && n < pkgcmsTotalpages)
                  .map((n) => (
                    <button key={n} onClick={() => setPage(n)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium border transition-all
                        ${n === page ? "bg-indigo-600 text-white border-indigo-600" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                      {n}
                    </button>
                  ))}

                {page < pkgcmsTotalpages - 2 && <span className="text-gray-400 px-0.5">…</span>}

                {pkgcmsTotalpages > 1 && (
                  <button onClick={() => setPage(pkgcmsTotalpages)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium border transition-all
                      ${page === pkgcmsTotalpages ? "bg-indigo-600 text-white border-indigo-600" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                    {pkgcmsTotalpages}
                  </button>
                )}

                <button onClick={() => setPage(page + 1)} disabled={page === pkgcmsTotalpages}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                    ${page === pkgcmsTotalpages ? "opacity-40 cursor-not-allowed border-gray-200" : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Commercial;