import React, { useEffect, useState, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

import flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";

import Contentloader from "../Components/Contentloader";
import { Theme } from "../Contexts/Theme";
import { getWalletLedger } from "../redux/action";

import "../App.css";

const LedgerByCompany = () => {
  const { theme } = useContext(Theme);
  const { corpid } = useParams();
  const dispatch = useDispatch();

  // =========================
  // STATE
  // =========================

  const [load, setLoad] = useState(false);

  const [searchtr, setSearchtr] = useState("");
  const [fstatus, setfstatus] = useState("");

  const [formdatastr, setFormdatastr] = useState("");
  const [formdataend, setFormdataend] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const dateRangeRef = useRef(null);

  // =========================
  // QUICK DATE OPTIONS
  // =========================

  const options = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range",
  ];

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-CA").format(date);
  };

  // =========================
  // INITIAL DATE
  // =========================

  useEffect(() => {
    const today = new Date();

    setSelected("Today");

    setDate({
      startDate: today,
      endDate: today,
    });

    setFormdatastr(formatDate(today));
    setFormdataend(formatDate(today));
  }, []);

  // =========================
  // UPDATE DATE STRING
  // =========================

  useEffect(() => {
    if (date.startDate && date.endDate) {
      setFormdatastr(formatDate(date.startDate));
      setFormdataend(formatDate(date.endDate));
    }
  }, [date]);

  // =========================
  // FLATPICKR
  // =========================

  useEffect(() => {
    if (!dateRangeRef.current) return;

    const today = new Date();

    const picker = flatpickr(dateRangeRef.current, {
      mode: "range",
      dateFormat: "d-m-y",

      defaultDate: [today, today],

      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          const [start, end] = selectedDates;

          setSelected("Custom Range");

          setDate({
            startDate: start,
            endDate: end,
          });
        }
      },
    });

    return () => {
      picker.destroy();
    };
  }, []);

  // =========================
  // REDUX
  // =========================

  const ledgerState = useSelector(
    (state) => state.ledger.ledger
  );

  const walletLedger = ledgerState?.data || [];

  const pagination = ledgerState?.pagination || {};

  const totalpage = pagination?.totalPages || 0;

  const totaldata = pagination?.totalRecords || 0;

  console.log("Wallet Ledger:", ledgerState);
  console.log("Wallet Ledger Data:", walletLedger);

  // =========================
  // FETCH LEDGER
  // =========================

  useEffect(() => {
    if (!corpid) return;

    if (!formdatastr || !formdataend) return;

    const fetchdata = async () => {
      setLoad(true);

      try {
        await dispatch(
          getWalletLedger(
            corpid,
            searchtr,
            fstatus,
            formdatastr,
            formdataend,
            page,
            perPage
          )
        );
      } catch (error) {
        console.log("Wallet ledger error:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchdata();
  }, [
    dispatch,
    corpid,
    searchtr,
    fstatus,
    formdatastr,
    formdataend,
    page,
    perPage,
  ]);

  // =========================
  // DOWNLOAD
  // =========================

  const downloadexcel = () => {
    dispatch(
      getWalletLedger(
        corpid,
        searchtr,
        fstatus,
        formdatastr,
        formdataend,
        page,
        perPage,
        true
      )
    );
  };

  // =========================
  // OUTSIDE CLICK
  // =========================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-wrapper")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // =========================
  // AMOUNT FORMAT
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
  // DATE TIME FORMAT
  // =========================

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";

    const parsed = new Date(dateTime);

    if (Number.isNaN(parsed.getTime())) {
      return dateTime;
    }

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div
      className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-white text-gray-800"
      }`}
    >
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-col gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">

          {/* =====================================================
              HEADER
          ====================================================== */}

          <div
            className={`w-full h-auto min-h-[80px] flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 rounded-xl ${
              theme === "dark"
                ? "bg-gray-900"
                : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3">

              <div
                className={`p-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-gray-800"
                    : "bg-indigo-50"
                }`}
              >
                <Wallet
                  className={`w-6 h-6 ${
                    theme === "dark"
                      ? "text-indigo-400"
                      : "text-indigo-600"
                  }`}
                />
              </div>

              <div className="flex flex-col">

                <h1
                  className={`text-xl font-semibold ${
                    theme === "dark"
                      ? "text-gray-100"
                      : "text-gray-800"
                  }`}
                >
                  Wallet Ledger
                </h1>

                <p
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Overview of all wallet transactions including
                  credit, debit, balance and status.
                </p>

              </div>

            </div>

          </div>

          {/* =====================================================
              SUMMARY CARDS
          ====================================================== */}

          {/* <div
            className={`flex flex-col sm:flex-row gap-5 rounded-xl p-5 ${
              theme === "dark"
                ? "bg-gray-900"
                : "bg-white"
            }`}
          >
            {load ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 min-h-[80px] animate-pulse flex flex-col items-center justify-center text-center rounded-lg p-4 shadow-sm ${
                    theme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div role="status">

                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1894 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />

                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10124 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0501 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5618 82.5849 25.841C84.9175 28.9121 86.7991 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>

                    <span className="sr-only">
                      Loading...
                    </span>

                  </div>
                </div>
              ))
            ) : (
              (() => {
                const totalCredit = walletLedger.reduce(
                  (sum, item) =>
                    String(item?.txn_mode).toUpperCase() === "CR"
                      ? sum + Number(item?.txn_amount || 0)
                      : sum,
                  0
                );

                const totalDebit = walletLedger.reduce(
                  (sum, item) =>
                    String(item?.txn_mode).toUpperCase() === "DR"
                      ? sum + Number(item?.txn_amount || 0)
                      : sum,
                  0
                );

                const lastBalance =
                  [...walletLedger]
                    .reverse()
                    .find(
                      (item) =>
                        item?.post_balance !== null &&
                        item?.post_balance !== undefined
                    )?.post_balance || 0;

                const summaryCards = [
                  {
                    label: "Total Credit",
                    value: totalCredit,
                  },
                  {
                    label: "Total Debit",
                    value: totalDebit,
                  },
                  {
                    label: "Current Balance",
                    value: lastBalance,
                  },
                  {
                    label: "Transactions",
                    value: totaldata,
                    number: true,
                  },
                ];

                return summaryCards.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-1 flex flex-col items-center justify-center text-center rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <h1 className="text-2xl font-semibold">

                      {item.number
                        ? item.value
                        : `₹ ${formatAmount(item.value)}`}

                    </h1>

                    <p
                      className={`text-sm mt-1 ${
                        theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                ));
              })()
            )}
          </div> */}

          {/* =====================================================
              TABLE + FILTER SECTION
          ====================================================== */}

          <div className="w-full px-[20px] mt-[20px]">

            <div
              className={`flex w-full h-full flex-col rounded-xl overflow-y-auto border-[1px] ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            >

              {/* =================================================
                  HEADER + FILTERS
              ================================================== */}

              <div
                className={`flex justify-between items-center p-4 py-6 w-full flex-wrap gap-4 shadow-sm border-b ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
              >

                <div className="flex items-center gap-2">

                  <Wallet
                    className={`w-5 h-5 ${
                      theme === "dark"
                        ? "text-indigo-400"
                        : "text-indigo-600"
                    }`}
                  />

                  <h2
                    className={`text-lg font-semibold ${
                      theme === "dark"
                        ? "text-gray-100"
                        : "text-gray-800"
                    }`}
                  >
                    Wallet Ledger
                  </h2>

                </div>

                <div className="flex gap-3 flex-wrap items-center">

                  {/* =================================================
                      CALENDAR
                  ================================================== */}

                  <div
                    className={`pl-[5px] border-[1px] p-1 rounded flex justify-center items-center gap-2 ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-300"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >

                    <i
                      className={`fa-solid fa-calendar-days ${
                        theme === "dark"
                          ? "text-gray-500"
                          : "text-gray-300"
                      }`}
                    ></i>

                    <input
                      className={`w-[180px] text-[14px] bg-transparent outline-none rounded ${
                        theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-400"
                      }`}
                      type="text"
                      ref={dateRangeRef}
                    />

                  </div>

                  {/* =================================================
                      QUICK DATE DROPDOWN
                  ================================================== */}

                  <div className="relative w-[180px]">

                    <button
                      onClick={() => setOpen(!open)}
                      className={`dropdown-wrapper flex justify-between w-full items-center px-4 py-2 rounded-lg border text-sm transition-all ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-700"
                      }`}
                    >

                      <span>{selected}</span>

                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />

                    </button>

                    {open && (
                      <ul
                        className={`absolute top-full left-0 mt-2 w-[200px] rounded-lg shadow-lg border z-20 max-h-80 overflow-y-auto ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-600 text-gray-100"
                            : "bg-white border-gray-200 text-gray-800"
                        }`}
                      >

                        {options.map((option) => (
                          <li
                            key={option}
                            onClick={() => {

                              setSelected(option);
                              setOpen(false);

                              const today = new Date();

                              let start;
                              let end;

                              if (option === "Custom Range") {

                                setDate({
                                  startDate: null,
                                  endDate: null,
                                });

                                setFormdatastr("");
                                setFormdataend("");

                                if (
                                  dateRangeRef.current?._flatpickr
                                ) {
                                  dateRangeRef.current._flatpickr.clear();
                                }

                                return;
                              }

                              switch (option) {

                                case "Today":
                                  start = end = today;
                                  break;

                                case "Yesterday":
                                  start = end = new Date(today);
                                  start.setDate(
                                    today.getDate() - 1
                                  );
                                  break;

                                case "Last 7 Days":
                                  start = new Date(today);
                                  start.setDate(
                                    today.getDate() - 6
                                  );
                                  end = today;
                                  break;

                                case "Last 30 Days":
                                  start = new Date(today);
                                  start.setDate(
                                    today.getDate() - 29
                                  );
                                  end = today;
                                  break;

                                case "This Month":
                                  start = new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    1
                                  );

                                  end = new Date(
                                    today.getFullYear(),
                                    today.getMonth() + 1,
                                    0
                                  );

                                  break;

                                case "Last Month":
                                  start = new Date(
                                    today.getFullYear(),
                                    today.getMonth() - 1,
                                    1
                                  );

                                  end = new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    0
                                  );

                                  break;

                                default:
                                  start = end = null;
                              }

                              if (start && end) {

                                setDate({
                                  startDate: start,
                                  endDate: end,
                                });

                                setFormdatastr(
                                  formatDate(start)
                                );

                                setFormdataend(
                                  formatDate(end)
                                );

                                if (
                                  dateRangeRef.current?._flatpickr
                                ) {
                                  dateRangeRef.current._flatpickr.setDate(
                                    [start, end],
                                    true
                                  );
                                }
                              }
                            }}
                            className={`px-4 py-2 flex justify-between items-center cursor-pointer text-sm transition-colors ${
                              theme === "dark"
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-100"
                            } ${
                              selected === option
                                ? "font-semibold"
                                : ""
                            }`}
                          >

                            <span>{option}</span>

                            {selected === option && (
                              <Check
                                className={`w-4 h-4 ${
                                  theme === "dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                }`}
                              />
                            )}

                          </li>
                        ))}

                      </ul>
                    )}

                  </div>

                  {/* =================================================
                      SEARCH
                  ================================================== */}

                  <div
                    className={`relative border px-2 py-1 rounded-lg ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >

                    <span
                      className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                        theme === "dark"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                    </span>

                    <input
                      value={searchtr}
                      onChange={(e) => {
                        setSearchtr(e.target.value);
                        setPage(1);
                      }}
                      type="text"
                      placeholder="Search Ledger..."
                      className={`pl-8 pr-2 outline-none text-sm bg-transparent ${
                        theme === "dark"
                          ? "text-gray-200"
                          : "text-gray-700"
                      }`}
                    />

                  </div>

                  {/* =================================================
                      STATUS
                  ================================================== */}

                  <div
                    className={`px-4 py-1 rounded-lg border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >

                    <select
                      value={fstatus}
                      onChange={(e) => {
                        setfstatus(e.target.value);
                        setPage(1);
                      }}
                      className={`text-sm bg-transparent outline-none ${
                        theme === "dark"
                          ? "text-gray-200"
                          : "text-gray-700"
                      }`}
                    >

                      <option
                        value=""
                        className={
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }
                      >
                        All Status
                      </option>

                      <option
                        value="SUCCESS"
                        className={
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }
                      >
                        Success
                      </option>

                      <option
                        value="PENDING"
                        className={
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }
                      >
                        Pending
                      </option>

                      <option
                        value="FAILED"
                        className={
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-800"
                        }
                      >
                        Failed
                      </option>

                    </select>

                  </div>

                  {/* =================================================
                      DOWNLOAD
                  ================================================== */}

                  <button
                    onClick={downloadexcel}
                    className={`text-sm font-medium hover:shadow-xl px-4 py-1 rounded-lg transition border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                  >

                    <i
                      className={`fa-solid fa-download ${
                        theme === "dark"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    ></i>{" "}

                    Download

                  </button>

                </div>

              </div>

              {/* =================================================
                  TABLE
              ================================================== */}

              <div className="overflow-x-auto">

                <table className="w-full text-sm text-left">

                  <thead
                    className={`text-[11px] uppercase border-t border-b ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300 border-gray-600"
                        : "bg-[#fcfcfc] text-gray-400 border-gray-300"
                    }`}
                  >

                    <tr>

                      <th className="px-4 py-4">
                        Status
                      </th>

                      <th className="px-4 py-4">
                        Txn Date
                      </th>

                      <th className="px-4 py-4">
                        Transaction
                      </th>

                      <th className="px-4 py-4">
                        Amount
                      </th>

                      <th className="px-4 py-4">
                        Before Balance
                      </th>

                      <th className="px-4 py-4">
                        After Balance
                      </th>

                      <th className="px-4 py-4">
                        Details
                      </th>

                      <th className="px-4 py-4">
                        Remarks
                      </th>

                    </tr>

                  </thead>

                  <tbody
                    className={`text-[12px] font-semibold ${
                      theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-800"
                    }`}
                  >

                    {/* =================================================
                        LOADING
                    ================================================== */}

                    {load ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <Contentloader key={i} />
                      ))
                    ) : Array.isArray(walletLedger) &&
                      walletLedger.length > 0 ? (

                      walletLedger.map((txn, i) => {

                        const txnMode = String(
                          txn?.txn_mode || ""
                        ).toUpperCase();

                        const isCredit = txnMode === "CR";
                        const isDebit = txnMode === "DR";

                        const status = String(
                          txn?.txn_status || ""
                        ).toUpperCase();

                        return (
                          <tr
                            key={
                              txn?.order_id ||
                              `${txn?.company_id}-${i}`
                            }
                            className={`border-b ${
                              theme === "dark"
                                ? "border-gray-700 hover:bg-gray-700/60"
                                : "border-gray-100 hover:bg-gray-50"
                            }`}
                          >

                            {/* =================================================
                                STATUS
                            ================================================== */}

                            <td className="px-4 py-3">

                              <span
                                className={`text-white rounded-[3px] px-[13px] py-[2px] font-bold text-[12px] ${
                                  status === "PENDING"
                                    ? "bg-yellow-500"
                                    : status === "SUCCESS"
                                    ? "bg-green-500"
                                    : status === "FAILED"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                                }`}
                              >
                                {txn?.txn_status || "-"}
                              </span>

                            </td>

                            {/* =================================================
                                DATE
                            ================================================== */}

                            <td className="px-4 py-3">

                              <div className="flex flex-col">

                                <p>
                                  {formatDateTime(
                                    txn?.date_time
                                  )}
                                </p>

                              </div>

                            </td>

                            {/* =================================================
                                TRANSACTION
                            ================================================== */}

                            <td className="px-4 py-3">

                              <div className="flex items-center gap-2">

                                <div
                                  className={`p-2 rounded-lg ${
                                    isCredit
                                      ? theme === "dark"
                                        ? "bg-green-900/40"
                                        : "bg-green-50"
                                      : theme === "dark"
                                      ? "bg-red-900/40"
                                      : "bg-red-50"
                                  }`}
                                >

                                  {isCredit ? (
                                    <ArrowDownLeft
                                      className={`w-4 h-4 ${
                                        theme === "dark"
                                          ? "text-green-400"
                                          : "text-green-600"
                                      }`}
                                    />
                                  ) : (
                                    <ArrowUpRight
                                      className={`w-4 h-4 ${
                                        theme === "dark"
                                          ? "text-red-400"
                                          : "text-red-600"
                                      }`}
                                    />
                                  )}

                                </div>

                                <div>

                                  <p>
                                    {txn?.txn_type || "-"}
                                  </p>

                                  <p
                                    className={`text-[11px] font-normal ${
                                      theme === "dark"
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {isCredit
                                      ? "Credit"
                                      : isDebit
                                      ? "Debit"
                                      : "-"}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* =================================================
                                AMOUNT
                            ================================================== */}

                            <td className="px-4 py-3">

                              <span
                                className={
                                  isCredit
                                    ? "text-green-600"
                                    : isDebit
                                    ? "text-red-600"
                                    : ""
                                }
                              >
                                {isCredit ? "+" : isDebit ? "-" : ""} ₹{" "}
                                {formatAmount(
                                  txn?.txn_amount
                                )}
                              </span>

                            </td>

                            {/* =================================================
                                BEFORE BALANCE
                            ================================================== */}

                            <td className="px-4 py-3">

                              ₹{" "}
                              {formatAmount(
                                txn?.pre_balance
                              )}

                            </td>

                            {/* =================================================
                                AFTER BALANCE
                            ================================================== */}

                            <td className="px-4 py-3">

                              <span className="font-bold">
                                ₹{" "}
                                {formatAmount(
                                  txn?.post_balance
                                )}
                              </span>

                            </td>

                            {/* =================================================
                                DETAILS
                            ================================================== */}

                            <td className="px-4 py-3">

                              <div className="flex flex-col">

                                <p>
                                  Txn ID:{" "}
                                  {txn?.order_id || "-"}
                                </p>

                                {txn?.company_id && (
                                  <p
                                    className={`text-[11px] font-normal ${
                                      theme === "dark"
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    Company:{" "}
                                    {txn.company_id}
                                  </p>
                                )}

                              </div>

                            </td>

                            {/* =================================================
                                REMARKS
                            ================================================== */}

                            <td className="px-4 py-3">

                              {txn?.remark || "-"}

                            </td>

                          </tr>
                        );
                      })

                    ) : (

                      <tr>

                        <td
                          colSpan={8}
                          className={`text-center py-10 ${
                            theme === "dark"
                              ? "text-gray-500"
                              : "text-gray-600"
                          }`}
                        >

                          <Wallet
                            className="mx-auto mb-2 w-8 h-8 opacity-40"
                          />

                          No ledger data found

                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

              {/* =================================================
                  PAGINATION
              ================================================== */}

              {totalpage > 0 ? (

                <div
                  className={`flex items-center justify-between px-4 py-3 border-t text-sm ${
                    theme === "dark"
                      ? "bg-gray-900 text-gray-300 border-gray-700"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >

                  {/* =================================================
                      PER PAGE
                  ================================================== */}

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
                        setPerPage(
                          Number(e.target.value)
                        );

                        setPage(1);
                      }}
                    >

                      <option value={10}>
                        10
                      </option>

                      <option value={20}>
                        20
                      </option>

                      <option value={30}>
                        30
                      </option>

                      <option value={50}>
                        50
                      </option>

                    </select>{" "}

                    per page

                  </div>

                  {/* =================================================
                      PAGINATION
                  ================================================== */}

                  <div className="flex items-center space-x-2">

                    {/* RANGE */}

                    <p>

                      {totaldata > 0
                        ? `${(page - 1) * perPage + 1}-${Math.min(
                            page * perPage,
                            totaldata
                          )} of ${totaldata}`
                        : "0 of 0"}

                    </p>

                    {/* PREVIOUS */}

                    <button
                      onClick={() =>
                        setPage((prev) =>
                          Math.max(prev - 1, 1)
                        )
                      }
                      disabled={page === 1}
                      className={`px-3 py-1 rounded-md ${
                        page === 1
                          ? "opacity-50 cursor-not-allowed"
                          : theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <ChevronLeft />
                    </button>

                    {/* FIRST PAGE */}

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

                    {/* DOTS */}

                    {page > 3 && (
                      <span className="px-2">
                        ...
                      </span>
                    )}

                    {/* NEARBY PAGES */}

                    {Array.from(
                      { length: 3 },
                      (_, i) => page - 1 + i
                    )
                      .filter(
                        (num) =>
                          num > 1 &&
                          num < totalpage
                      )
                      .map((num) => (
                        <button
                          key={num}
                          onClick={() =>
                            setPage(num)
                          }
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

                    {/* DOTS */}

                    {page < totalpage - 2 && (
                      <span className="px-2">
                        ...
                      </span>
                    )}

                    {/* LAST PAGE */}

                    {totalpage > 1 && (
                      <button
                        onClick={() =>
                          setPage(totalpage)
                        }
                        className={`px-3 py-1 rounded-md ${
                          page === totalpage
                            ? theme === "dark"
                              ? "bg-gray-700 font-semibold"
                              : "bg-gray-200 font-semibold"
                            : theme === "dark"
                            ? "hover:bg-gray-800"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {totalpage}
                      </button>
                    )}

                    {/* NEXT */}

                    <button
                      onClick={() =>
                        setPage((prev) =>
                          prev < totalpage
                            ? prev + 1
                            : prev
                        )
                      }
                      disabled={
                        page === totalpage
                      }
                      className={`px-3 py-1 rounded-md ${
                        page === totalpage
                          ? "opacity-50 cursor-not-allowed"
                          : theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <ChevronRight />
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

export default LedgerByCompany;