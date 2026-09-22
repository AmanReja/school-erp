import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Filter,
  Store,
  CalendarDays,
  UserRound,
  FileText,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

import { Theme } from "../../Contexts/Theme";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/action";

const ActiveMerchants = () => {
  const dispatch = useDispatch();

  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Active Merchants page
  // 1 = Active
  const [isActive, setIsActive] = useState("Active");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // =========================
  // REDUX DATA
  // =========================
  const merchantData = useSelector(
    (state) => state.merchants?.merchants || {}
  );

  const merchants = merchantData?.data || [];

  const total = Number(merchantData?.total || 0);

  const totalPages = Math.max(
    Number(merchantData?.totalPages || 1),
    1
  );

  // =========================
  // FETCH ACTIVE MERCHANTS
  // =========================
  useEffect(() => {
    dispatch(
      getDetails(
        currentPage,
        itemsPerPage,
        search,
        isActive
      )
    );
  }, [
    dispatch,
    currentPage,
    itemsPerPage,
    search,
    isActive,
  ]);

  // =========================
  // SEARCH
  // =========================
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // =========================
  // KYC FILTER
  // =========================
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  // =========================
  // PAGE SIZE
  // =========================
  const handleLimitChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    setSearch("");
    setStatus("All");
    setIsActive("1");
    setCurrentPage(1);
    setItemsPerPage(10);
  };

  // =========================
  // PAGINATION
  // =========================
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // =========================
  // KYC STATUS
  // =========================
  const getKycStatus = (value) => {
    if (
      Number(value) === 1 ||
      value === "Completed"
    ) {
      return "Completed";
    }

    return "Pending";
  };

  const kycStatusClass = (value) => {
    const completed =
      Number(value) === 1 ||
      value === "Completed";

    if (completed) {
      return isDark
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-green-50 text-green-600 border-green-200";
    }

    return isDark
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      : "bg-yellow-50 text-yellow-600 border-yellow-200";
  };

  // =========================
  // KYC FILTER
  // =========================
  /*
    Search is already sent to backend.

    Active status is already sent to backend:
    is_active = 1

    KYC status is not being sent to backend,
    so we can filter the current page locally.
  */
  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const kycStatus = getKycStatus(
        merchant.kyc_status
      );

      return (
        status === "All" ||
        status === kycStatus
      );
    });
  }, [merchants, status]);

  // =========================
  // KYC COUNTS
  // =========================
  const completedKycCount = merchants.filter(
    (merchant) =>
      Number(merchant.kyc_status) === 1 ||
      merchant.kyc_status === "Completed"
  ).length;

  const pendingKycCount =
    merchants.length - completedKycCount;

  // =========================
  // ROW START / END
  // =========================
  const startItem =
    total === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    total
  );

  // =========================
  // VIEW MERCHANT
  // =========================
  const handleViewMerchant = (merchant) => {
    console.log("View merchant:", merchant);

    // Add your navigation / drawer logic here
    // Example:
    // navigate(`/dashboard/merchant/${merchant.id}`);
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-colors duration-200 ${
        isDark
          ? "bg-[#0f172a] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isDark
                ? "bg-green-500/10 text-green-400"
                : "bg-green-50 text-green-600"
            }`}
          >
            <Store size={22} />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Active Merchants
            </h1>

            <p
              className={`text-sm mt-0.5 ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Manage and monitor active merchants
            </p>
          </div>
        </div>

        {/* TOTAL ACTIVE */}
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
            isDark
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              isDark
                ? "bg-green-500/10 text-green-400"
                : "bg-green-50 text-green-600"
            }`}
          >
            <CheckCircle2 size={19} />
          </div>

          <div>
            <p
              className={`text-xs ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Total Active
            </p>

            <p className="text-lg font-bold">
              {total}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* SUMMARY CARDS */}
      {/* ========================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* ACTIVE */}
        <div
          className={`rounded-2xl border p-5 ${
            isDark
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Active Merchants
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {total}
              </h3>
            </div>

            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-green-500/10 text-green-400"
                  : "bg-green-50 text-green-600"
              }`}
            >
              <Store size={21} />
            </div>
          </div>
        </div>

        {/* KYC COMPLETED */}
        <div
          className={`rounded-2xl border p-5 ${
            isDark
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                KYC Completed
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {completedKycCount}
              </h3>
            </div>

            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <CheckCircle2 size={21} />
            </div>
          </div>
        </div>

        {/* KYC PENDING */}
        <div
          className={`rounded-2xl border p-5 ${
            isDark
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                KYC Pending
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {pendingKycCount}
              </h3>
            </div>

            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              <FileText size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* FILTER CARD */}
      {/* ========================================= */}
      <div
        className={`rounded-2xl border p-4 mb-6 ${
          isDark
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col xl:flex-row gap-3">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={18}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search merchant, email, mobile, corp ID..."
              className={`w-full h-11 pl-10 pr-4 rounded-xl border outline-none transition ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-white placeholder:text-gray-500 focus:border-green-500"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-green-500"
              }`}
            />
          </div>

          {/* KYC FILTER */}
          <div className="relative">
            <Filter
              size={17}
              className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                isDark
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            />

            <select
              value={status}
              onChange={handleStatusChange}
              className={`h-11 pl-9 pr-9 rounded-xl border outline-none appearance-none min-w-[160px] ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              <option value="All">
                All KYC
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Pending">
                Pending
              </option>
            </select>
          </div>

          {/* PAGE LIMIT */}
          <select
            value={itemsPerPage}
            onChange={handleLimitChange}
            className={`h-11 px-4 rounded-xl border outline-none ${
              isDark
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-gray-50 border-gray-200 text-gray-700"
            }`}
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>

          {/* RESET */}
          <button
            type="button"
            onClick={handleReset}
            className={`h-11 px-4 rounded-xl border flex items-center justify-center gap-2 transition ${
              isDark
                ? "border-slate-700 bg-slate-900 text-gray-300 hover:bg-slate-700"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <RotateCcw size={17} />
            Reset
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* TABLE */}
      {/* ========================================= */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead
              className={
                isDark
                  ? "bg-slate-900/70"
                  : "bg-gray-50"
              }
            >
              <tr
                className={`text-left text-xs uppercase tracking-wider ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                <th className="px-5 py-4 font-semibold">
                  Merchant
                </th>

                <th className="px-5 py-4 font-semibold">
                  Mobile
                </th>

                <th className="px-5 py-4 font-semibold">
                  Email
                </th>

                <th className="px-5 py-4 font-semibold">
                  Corp ID
                </th>

                <th className="px-5 py-4 font-semibold">
                  PAN
                </th>

                <th className="px-5 py-4 font-semibold">
                  GST
                </th>

                <th className="px-5 py-4 font-semibold">
                  KYC
                </th>

                <th className="px-5 py-4 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody
              className={
                isDark
                  ? "divide-y divide-slate-700"
                  : "divide-y divide-gray-100"
              }
            >
              {filteredMerchants.length > 0 ? (
                filteredMerchants.map(
                  (merchant, index) => {
                    const kycStatus =
                      getKycStatus(
                        merchant.kyc_status
                      );

                    return (
                      <tr
                        key={
                          merchant.id ||
                          merchant.userid ||
                          merchant.corp_id ||
                          index
                        }
                        className={`transition ${
                          isDark
                            ? "hover:bg-slate-700/40"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {/* MERCHANT */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                isDark
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-green-50 text-green-600"
                              }`}
                            >
                              <UserRound
                                size={18}
                              />
                            </div>

                            <div>
                              <p className="font-semibold text-sm">
                                {merchant.name ||
                                  merchant.merchant_name ||
                                  "-"}
                              </p>

                              <p
                                className={`text-xs mt-0.5 ${
                                  isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }`}
                              >
                                {merchant.userid ||
                                  merchant.login_id ||
                                  "-"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* MOBILE */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span>
                              {merchant.mobile_number ||
                                merchant.mobile ||
                                "-"}
                            </span>
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td className="px-5 py-4">
                          <span className="text-sm">
                            {merchant.email || "-"}
                          </span>
                        </td>

                        {/* CORP ID */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                              isDark
                                ? "bg-slate-700 text-gray-300"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {merchant.corp_id ||
                              "-"}
                          </span>
                        </td>

                        {/* PAN */}
                        <td className="px-5 py-4">
                          <span className="text-sm">
                            {merchant.pan ||
                              merchant.pan_number ||
                              "-"}
                          </span>
                        </td>

                        {/* GST */}
                        <td className="px-5 py-4">
                          <span className="text-sm">
                            {merchant.gst ||
                              merchant.gst_number ||
                              "-"}
                          </span>
                        </td>

                        {/* KYC */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${kycStatusClass(
                              merchant.kyc_status
                            )}`}
                          >
                            <CheckCircle2
                              size={13}
                            />

                            {kycStatus}
                          </span>
                        </td>

                        {/* ACTION */}
                        <td className="px-5 py-4">
                          <div className="flex justify-center">
                            <button
                              type="button"
                              onClick={() =>
                                handleViewMerchant(
                                  merchant
                                )
                              }
                              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                isDark
                                  ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              }`}
                            >
                              <Eye size={16} />
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${
                          isDark
                            ? "bg-slate-700 text-gray-500"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Store size={24} />
                      </div>

                      <p className="font-semibold">
                        No active merchants found
                      </p>

                      <p
                        className={`text-sm mt-1 ${
                          isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
                        Try changing your search or
                        KYC filter.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ========================================= */}
        {/* PAGINATION */}
        {/* ========================================= */}
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
              {total}
            </span>{" "}
            merchants
          </div>

          {/* PAGINATION */}
          <div className="flex items-center gap-1.5">
            {/* PREVIOUS */}
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition ${
                currentPage === 1
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
              (page, index) => {
                if (page === "...") {
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
                  currentPage === page;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                      active
                        ? "bg-green-600 text-white"
                        : isDark
                        ? "text-gray-300 hover:bg-slate-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
            )}

            {/* NEXT */}
            <button
              type="button"
              onClick={handleNext}
              disabled={
                currentPage === totalPages
              }
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition ${
                currentPage === totalPages
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
    </div>
  );
};

export default ActiveMerchants;