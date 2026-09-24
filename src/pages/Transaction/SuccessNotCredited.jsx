import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  Download,
  Undo2,
} from "lucide-react";

import { Theme } from "../../Contexts/Theme";

import { useDispatch, useSelector } from "react-redux";

import {
  getall_txn_data,
} from "../../redux/action";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRange } from "react-date-range";

const SuccessNotCredited = () => {
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  const dispatch = useDispatch();

  // ==========================================
  // FILTER STATES
  // ==========================================

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [load, setLoad] = useState(false);

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [isDownloading, setIsDownloading] =
    useState(false);

  // ==========================================
  // REDUX TRANSACTION DATA
  // ==========================================

  const transactionData = useSelector(
    (state) =>
      state.transactions?.transactions || {}
  );

  const transactionDataArray =
    transactionData?.data || [];

  const totalRecords =
    Number(
      transactionData?.pagination?.totalRecords || 0
    );

  const totalPages =
    Number(
      transactionData?.pagination?.totalPages || 0
    );

  // ==========================================
  // FETCH TRANSACTIONS
  // ==========================================

  useEffect(() => {
    dispatch(
      getall_txn_data(
        search,
        status,
        page,
        perPage,
        false,
        setLoad,
        dateRange.startDate,
        dateRange.endDate
      )
    );
  }, [
    dispatch,
    search,
    status,
    page,
    perPage,
    dateRange.startDate,
    dateRange.endDate,
  ]);

  // ==========================================
  // RESET PAGE WHEN FILTER CHANGES
  // ==========================================

  useEffect(() => {
    setPage(1);
  }, [
    search,
    status,
    dateRange.startDate,
    dateRange.endDate,
  ]);

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      await dispatch(
        getall_txn_data(
          search,
          status,
          page,
          perPage,
          true,
          setLoad,
          dateRange.startDate,
          dateRange.endDate
        )
      );
    } catch (error) {
      console.error(
        "Download error:",
        error
      );
    } finally {
      setIsDownloading(false);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ==========================================
  // STATUS
  // ==========================================

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // ==========================================
  // DATE RANGE
  // ==========================================

  const handleDateChange = (ranges) => {
    const start =
      ranges.selection.startDate.toLocaleDateString(
        "en-CA"
      );

    const end =
      ranges.selection.endDate.toLocaleDateString(
        "en-CA"
      );

    setDateRange({
      startDate: start,
      endDate: end,
    });

    setShowDatePicker(false);
    setPage(1);
  };

  // ==========================================
  // CLEAR DATE
  // ==========================================

  const handleClearDate = () => {
    setDateRange({
      startDate: "",
      endDate: "",
    });

    setShowDatePicker(false);
    setPage(1);
  };

  // ==========================================
  // RESET ALL FILTERS
  // ==========================================

  const handleReset = () => {
    setSearch("");
    setStatus("");

    setDateRange({
      startDate: "",
      endDate: "",
    });

    setPage(1);
    setPerPage(10);
    setShowDatePicker(false);
  };

  // ==========================================
  // PAGE SIZE
  // ==========================================

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  // ==========================================
  // PREVIOUS
  // ==========================================

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // ==========================================
  // NEXT
  // ==========================================

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // ==========================================
  // PAGE NUMBERS
  // ==========================================

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 1) {
      return [1];
    }

    if (totalPages <= 7) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(
      totalPages - 1,
      page + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // ==========================================
  // RESULT RANGE
  // ==========================================

  const startItem =
    totalRecords === 0
      ? 0
      : (page - 1) * perPage + 1;

  const endItem = Math.min(
    page * perPage,
    totalRecords
  );

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const statusClass = (value) => {
    const currentStatus =
      String(value || "").toUpperCase();

    if (currentStatus === "SUCCESS") {
      return isDark
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-green-50 text-green-600 border-green-200";
    }

    if (currentStatus === "PENDING") {
      return isDark
        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
        : "bg-yellow-50 text-yellow-600 border-yellow-200";
    }

    if (
      currentStatus === "FAILURE" ||
      currentStatus === "FAILED"
    ) {
      return isDark
        ? "bg-red-500/10 text-red-400 border-red-500/20"
        : "bg-red-50 text-red-600 border-red-200";
    }

    return isDark
      ? "bg-gray-800 text-gray-400 border-gray-700"
      : "bg-gray-100 text-gray-600 border-gray-200";
  };

  // ==========================================
  // SUMMARY COUNTS
  // ==========================================

  const successCount = useMemo(() => {
    return transactionDataArray.filter(
      (txn) =>
        String(txn.status || "").toUpperCase() ===
        "SUCCESS"
    ).length;
  }, [transactionDataArray]);

  const pendingCount = useMemo(() => {
    return transactionDataArray.filter(
      (txn) =>
        String(txn.status || "").toUpperCase() ===
        "PENDING"
    ).length;
  }, [transactionDataArray]);

  const failureCount = useMemo(() => {
    return transactionDataArray.filter((txn) => {
      const value = String(
        txn.status || ""
      ).toUpperCase();

      return (
        value === "FAILURE" ||
        value === "FAILED"
      );
    }).length;
  }, [transactionDataArray]);

  // ==========================================
  // FORMAT AMOUNT
  // ==========================================

  const formatAmount = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  return (
    <div
      className={`w-full rounded-2xl border ${
        isDark
          ? "bg-gray-950 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div
        className={`px-5 py-5 border-b ${
          isDark
            ? "border-gray-800"
            : "border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-orange-500/10 text-red-400"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <AlertCircle size={21} />
            </div>

            <div>
              <h2
                className={`text-lg font-semibold ${
                  isDark
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
               Success Not Credited
              </h2>

              <p
                className={`text-xs mt-0.5 ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                Review and manage transactions.
              </p>
            </div>
          </div>

          {/* TOTAL */}
          <div
            className={`px-4 py-2 rounded-xl border ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p
              className={`text-[10px] uppercase tracking-wider ${
                isDark
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              Total Transactions
            </p>

            <p
              className={`text-lg font-bold ${
                isDark
                  ? "text-gray-100"
                  : "text-gray-800"
              }`}
            >
              {totalRecords}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* SUMMARY */}
      {/* ========================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5">
        {/* SUCCESS */}
        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Success
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
            {successCount}
          </p>
        </div>

        {/* PENDING */}
        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Pending
            </span>

            <AlertCircle
              size={16}
              className="text-yellow-500"
            />
          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {pendingCount}
          </p>
        </div>

        {/* FAILURE */}
        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Failed
            </span>

            <FileText
              size={16}
              className="text-red-500"
            />
          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {failureCount}
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* FILTER */}
      {/* ========================================== */}

      <div className="px-5 pb-5">
        <div className="flex flex-col lg:flex-row gap-3">
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
              placeholder="Search transactions..."
              value={search}
              onChange={handleSearch}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-indigo-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400"
              }`}
            />
          </div>

          {/* DATE */}

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowDatePicker(
                  !showDatePicker
                )
              }
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <CalendarDays size={15} />

              {dateRange.startDate &&
              dateRange.endDate
                ? `${dateRange.startDate} → ${dateRange.endDate}`
                : "Filter by Date"}
            </button>

            {/* DATE PICKER */}

            {showDatePicker && (
              <div
                className={`absolute right-0 top-12 z-50 shadow-xl rounded-lg overflow-hidden border ${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <DateRange
                  ranges={[
                    {
                      startDate:
                        dateRange.startDate
                          ? new Date(
                              dateRange.startDate
                            )
                          : new Date(),

                      endDate:
                        dateRange.endDate
                          ? new Date(
                              dateRange.endDate
                            )
                          : new Date(),

                      key: "selection",
                    },
                  ]}
                  moveRangeOnFirstSelection={
                    false
                  }
                  onChange={handleDateChange}
                />
              </div>
            )}
          </div>

          {/* CLEAR DATE */}

          {(dateRange.startDate ||
            dateRange.endDate) && (
            <button
              type="button"
              onClick={handleClearDate}
              className={`inline-flex items-center justify-center px-3 py-2.5 rounded-lg border ${
                isDark
                  ? "border-gray-800 text-gray-400 hover:bg-gray-900"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Undo2 size={15} />
            </button>
          )}

          {/* STATUS */}

          {/* <div className="relative">
            <Filter
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={status}
              onChange={handleStatusChange}
              className={`appearance-none pl-9 pr-9 py-2.5 rounded-lg border text-sm outline-none ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-300"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              <option value="">
                All Status
              </option>

              <option value="SUCCESS">
                SUCCESS
              </option>

              <option value="PENDING">
                PENDING
              </option>

              <option value="FAILURE">
                FAILURE
              </option>
            </select>
          </div> */}

          {/* RESET */}

          <button
            type="button"
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

          {/* DOWNLOAD */}

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition ${
              isDownloading
                ? "bg-green-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <Download size={15} />

            {isDownloading
              ? "Downloading..."
              : "Download"}
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* TABLE */}
      {/* ========================================== */}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr
              className={`border-y text-[11px] uppercase tracking-wider ${
                isDark
                  ? "bg-gray-900/70 border-gray-800 text-gray-500"
                  : "bg-gray-50 border-gray-200 text-gray-500"
              }`}
            >
              <th className="px-5 py-3">
                Account
              </th>

              <th className="px-5 py-3">
                Amount
              </th>

              <th className="px-5 py-3">
                Date
              </th>

              <th className="px-5 py-3">
                IFSC
              </th>

              <th className="px-5 py-3">
                RRN
              </th>

              <th className="px-5 py-3">
                Transaction
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
            {/* LOADING */}

            {load ? (
              <tr>
                <td
                  colSpan="8"
                  className="py-12"
                >
                  <div className="flex justify-center items-center">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                </td>
              </tr>
            ) : transactionDataArray.length >
              0 ? (
              transactionDataArray.map(
                (txn, index) => {
                  const currentStatus =
                    String(
                      txn.status || ""
                    ).toUpperCase();

                  return (
                    <tr
                      key={
                        txn.txn_id ||
                        txn.id ||
                        index
                      }
                      className={`border-b transition ${
                        isDark
                          ? "border-gray-800 hover:bg-gray-900/60"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      {/* ACCOUNT */}

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <p
                            className={`text-xs font-semibold ${
                              isDark
                                ? "text-gray-100"
                                : "text-gray-800"
                            }`}
                          >
                            BANK:{" "}
                            <span className="font-normal text-gray-500">
                              {txn.bank_name ||
                                "-"}
                            </span>
                          </p>

                          <p className="text-xs text-gray-500">
                            A/C:{" "}
                            <span className="font-medium">
                              {txn.account_no ||
                                "-"}
                            </span>
                          </p>

                          <p className="text-[11px] text-gray-500">
                            Corp ID:{" "}
                            <span className="font-medium">
                              {txn.company_id ||
                                "-"}
                            </span>
                          </p>
                        </div>
                      </td>

                      {/* AMOUNT */}

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <p
                            className={`text-xs ${
                              isDark
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            Amt:{" "}
                            <span className="font-semibold">
                              ₹
                              {formatAmount(
                                txn.settlement_amount
                              )}
                            </span>
                          </p>

                          <p className="text-xs text-gray-500">
                            Chg:{" "}
                            <span className="font-semibold">
                              ₹
                              {formatAmount(
                                txn.settlement_charge
                              )}
                            </span>
                          </p>
                        </div>
                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays
                            size={14}
                            className="text-gray-400"
                          />

                          <span className="text-sm text-gray-500">
                            {txn.txn_date ||
                              "-"}
                          </span>
                        </div>
                      </td>

                      {/* IFSC */}

                      <td className="px-5 py-4">
                        <span className="text-sm">
                          {txn.ifsc_code ||
                            "-"}
                        </span>
                      </td>

                      {/* RRN */}

                      <td className="px-5 py-4">
                        <span className="text-sm">
                          {txn.rrn || "-"}
                        </span>
                      </td>

                      {/* TRANSACTION */}

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="text-xs">
                            Txn ID:{" "}
                            <span className="font-medium">
                              {txn.txn_id ||
                                "-"}
                            </span>
                          </p>

                          <p className="text-xs text-gray-500">
                            Mode:{" "}
                            <span className="font-medium">
                              {txn.mode || "-"}
                            </span>
                          </p>

                          <p className="text-[11px] text-gray-500">
                            Paytm:{" "}
                            {txn.paytmOrderId ||
                              "-"}
                          </p>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-md border text-xs font-medium ${statusClass(
                            currentStatus
                          )}`}
                        >
                          {currentStatus ||
                            "UNKNOWN"}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                            isDark
                              ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                          }`}
                        >
                          <Eye size={13} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              /* NO DATA */

              <tr>
                <td
                  colSpan="8"
                  className="py-12"
                >
                  <div
                    className={`flex flex-col justify-center items-center ${
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    <FileText
                      size={30}
                      className="mb-2"
                    />

                    <span className="text-sm">
                      No transaction data found
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ========================================== */}
      {/* PAGINATION */}
      {/* ========================================== */}

      {totalPages > 0 && (
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
              {totalRecords}
            </span>{" "}
            transactions
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

            {getPageNumbers().map(
              (pageNumber, index) => {
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

                const active =
                  page === pageNumber;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() =>
                      setPage(pageNumber)
                    }
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
              }
            )}

            {/* NEXT */}

            <button
              type="button"
              onClick={handleNext}
              disabled={page === totalPages}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition ${
                page === totalPages
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
      )}
    </div>
  );
};

export default SuccessNotCredited;