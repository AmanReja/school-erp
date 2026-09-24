
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  Search,
  Filter,
  AlertCircle,
  CalendarDays,
  UserRound,
  FileText,
  Eye,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Building2,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

import { getDisputes,dispute_update } from "../../redux/action";
import { Theme } from "../../Contexts/Theme";
import DisputeViewModal from "../../models/DisputeViewModal";
import UpdateDisputeModal from "../../models/UpdateDisputeModal";

const UnderReview = () => {
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  const dispatch = useDispatch();

  // =========================
  // STATE
  // =========================

  const [load, setLoad] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

  const [disputeType, setDisputeType] = useState("");

  const [status, setStatus] = useState("under_review");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);


  const [txnid, setTxnid] = useState("");
  const [corp_id, setCorp_id] = useState("");


  const [disputeData,setDisputeData] =useState(null)
 const [selectedDispute, setSelectedDispute] = useState(null);
const [showUpdateModal, setShowUpdateModal] = useState(false);
const [updateLoading, setUpdateLoading] = useState(false);

  // =========================
  // REDUX
  // =========================

  const disputeState = useSelector(
    (state) => state.dispute?.disputlist
  );

  // console.log("Backend dispute response:", disputeState);

  const disputes = disputeState?.data || [];

  const pagination = disputeState?.pagination || {};

  const summary = disputeState?.summary || {};

  const totalPage = pagination?.totalPages || 0;

  const totalData = pagination?.totalRecords || 0;

  // =========================
  // DEBOUNCE SEARCH
  // =========================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // FETCH DISPUTES
  // =========================

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);

      try {
       await dispatch(
  getDisputes(
    null,
    status,
    disputeType,
    debouncedSearch,
    page,
    perPage,
    startDate,
    endDate
  )
);
      } catch (error) {
        console.log("Get disputes error:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, [
    dispatch,
    status,
    disputeType,
    debouncedSearch,
    page,
    perPage,
     startDate,
    endDate
  ]);

  // =========================
  // SUMMARY FROM BACKEND
  // =========================

  const totalDisputes = summary?.total_disputes || 0;

  const openCount = summary?.open || 0;

  const underReviewCount = summary?.under_review || 0;

  const resolvedCount = summary?.resolved || 0;

  const rejectedCount = summary?.rejected || 0;

  // =========================
  // AMOUNT
  // =========================

  const disputedAmount = useMemo(() => {
    return disputes.reduce(
      (sum, item) =>
        sum + Number(item?.dispute_amount || 0),
      0
    );
  }, [disputes]);

  // =========================
  // FORMAT AMOUNT
  // =========================

  const formatAmount = (amount) => {
    if (
      amount === null ||
      amount === undefined ||
      amount === ""
    ) {
      return "0.00";
    }

    return Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // STATUS STYLE
  // =========================

  const statusClass = (value) => {
    switch (value?.toLowerCase()) {
      case "open":
        return isDark
          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
          : "bg-orange-50 text-orange-600 border-orange-200";

      case "under_review":
        return isDark
          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
          : "bg-blue-50 text-blue-600 border-blue-200";

      case "resolved":
        return isDark
          ? "bg-green-500/10 text-green-400 border-green-500/20"
          : "bg-green-50 text-green-600 border-green-200";

      case "rejected":
        return isDark
          ? "bg-red-500/10 text-red-400 border-red-500/20"
          : "bg-red-50 text-red-600 border-red-200";

      default:
        return isDark
          ? "bg-gray-800 text-gray-400 border-gray-700"
          : "bg-gray-100 text-gray-600 border-gray-200";
    }
  };



  const handleUpdateDispute = async (data) => {
  try {
    setUpdateLoading(true);

    console.log("Update dispute payload:", data);

    // API call here
    await dispatch(dispute_update(txnid,data,));

    setShowUpdateModal(false);
    setSelectedDispute(null);

  } catch (error) {
    console.error("Failed to update dispute:", error);
  } finally {
    setUpdateLoading(false);
     dispatch(getDisputes(null,"under_review",
    "",
    "",
     1,
    10,
    "",
    ""))
  }
};

  // =========================
  // RESET
  // =========================

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setDisputeType("");
    setStatus("open");
    setPage(1);
    setStartDate("")
    setEndDate("")
  };


   
const startItem =
  totalData > 0 ? (page - 1) * perPage + 1 : 0;

const endItem =
  totalData > 0
    ? Math.min(page * perPage, totalData)
    : 0;

const handlePrevious = () => {
  setPage((prev) => Math.max(prev - 1, 1));
};

const handleNext = () => {
  setPage((prev) =>
    prev < totalPage ? prev + 1 : prev
  );
};

const getPageNumbers = () => {
  const pages = [];

  if (totalPage <= 5) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (page > 4) {
    pages.push("...");
  }

  const start = Math.max(2, page - 2);
  const end = Math.min(totalPage - 1, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (page < totalPage - 3) {
    pages.push("...");
  }

  pages.push(totalPage);

  return pages;
};
  // =========================
  // UI
  // ============

  // =========================
  // UI
  // =========================

  return (
    <div
      className={`w-full rounded-2xl border ${
        isDark
          ? "bg-gray-950 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* ================= HEADER ================= */}

      <div
        className={`px-5 py-5 border-b ${
          isDark
            ? "border-gray-800"
            : "border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

<div className="flex items-center gap-3"> <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600" }`} > <Eye size={21} /> </div> <div> <h2 className={`text-lg font-semibold ${ isDark ? "text-gray-100" : "text-gray-800" }`} > Under Review Disputes </h2> <p className="text-xs mt-0.5 text-gray-500"> Review and manage disputes currently under review. </p> </div> </div>
          {/* TOTAL */}

          <div
            className={`px-4 py-2 rounded-xl border ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Total Open
            </p>

            <p
              className={`text-lg font-bold ${
                isDark
                  ? "text-gray-100"
                  : "text-gray-800"
              }`}
            >
              {openCount}
            </p>
          </div>

        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-5">

        {/* TOTAL */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Total Disputes
            </span>

            <FileText
              size={16}
              className="text-indigo-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {totalDisputes}
          </p>
        </div>

        {/* OPEN */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Open
            </span>

            <AlertCircle
              size={16}
              className="text-orange-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {openCount}
          </p>
        </div>

        {/* UNDER REVIEW */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Under Review
            </span>

            <Eye
              size={16}
              className="text-blue-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {underReviewCount}
          </p>
        </div>

        {/* RESOLVED */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Resolved
            </span>

            <CheckCircle2
              size={16}
              className="text-green-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {resolvedCount}
          </p>
        </div>

      </div>

      {/* ================= FILTER ================= */}

      <div className="px-5 pb-5">
  <div className="flex flex-col xl:flex-row gap-3">

    {/* SEARCH */}

    <div className="relative flex-1">

      <Search
        size={17}
        className={`absolute left-3 top-1/2 -translate-y-1/2 ${
          isDark
            ? "text-gray-500"
            : "text-gray-400"
        }`}
      />

      <input
        type="text"
        placeholder="Search transaction, merchant, RRN or reason..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none ${
          isDark
            ? "bg-gray-900 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-indigo-500"
            : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400"
        }`}
      />

    </div>

    {/* DISPUTE TYPE */}

    <div className="relative">

      <Filter
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <select
        value={disputeType}
        onChange={(e) => {
          setDisputeType(e.target.value);
          setPage(1);
        }}
        className={`appearance-none pl-9 pr-8 py-2.5 rounded-lg border text-sm outline-none ${
          isDark
            ? "bg-gray-900 border-gray-800 text-gray-300"
            : "bg-white border-gray-200 text-gray-700"
        }`}
      >
        <option value="">All Types</option>
        <option value="payout">Payout</option>
        <option value="collection">Collection</option>
        {/* <option value="transaction">Transaction</option> */}
      </select>

    </div>

    {/* START DATE */}

    <div className="relative">

      <CalendarDays
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />

      <input
        type="date"
        value={startDate}
        max={endDate || undefined}
        onChange={(e) => {
          setStartDate(e.target.value);
          setPage(1);
        }}
        className={`pl-9 pr-3 py-2.5 rounded-lg border text-sm outline-none ${
          isDark
            ? "bg-gray-900 border-gray-800 text-gray-300"
            : "bg-white border-gray-200 text-gray-700"
        }`}
      />

    </div>

    {/* END DATE */}

    <div className="relative">

      <CalendarDays
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />

      <input
        type="date"
        value={endDate}
        min={startDate || undefined}
        onChange={(e) => {
          setEndDate(e.target.value);
          setPage(1);
        }}
        className={`pl-9 pr-3 py-2.5 rounded-lg border text-sm outline-none ${
          isDark
            ? "bg-gray-900 border-gray-800 text-gray-300"
            : "bg-white border-gray-200 text-gray-700"
        }`}
      />

    </div>

    {/* RESET */}

    <button
      onClick={handleReset}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium ${
        isDark
          ? "border-gray-800 text-gray-400 hover:bg-gray-900"
          : "border-gray-200 text-gray-500 hover:bg-gray-50"
      }`}
    >
      <RotateCcw size={15} />
      Reset
    </button>

  </div>
</div>

      {/* ================= TABLE ================= */}

      <div className="overflow-x-auto">

        <table className="w-full text-left border-collapse">

          <thead>

            <tr
              className={`border-y text-[11px] uppercase tracking-wider ${
                isDark
                  ? "bg-gray-900/70 border-gray-800 text-gray-500"
                  : "bg-gray-50 border-gray-200 text-gray-500"
              }`}
            >

              <th className="px-5 py-3">
                Transaction
              </th>

              <th className="px-5 py-3">
                Merchant
              </th>

              <th className="px-5 py-3">
                Type
              </th>

              <th className="px-5 py-3">
                Amount
              </th>

              <th className="px-5 py-3">
                Reason
              </th>

              <th className="px-5 py-3">
                Date
              </th>

              <th className="px-5 py-3">
                Status
              </th>

              <th className="px-5 py-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {load ? (

              <tr>

                <td
                  colSpan={8}
                  className={`text-center py-10 text-sm ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-600"
                  }`}
                >
                  Loading disputes...
                </td>

              </tr>

            ) : disputes.length > 0 ? (

              disputes.map((item, index) => (

                <tr
                  key={item?.id || index}
                  className={`border-b transition ${
                    isDark
                      ? "border-gray-800 hover:bg-gray-900/60"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >

                  {/* TRANSACTION */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDark
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        <FileText size={14} />
                      </div>

                      <div>

                        <p className="text-sm font-semibold">
                          {item?.transaction_id || "-"}
                        </p>

                        <p className="text-[11px] text-gray-500">
                          ID: {item?.id || "-"}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* MERCHANT */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <UserRound
                        size={15}
                        className="text-gray-400"
                      />

                      <div>

                        <p className="text-sm font-medium">
                          {item?.corp_name || "-"}
                        </p>

                        <p className="text-[11px] text-gray-500">
                          {item?.corp_id || "-"}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* TYPE */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                        isDark
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {item?.dispute_type || "-"}
                    </span>

                  </td>

                  {/* AMOUNT */}

                  <td className="px-5 py-4">

                    <div>

                      <span className="text-sm font-semibold">
                        ₹ {formatAmount(item?.dispute_amount)}
                      </span>

                      {item?.settlement_amount && (
                        <p className="text-[11px] text-gray-500">
                          Settlement: ₹{" "}
                          {formatAmount(
                            item?.settlement_amount
                          )}
                        </p>
                      )}

                    </div>

                  </td>

                  {/* REASON */}

                  <td className="px-5 py-4 max-w-[220px]">

                    <span
                      className="text-sm text-gray-500 line-clamp-2"
                      title={item?.dispute_remarks}
                    >
                      {item?.dispute_remarks || "-"}
                    </span>

                  </td>

                  {/* DATE */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-1.5">

                      <CalendarDays
                        size={14}
                        className="text-gray-400"
                      />

                      <span className="text-sm text-gray-500">
                        {formatDate(item?.dispute_date)}
                      </span>

                    </div>

                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">

                    <span
                      className={`px-2.5 py-1 rounded-md border text-xs font-medium ${statusClass(
                        item?.status
                      )}`}
                    >
                      {item?.status
                        ?.replace("_", " ")
                        ?.replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        ) || "-"}
                    </span>

                  </td>

                  {/* ACTION */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <button onClick={()=>{
                        setDisputeData(item);
                        // setviewmodelOpen(true)

                      }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition active:scale-95 ${
                          isDark
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500 hover:text-white"
                            : "bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-600 hover:text-white"
                        }`}
                      >
                        <Eye size={13} />
                        View
                      </button>

                     <button
  onClick={() => {
    setSelectedDispute(item);
    setShowUpdateModal(true);
    setTxnid(item.transaction_id);
setCorp_id(item.corp_id);
}}
  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
    isDark
      ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
  }`}
>
  Update
</button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={8}
                  className={`text-center py-10 text-sm ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-600"
                  }`}
                >
                  No open disputes found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ================= PAGINATION ================= */}

{totalPage > 0 && (
  <div
    className={`px-5 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
      isDark
        ? "border-slate-700"
        : "border-gray-200"
    }`}
  >
    {/* RESULT COUNT */}
    <div
      className={`text-sm ${
        isDark
          ? "text-gray-400"
          : "text-gray-500"
      }`}
    >
      Showing{" "}
      <span
        className={`font-semibold ${
          isDark
            ? "text-gray-200"
            : "text-gray-700"
        }`}
      >
        {startItem}
      </span>{" "}
      to{" "}
      <span
        className={`font-semibold ${
          isDark
            ? "text-gray-200"
            : "text-gray-700"
        }`}
      >
        {endItem}
      </span>{" "}
      of{" "}
      <span
        className={`font-semibold ${
          isDark
            ? "text-gray-200"
            : "text-gray-700"
        }`}
      >
        {totalData}
      </span>{" "}
      records
    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-4">

      {/* PER PAGE */}
      <div
        className={`flex items-center gap-2 text-sm ${
          isDark
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        <span>Show</span>

        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
          className={`rounded-lg border outline-none px-2 py-1.5 ${
            isDark
              ? "bg-gray-900 text-gray-200 border-slate-700"
              : "bg-white text-gray-700 border-gray-200"
          }`}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>

        <span>per page</span>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center gap-1.5">

        {/* PREVIOUS */}
        <button
          type="button"
          onClick={handlePrevious}
          disabled={page === 1}
          className={`w-9 h-9 rounded-lg flex items-center justify-center border transition ${
            page === 1
              ? "opacity-40 cursor-not-allowed"
              : ""
          } ${
            isDark
              ? "border-slate-700 hover:bg-slate-700"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={17} />
        </button>

        {/* PAGE NUMBERS */}
        {getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <span
                key={`dots-${index}`}
                className={`w-9 h-9 flex items-center justify-center text-sm ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                ...
              </span>
            );
          }

          const active = page === pageNumber;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-green-600 text-white"
                  : isDark
                  ? "text-gray-300 hover:bg-slate-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          type="button"
          onClick={handleNext}
          disabled={page === totalPage}
          className={`w-9 h-9 rounded-lg flex items-center justify-center border transition ${
            page === totalPage
              ? "opacity-40 cursor-not-allowed"
              : ""
          } ${
            isDark
              ? "border-slate-700 hover:bg-slate-700"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={17} />
        </button>

      </div>
    </div>
  </div>
)}
<DisputeViewModal onClose={()=>setDisputeData(null)} dispute={disputeData} isDark={isDark}/>
 {showUpdateModal && (
  <UpdateDisputeModal
    dispute={selectedDispute}
    isDark={isDark}
    loading={updateLoading}
    onClose={() => {
      if (!updateLoading) {
        setShowUpdateModal(false);
        setSelectedDispute(null);
      }
    }}
    onUpdate={handleUpdateDispute}
  
  />
)}
    </div>
  );
};

export default UnderReview;
