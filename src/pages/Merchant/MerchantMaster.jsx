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
import CreateMerchantModal from "../../models/CreateMerchantModal";
import UpdateMerchantModal from "../../models/UpdateMerchantModal";

import { getDetails } from "../../redux/action";
import { Theme } from "../../Contexts/Theme";
import { useDispatch, useSelector } from "react-redux";
import MerchantWiseDetailsPannel from "../../models/MerchantWiseDetailsPannel";


const MerchantMaster = () => {
  const dispatch = useDispatch();

  const { theme } = useContext(Theme);
  const isDark = theme === "dark";
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  // const [selectedMerchant, setSelectedMerchant] = useState(null);

  // ==============================
  // State
  // ==============================
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
const [selectedMerchant, setSelectedMerchant] = useState(null);

  // ==============================
  // Redux
  // ==============================

const handleEdit = (merchant) => {
  setSelectedMerchant(merchant);
  setIsUpdateModalOpen(true);
};


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


    const startItem =
    total === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    total
  );

  // ==============================
  // Page numbers (truncated: 1 2 ... 10 style)
  // ==============================

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    if (rangeStart > 2) {
      pages.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

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
          <button
  onClick={() => setIsCreateModalOpen(true)}
  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium"
>
  + Create Merchant
</button>

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

                    <button onClick={()=>{handleEdit(merchant)}}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
                        isDark
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500 hover:text-white"
                          : "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white"
                      }`}
                    >
                      
                      Update
                    </button>

                  </td>
                  <td className="px-5 py-4">

                    <button onClick={()=>{
                      setSelectedMerchant(merchant)
                      setShowDetailsPanel(true)
                    }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
                        isDark
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500 hover:text-white"
                          : "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white"
                      }`}
                    >
                      
                      Details
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



          <div className="flex items-center gap-2">
  <span className="text-sm text-gray-500">Go to page</span>

  <input
    type="number"
    min={1}
    max={totalPages}
    value={currentPage}
    onChange={(e) => setCurrentPage(e.target.value)}
    
    className={`w-16 h-9 px-2 text-center rounded-lg border outline-none ${
      isDark
        ? "bg-gray-900 text-gray-200 border-slate-700"
        : "bg-white text-gray-700 border-gray-200"
    }`}
    placeholder="1"
  />

  {/* <button
    type="button"
    onClick={() => {
      const pageNumber = Number(pageInput);

      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    }}
    className="h-9 px-3 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
  >
    Go
  </button> */}
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
      <CreateMerchantModal
  isOpen={isCreateModalOpen}
  onClose={() => setIsCreateModalOpen(false)}
/>
<UpdateMerchantModal
  isOpen={isUpdateModalOpen}
  onClose={() => {
    setIsUpdateModalOpen(false);
    setSelectedMerchant(null);
  }}
  merchant={selectedMerchant}
/>
<MerchantWiseDetailsPannel
  isOpen={showDetailsPanel}
  onClose={() => {
    setShowDetailsPanel(false);
    setSelectedMerchant(null);
  }}
  corpId={selectedMerchant?.corp_id}
  merchantName={
    selectedMerchant?.corp_name ||
    selectedMerchant?.name
  }
  isDark={isDark}
/>

    </div>
  );
};

export default MerchantMaster;