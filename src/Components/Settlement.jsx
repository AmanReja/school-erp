import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { X, Check, Search, ChevronDown, Plus, Landmark, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoadDetails } from "../Contexts/LoadDetails";
import {
  getSettlements,
  createSettlement,
  updateSettlement,
  deleteSettlement,
} from "../redux/action";

// ── Module-level helpers (prevent remount on re-render) ───────────────────────

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const map = {
    active:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    inactive:  "bg-gray-100 text-gray-500 border-gray-200",
    suspended: "bg-red-50 text-red-600 border-red-200",
  };
  const dot = { active: "bg-emerald-500", inactive: "bg-gray-400", suspended: "bg-red-500" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${map[s] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[s] || "bg-gray-400"}`} />
      {status}
    </span>
  );
};

const ValidatedBadge = ({ val }) => {
  const ok = val === "1";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider
      ${ok ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200"}`}>
      {ok ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
      {ok ? "Validated" : "Pending"}
    </span>
  );
};

const FormField = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all placeholder:text-gray-400";
const inputDarkCls = "w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-gray-500";

// ─────────────────────────────────────────────────────────────────────────────

const Settlement = () => {
  const { merchantId } = useParams();
  const { loadD, setLoadD } = useContext(LoadDetails);

  useEffect(() => {
    if (merchantId) { setLoadD(true); } else { setLoadD(false); }
  }, [merchantId]);

  const { theme } = useContext(Theme);
  const isDark = theme === "dark";
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openform, setOpenform] = useState(false);

  const handelopen = () => { setOpenform((prev) => !prev); };

  // Individual form states
  const [account_name, setAccountName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [ifsc_code, setIfscCode] = useState("");
  const [is_validated, setIsValidated] = useState('');
  const [status, setStatus] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const opt = [
    { label: "All", value: "" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Suspended", value: "Suspended" },
  ];

  const [selectedopt, setSelectedopt] = useState("");
  const [optopen, setOptopen] = useState(false);

  const handeloptOpen = (item) => {
    setSelectedopt(item.value);
    setOptopen(false);
    setSearchStatus(item.value);
  };

  // State for update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  // Individual update form states
  const [updateAccountName, setUpdateAccountName] = useState("");
  const [updateAccountNumber, setUpdateAccountNumber] = useState("");
  const [updateIfscCode, setUpdateIfscCode] = useState("");
  const [updateIsValidated, setUpdateIsValidated] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  // Get settlements from Redux store
  const settlementsData = useSelector((state) => state.settlements?.settlements || []);
  const settlementRowsArray = settlementsData?.map(item => item.data || []).flat();

  // Load settlements on component mount
  useEffect(() => {
    dispatch(getSettlements(merchantId, searchTerm, searchStatus));
  }, [dispatch, merchantId, searchTerm, searchStatus]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = { account_name, account_number, ifsc_code, is_validated, status };
    console.log("Form submitted with data:", submissionData);
    dispatch(createSettlement(submissionData, merchantId))
      .then(async () => {
        setAccountName(""); setAccountNumber(""); setIfscCode("");
        setIsValidated(""); setStatus(""); setStep(1);
        await dispatch(getSettlements(merchantId));
      })
      .catch((error) => { console.error("Error creating settlement:", error); });
  };

  const handleEdit = (settlement) => {
    setSelectedSettlement(settlement);
    setUpdateAccountName(settlement.account_name);
    setUpdateAccountNumber(settlement.account_number);
    setUpdateIfscCode(settlement.ifsc_code);
    setUpdateIsValidated(settlement.is_validated);
    setUpdateStatus(settlement.status);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = () => {
    if (selectedSettlement) {
      const updateData = {
        account_name: updateAccountName, account_number: updateAccountNumber,
        ifsc_code: updateIfscCode, is_validated: updateIsValidated, status: updateStatus,
      };
      dispatch(updateSettlement(selectedSettlement.account_number, selectedSettlement.company_id, updateData))
        .then(() => {
          setIsUpdateModalOpen(false); setSelectedSettlement(null);
          dispatch(getSettlements(merchantId));
        })
        .catch((error) => { console.error("Error updating settlement:", error); });
    }
  };

  const handleDelete = (settlement) => {
    if (window.confirm("Are you sure you want to delete this settlement?")) {
      dispatch(deleteSettlement(settlement.account_number, settlement.company_id))
        .then(() => { dispatch(getSettlements(merchantId)); })
        .catch((error) => { console.error("Error deleting settlement:", error); });
    }
  };

  const steps = ["Account Details", "Validation & Status"];
  const iCls = isDark ? inputDarkCls : inputCls;

  const formCardStyle = [
    "w-full sm:w-[340px] min-w-[320px] absolute top-[79px] z-50",
    "flex flex-col rounded-2xl border shadow-2xl overflow-hidden duration-300",
    openform ? "left-[calc(100%-340px)]" : "left-[100%]",
    isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-800",
  ].join(" ");

  return (
    <div className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col
      ${isDark ? "bg-gray-900 text-gray-300" : "bg-slate-50 text-gray-800"}`}>

      {/* ── Create Settlement Slide Panel ── */}
      <form onSubmit={handleSubmit} className={formCardStyle}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-600 to-violet-600">
          <div>
            <h2 className="text-sm font-bold text-white">Create Settlement</h2>
            <p className="text-[11px] text-indigo-200 mt-0.5">
              Step {step} of 2 · {step === 1 ? "Account Details" : "Validation & Status"}
            </p>
          </div>
          <button type="button" onClick={handelopen}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">
            <X size={13} />
          </button>
        </div>

        {/* Step indicators */}
        <div className={`flex items-center gap-2 px-5 py-3 border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
          {[1, 2].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all
                ${step === n
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : step > n ? "bg-emerald-500 border-emerald-500 text-white"
                  : isDark ? "bg-gray-700 border-gray-600 text-gray-400" : "bg-gray-100 border-gray-200 text-gray-400"}`}>
                {step > n ? <Check size={10} /> : n}
              </div>
              {n < 2 && <div className={`w-8 h-px ${step > n ? "bg-emerald-400" : isDark ? "bg-gray-700" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Form body */}
        <div className={`flex flex-col gap-4 px-5 py-5 ${isDark ? "bg-gray-800" : "bg-gray-50/40"}`}>

          {step === 1 && (
            <>
              <FormField label="Account Name">
                <input type="text" value={account_name} onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter account name" className={iCls} required />
              </FormField>
              <FormField label="Account Number">
                <input type="text" value={account_number} onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number" className={iCls} required />
              </FormField>
              <FormField label="IFSC Code">
                <input type="text" value={ifsc_code} onChange={(e) => setIfscCode(e.target.value)}
                  placeholder="e.g. SBIN0001234" className={iCls} required />
              </FormField>
              <button type="button" onClick={nextStep}
                className="flex items-center justify-center gap-2 mt-1 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl transition-all shadow-sm">
                Continue <ArrowRight size={13} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <FormField label="Validation Status">
                <select value={is_validated} onChange={(e) => setIsValidated(e.target.value)} className={iCls} required>
                  <option value="0">Not Validated</option>
                  <option value="1">Validated</option>
                </select>
              </FormField>
              <FormField label="Account Status">
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={iCls} required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </FormField>
              <div className="flex gap-2 mt-1">
                <button type="button" onClick={prevStep}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all">
                  <ArrowLeft size={12} /> Back
                </button>
                <button type="submit"
                  className="flex-1 px-3 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl transition-all shadow-sm">
                  Create Settlement
                </button>
              </div>
            </>
          )}
        </div>
      </form>

      {/* ── Main ── */}
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-row gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">

          <div className={`flex sm:w-[100%] w-full h-full flex-col rounded-2xl overflow-hidden border shadow-sm
            ${isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-800"}`}>

            {/* Toolbar */}
            <div className={`flex flex-wrap items-center gap-3 px-5 py-3.5 border-b
              ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50/80"}`}>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Landmark size={15} className="text-indigo-600" />
                </div>
                <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Settlements</span>
              </div>

              {/* Search */}
              <div className="relative flex-1 min-w-[160px] max-w-xs">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search settlements…"
                  className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border outline-none transition-all
                    ${isDark
                      ? "bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-indigo-500"
                      : "bg-white border-gray-200 text-gray-700 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"}`} />
              </div>

              {/* Custom status dropdown */}
              <div className="relative">
                <div onClick={() => setOptopen((p) => !p)}
                  className={`flex items-center gap-2 pl-3 pr-2.5 py-2 text-xs rounded-xl border cursor-pointer min-w-[130px] select-none transition-all
                    ${isDark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"}`}>
                  <span className="flex-1">{selectedopt || "All Status"}</span>
                  <ChevronDown size={11} className={`text-gray-400 transition-transform ${optopen ? "rotate-180" : ""}`} />
                </div>
                {optopen && (
                  <div className={`absolute top-full left-0 mt-1 w-full rounded-xl border shadow-lg z-50 overflow-hidden
                    ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                    {opt.map((item) => (
                      <div key={item.value} onClick={() => handeloptOpen(item)}
                        className={`flex items-center justify-between px-3 py-2.5 text-xs cursor-pointer transition-colors
                          ${isDark ? "hover:bg-gray-700 text-gray-200" : "hover:bg-indigo-50 hover:text-indigo-700 text-gray-700"}`}>
                        {item.label}
                        {selectedopt === item.value && (
                          <Check className={`w-3 h-3 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA button */}
              <button onClick={handelopen}
                className="ml-auto flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-sm transition-all">
                <Plus size={13} /> New Settlement
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className={`text-[10px] uppercase tracking-widest font-semibold border-b
                  ${isDark ? "bg-gray-700/60 text-gray-400 border-gray-700" : "bg-gray-50 text-gray-400 border-gray-100"}`}>
                  <tr>
                    {["Account Name", "Account Number", "IFSC Code", "Validated", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody className={`divide-y text-[12px] font-medium ${isDark ? "divide-gray-700" : "divide-gray-100"}`}>
                  {Array.isArray(settlementRowsArray) && settlementRowsArray.length > 0 ? (
                    settlementRowsArray.map((settlement, i) => (
                      <tr key={i} className={`transition-colors ${isDark ? "hover:bg-gray-700/50" : "hover:bg-slate-50/80"}`}>
                        <td className={`px-5 py-3.5 font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                          {settlement.account_name}
                        </td>
                        <td className={`px-5 py-3.5 font-mono text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {settlement.account_number}
                        </td>
                        <td className={`px-5 py-3.5 font-mono text-xs tracking-wider ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
                          {settlement.ifsc_code}
                        </td>
                        <td className="px-5 py-3.5">
                          <ValidatedBadge val={settlement.is_validated} />
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={settlement.status} />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => handleEdit(settlement)}
                              className="px-3 py-1.5 text-[11px] font-semibold text-white bg-blue-500 hover:bg-blue-600 border border-blue-200 rounded-lg transition-all">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(settlement)}
                              className="px-3 py-1.5 text-[11px] font-semibold text-white bg-red-500 hover:bg-red-600 border border-red-200 rounded-lg transition-all">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                            <Landmark size={22} className="text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-400">No settlements found</p>
                          <button onClick={handelopen}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all">
                            <Plus size={12} /> New Settlement
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* ── Update Modal ── */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10,15,30,0.55)", backdropFilter: "blur(4px)" }}>
          <div className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl
            ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-800"}`}>

            {/* Modal header */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
              <div>
                <h2 className="text-sm font-bold">Update Settlement</h2>
                {selectedSettlement && (
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">{selectedSettlement.account_number}</p>
                )}
              </div>
              <button onClick={() => setIsUpdateModalOpen(false)}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-all
                  ${isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                <X size={14} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Account Name">
                <input type="text" value={updateAccountName} onChange={(e) => setUpdateAccountName(e.target.value)} className={iCls} />
              </FormField>
              <FormField label="Account Number">
                <input type="text" value={updateAccountNumber} onChange={(e) => setUpdateAccountNumber(e.target.value)} className={iCls} />
              </FormField>
              <FormField label="IFSC Code">
                <input type="text" value={updateIfscCode} onChange={(e) => setUpdateIfscCode(e.target.value)} className={iCls} />
              </FormField>
              <FormField label="Validation Status">
                <select value={updateIsValidated} onChange={(e) => setUpdateIsValidated(e.target.value)} className={iCls}>
                  <option value="0">Not Validated</option>
                  <option value="1">Validated</option>
                </select>
              </FormField>
              <div className="md:col-span-2">
                <FormField label="Account Status">
                  <select value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)} className={iCls}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </FormField>
              </div>
            </div>

            {/* Modal footer */}
            <div className={`flex items-center justify-between px-6 py-4 border-t rounded-b-2xl
              ${isDark ? "border-gray-700 bg-gray-800/60" : "border-gray-100 bg-gray-50/60"}`}>
              <button onClick={() => setIsUpdateModalOpen(false)}
                className={`px-4 py-2 text-xs font-medium rounded-xl border transition-all
                  ${isDark ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-200" : "bg-white border-gray-200 hover:bg-gray-100 text-gray-600"}`}>
                Cancel
              </button>
              <button onClick={handleUpdate}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-sm transition-all">
                Update Settlement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settlement;