import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { ChevronLeft, ChevronRight, Search, ChevronDown, Landmark, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getallSettlements } from "../redux/action";

// ── Defined OUTSIDE to prevent remount ───────────────────────────────────────

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const map = {
    active:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    inactive:  "bg-gray-100   text-gray-600    border-gray-200",
    suspended: "bg-red-50     text-red-600     border-red-200",
  };
  const dot = {
    active: "bg-emerald-500", inactive: "bg-gray-400", suspended: "bg-red-500",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${map[s] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[s] || "bg-gray-400"}`} />
      {status}
    </span>
  );
};

const ValidatedBadge = ({ val }) => {
  const isValid = val === "1";
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider
      ${isValid
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-amber-50 text-amber-700 border-amber-200"}`}>
      {isValid
        ? <CheckCircle2 size={10} className="text-emerald-500" />
        : <AlertTriangle size={10} className="text-amber-500" />}
      {isValid ? "Validated" : "Pending"}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const Getallsettlements = () => {
  const { merchantId } = useParams();
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // ── Selectors ──
  const settlementsData     = useSelector((s) => s.settlements?.settlements || []);
  const totalRecords        = settlementsData[0]?.pagination.totalRecords;
  const totalPages          = settlementsData[0]?.pagination.totalPages;
  const settlementRowsArray = settlementsData?.map((item) => item.data || []).flat();

  const activeCount    = settlementRowsArray.filter((i) => i.status === "active").length;
  const inactiveCount  = settlementRowsArray.filter((i) => i.status === "inactive").length;
  const suspendedCount = settlementRowsArray.filter((i) => i.status === "suspended").length;

  const statCards = [
    {
      label: "Active",
      count: activeCount,
      icon: <CheckCircle2 size={18} className="text-emerald-600" />,
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      countColor: "text-emerald-700",
    },
    {
      label: "Inactive",
      count: inactiveCount,
      icon: <XCircle size={18} className="text-gray-500" />,
      bg: "bg-gray-50",
      border: "border-gray-100",
      countColor: "text-gray-700",
    },
    {
      label: "Suspended",
      count: suspendedCount,
      icon: <AlertTriangle size={18} className="text-red-500" />,
      bg: "bg-red-50",
      border: "border-red-100",
      countColor: "text-red-700",
    },
  ];

  // ── Effects ──
  useEffect(() => { setPage(1); }, [searchTerm, searchStatus]);
  useEffect(() => {
    dispatch(getallSettlements(searchTerm, searchStatus, page, perPage));
  }, [searchStatus, searchTerm, page, perPage]);

  return (
    <div className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${isDark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"}`}>
      <main className="w-full h-full flex flex-col overflow-y-scroll">
      <div className="flex flex-col p-6 gap-5">

        {/* ── Page Header ── */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Landmark size={17} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Settlements</h1>
            <p className="text-[11px] text-gray-400">All settlement accounts</p>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map(({ label, count, icon, bg, border, countColor }) => (
            <div key={label}
              className={`flex items-center gap-4 rounded-2xl border px-5 py-4 ${bg} ${border}
                ${isDark ? "bg-gray-800/60 border-gray-700" : ""}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-gray-700" : "bg-white"} shadow-sm border ${border}`}>
                {icon}
              </div>
              <div>
                <p className={`text-2xl font-bold leading-none ${isDark ? "text-white" : countColor}`}>{count}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-widest font-semibold">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Table Card ── */}
        <div className={`flex-1 flex flex-col rounded-2xl border overflow-hidden shadow-sm
          ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>

          {/* Toolbar */}
          <div className={`flex flex-wrap items-center gap-3 px-5 py-3.5 border-b
            ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-gray-50/80"}`}>

            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search settlements…"
                className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none transition-all
                  ${isDark
                    ? "bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-indigo-500"
                    : "bg-white border-gray-200 text-gray-700 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"}`}
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                onChange={(e) => setSearchStatus(e.target.value)}
                value={searchStatus}
                className={`appearance-none pl-3 pr-7 py-2 text-xs rounded-lg border outline-none cursor-pointer transition-all
                  ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700 focus:border-indigo-400"}`}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="ml-auto text-xs text-gray-400">{totalRecords ?? 0} records</div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr className={`text-[10px] uppercase tracking-widest font-semibold border-b
                  ${isDark ? "bg-gray-800/60 text-gray-400 border-gray-800" : "bg-gray-50 text-gray-400 border-gray-100"}`}>
                  {["Account Name", "Corp ID", "Account Number", "IFSC Code", "Validated", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                {Array.isArray(settlementRowsArray) && settlementRowsArray.length > 0 ? (
                  settlementRowsArray.map((s, i) => (
                    <tr key={i} className={`transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-slate-50/80"}`}>
                      <td className={`px-5 py-3.5 text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                        {s.account_name}
                      </td>
                      <td className={`px-5 py-3.5 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {s.company_id}
                      </td>
                      <td className={`px-5 py-3.5 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {s.account_number}
                      </td>
                      <td className={`px-5 py-3.5 text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {s.ifsc_code}
                      </td>
                      <td className="px-5 py-3.5">
                        <ValidatedBadge val={s.is_validated} />
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={s.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                          <Landmark size={20} className="text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400">No settlements found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className={`flex flex-wrap items-center justify-between px-5 py-3 border-t text-xs gap-3
              ${isDark ? "border-gray-800 bg-gray-900 text-gray-400" : "border-gray-100 bg-gray-50/80 text-gray-500"}`}>
              <div className="flex items-center gap-2">
                <span>Rows:</span>
                <select
                  value={perPage}
                  onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                  className={`rounded-md border px-2 py-1 text-xs outline-none transition-all
                    ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-gray-400 mr-2">
                  {(page - 1) * perPage + 1}–{Math.min(page * perPage, totalRecords)} of {totalRecords}
                </span>
           <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border w-fit">

  {/* Label */}
  <h1 className="text-sm font-semibold text-gray-700">
    Navigation Shortcut
  </h1>

  {/* Input */}
  <input
    type="number"
    value={page}
    onChange={(e) => setPage(Number(e.target.value))}
    min="1"
    // placeholder="Page"
    className="w-20 px-3 py-1.5 text-center text-sm font-medium 
               bg-gray-50 border border-gray-300 rounded-lg 
               focus:bg-white focus:outline-none 
               focus:ring-2 focus:ring-black focus:border-black
               transition-all duration-200"
  />

</div>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                    ${page === 1
                      ? "opacity-40 cursor-not-allowed border-gray-200"
                      : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white hover:border-gray-300"}`}>
                  <ChevronLeft size={13} />
                </button>

                {Array.from({ length: 3 }, (_, i) => page + i).map((num) =>
                  num <= totalPages && (
                    <button key={num} onClick={() => setPage(num)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium border transition-all
                        ${num === page
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
                      {num}
                    </button>
                  )
                )}

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all
                    ${page === totalPages
                      ? "opacity-40 cursor-not-allowed border-gray-200"
                      : isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white hover:border-gray-300"}`}>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
};

export default Getallsettlements;