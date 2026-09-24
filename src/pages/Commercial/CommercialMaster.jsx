import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Search,
  CircleDollarSign,
  Package,
  CheckCircle2,
  XCircle,
  FileText,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Receipt,
} from "lucide-react";

import { Theme } from "../../Contexts/Theme";

import {
  get_cms_assign,
  assignedCms,
  deleteAssignedCms,
  updateAssignedCms,
} from "../../redux/action";

import { useDispatch, useSelector } from "react-redux";

const CommercialMaster = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(Theme);
  const { compid } = useParams();

  const isDark = theme === "dark";

  // =====================================================
  // STATE
  // =====================================================

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [currentServiceId, setCurrentServiceId] = useState("");

  const [serviceId, setServiceId] = useState("");

  const [serviceName, setServiceName] = useState("");

  const [packageId, setPackageId] = useState("");

  const [showPackageDropdown, setShowPackageDropdown] =
    useState(false);

  const [showChargesModal, setShowChargesModal] =
    useState(false);

  const [selectedCharges, setSelectedCharges] =
    useState([]);

  const [selectedCommercial, setSelectedCommercial] =
    useState(null);

  const [showDetailsPanel, setShowDetailsPanel] =
    useState(false);

  // =====================================================
  // REDUX
  // =====================================================

  const cmsData = useSelector(
    (state) => state.cmsassign?.cmsassign
  );

  console.log("Commercial CMS Data:", cmsData);

  const commercials = cmsData?.services || [];

  const allPackages = cmsData?.allPkgs || [];

  // =====================================================
  // FETCH CMS ASSIGNMENTS
  // =====================================================

  useEffect(() => {
    if (compid) {
      dispatch(get_cms_assign(compid));
    }
  }, [dispatch, compid]);

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setServiceId("");
    setServiceName("");
    setPackageId("");
    setCurrentServiceId("");
    setIsEditing(false);
    setShowPackageDropdown(false);
  };

  // =====================================================
  // OPEN ASSIGN MODAL
  // =====================================================

  const handleAssign = (service) => {
    setServiceId(service.service_id || "");
    setServiceName(service.service_name || "");
    setPackageId("");
    setCurrentServiceId("");
    setIsEditing(false);
    setCreateModalOpen(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEdit = (service) => {
    setCurrentServiceId(service.service_id);

    setServiceId(service.service_id);

    setServiceName(service.service_name || "");

    setPackageId(service.pkg?.pkg_id || "");

    setIsEditing(true);

    setCreateModalOpen(true);
  };

  // =====================================================
  // CREATE / ASSIGN
  // =====================================================

  const handleSubmit = () => {
    if (!serviceId || !packageId) {
      return;
    }

    const assignedData = {
      service_id: serviceId,
      pkg_id: packageId,
    };

    dispatch(assignedCms(compid, assignedData));

    setCreateModalOpen(false);

    resetForm();
  };

  // =====================================================
  // UPDATE
  // =====================================================

  const handleUpdate = () => {
    if (!serviceId || !packageId) {
      return;
    }

    const updatedData = {
      service_id: serviceId,
      pkg_id: packageId,
    };

    dispatch(
      updateAssignedCms(
        compid,
        currentServiceId,
        updatedData
      )
    );

    setCreateModalOpen(false);

    resetForm();
  };

  // =====================================================
  // DELETE / UNASSIGN
  // =====================================================

  const handleDelete = (serviceId) => {
    if (
      !window.confirm(
        "Are you sure you want to unassign this service?"
      )
    ) {
      return;
    }

    dispatch(
      deleteAssignedCms(
        compid,
        serviceId
      )
    );
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    setSearch(e.target.value);

    setCurrentPage(1);
  };

  // =====================================================
  // RESET SEARCH
  // =====================================================

  const handleReset = () => {
    setSearch("");

    setCurrentPage(1);

    setItemsPerPage(10);
  };

  // =====================================================
  // FILTER DATA
  // =====================================================

  const filteredCommercials = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return commercials;
    }

    return commercials.filter((item) => {
      return (
        String(item.service_id || "")
          .toLowerCase()
          .includes(value) ||

        String(item.service_name || "")
          .toLowerCase()
          .includes(value) ||

        String(item.pkg?.pkg_id || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [commercials, search]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const total = filteredCommercials.length;

  const totalPages = Math.max(
    1,
    Math.ceil(total / itemsPerPage)
  );

  const paginatedCommercials =
    filteredCommercials.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const startItem =
    total === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    total
  );

  // =====================================================
  // LIMIT
  // =====================================================

  const handleLimitChange = (e) => {
    setItemsPerPage(
      Number(e.target.value)
    );

    setCurrentPage(1);
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(
        (prev) => prev - 1
      );
    }
  };

  // =====================================================
  // NEXT
  // =====================================================

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        (prev) => prev + 1
      );
    }
  };

  // =====================================================
  // PAGE NUMBERS
  // =====================================================

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

    if (
      rangeEnd <
      totalPages - 1
    ) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // =====================================================
  // SUMMARY
  // =====================================================

  const assignedCount =
    commercials.filter(
      (item) => item.assigned
    ).length;

  const notAssignedCount =
    commercials.filter(
      (item) => !item.assigned
    ).length;

  const packageCount =
    commercials.filter(
      (item) => item.pkg?.pkg_id
    ).length;

  // =====================================================
  // OPEN CHARGES
  // =====================================================

  const handleViewCharges = (service) => {
    setSelectedCharges(
      service?.cms || []
    );

    setShowChargesModal(true);
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const statusClass = (assigned) => {
    if (assigned) {
      return isDark
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-green-50 text-green-600 border-green-200";
    }

    return isDark
      ? "bg-red-500/10 text-red-400 border-red-500/20"
      : "bg-red-50 text-red-600 border-red-200";
  };

  return (
    <div
      className={`w-full rounded-2xl border ${
        isDark
          ? "bg-gray-950 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className={`px-5 py-5 border-b ${
          isDark
            ? "border-gray-800"
            : "border-gray-200"
        }`}
      >

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* TITLE */}

          <div className="flex items-center gap-3">

            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-violet-500/10 text-violet-400"
                  : "bg-violet-50 text-violet-600"
              }`}
            >
              <CircleDollarSign
                size={22}
              />
            </div>

            <div>

              <h2
                className={`text-lg font-semibold ${
                  isDark
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                Commercial Master
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Manage merchant CMS services,
                packages and commercial charges.
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            <div
              className={`px-4 py-2 rounded-xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-gray-50 border-gray-200"
              }`}
            >

              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Total Services
              </p>

              <p
                className={`text-lg font-bold ${
                  isDark
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                {commercials.length}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

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
              Total Services
            </span>

            <Receipt
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
            {commercials.length}
          </p>

        </div>


        {/* ASSIGNED */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >

          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Assigned
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
            {assignedCount}
          </p>

        </div>


        {/* NOT ASSIGNED */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >

          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Not Assigned
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
            {notAssignedCount}
          </p>

        </div>


        {/* PACKAGE */}

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >

          <div className="flex items-center justify-between">

            <span className="text-xs text-gray-500">
              Active Packages
            </span>

            <Package
              size={16}
              className="text-violet-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark
                ? "text-gray-100"
                : "text-gray-800"
            }`}
          >
            {packageCount}
          </p>

        </div>

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="px-5 pb-5">

        <div className="flex flex-col lg:flex-row gap-3">

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
              value={search}
              onChange={handleSearch}
              placeholder="Search service ID, service name or package..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-violet-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-violet-400"
              }`}
            />

          </div>


          <select
            value={itemsPerPage}
            onChange={handleLimitChange}
            className={`px-4 py-2.5 rounded-lg border text-sm outline-none ${
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


      {/* =====================================================
          TABLE
      ===================================================== */}

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
                Service Name
              </th>

              <th className="px-5 py-3">
                Status
              </th>

              <th className="px-5 py-3">
                Active Package
              </th>

              <th className="px-5 py-3">
                Charges
              </th>

              <th className="px-5 py-3">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {paginatedCommercials.length > 0 ? (

              paginatedCommercials.map(
                (service, index) => (

                  <tr
                    key={
                      service.service_id ||
                      index
                    }
                    className={`border-b transition ${
                      isDark
                        ? "border-gray-800 hover:bg-gray-900/60"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >

                    {/* SERVICE ID */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2.5">

                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isDark
                              ? "bg-violet-500/10 text-violet-400"
                              : "bg-violet-50 text-violet-600"
                          }`}
                        >
                          <Receipt
                            size={14}
                          />
                        </div>

                        <span className="text-sm font-semibold">
                          {service.service_id ||
                            "-"}
                        </span>

                      </div>

                    </td>


                    {/* SERVICE NAME */}

                    <td className="px-5 py-4">

                      <span className="text-sm">
                        {service.service_name ||
                          "-"}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${statusClass(
                          service.assigned
                        )}`}
                      >

                        {service.assigned ? (
                          <CheckCircle2
                            size={12}
                          />
                        ) : (
                          <XCircle
                            size={12}
                          />
                        )}

                        {service.assigned
                          ? "Assigned"
                          : "Not Assigned"}

                      </span>

                    </td>


                    {/* PACKAGE */}

                    <td className="px-5 py-4">

                      {service.assigned &&
                      service.pkg?.pkg_id ? (

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                            isDark
                              ? "bg-violet-500/10 text-violet-400"
                              : "bg-violet-50 text-violet-600"
                          }`}
                        >

                          <Package
                            size={13}
                          />

                          {service.pkg.pkg_id}

                        </span>

                      ) : (

                        <span className="text-xs text-gray-500">
                          —
                        </span>

                      )}

                    </td>


                    {/* CHARGES */}

                    <td className="px-5 py-4">

                      {service.assigned ? (

                        <button
                          type="button"
                          onClick={() =>
                            handleViewCharges(
                              service
                            )
                          }
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 hover:underline"
                        >

                          <Eye
                            size={14}
                          />

                          View Charges

                        </button>

                      ) : (

                        <span className="text-xs text-gray-500">
                          —
                        </span>

                      )}

                    </td>


                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      {service.assigned ? (

                        <div className="flex items-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                service
                              )
                            }
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
                              isDark
                                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500 hover:text-white"
                                : "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white"
                            }`}
                          >

                            <Pencil
                              size={13}
                            />

                            Edit

                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                service.service_id
                              )
                            }
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
                              isDark
                                ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white"
                                : "bg-red-50 text-red-600 border-red-200 hover:bg-red-600 hover:text-white"
                            }`}
                          >

                            <Trash2
                              size={13}
                            />

                            Unassign

                          </button>

                        </div>

                      ) : (

                        <button
                          type="button"
                          onClick={() =>
                            handleAssign(
                              service
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition"
                        >

                          <Plus
                            size={13}
                          />

                          Assign

                        </button>

                      )}

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className={`text-center py-12 text-sm ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  No commercial services found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =====================================================
          PAGINATION
      ===================================================== */}

      <div
        className={`px-5 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark
            ? "border-slate-700"
            : "border-gray-200"
        }`}
      >

        <div
          className={`text-sm ${
            isDark
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >

          Showing{" "}

          <span className="font-semibold">
            {startItem}
          </span>

          {" "}to{" "}

          <span className="font-semibold">
            {endItem}
          </span>

          {" "}of{" "}

          <span className="font-semibold">
            {total}
          </span>

          {" "}services

        </div>


        {/* GO TO PAGE */}

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
                Number(
                  e.target.value
                );

              if (
                value >= 1 &&
                value <= totalPages
              ) {
                setCurrentPage(
                  value
                );
              }

            }}
            className={`w-16 h-9 px-2 text-center rounded-lg border outline-none ${
              isDark
                ? "bg-gray-900 text-gray-200 border-slate-700"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          />

        </div>


        {/* PAGE NUMBERS */}

        <div className="flex items-center gap-1.5">

          <button
            type="button"
            onClick={handlePrevious}
            disabled={
              currentPage === 1
            }
            className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : ""
            } ${
              isDark
                ? "border-slate-700 hover:bg-slate-700"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          >

            <ChevronLeft
              size={17}
            />

          </button>


          {getPageNumbers().map(
            (page, index) => {

              if (
                page === "..."
              ) {

                return (
                  <span
                    key={`dots-${index}`}
                    className="w-9 h-9 flex items-center justify-center text-sm text-gray-400"
                  >
                    ...
                  </span>
                );

              }

              const active =
                currentPage ===
                page;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }
                  className={`w-9 h-9 rounded-lg text-sm font-medium ${
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


          <button
            type="button"
            onClick={handleNext}
            disabled={
              currentPage ===
              totalPages
            }
            className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
              currentPage ===
              totalPages
                ? "opacity-40 cursor-not-allowed"
                : ""
            } ${
              isDark
                ? "border-slate-700 hover:bg-slate-700"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          >

            <ChevronRight
              size={17}
            />

          </button>

        </div>

      </div>


      {/* =====================================================
          ASSIGN / EDIT MODAL
      ===================================================== */}

      {createModalOpen && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => {
            setCreateModalOpen(false);
            resetForm();
          }}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className={`w-full max-w-md rounded-2xl shadow-2xl border ${
              isDark
                ? "bg-gray-950 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >

            {/* HEADER */}

            <div
              className={`px-5 py-4 border-b flex items-center justify-between ${
                isDark
                  ? "border-gray-800"
                  : "border-gray-200"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark
                      ? "bg-violet-500/10 text-violet-400"
                      : "bg-violet-50 text-violet-600"
                  }`}
                >

                  <Package
                    size={19}
                  />

                </div>

                <div>

                  <h3
                    className={`text-base font-semibold ${
                      isDark
                        ? "text-gray-100"
                        : "text-gray-800"
                    }`}
                  >
                    {isEditing
                      ? "Edit Commercial"
                      : "Assign Commercial"}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {serviceName ||
                      "Service configuration"}
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() => {
                  setCreateModalOpen(
                    false
                  );

                  resetForm();
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "text-gray-400 hover:bg-gray-800"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >

                <X size={17} />

              </button>

            </div>


            {/* BODY */}

            <div className="p-5 space-y-4">

              {/* SERVICE */}

              <div>

                <label className="text-xs font-medium text-gray-500">
                  Service
                </label>

                <input
                  value={serviceName}
                  readOnly
                  className={`w-full mt-1.5 px-3 py-2.5 rounded-lg border text-sm ${
                    isDark
                      ? "bg-gray-900 border-gray-800 text-gray-300"
                      : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                />

              </div>


              {/* SERVICE ID */}

              <div>

                <label className="text-xs font-medium text-gray-500">
                  Service ID
                </label>

                <input
                  value={serviceId}
                  readOnly
                  className={`w-full mt-1.5 px-3 py-2.5 rounded-lg border text-sm ${
                    isDark
                      ? "bg-gray-900 border-gray-800 text-gray-300"
                      : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                />

              </div>


              {/* PACKAGE */}

           {/* PACKAGE */}

<div className="relative z-50">

  <label className="text-xs font-medium text-gray-500">
    Package
  </label>

  <input
    value={String(packageId ?? "")}
    onChange={(e) => {
      setPackageId(e.target.value);
      setShowPackageDropdown(true);
    }}
    onFocus={() => {
      setShowPackageDropdown(true);
    }}
    placeholder="Search or select package"
    className={`w-full mt-1.5 px-3 py-2.5 rounded-lg border text-sm outline-none ${
      isDark
        ? "bg-gray-900 border-gray-800 text-gray-200 focus:border-violet-500"
        : "bg-white border-gray-200 text-gray-800 focus:border-violet-400"
    }`}
  />

  {showPackageDropdown && (
    <div
      className={`absolute left-0 right-0 top-full mt-2 z-[100] rounded-xl border shadow-2xl overflow-hidden ${
        isDark
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >

      {/* PACKAGE LIST */}
      <div
        className="max-h-56 overflow-y-auto overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
      >

        {allPackages.length > 0 ? (

          (() => {

            const searchValue = String(
              packageId ?? ""
            )
              .toLowerCase()
              .trim();

            const filteredPackages =
              allPackages.filter((pkg) => {

                const pkgId = String(
                  pkg?.pkg_id ?? ""
                )
                  .toLowerCase()
                  .trim();

                const pkgName = String(
                  pkg?.pkg_name ?? ""
                )
                  .toLowerCase()
                  .trim();

                if (!searchValue) {
                  return true;
                }

                return (
                  pkgId.includes(searchValue) ||
                  pkgName.includes(searchValue)
                );
              });

            if (filteredPackages.length === 0) {
              return (
                <div className="px-4 py-8 text-center">

                  <Package
                    size={22}
                    className="mx-auto text-gray-400 mb-2"
                  />

                  <p className="text-xs text-gray-500">
                    No packages found
                  </p>

                </div>
              );
            }

            return filteredPackages.map(
              (pkg, index) => {

                const pkgId = String(
                  pkg?.pkg_id ?? ""
                );

                const isSelected =
                  String(packageId) === pkgId;

                return (
                  <button
                    key={
                      pkg?.pkg_id ||
                      `package-${index}`
                    }
                    type="button"
                    onClick={() => {

                      setPackageId(
                        pkg?.pkg_id ?? ""
                      );

                      setShowPackageDropdown(
                        false
                      );

                    }}
                    className={`w-full text-left px-3 py-3 border-b last:border-b-0 transition ${
                      isSelected
                        ? isDark
                          ? "bg-violet-500/10"
                          : "bg-violet-50"
                        : isDark
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-50"
                    } ${
                      isDark
                        ? "border-gray-800"
                        : "border-gray-100"
                    }`}
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-3 min-w-0">

                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? isDark
                                ? "bg-violet-500/20 text-violet-400"
                                : "bg-violet-100 text-violet-600"
                              : isDark
                              ? "bg-gray-800 text-gray-400"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Package size={14} />
                        </div>

                        <div className="min-w-0">

                          <p
                            className={`text-xs font-semibold truncate ${
                              isDark
                                ? "text-gray-200"
                                : "text-gray-800"
                            }`}
                          >
                            {pkg?.pkg_id ?? "-"}
                          </p>

                          <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                            {pkg?.pkg_name ||
                              "Package"}
                          </p>

                        </div>

                      </div>

                      {isSelected && (
                        <CheckCircle2
                          size={16}
                          className={
                            isDark
                              ? "text-violet-400"
                              : "text-violet-600"
                          }
                        />
                      )}

                    </div>

                  </button>
                );
              }
            );

          })()

        ) : (

          <div className="px-4 py-8 text-center">

            <Package
              size={22}
              className="mx-auto text-gray-400 mb-2"
            />

            <p className="text-xs text-gray-500">
              No packages available
            </p>

          </div>

        )}

      </div>

    </div>
  )}

</div>

            </div>


            {/* FOOTER */}

            <div
              className={`px-5 py-4 border-t flex justify-end gap-2 ${
                isDark
                  ? "border-gray-800"
                  : "border-gray-200"
              }`}
            >

              <button
                type="button"
                onClick={() => {
                  setCreateModalOpen(
                    false
                  );

                  resetForm();
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                  isDark
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={
                  isEditing
                    ? handleUpdate
                    : handleSubmit
                }
                disabled={
                  !serviceId ||
                  !packageId
                }
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold"
              >

                {isEditing
                  ? "Update"
                  : "Assign"}

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          CHARGES MODAL
      ===================================================== */}

      {showChargesModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() =>
            setShowChargesModal(false)
          }
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden ${
              isDark
                ? "bg-gray-950 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >

            {/* HEADER */}

            <div
              className={`px-5 py-4 border-b flex items-center justify-between ${
                isDark
                  ? "border-gray-800"
                  : "border-gray-200"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >

                  <Receipt
                    size={19}
                  />

                </div>

                <div>

                  <h3
                    className={`text-base font-semibold ${
                      isDark
                        ? "text-gray-100"
                        : "text-gray-800"
                    }`}
                  >
                    Commercial Charges
                  </h3>

                  <p className="text-xs text-gray-500">
                    Service charge configuration
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowChargesModal(
                    false
                  )
                }
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "text-gray-400 hover:bg-gray-800"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >

                <X size={17} />

              </button>

            </div>


            {/* TABLE */}

            <div className="p-5">

              <div className="overflow-x-auto rounded-xl border">

                <table className="w-full text-left">

                  <thead
                    className={
                      isDark
                        ? "bg-gray-900"
                        : "bg-gray-50"
                    }
                  >

                    <tr>

                      <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500">
                        Amount
                      </th>

                      <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500">
                        Target Range
                      </th>

                      <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500">
                        Type
                      </th>

                      <th className="px-4 py-3 text-[10px] uppercase tracking-wider text-gray-500">
                        Merchant Charges
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {selectedCharges.length >
                    0 ? (

                      selectedCharges.map(
                        (
                          charge,
                          index
                        ) => (

                          <tr
                            key={index}
                            className={`border-t ${
                              isDark
                                ? "border-gray-800 hover:bg-gray-900"
                                : "border-gray-100 hover:bg-gray-50"
                            }`}
                          >

                            <td className="px-4 py-3 text-sm font-medium">
                              ₹
                              {charge.amount ??
                                "-"}
                            </td>

                            <td className="px-4 py-3 text-sm">
                              ₹
                              {charge.fromval ??
                                0}
                              {" - "}
                              ₹
                              {charge.toval ??
                                0}
                            </td>

                            <td className="px-4 py-3">

                              <span
                                className={`px-2 py-1 rounded-md text-xs ${
                                  isDark
                                    ? "bg-indigo-500/10 text-indigo-400"
                                    : "bg-indigo-50 text-indigo-600"
                                }`}
                              >
                                {charge.type ||
                                  "-"}
                              </span>

                            </td>

                            <td className="px-4 py-3 text-sm font-semibold">
                              ₹
                              {charge.mch ??
                                "-"}
                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center py-8 text-sm text-gray-500"
                        >
                          No charges found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>


            {/* FOOTER */}

            <div
              className={`px-5 py-4 border-t flex justify-end ${
                isDark
                  ? "border-gray-800"
                  : "border-gray-200"
              }`}
            >

              <button
                type="button"
                onClick={() =>
                  setShowChargesModal(
                    false
                  )
                }
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white text-xs font-semibold"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default CommercialMaster;