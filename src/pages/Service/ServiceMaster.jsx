import React, { useContext, useEffect, useState } from "react";

import {
  Search,
  Settings,
  Package,
  CheckCircle2,
  XCircle,
  FileText,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Plus,
  Activity,
} from "lucide-react";

import { Theme } from "../../Contexts/Theme";

import { useDispatch, useSelector } from "react-redux";

// Change these imports to your actual service actions/modals
import {
//   getServices,
//   createService,
//   updateService,
} from "../../redux/action";

// import CreateServiceModal from "../../models/CreateServiceModal";
// import UpdateServiceModal from "../../models/UpdateServiceModal";

const ServiceMaster = () => {
  const dispatch = useDispatch();

  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  // ==============================
  // State
  // ==============================

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [showDetailsPanel, setShowDetailsPanel] = useState(false);

  const [selectedService, setSelectedService] = useState(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  // ==============================
  // Redux
  // ==============================

  const serviceData = useSelector(
    (state) => state.services?.services || {}
  );

  const services = serviceData?.data || [];

  const total = serviceData?.total || 0;

  const totalPages = serviceData?.totalPages || 1;

  // ==============================
  // Fetch Services
  // ==============================

//   useEffect(() => {
//     dispatch(
//       getServices(
//         currentPage,
//         itemsPerPage,
//         search
//       )
//     );
//   }, [
//     dispatch,
//     currentPage,
//     itemsPerPage,
//     search,
//   ]);

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
  // Page Numbers
  // ==============================

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, i) => i + 1
      );
    }

    const pages = [1];

    const rangeStart = Math.max(
      2,
      currentPage - 1
    );

    const rangeEnd = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    if (rangeStart > 2) {
      pages.push("...");
    }

    for (
      let i = rangeStart;
      i <= rangeEnd;
      i++
    ) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // ==============================
  // Service Status
  // ==============================

  const serviceStatusClass = (value) => {
    const status = String(
      value ?? ""
    ).toLowerCase();

    if (
      status === "active" ||
      status === "1" ||
      status === "enabled"
    ) {
      return isDark
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-green-50 text-green-600 border-green-200";
    }

    if (
      status === "inactive" ||
      status === "0" ||
      status === "disabled"
    ) {
      return isDark
        ? "bg-red-500/10 text-red-400 border-red-500/20"
        : "bg-red-50 text-red-600 border-red-200";
    }

    return isDark
      ? "bg-gray-800 text-gray-400 border-gray-700"
      : "bg-gray-100 text-gray-600 border-gray-200";
  };

  // ==============================
  // Edit
  // ==============================

  const handleEdit = (service) => {
    setSelectedService(service);

    setIsUpdateModalOpen(true);
  };

  // ==============================
  // Details
  // ==============================

  const handleDetails = (service) => {
    setSelectedService(service);

    setShowDetailsPanel(true);
  };

  // ==============================
  // Counts
  // ==============================

  const activeServices = services.filter(
    (service) => {
      const status = String(
        service.status ??
          service.service_status ??
          service.active
      ).toLowerCase();

      return (
        status === "active" ||
        status === "1" ||
        status === "enabled"
      );
    }
  ).length;

  const inactiveServices = services.filter(
    (service) => {
      const status = String(
        service.status ??
          service.service_status ??
          service.active
      ).toLowerCase();

      return (
        status === "inactive" ||
        status === "0" ||
        status === "disabled"
      );
    }
  ).length;

  // ==============================
  // Pagination
  // ==============================

  const startItem =
    total === 0
      ? 0
      : (currentPage - 1) *
          itemsPerPage +
        1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    total
  );

  // ==============================
  // Render
  // ==============================

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
          isDark
            ? "border-gray-800"
            : "border-gray-200"
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
              <Settings size={21} />
            </div>

            <div>

              <h2
                className={`text-lg font-semibold ${
                  isDark
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                Service Master
              </h2>

              <p
                className={`text-xs mt-0.5 ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                View and manage registered services.
              </p>

            </div>
          </div>

          {/* Total */}

          <div className="flex items-center gap-3">

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
                Total Services
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

            {/* Create */}

            <button
              type="button"
              onClick={() =>
                setIsCreateModalOpen(true)
              }
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-violet-600
                hover:bg-violet-700
                text-white
                font-medium
                transition
              "
            >
              <Plus size={16} />

              Create Service
            </button>

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
              Total Services
            </span>

            <Settings
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

        {/* Active */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Active Services
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
            {activeServices}
          </p>
        </div>

        {/* Inactive */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Inactive Services
            </span>

            <XCircle
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
            {inactiveServices}
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
              placeholder="Search service, service ID or service name..."
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
              <option value={10}>
                10 / page
              </option>

              <option value={20}>
                20 / page
              </option>

              <option value={50}>
                50 / page
              </option>

              <option value={100}>
                100 / page
              </option>
            </select>

          </div>

          {/* Reset */}

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
                Service
              </th>

              <th className="px-5 py-3">
                Service ID
              </th>

              <th className="px-5 py-3">
                Service Name
              </th>

              <th className="px-5 py-3">
                Package
              </th>

              <th className="px-5 py-3">
                Type
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

            {services.length > 0 ? (

              services.map(
                (service, index) => {

                  const status =
                    service.status ??
                    service.service_status ??
                    service.active;

                  return (
                    <tr
                      key={
                        service.service_id ||
                        service.id ||
                        index
                      }
                      className={`border-b transition ${
                        isDark
                          ? "border-gray-800 hover:bg-gray-900/60"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >

                      {/* Service */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2.5">

                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDark
                                ? "bg-indigo-500/10 text-indigo-400"
                                : "bg-indigo-50 text-indigo-600"
                            }`}
                          >
                            <Settings
                              size={14}
                            />
                          </div>

                          <div>

                            <p className="text-sm font-semibold">
                              {service.service_name ||
                                service.name ||
                                "-"}
                            </p>

                            <p className="text-[11px] text-gray-500">
                              Service
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Service ID */}

                      <td className="px-5 py-4">

                        <span className="text-sm font-medium">
                          {service.service_id ||
                            service.id ||
                            "-"}
                        </span>

                      </td>

                      {/* Service Name */}

                      <td className="px-5 py-4">

                        <span className="text-sm text-gray-500">
                          {service.service_name ||
                            service.name ||
                            "-"}
                        </span>

                      </td>

                      {/* Package */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <Package
                            size={14}
                            className="text-gray-400"
                          />

                          <span className="text-sm">
                            {service.pkg_name ||
                              service.package_name ||
                              service.pkg?.pkg_name ||
                              service.package?.name ||
                              "-"}
                          </span>

                        </div>

                      </td>

                      {/* Type */}

                      <td className="px-5 py-4">

                        <span
                          className={`px-2.5 py-1 rounded-md border text-xs font-medium ${
                            isDark
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                              : "bg-indigo-50 text-indigo-600 border-indigo-200"
                          }`}
                        >
                          {service.service_type ||
                            service.type ||
                            "-"}
                        </span>

                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">

                        <span
                          className={`px-2.5 py-1 rounded-md border text-xs font-medium ${serviceStatusClass(
                            status
                          )}`}
                        >
                          {String(
                            status ?? ""
                          ).toLowerCase() ===
                            "1" ||
                          String(
                            status ?? ""
                          ).toLowerCase() ===
                            "active" ||
                          String(
                            status ?? ""
                          ).toLowerCase() ===
                            "enabled"
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          {/* Update */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                service
                              )
                            }
                            title="Update Service"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
                              isDark
                                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500 hover:text-white"
                                : "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white"
                            }`}
                          >
                            <Pencil
                              size={13}
                            />

                            Update
                          </button>

                          {/* Details */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDetails(
                                service
                              )
                            }
                            title="View Details"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
                              isDark
                                ? "bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500 hover:text-white"
                                : "bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-600 hover:text-white"
                            }`}
                          >
                            <Eye
                              size={13}
                            />

                            Details
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
                  colSpan="7"
                  className={`text-center py-12 text-sm ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  No services found
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

        {/* Result Count */}

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

          services
        </div>

        {/* Go To Page */}

        <div className="flex items-center gap-2">

          <span className="text-sm text-gray-500">
            Go to page
          </span>

          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const value =
                Number(e.target.value);

              if (
                value >= 1 &&
                value <= totalPages
              ) {
                setCurrentPage(value);
              }
            }}
            className={`w-16 h-9 px-2 text-center rounded-lg border outline-none ${
              isDark
                ? "bg-gray-900 text-gray-200 border-slate-700"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          />

        </div>

        {/* Pagination */}

        <div className="flex items-center gap-1.5">

          {/* Previous */}

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

          {/* Pages */}

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
                      ? "bg-indigo-600 text-white"
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

          {/* Next */}

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

      {/* =========================================
          CREATE MODAL
      ========================================= */}

      {/* <CreateServiceModal
        isOpen={isCreateModalOpen}
        onClose={() =>
          setIsCreateModalOpen(false)
        }
      /> */}

      {/* =========================================
          UPDATE MODAL
      ========================================= */}

      {/* <UpdateServiceModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedService(null);
        }}
        service={selectedService}
      /> */}

      {/* =========================================
          DETAILS PANEL
      ========================================= */}

      {showDetailsPanel && (
        <div
          className="fixed inset-0 z-[100] flex justify-end"
          onClick={() =>
            setShowDetailsPanel(false)
          }
        >

          {/* Overlay */}

          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Panel */}

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className={`relative w-full max-w-md h-full overflow-y-auto shadow-2xl ${
              isDark
                ? "bg-gray-950 border-l border-gray-800"
                : "bg-white border-l border-gray-200"
            }`}
          >

            {/* Panel Header */}

            <div
              className={`sticky top-0 z-10 px-5 py-4 border-b ${
                isDark
                  ? "bg-gray-950 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDark
                        ? "bg-indigo-500/10 text-indigo-400"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <Settings size={20} />
                  </div>

                  <div>

                    <h3
                      className={`text-lg font-semibold ${
                        isDark
                          ? "text-gray-100"
                          : "text-gray-800"
                      }`}
                    >
                      Service Details
                    </h3>

                    <p className="text-xs text-gray-500">
                      Service information
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetailsPanel(false)
                  }
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "hover:bg-gray-800 text-gray-400"
                      : "hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  <XCircle size={18} />
                </button>

              </div>

            </div>

            {/* Details */}

            {selectedService && (
              <div className="p-5 space-y-4">

                {/* Service Name */}

                <div
                  className={`rounded-xl border p-4 ${
                    isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >

                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                    Service Name
                  </p>

                  <p
                    className={`mt-1 text-base font-semibold ${
                      isDark
                        ? "text-gray-100"
                        : "text-gray-800"
                    }`}
                  >
                    {selectedService.service_name ||
                      selectedService.name ||
                      "-"}
                  </p>

                </div>

                {/* Details Grid */}

                <div className="grid grid-cols-2 gap-3">

                  <div
                    className={`rounded-xl border p-4 ${
                      isDark
                        ? "bg-gray-900 border-gray-800"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Service ID
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {selectedService.service_id ||
                        selectedService.id ||
                        "-"}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl border p-4 ${
                      isDark
                        ? "bg-gray-900 border-gray-800"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Status
                    </p>

                    <span
                      className={`inline-block mt-2 px-2.5 py-1 rounded-md border text-xs font-medium ${serviceStatusClass(
                        selectedService.status ??
                          selectedService.service_status ??
                          selectedService.active
                      )}`}
                    >
                      {String(
                        selectedService.status ??
                          selectedService.service_status ??
                          selectedService.active ??
                          ""
                      ).toLowerCase() ===
                        "active" ||
                      String(
                        selectedService.status ??
                          selectedService.service_status ??
                          selectedService.active ??
                          ""
                      ) === "1"
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                </div>

                {/* Package */}

                <div
                  className={`rounded-xl border p-4 ${
                    isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >

                  <div className="flex items-center gap-2">

                    <Package
                      size={16}
                      className="text-indigo-500"
                    />

                    <p className="text-xs text-gray-500">
                      Package
                    </p>

                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {selectedService.pkg_name ||
                      selectedService.package_name ||
                      selectedService.pkg?.pkg_name ||
                      selectedService.package?.name ||
                      "-"}
                  </p>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default ServiceMaster;