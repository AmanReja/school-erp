import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getentityCallback,
  delete_entity,
//   updateEntityCallback,
} from "../redux/action";

import "../App.css";

import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Workflow,
  Building2,
  X,
} from "lucide-react";

import { Theme } from "../Contexts/Theme";
import { useParams, useNavigate } from "react-router-dom";

const EntityCallbackPage = () => {
  const { theme } = useContext(Theme);
  const { corpid } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDark = theme === "dark";

  // --------------------------------------------------
  // Local States
  // --------------------------------------------------

  const [load, setLoad] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(10);

  // --------------------------------------------------
  // Modal States
  // --------------------------------------------------

  const [showModal, setShowModal] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [selectedCallback, setSelectedCallback] = useState(null);

  // --------------------------------------------------
  // Form States
  // --------------------------------------------------

  const [callbackUrl, setCallbackUrl] = useState("");

  const [status, setStatus] = useState("Active");

  const [effectiveFrom, setEffectiveFrom] = useState("");

  // --------------------------------------------------
  // Redux
  // --------------------------------------------------

  const entityCallbackState = useSelector(
    (state) => state.entity?.entity
  );

  const callbackList = entityCallbackState?.data || [];

  const counts = entityCallbackState?.counts || {
    active: 0,
    inactive: 0,
    pending: 0,
    total: 0,
  };

  const totalPage =
    entityCallbackState?.pagination?.totalPages || 1;

  const totalData =
    entityCallbackState?.pagination?.totalRecords ||
    callbackList.length ||
    0;

  // --------------------------------------------------
  // Fetch Entity Callback Data
  // --------------------------------------------------

  const fetchData = async () => {
    if (!corpid) return;

    setLoad(true);

    try {
      await dispatch(
        getentityCallback(
          corpid,
          page,
          perPage,
          search,
          statusFilter
        )
      );
    } catch (error) {
      console.error(
        "Failed to fetch entity callback:",
        error
      );
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    corpid,
    page,
    perPage,
    search,
    statusFilter,
  ]);

  // --------------------------------------------------
  // Open Create Modal
  // --------------------------------------------------

  const handleCreate = () => {
    setSelectedCallback(null);

    setCallbackUrl("");

    setStatus("Active");

    setEffectiveFrom("");

    setIsUpdating(false);

    setShowModal(true);
  };

  // --------------------------------------------------
  // Open Edit Modal
  // --------------------------------------------------

  const handleEdit = (item) => {
    setSelectedCallback(item);

    setCallbackUrl(
      item.callback_url ||
        item.callbackUrl ||
        item.url ||
        ""
    );

    setStatus(item.status || "Active");

    setEffectiveFrom(
      item.effective_from ||
        item.effectiveFrom ||
        ""
    );

    setIsUpdating(true);

    setShowModal(true);
  };

  // --------------------------------------------------
  // Close Modal
  // --------------------------------------------------

  const closeModal = () => {
    setShowModal(false);

    setSelectedCallback(null);

    setCallbackUrl("");

    setStatus("Active");

    setEffectiveFrom("");

    setIsUpdating(false);
  };

  // --------------------------------------------------
  // Submit Form
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!corpid) return;

    const payload = {
      callback_url: callbackUrl,
      status: status,
      effective_from: effectiveFrom,
    };

    try {
      setLoad(true);

      if (isUpdating && selectedCallback) {
        await dispatch(
          updateEntityCallback(
            corpid,
            selectedCallback.id,
            payload
          )
        );
      } else {
        await dispatch(
          getentityCallback(
            corpid,
            page,
            perPage,
            search,
            statusFilter
          )
        );
      }

      closeModal();

      await fetchData();
    } catch (error) {
      console.error(
        "Entity callback operation failed:",
        error
      );
    } finally {
      setLoad(false);
    }
  };

  // --------------------------------------------------
  // Delete Callback
  // --------------------------------------------------

  const handleDelete = async (item) => {
    if (!item?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this entity callback?"
    );

    if (!confirmed) return;

    try {
      setLoad(true);

      await dispatch(
        delete_entity(
          corpid,
          item.id
        )
      );

      await fetchData();
    } catch (error) {
      console.error(
        "Failed to delete callback:",
        error
      );
    } finally {
      setLoad(false);
    }
  };

  // --------------------------------------------------
  // Status Badge
  // --------------------------------------------------

  const getStatusBadge = (itemStatus) => {
    const currentStatus =
      String(itemStatus || "").toLowerCase();

    if (currentStatus === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold text-white">
          <CheckCircle2 size={12} />
          ACTIVE
        </span>
      );
    }

    if (currentStatus === "inactive") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold text-white">
          <XCircle size={12} />
          INACTIVE
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1 text-[10px] font-bold text-white">
        <Clock size={12} />
        {String(itemStatus || "PENDING").toUpperCase()}
      </span>
    );
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

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

          {/* =========================================
              HEADER
          ========================================== */}

          <div
            className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 rounded-xl p-6 shadow-sm border ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-100"
            }`}
          >
            {/* Left */}
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
                <Workflow size={23} />
              </div>

              <div className="flex flex-col gap-1">

                <h1
                  className={`text-2xl font-semibold ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-900"
                  }`}
                >
                  Entity Callback
                </h1>

                <p
                  className={`text-sm ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Manage callback configuration for Corporation{" "}
                  <span className="font-bold text-indigo-600">
                    {corpid?.toUpperCase()}
                  </span>
                </p>

              </div>
            </div>

            {/* Right */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={handleCreate}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <Plus size={17} />
                Add Callback
              </button>

              <button
                onClick={fetchData}
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

          {/* =========================================
              CORPORATION INFO
          ========================================== */}

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
                Corporation ID
              </p>

              <p className="text-sm font-bold">
                {corpid || "N/A"}
              </p>
            </div>
          </div>

          {/* =========================================
              STATS
          ========================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Total */}
            <div
              className={`rounded-xl border p-5 shadow-sm ${
                isDark
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-100 bg-white"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-wider ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                Total Callbacks
              </p>

              <h2 className="mt-2 text-2xl font-bold text-blue-500">
                {counts.total}
              </h2>
            </div>

            {/* Active */}
            <div
              className={`rounded-xl border p-5 shadow-sm ${
                isDark
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-100 bg-white"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-wider ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                Active
              </p>

              <h2 className="mt-2 text-2xl font-bold text-emerald-500">
                {counts.active}
              </h2>
            </div>

            {/* Inactive */}
            <div
              className={`rounded-xl border p-5 shadow-sm ${
                isDark
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-100 bg-white"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-wider ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                Inactive
              </p>

              <h2 className="mt-2 text-2xl font-bold text-red-500">
                {counts.inactive}
              </h2>
            </div>

            {/* Pending */}
            <div
              className={`rounded-xl border p-5 shadow-sm ${
                isDark
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-100 bg-white"
              }`}
            >
              <p
                className={`text-xs uppercase tracking-wider ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                Pending
              </p>

              <h2 className="mt-2 text-2xl font-bold text-yellow-500">
                {counts.pending}
              </h2>
            </div>

          </div>

          {/* =========================================
              TABLE
          ========================================== */}

          <div
            className={`w-full overflow-hidden rounded-xl border ${
              isDark
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* Filter Bar */}

            <div
              className={`flex flex-wrap items-center justify-between gap-4 border-b p-5 ${
                isDark
                  ? "border-gray-700"
                  : "border-gray-200"
              }`}
            >

              <div>
                <h2 className="text-lg font-semibold">
                  Callback Configuration
                </h2>

                <p
                  className={`mt-1 text-xs ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Configure and manage merchant callback endpoints
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">

                {/* Search */}

                <div
                  className={`rounded-lg border px-3 py-2 ${
                    isDark
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search callback..."
                    className={`w-[180px] bg-transparent text-sm outline-none ${
                      isDark
                        ? "text-gray-200 placeholder:text-gray-500"
                        : "text-gray-800 placeholder:text-gray-400"
                    }`}
                  />
                </div>

                {/* Status */}

                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className={`rounded-lg border px-3 py-2 text-sm outline-none ${
                    isDark
                      ? "border-gray-700 bg-gray-800 text-gray-200"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <option value="">
                    All Status
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                  <option value="Pending">
                    Pending
                  </option>
                </select>

              </div>
            </div>

            {/* Table */}

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[850px] text-left text-sm">

                <thead
                  className={`border-b text-[11px] uppercase ${
                    isDark
                      ? "border-gray-700 bg-gray-800 text-gray-400"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                  }`}
                >
                  <tr>

                    <th className="px-6 py-4">
                      Callback URL
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Effective From
                    </th>

                    <th className="px-6 py-4">
                      Created At
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody
                  className={`text-[12px] ${
                    isDark
                      ? "text-gray-300"
                      : "text-gray-800"
                  }`}
                >

                  {load ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw
                            size={18}
                            className="animate-spin"
                          />
                          Loading callback records...
                        </div>
                      </td>
                    </tr>
                  ) : callbackList.length > 0 ? (

                    callbackList.map((item) => {

                      const callbackUrlValue =
                        item.callback_url ||
                        item.callbackUrl ||
                        item.url ||
                        "-";

                      return (
                        <tr
                          key={item.id}
                          className={`border-b transition ${
                            isDark
                              ? "border-gray-700 hover:bg-gray-800"
                              : "border-gray-100 hover:bg-gray-50"
                          }`}
                        >

                          {/* Callback URL */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                  isDark
                                    ? "bg-indigo-500/10 text-indigo-400"
                                    : "bg-indigo-50 text-indigo-600"
                                }`}
                              >
                                <Workflow size={16} />
                              </div>

                              <div className="max-w-[400px]">

                                <p
                                  className={`truncate font-mono text-xs ${
                                    isDark
                                      ? "text-indigo-300"
                                      : "text-indigo-600"
                                  }`}
                                  title={callbackUrlValue}
                                >
                                  {callbackUrlValue}
                                </p>

                                {item.event_name && (
                                  <p
                                    className={`mt-1 text-[10px] ${
                                      isDark
                                        ? "text-gray-500"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    Event:{" "}
                                    {item.event_name}
                                  </p>
                                )}

                              </div>

                            </div>

                          </td>

                          {/* Status */}

                          <td className="px-6 py-4">
                            {getStatusBadge(
                              item.status
                            )}
                          </td>

                          {/* Effective From */}

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-2">

                              <Clock
                                size={14}
                                className={
                                  isDark
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }
                              />

                              <span>
                                {item.effective_from
                                  ? new Date(
                                      item.effective_from
                                    ).toLocaleString()
                                  : "-"}
                              </span>

                            </div>

                          </td>

                          {/* Created */}

                          <td className="px-6 py-4 text-gray-500">

                            {item.created_at
                              ? new Date(
                                  item.created_at
                                ).toLocaleString()
                              : "-"}

                          </td>

                          {/* Actions */}

                          <td className="px-6 py-4">

                            <div className="flex justify-end gap-2">

                              <button
                                onClick={() =>
                                  handleEdit(item)
                                }
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                                  isDark
                                    ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                }`}
                              >
                                <Edit size={14} />
                                Edit
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(item)
                                }
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                                  isDark
                                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                    : "bg-red-50 text-red-600 hover:bg-red-100"
                                }`}
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    })

                  ) : (

                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-gray-500"
                      >
                        No entity callback records found.
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* =========================================
                PAGINATION
            ========================================== */}

            <div
              className={`flex flex-col gap-3 border-t px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between ${
                isDark
                  ? "border-gray-700 text-gray-300"
                  : "border-gray-200 text-gray-600"
              }`}
            >

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
                  className={`mx-2 rounded border p-1 outline-none ${
                    isDark
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>

                per page

              </div>

              <div className="flex items-center gap-3">

                <span>
                  {totalData > 0
                    ? `${(page - 1) * perPage + 1}-${Math.min(
                        page * perPage,
                        totalData
                      )} of ${totalData}`
                    : "0 of 0"}
                </span>

                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.max(prev - 1, 1)
                    )
                  }
                  disabled={page === 1}
                  className={`rounded-lg p-1.5 ${
                    page === 1
                      ? "opacity-30"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="font-bold">
                  {page}
                </span>

                <button
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalPage
                      )
                    )
                  }
                  disabled={page >= totalPage}
                  className={`rounded-lg p-1.5 ${
                    page >= totalPage
                      ? "opacity-30"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </section>
      </main>

      {/* =========================================
          CREATE / UPDATE MODAL
      ========================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

          <form
            onSubmit={handleSubmit}
            className={`w-full max-w-[500px] rounded-2xl p-6 shadow-2xl ${
              isDark
                ? "border border-gray-700 bg-gray-900"
                : "bg-white"
            }`}
          >

            {/* Modal Header */}

            <div className="mb-5 flex items-center justify-between border-b pb-4">

              <div>
                <h2
                  className={`text-lg font-bold ${
                    isDark
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {isUpdating
                    ? "Update Entity Callback"
                    : "Add Entity Callback"}
                </h2>

                <p
                  className={`mt-1 text-xs ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Corporation: {corpid}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 transition hover:text-red-500"
              >
                <X size={20} />
              </button>

            </div>

            {/* Callback URL */}

            <div className="mb-4">

              <label
                className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${
                  isDark
                    ? "text-indigo-400"
                    : "text-indigo-600"
                }`}
              >
                Callback URL
              </label>

              <input
                type="url"
                value={callbackUrl}
                onChange={(e) =>
                  setCallbackUrl(e.target.value)
                }
                placeholder="https://example.com/callback"
                required
                className={`w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}
              />

            </div>

            {/* Status */}

            <div className="mb-4">

              <label
                className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${
                  isDark
                    ? "text-indigo-400"
                    : "text-indigo-600"
                }`}
              >
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className={`w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

                <option value="Pending">
                  Pending
                </option>
              </select>

            </div>

            {/* Effective From */}

            <div className="mb-5">

              <label
                className={`mb-1.5 block text-[11px] font-bold uppercase tracking-wider ${
                  isDark
                    ? "text-indigo-400"
                    : "text-indigo-600"
                }`}
              >
                Effective From
              </label>

              <input
                type="datetime-local"
                value={effectiveFrom}
                onChange={(e) =>
                  setEffectiveFrom(e.target.value)
                }
                className={`w-full rounded-lg border p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDark
                    ? "border-gray-700 bg-gray-800 text-white"
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}
              />

            </div>

            {/* Buttons */}

            <div className="flex gap-3">

              <button
                type="button"
                onClick={closeModal}
                className={`flex-1 rounded-lg border py-3 text-sm font-semibold transition ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={load}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {load && (
                  <RefreshCw
                    size={15}
                    className="animate-spin"
                  />
                )}

                {isUpdating
                  ? "Update Callback"
                  : "Create Callback"}
              </button>

            </div>

          </form>

        </div>
      )}
    </div>
  );
};

export default EntityCallbackPage;