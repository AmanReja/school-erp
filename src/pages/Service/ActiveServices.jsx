
import React, { useContext, useEffect, useState } from "react";

import {
  Search,
  CheckCircle2,
  Pencil,
  Trash2,
  Package,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { Theme } from "../../Contexts/Theme";

import {
  getServiceList,
  createService,
  deleteService,
  updateService,
} from "../../redux/action";

/* =========================================================
   MODAL
========================================================= */

const Modal = ({ open, onClose, title, children, isDark }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className={`w-full max-w-[440px] rounded-2xl shadow-2xl overflow-hidden border ${
          isDark
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-100"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDark ? "border-gray-800" : "border-gray-100"
          }`}
        >
          <h2
            className={`text-sm font-semibold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className={`w-7 h-7 flex items-center justify-center rounded-full transition-all ${
              isDark
                ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

/* =========================================================
   FORM FIELD
========================================================= */

const FormField = ({ label, children }) => (
  <div className="space-y-1">
    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </label>

    {children}
  </div>
);

/* =========================================================
   COMPONENT
========================================================= */

const ActiveServices = () => {
  const { theme } = useContext(Theme);

  const isDark = theme === "dark";

  const dispatch = useDispatch();

  /* =========================
     PAGINATION / SEARCH
  ========================= */

  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
     SERVICE MODAL
  ========================= */

  const [modalOpen, setModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [serviceName, setServiceName] = useState("");

  const [serviceId, setServiceId] = useState("");

  const [serviceStatus, setServiceStatus] = useState("ACTIVE");

  const [currentServiceId, setCurrentServiceId] = useState("");

  /* =========================
     REDUX DATA
  ========================= */

  const serviceData = useSelector(
    (state) => state.services?.services
  );

  const serviceList = serviceData?.data || [];

  const totalPages = serviceData?.totalPages || 1;

  const total = serviceData?.total || 0;

  /* =========================================================
     GET ACTIVE SERVICES
  ========================================================= */

  useEffect(() => {
    dispatch(
      getServiceList(
        searchTerm,
        page,
        perPage,
        "ACTIVE"
      )
    );
  }, [
    dispatch,
    searchTerm,
    page,
    perPage,
  ]);

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setServiceName("");
    setServiceId("");
    setServiceStatus("ACTIVE");
    setCurrentServiceId("");
    setIsEditing(false);
  };

  /* =========================================================
     OPEN CREATE MODAL
  ========================================================= */

  const handleCreateClick = () => {
    resetForm();

    setServiceStatus("ACTIVE");

    setModalOpen(true);
  };

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  const handleEdit = (service) => {
    setServiceName(service.service_name || "");

    setServiceId(service.service_id || "");

    setServiceStatus(
      service.status?.toUpperCase() || "ACTIVE"
    );

    setCurrentServiceId(service.service_id);

    setIsEditing(true);

    setModalOpen(true);
  };

  /* =========================================================
     CREATE SERVICE
  ========================================================= */

  const handleCreate = (e) => {
    e.preventDefault();

    if (!serviceName.trim()) {
      return;
    }

    if (!serviceId.trim()) {
      return;
    }

    const formData = {
      service_name: serviceName.trim(),
      service_id: serviceId.trim(),
      status: serviceStatus,
    };

    dispatch(
      createService(
        formData,
        () => {
          setModalOpen(false);
          resetForm();

          dispatch(
            getServiceList(
              searchTerm,
              page,
              perPage,
              "ACTIVE"
            )
          );
        }
      )
    );
  };

  /* =========================================================
     UPDATE SERVICE
  ========================================================= */

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!serviceName.trim()) {
      return;
    }

    const updatedServiceData = {
      service_name: serviceName.trim(),
      status: serviceStatus,
    };

    dispatch(
      updateService(
        currentServiceId,
        updatedServiceData
      )
    );

    setModalOpen(false);

    resetForm();

    /*
      Refresh active service list
    */
    dispatch(
      getServiceList(
        searchTerm,
        page,
        perPage,
        "ACTIVE"
      )
    );
  };

  /* =========================================================
     DELETE SERVICE
  ========================================================= */

  const handleDelete = (serviceId)  => {
    dispatch(deleteService(serviceId));

    /*
      Refresh list after delete
    */
    setTimeout(() => {
      dispatch(
        getServiceList(
          searchTerm,
          page,
          perPage,
          "ACTIVE"
        )
      );
    }, 300);
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const handleCloseModal = () => {
    setModalOpen(false);

    resetForm();
  };

  return (
    <>
      {/* =====================================================
          SERVICE CREATE / UPDATE MODAL
      ===================================================== */}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        title={
          isEditing
            ? "Edit Service"
            : "Create New Service"
        }
        isDark={isDark}
      >
        <form
          onSubmit={
            isEditing
              ? handleUpdate
              : handleCreate
          }
          className="space-y-4"
        >
          {/* Service Name */}

          <FormField label="Service Name">
            <input
              type="text"
              value={serviceName}
              onChange={(e) =>
                setServiceName(e.target.value)
              }
              placeholder="Enter service name"
              className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  : "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              }`}
            />
          </FormField>

          {/* Service ID */}

          {!isEditing && (
            <FormField label="Service ID">
              <input
                type="text"
                value={serviceId}
                onChange={(e) =>
                  setServiceId(e.target.value)
                }
                placeholder="Enter service ID"
                className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    : "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
            </FormField>
          )}

          {/* Status */}

          <FormField label="Status">
            <select
              value={serviceStatus}
              onChange={(e) =>
                setServiceStatus(e.target.value)
              }
              className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-gray-200 focus:border-indigo-500"
                  : "bg-gray-50 border-gray-200 text-gray-800 focus:border-indigo-400"
              }`}
            >
              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>
          </FormField>

          {/* Buttons */}

          <div
            className={`flex justify-end gap-2 pt-3 border-t ${
              isDark
                ? "border-gray-800"
                : "border-gray-100"
            }`}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                isDark
                  ? "text-gray-300 bg-gray-800 hover:bg-gray-700"
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm"
            >
              {isEditing
                ? "Update Service"
                : "Create Service"}
            </button>
          </div>
        </form>
      </Modal>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className={`px-5 py-5 border-b ${
            isDark
              ? "border-gray-800"
              : "border-gray-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title */}

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark
                    ? "bg-green-500/10 text-green-400"
                    : "bg-green-50 text-green-600"
                }`}
              >
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h3
                  className={`text-lg font-semibold ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }`}
                >
                  Active Services
                </h3>

                <p className="text-xs text-gray-500 mt-0.5">
                  Services currently available and active.
                </p>
              </div>
            </div>

            {/* Right Side */}

            <div className="flex items-center gap-5">
              <div className="text-right">
                <p className="text-[10px] uppercase text-gray-500">
                  Total Active
                </p>

                <p
                  className={`text-xl font-bold ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }`}
                >
                  {total}
                </p>
              </div>

              {/* Create Button */}

              <button
                onClick={handleCreateClick}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-sm transition-all"
              >
                <Plus size={14} />

                Create Service
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className={`p-5 border-b ${
            isDark
              ? "border-gray-800"
              : "border-gray-100"
          }`}
        >
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search active services..."
              className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm outline-none ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
                  : "bg-white border-gray-200 text-gray-700 placeholder:text-gray-400"
              }`}
            />
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className={`text-[10px] uppercase tracking-widest ${
                  isDark
                    ? "bg-gray-800/60 text-gray-400"
                    : "bg-gray-50 text-gray-400"
                }`}
              >
                <th className="px-5 py-3 text-left">
                  #
                </th>

                <th className="px-5 py-3 text-left">
                  Service Name
                </th>

                <th className="px-5 py-3 text-left">
                  Service ID
                </th>

                <th className="px-5 py-3 text-left">
                  Status
                </th>

                <th className="px-5 py-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {serviceList.length > 0 ? (
                serviceList.map(
                  (service, index) => (
                    <tr
                      key={service.service_id}
                      className={`border-t transition-colors ${
                        isDark
                          ? "border-gray-800 hover:bg-gray-800/50"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      {/* Number */}

                      <td className="px-5 py-4 text-xs text-gray-500">
                        {(page - 1) *
                          perPage +
                          index +
                          1}
                      </td>

                      {/* Service Name */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDark
                                ? "bg-indigo-500/10 text-indigo-400"
                                : "bg-indigo-50 text-indigo-600"
                            }`}
                          >
                            <Package size={14} />
                          </div>

                          <span
                            className={`font-medium ${
                              isDark
                                ? "text-gray-200"
                                : "text-gray-800"
                            }`}
                          >
                            {service.service_name}
                          </span>
                        </div>
                      </td>

                      {/* Service ID */}

                      <td className="px-5 py-4 font-mono text-xs text-gray-500">
                        {service.service_id}
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-green-50 text-green-600 border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />

                          {service.status || "ACTIVE"}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Edit */}

                          <button
                            onClick={() =>
                              handleEdit(
                                service
                              )
                            }
                            title="Edit Service"
                            className={`p-2 rounded-lg transition-all ${
                              isDark
                                ? "text-indigo-400 hover:bg-indigo-500/10"
                                : "text-indigo-600 hover:bg-indigo-50"
                            }`}
                          >
                            <Pencil size={14} />
                          </button>

                          {/* Delete */}

                          <button
                            onClick={() =>
                              handleDelete(
                                service.service_id
                              )
                            }
                            title="Delete Service"
                            className={`p-2 rounded-lg transition-all ${
                              isDark
                                ? "text-red-400 hover:bg-red-500/10"
                                : "text-red-500 hover:bg-red-50"
                            }`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-16 text-center text-sm text-gray-400"
                  >
                    No active services found
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
          className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t ${
            isDark
              ? "border-gray-800"
              : "border-gray-100"
          }`}
        >
          {/* Left */}

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">
              Page {page} of {totalPages}
            </span>

            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(
                  Number(e.target.value)
                );
                setPage(1);
              }}
              className={`px-2 py-1 rounded-md border text-xs outline-none ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              <option value={10}>
                10 / page
              </option>

              <option value={20}>
                20 / page
              </option>

              <option value={30}>
                30 / page
              </option>
            </select>
          </div>

          {/* Right */}

          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() =>
                setPage((p) => p - 1)
              }
              className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${
                isDark
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from(
              {
                length: Math.min(
                  totalPages,
                  3
                ),
              },
              (_, i) => {
                let pageNumber;

                if (page <= 2) {
                  pageNumber = i + 1;
                } else if (
                  page >=
                  totalPages - 1
                ) {
                  pageNumber =
                    totalPages -
                    2 +
                    i;
                } else {
                  pageNumber =
                    page - 1 + i;
                }

                return pageNumber;
              }
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() =>
                  setPage(pageNumber)
                }
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium border transition-all ${
                  pageNumber === page
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage((p) => p + 1)
              }
              className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${
                isDark
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveServices;
