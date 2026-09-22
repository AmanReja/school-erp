import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Filter,
  Store,
  CalendarDays,
  UserRound,
  FileText,
  Eye,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getDetails } from "../../redux/action";
import { Theme } from "../../Contexts/Theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MerchantWiseDisputePanel from "../../models/MerchantWiseDisputePannel";

const Merchants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  // ==============================
  // State
  // ==============================

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDisputePanel, setShowDisputePanel] = useState(false);
const [selectedMerchant, setSelectedMerchant] = useState(null);

  // ==============================
  // Redux
  // ==============================

  const merchantData = useSelector(
    (state) => state.merchants?.merchants || {}
  );

  console.log("merchantData", merchantData);

  const merchants = merchantData?.data || [];
  const total = merchantData?.total || 0;
  const totalPages = merchantData?.totalPages || 1;

  // ==============================
  // Fetch merchants
  // ==============================

  useEffect(() => {
    dispatch(
      getDetails(
        currentPage,
        itemsPerPage,
        search
      )
    );
  }, [dispatch, currentPage, itemsPerPage, search]);

  // ==============================
  // Search
  // ==============================

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // ==============================
  // Limit
  // ==============================

  const handleLimitChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // ==============================
  // Reset
  // ==============================

  const handleReset = () => {
    setSearch("");
    setCurrentPage(1);
    setItemsPerPage(10);
  };

  // ==============================
  // Previous
  // ==============================

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ==============================
  // Next
  // ==============================

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // ==============================
  // Page numbers
  // ==============================

  const getPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  // ==============================
  // KYC status
  // ==============================

  const kycStatusClass = (value) => {
    if (Number(value) === 1) {
      return isDark
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-green-50 text-green-600 border-green-200";
    }

    if (Number(value) === 0) {
      return isDark
        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
        : "bg-yellow-50 text-yellow-600 border-yellow-200";
    }

    return isDark
      ? "bg-gray-800 text-gray-400 border-gray-700"
      : "bg-gray-100 text-gray-600 border-gray-200";
  };

  return (
    <div
      className={`w-full rounded-2xl border ${
        isDark
          ? "bg-gray-950 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* =========================================
          HEADER
      ========================================= */}

      <div
        className={`px-5 py-5 border-b ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Title */}

          <div className="flex items-center gap-3">

            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              <Store size={21} />
            </div>

            <div>

              <h2
                className={`text-lg font-semibold ${
                  isDark
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                Merchant Master
              </h2>
              
              <p
                className={`text-xs mt-0.5 ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                View and manage registered merchants.
              </p>

            </div>
            
  
          </div>

          {/* Total */}

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
              Total Merchants
            </p>

            <p
              className={`text-lg font-bold ${
                isDark
                  ? "text-gray-100"
                  : "text-gray-800"
              }`}
            >
              {total}
            </p>

          </div>

        </div>
      </div>

      {/* =========================================
          SUMMARY
      ========================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5">

        {/* Total */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >

          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Total Merchants
            </span>

            <Store
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
            {total}
          </p>

        </div>

        {/* Completed KYC */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >

          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              KYC Completed
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
            {
              merchants.filter(
                (merchant) =>
                  merchant.kyc_status === "Completed"
              ).length
            }
          </p>

        </div>

        {/* Pending KYC */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >

          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              KYC Pending
            </span>

            <FileText
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
            {
              merchants.filter(
                (merchant) =>
                  merchant.kyc_status !== "Completed"
              ).length
            }
          </p>

        </div>

      </div>

      {/* =========================================
          SEARCH / FILTER
      ========================================= */}

      <div className="px-5 pb-5">

        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}

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
              placeholder="Search merchant, email, mobile or Corp ID..."
              value={search}
              onChange={handleSearch}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-indigo-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400"
              }`}
            />

          </div>

          {/* Limit */}

          <div className="relative">

            <select
              value={itemsPerPage}
              onChange={handleLimitChange}
              className={`appearance-none px-4 pr-8 py-2.5 rounded-lg border text-sm outline-none ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-300"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
              <option value={100}>100 / page</option>
            </select>

          </div>

          {/* Reset */}

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

      {/* =========================================
          TABLE
      ========================================= */}

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
                Merchant
              </th>

              <th className="px-5 py-3">
                Mobile
              </th>

              <th className="px-5 py-3">
                Email
              </th>

              <th className="px-5 py-3">
                Corp ID
              </th>

              <th className="px-5 py-3">
                PAN
              </th>

              <th className="px-5 py-3">
                GST
              </th>

              <th className="px-5 py-3">
                KYC
              </th>

              {/* <th className="px-5 py-3">
                Created
              </th> */}

              <th className="px-5 py-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {merchants.length > 0 ? (

              merchants.map((merchant, index) => (

                <tr
                  key={merchant.userid || index}
                  className={`border-b transition ${
                    isDark
                      ? "border-gray-800 hover:bg-gray-900/60"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >

                  {/* Merchant */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2.5">

                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDark
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        <UserRound size={14} />
                      </div>

                      <div>

                        <p className="text-sm font-semibold">
                          {merchant.name || "-"}
                        </p>

                        <p className="text-[11px] text-gray-500">
                          ID: {merchant.userid || "-"}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Mobile */}

                  <td className="px-5 py-4">

                    <span className="text-sm">
                      {merchant.mobile_number || "-"}
                    </span>

                  </td>

                  {/* Email */}

                  <td className="px-5 py-4">

                    <span className="text-sm text-gray-500">
                      {merchant.email || "-"}
                    </span>

                  </td>

                  {/* Corp ID */}

                  <td className="px-5 py-4">

                    <span className="text-sm font-medium">
                      {merchant.corp_id || "-"}
                    </span>

                  </td>

                  {/* PAN */}

                  <td className="px-5 py-4">

                    <span className="text-sm text-gray-500">
                      {merchant.pan || "-"}
                    </span>

                  </td>

                  {/* GST */}

                  <td className="px-5 py-4">

                    <span className="text-sm text-gray-500">
                      {merchant.gst || "-"}
                    </span>

                  </td>

                  {/* KYC */}

                  <td className="px-5 py-4">

                    <span
                      className={`px-2.5 py-1 rounded-md border text-xs font-medium ${kycStatusClass(
                        merchant.kyc_status
                      )}`}
                    >
                      {Number(merchant.kyc_status)===1?"Completed":"Pending" || ""}
                    </span>

                  </td>

                  {/* Created */}

                  {/* <td className="px-5 py-4">

                    <div className="flex items-center gap-1.5">

                      <CalendarDays
                        size={14}
                        className="text-gray-400"
                      />

                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {merchant.create_on || "-"}
                      </span>

                    </div>

                  </td> */}

                  {/* Action */}

                  <td className="px-5 py-4">

                 <button
  onClick={() => {
    setSelectedMerchant(merchant);
    setShowDisputePanel(true);
  }}
  className="bg-blue-600 rounded-[5px] w-[60px] text-white text-[12px]"
>
  Manage Disputes
</button>
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="9"
                  className={`text-center py-12 text-sm ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  No merchants found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* =========================================
          PAGINATION FOOTER
      ========================================= */}

      <div
        className={`px-5 py-3 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-3 ${
          isDark
            ? "border-gray-800"
            : "border-gray-200"
        }`}
      >

        {/* Showing */}

        <span
          className={`text-xs ${
            isDark
              ? "text-gray-500"
              : "text-gray-500"
          }`}
        >
          Showing{" "}
          {total === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1}{" "}
          to{" "}
          {Math.min(
            currentPage * itemsPerPage,
            total
          )}{" "}
          of {total} merchants
        </span>

        {/* Pagination */}

        <div className="flex items-center gap-1.5">

          {/* Previous */}

          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : isDark
                ? "border-gray-800 text-gray-400 hover:bg-gray-900"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Numbers */}

          {getPageNumbers().map((pageNumber) => (

            <button
              key={pageNumber}
              onClick={() =>
                setCurrentPage(pageNumber)
              }
              className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
                currentPage === pageNumber
                  ? "bg-indigo-600 text-white"
                  : isDark
                  ? "text-gray-400 hover:bg-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>

          ))}

          {/* Next */}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : isDark
                ? "border-gray-800 text-gray-400 hover:bg-gray-900"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <ChevronRight size={16} />
          </button>

        </div>

      </div>
      <MerchantWiseDisputePanel
  isOpen={showDisputePanel}
  onClose={() => {
    setShowDisputePanel(false);
    setSelectedMerchant(null);
  }}
  corpId={selectedMerchant?.corp_id}
  merchantName={selectedMerchant?.corp_name || selectedMerchant?.name}
  isDark={isDark}
/>

    </div>
  );
};

export default Merchants;