
import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";

import {
  Search,
  Filter,
  Landmark,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Building2,
  CreditCard,
  RotateCcw,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getallSettlements } from "../redux/action";
import { Theme } from "../Contexts/Theme";

import "../App.css";

// ======================================================
// STATUS BADGE
// ======================================================

const StatusBadge = ({ status, isDark }) => {
  const value = String(status || "").toLowerCase();

  if (value === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold text-white">
        <CheckCircle2 size={12} />
        ACTIVE
      </span>
    );
  }

  if (value === "inactive") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-500 px-3 py-1 text-[10px] font-bold text-white">
        <XCircle size={12} />
        INACTIVE
      </span>
    );
  }

  if (value === "suspended") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold text-white">
        <AlertTriangle size={12} />
        SUSPENDED
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1 text-[10px] font-bold text-white">
      <AlertTriangle size={12} />
      {String(status || "PENDING").toUpperCase()}
    </span>
  );
};

// ======================================================
// VALIDATED BADGE
// ======================================================

const ValidatedBadge = ({ val }) => {
  const isValid =
    val === "1" ||
    val === 1 ||
    val === true ||
    String(val || "").toLowerCase() === "validated";

  if (isValid) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold text-white">
        <CheckCircle2 size={12} />
        VALIDATED
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1 text-[10px] font-bold text-white">
      <AlertTriangle size={12} />
      PENDING
    </span>
  );
};

// ======================================================
// MAIN COMPONENT
// ======================================================

const Getallsettlements = () => {
  const { merchantId, corpid } = useParams();

  const { theme } = useContext(Theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDark = theme === "dark";

  // ====================================================
  // LOCAL STATES
  // ====================================================

  const [load, setLoad] = useState(false);

  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(10);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [searchStatus, setSearchStatus] = useState("");

  // ====================================================
  // REDUX
  // ====================================================

  const settlementsData = useSelector(
    (state) => state.settlements?.settlements || []
  );

  // ====================================================
  // RESPONSE DATA
  // ====================================================

  const paginationData =
    settlementsData?.[0]?.pagination || {};

  const totalRecords =
    paginationData?.totalRecords || 0;

  const totalPages =
    paginationData?.totalPages || 1;

  // ====================================================
  // SETTLEMENT ROWS
  // ====================================================

  const settlementRowsArray = useMemo(() => {
    if (!Array.isArray(settlementsData)) {
      return [];
    }

    return settlementsData
      .map((item) => item?.data || [])
      .flat();
  }, [settlementsData]);

  // ====================================================
  // COUNTS
  // ====================================================

  const activeCount = settlementRowsArray.filter(
    (item) =>
      String(item?.status || "").toLowerCase() ===
      "active"
  ).length;

  const inactiveCount = settlementRowsArray.filter(
    (item) =>
      String(item?.status || "").toLowerCase() ===
      "inactive"
  ).length;

  const suspendedCount = settlementRowsArray.filter(
    (item) =>
      String(item?.status || "").toLowerCase() ===
      "suspended"
  ).length;

  // ====================================================
  // DEBOUNCE SEARCH
  // ====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ====================================================
  // FETCH SETTLEMENTS
  // ====================================================

  const fetchSettlements = async () => {
    setLoad(true);

    try {
      await dispatch(
        getallSettlements(
          debouncedSearch,
          searchStatus,
          page,
          perPage
        )
      );
    } catch (error) {
      console.error(
        "Get settlements error:",
        error
      );
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchSettlements();
  }, [
    dispatch,
    debouncedSearch,
    searchStatus,
    page,
    perPage,
  ]);

  // ====================================================
  // RESET
  // ====================================================

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setSearchStatus("");
    setPage(1);
  };

  // ====================================================
  // DATE FORMAT
  // ====================================================

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

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div
      className={`w-full 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
        isDark
          ? "bg-gray-900 text-gray-300"
          : "bg-white text-gray-800"
      }`}
    >
      <main className="w-full h-full flex flex-col overflow-y-auto">

        <section className="w-full flex flex-col gap-5 mt-5 px-2 sm:px-5">

          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 rounded-xl p-6 shadow-sm border ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-100"
            }`}
          >

            {/* LEFT */}

            <div className="flex items-center gap-4">

              <button
                onClick={() => navigate(-1)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                  isDark
                    ? "border-gray-700 hover:bg-gray-800 text-gray-300"
                    : "border-gray-200 hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ArrowLeft size={18} />
              </button>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  isDark
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <Landmark size={23} />
              </div>

              <div className="flex flex-col gap-1">

                <h1
                  className={`text-2xl font-semibold ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-900"
                  }`}
                >
                  Settlements
                </h1>

                <p
                  className={`text-sm ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Manage and monitor settlement accounts
                  {merchantId && (
                    <>
                      {" "}
                      for Merchant{" "}
                      <span className="font-bold text-indigo-500">
                        {merchantId}
                      </span>
                    </>
                  )}
                </p>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex flex-wrap gap-3">

              <button
                onClick={fetchSettlements}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <RefreshCw
                  size={16}
                  className={
                    load ? "animate-spin" : ""
                  }
                />

                Refresh
              </button>

            </div>

          </div>

          {/* =================================================
              MERCHANT / CORPORATION INFO
          ================================================= */}

          {(merchantId || corpid) && (
            <div
              className={`flex items-center gap-3 rounded-xl border p-4 ${
                isDark
                  ? "border-gray-800 bg-gray-800/60"
                  : "border-gray-100 bg-gray-50"
              }`}
            >

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  isDark
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <Building2 size={19} />
              </div>

              <div>

                <p
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {corpid
                    ? "Corporation ID"
                    : "Merchant ID"}
                </p>

                <p
                  className={`text-sm font-bold ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }`}
                >
                  {corpid || merchantId || "N/A"}
                </p>

              </div>

            </div>
          )}

          {/* =================================================
              STATS
          ================================================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* ACTIVE */}

            <div
              className={`rounded-xl border p-5 shadow-sm ${
                isDark
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-100 bg-white"
              }`}
            >

              <div className="flex items-center justify-between">

                <p
                  className={`text-xs uppercase tracking-wider ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Active
                </p>

                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />

              </div>

              <h2 className="mt-2 text-2xl font-bold text-emerald-500">
                {activeCount}
              </h2>

            </div>

            {/* INACTIVE */}

            <div
              className={`rounded-xl border p-5 shadow-sm ${
                isDark
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-100 bg-white"
              }`}
            >

              <div className="flex items-center justify-between">

                <p
                  className={`text-xs uppercase tracking-wider ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Inactive
                </p>

                <XCircle
                  size={17}
                  className="text-gray-500"
                />

              </div>

              <h2
                className={`mt-2 text-2xl font-bold ${
                  isDark
                    ? "text-gray-200"
                    : "text-gray-700"
                }`}
              >
                {inactiveCount}
              </h2>

            </div>

            {/* SUSPENDED */}

            <div
              className={`rounded-xl border p-5 shadow-sm ${
                isDark
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-100 bg-white"
              }`}
            >

              <div className="flex items-center justify-between">

                <p
                  className={`text-xs uppercase tracking-wider ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Suspended
                </p>

                <AlertTriangle
                  size={17}
                  className="text-red-500"
                />

              </div>

              <h2 className="mt-2 text-2xl font-bold text-red-500">
                {suspendedCount}
              </h2>

            </div>

          </div>

          {/* =================================================
              TABLE CARD
          ================================================= */}

          <div
            className={`w-full overflow-hidden rounded-xl border ${
              isDark
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* =================================================
                FILTER HEADER
            ================================================= */}

            <div
              className={`flex flex-wrap items-center justify-between gap-4 border-b p-5 ${
                isDark
                  ? "border-gray-700"
                  : "border-gray-200"
              }`}
            >

              {/* TITLE */}

              <div>

                <h2
                  className={`text-lg font-semibold ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-900"
                  }`}
                >
                  Settlement Accounts
                </h2>

                <p
                  className={`mt-1 text-xs ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  View and monitor merchant settlement
                  bank accounts
                </p>

              </div>

              {/* FILTERS */}

              <div className="flex flex-wrap items-center gap-3">

                {/* SEARCH */}

                <div
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
                    isDark
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  }`}
                >

                  <Search
                    size={15}
                    className={
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search settlement..."
                    className={`w-[220px] bg-transparent text-sm outline-none ${
                      isDark
                        ? "text-gray-200 placeholder:text-gray-500"
                        : "text-gray-800 placeholder:text-gray-400"
                    }`}
                  />

                </div>

                {/* STATUS */}

                <div className="relative">

                  <Filter
                    size={14}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  />

                  <select
                    value={searchStatus}
                    onChange={(e) => {
                      setSearchStatus(
                        e.target.value
                      );
                      setPage(1);
                    }}
                    className={`rounded-lg border py-2 pl-9 pr-3 text-sm outline-none ${
                      isDark
                        ? "border-gray-700 bg-gray-800 text-gray-200"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >

                    <option value="">
                      All Status
                    </option>

                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>

                    <option value="suspended">
                      Suspended
                    </option>

                  </select>

                </div>

                {/* RESET */}

                <button
                  onClick={handleReset}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                    isDark
                      ? "border-gray-700 text-gray-400 hover:bg-gray-800"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <RotateCcw size={15} />
                  Reset
                </button>

              </div>

            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[950px] text-left text-sm">

                {/* HEADER */}

                <thead
                  className={`border-b text-[11px] uppercase tracking-wider ${
                    isDark
                      ? "border-gray-700 bg-gray-800 text-gray-400"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                  }`}
                >

                  <tr>

                    <th className="px-6 py-4">
                      Account
                    </th>

                    <th className="px-6 py-4">
                      Corp ID
                    </th>

                    <th className="px-6 py-4">
                      Account Number
                    </th>

                    <th className="px-6 py-4">
                      IFSC Code
                    </th>

                    <th className="px-6 py-4">
                      Validation
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                  </tr>

                </thead>

                {/* BODY */}

                <tbody
                  className={`text-[12px] ${
                    isDark
                      ? "text-gray-300"
                      : "text-gray-800"
                  }`}
                >

                  {/* LOADING */}

                  {load ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="py-14 text-center"
                      >

                        <div className="flex items-center justify-center gap-2">

                          <RefreshCw
                            size={18}
                            className="animate-spin"
                          />

                          Loading settlement records...

                        </div>

                      </td>

                    </tr>

                  ) : settlementRowsArray.length > 0 ? (

                    settlementRowsArray.map(
                      (settlement, index) => (

                        <tr
                          key={
                            settlement?.id ||
                            settlement?.account_number ||
                            index
                          }
                          className={`border-b transition ${
                            isDark
                              ? "border-gray-700 hover:bg-gray-800"
                              : "border-gray-100 hover:bg-gray-50"
                          }`}
                        >

                          {/* ACCOUNT */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                  isDark
                                    ? "bg-indigo-500/10 text-indigo-400"
                                    : "bg-indigo-50 text-indigo-600"
                                }`}
                              >
                                <Landmark size={16} />
                              </div>

                              <div>

                                <p
                                  className={`font-semibold ${
                                    isDark
                                      ? "text-gray-200"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {settlement?.account_name ||
                                    "-"}
                                </p>

                                {settlement?.bank_name && (
                                  <p className="mt-1 text-[10px] text-gray-500">
                                    {settlement.bank_name}
                                  </p>
                                )}

                              </div>

                            </div>

                          </td>

                          {/* CORP ID */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2">

                              <Building2
                                size={14}
                                className={
                                  isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }
                              />

                              <span
                                className={`font-medium ${
                                  isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                }`}
                              >
                                {settlement?.company_id ||
                                  "-"}
                              </span>

                            </div>

                          </td>

                          {/* ACCOUNT NUMBER */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2">

                              <CreditCard
                                size={14}
                                className={
                                  isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }
                              />

                              <span
                                className={`font-mono ${
                                  isDark
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                }`}
                              >
                                {settlement?.account_number ||
                                  "-"}
                              </span>

                            </div>

                          </td>

                          {/* IFSC */}

                          <td className="px-6 py-4">

                            <span
                              className={`font-mono ${
                                isDark
                                  ? "text-indigo-300"
                                  : "text-indigo-600"
                              }`}
                            >
                              {settlement?.ifsc_code ||
                                "-"}
                            </span>

                          </td>

                          {/* VALIDATION */}

                          <td className="px-6 py-4">

                            <ValidatedBadge
                              val={
                                settlement?.is_validated
                              }
                            />

                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-4">

                            <StatusBadge
                              status={
                                settlement?.status
                              }
                              isDark={isDark}
                            />

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan={6}
                        className="py-14 text-center"
                      >

                        <div className="flex flex-col items-center gap-3">

                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                              isDark
                                ? "bg-gray-800"
                                : "bg-gray-100"
                            }`}
                          >
                            <Landmark
                              size={20}
                              className="text-gray-400"
                            />
                          </div>

                          <div>

                            <p
                              className={`text-sm font-medium ${
                                isDark
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }`}
                            >
                              No settlements found
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              Try changing your search
                              or status filter.
                            </p>

                          </div>

                        </div>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            <div
              className={`flex flex-col gap-3 border-t px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between ${
                isDark
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-600"
              }`}
            >

              {/* PER PAGE */}

              <div className="flex items-center">

                Show

                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(
                      Number(e.target.value)
                    );
                    setPage(1);
                  }}
                  className={`mx-2 rounded border p-1.5 outline-none ${
                    isDark
                      ? "border-gray-700 bg-gray-800 text-gray-200"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >

                  <option value={5}>
                    5
                  </option>

                  <option value={10}>
                    10
                  </option>

                  <option value={20}>
                    20
                  </option>

                  <option value={50}>
                    50
                  </option>

                </select>

                per page

              </div>

              {/* PAGINATION */}

              <div className="flex items-center gap-3">

                <span>

                  {totalRecords > 0
                    ? `${Math.min(
                        (page - 1) * perPage + 1,
                        totalRecords
                      )}-${Math.min(
                        page * perPage,
                        totalRecords
                      )} of ${totalRecords}`
                    : "0 of 0"}

                </span>

                {/* PREVIOUS */}

                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={page === 1}
                  className={`rounded-lg p-1.5 ${
                    page === 1
                      ? "opacity-30 cursor-not-allowed"
                      : isDark
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                {/* CURRENT PAGE */}

                <span className="font-bold">
                  {page}
                </span>

                {/* NEXT */}

                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                    )
                  }
                  disabled={page >= totalPages}
                  className={`rounded-lg p-1.5 ${
                    page >= totalPages
                      ? "opacity-30 cursor-not-allowed"
                      : isDark
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Getallsettlements;
