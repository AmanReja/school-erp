
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Search,
  Users,
  UserCheck,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import CreateStaffModal from "../models/CreateStaffModal";

import {
//   getStaff,
} from "../redux/action";

const CreateStaff = ({theme}) => {
  const dispatch = useDispatch();


  const isDark = theme === "dark";

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [corpId, setCorpId] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const staffState = useSelector(
    (state) => state.staff || {}
  );

  const staffList = staffState.staff || [];
  const loading = staffState.loading || false;

  const pagination = staffState.pagination || {};

  const totalPages =
    pagination.totalPages ||
    pagination.total_pages ||
    Math.ceil(
      (pagination.total || staffList.length) / limit
    ) ||
    1;

  /*
   * Change this according to where you keep
   * the selected company.
   */
  useEffect(() => {
    const selectedCompany =
      localStorage.getItem("selectedCompany");

    if (selectedCompany) {
      try {
        const company = JSON.parse(selectedCompany);

        setCorpId(
          company?.corp_id ||
          company?.company_id ||
          ""
        );
      } catch (error) {
        console.error(
          "Invalid selectedCompany:",
          error
        );
      }
    }
  }, []);

  const fetchStaff = () => {
    if (!corpId) return;

    dispatch(
      getStaff(
        corpId,
        search,
        page,
        limit
      )
    );
  };

  useEffect(() => {
    fetchStaff();
  }, [corpId, page, search]);

  const handleStaffCreated = () => {
    setPage(1);
    fetchStaff();
  };

  const inputClass = `
    w-full
    px-3 py-2.5
    rounded-lg
    border
    text-sm
    outline-none
    transition
    ${
      isDark
        ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-indigo-500"
        : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-500"
    }
  `;

  const labelClass = `
    block
    text-xs
    font-medium
    mb-1.5
    ${
      isDark
        ? "text-gray-400"
        : "text-gray-600"
    }
  `;

  return (
    <div
      className={`
        min-h-screen
        p-5 md:p-6
        ${
          isDark
            ? "bg-gray-950"
            : "bg-gray-50"
        }
      `}
    >

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1
            className={`
              text-xl
              font-semibold
              ${
                isDark
                  ? "text-gray-100"
                  : "text-gray-800"
              }
            `}
          >
            Staff Management
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Manage teachers and staff accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            text-xs
            font-semibold
            transition
          "
        >
          <Plus size={16} />
          Create Staff
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

        <div
          className={`
            rounded-xl
            border
            p-4
            ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }
          `}
        >
          <div className="flex items-center gap-3">

            <div
              className={`
                w-9 h-9 rounded-lg
                flex items-center justify-center
                ${
                  isDark
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }
              `}
            >
              <Users size={17} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Total Staff
              </p>

              <p
                className={`
                  text-lg font-semibold
                  ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }
                `}
              >
                {pagination.total ||
                  staffList.length}
              </p>
            </div>

          </div>
        </div>

        <div
          className={`
            rounded-xl
            border
            p-4
            ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }
          `}
        >
          <div className="flex items-center gap-3">

            <div
              className={`
                w-9 h-9 rounded-lg
                flex items-center justify-center
                ${
                  isDark
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-emerald-50 text-emerald-600"
                }
              `}
            >
              <UserCheck size={17} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Teachers
              </p>

              <p
                className={`
                  text-lg font-semibold
                  ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }
                `}
              >
                {
                  staffList.filter(
                    (item) =>
                      item.role === "TEACHER"
                  ).length
                }
              </p>
            </div>

          </div>
        </div>

        <div
          className={`
            rounded-xl
            border
            p-4
            ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }
          `}
        >
          <div className="flex items-center gap-3">

            <div
              className={`
                w-9 h-9 rounded-lg
                flex items-center justify-center
                ${
                  isDark
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                }
              `}
            >
              <GraduationCap size={17} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Current Page
              </p>

              <p
                className={`
                  text-lg font-semibold
                  ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }
                `}
              >
                {page}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Search */}
      <div
        className={`
          rounded-xl
          border
          p-4
          mb-4
          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >

        <div className="relative max-w-md">

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search staff..."
            className={`${inputClass} pl-9`}
          />

        </div>

      </div>

      {/* Table */}
      <div
        className={`
          rounded-xl
          border
          overflow-hidden
          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead
              className={
                isDark
                  ? "bg-gray-800/70"
                  : "bg-gray-50"
              }
            >
              <tr>

                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                  Staff
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                  Role
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                  Age
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                  Login ID
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase">
                  Address
                </th>

              </tr>
            </thead>

            <tbody
              className={
                isDark
                  ? "divide-y divide-gray-800"
                  : "divide-y divide-gray-100"
              }
            >

              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center"
                  >
                    <RefreshCw
                      size={20}
                      className="animate-spin mx-auto text-indigo-500"
                    />

                    <p className="text-xs text-gray-500 mt-2">
                      Loading staff...
                    </p>
                  </td>
                </tr>
              ) : staffList.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center"
                  >
                    <Users
                      size={25}
                      className="mx-auto text-gray-400"
                    />

                    <p className="text-sm text-gray-500 mt-2">
                      No staff found
                    </p>
                  </td>
                </tr>
              ) : (
                staffList.map((staff, index) => (
                  <tr
                    key={
                      staff.id ||
                      staff.staff_id ||
                      index
                    }
                    className={
                      isDark
                        ? "hover:bg-gray-800/40"
                        : "hover:bg-gray-50"
                    }
                  >

                    <td className="px-4 py-3">

                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            w-8 h-8
                            rounded-lg
                            flex items-center justify-center
                            text-xs font-semibold
                            ${
                              isDark
                                ? "bg-indigo-500/10 text-indigo-400"
                                : "bg-indigo-50 text-indigo-600"
                            }
                          `}
                        >
                          {(
                            staff.name ||
                            "S"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p
                            className={`
                              text-xs font-medium
                              ${
                                isDark
                                  ? "text-gray-200"
                                  : "text-gray-800"
                              }
                            `}
                          >
                            {staff.name || "-"}
                          </p>

                          <p className="text-[10px] text-gray-500">
                            #{staff.id || staff.staff_id || "-"}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-4 py-3">

                      <span
                        className={`
                          inline-flex
                          px-2
                          py-1
                          rounded-md
                          text-[10px]
                          font-semibold
                          ${
                            staff.role === "TEACHER"
                              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                              : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                          }
                        `}
                      >
                        {staff.role || "-"}
                      </span>

                    </td>

                    <td className="px-4 py-3 text-xs text-gray-500">
                      {staff.age || "-"}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-500">
                      {staff.loginId ||
                        staff.login_id ||
                        "-"}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-500 max-w-xs truncate">
                      {staff.address || "-"}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        {/* Pagination */}
        <div
          className={`
            px-4 py-3
            border-t
            flex items-center justify-between
            ${
              isDark
                ? "border-gray-800"
                : "border-gray-100"
            }
          `}
        >

          <p className="text-[11px] text-gray-500">
            Page{" "}
            <span className="font-medium">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() =>
                setPage((prev) =>
                  Math.max(1, prev - 1)
                )
              }
              className={`
                w-8 h-8
                rounded-lg
                border
                flex items-center justify-center
                disabled:opacity-40
                disabled:cursor-not-allowed
                ${
                  isDark
                    ? "border-gray-700 text-gray-400 hover:bg-gray-800"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }
              `}
            >
              <ChevronLeft size={15} />
            </button>

            <button
              type="button"
              disabled={
                page >= totalPages ||
                loading
              }
              onClick={() =>
                setPage((prev) =>
                  Math.min(
                    totalPages,
                    prev + 1
                  )
                )
              }
              className={`
                w-8 h-8
                rounded-lg
                border
                flex items-center justify-center
                disabled:opacity-40
                disabled:cursor-not-allowed
                ${
                  isDark
                    ? "border-gray-700 text-gray-400 hover:bg-gray-800"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }
              `}
            >
              <ChevronRight size={15} />
            </button>

          </div>

        </div>

      </div>

      {/* Create Staff Modal */}
      <CreateStaffModal
        show={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          fetchStaff();
        }}
        corpId={corpId}
        dispatch={dispatch}
        isDark={isDark}
        inputClass={inputClass}
        labelClass={labelClass}
      />

    </div>
  );
};

export default CreateStaff;
