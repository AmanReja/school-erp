import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  UserCog,
  Pencil,
  Trash2,
  Eye,
  Mail,
  Phone,
} from "lucide-react";

import { useSettings } from "../Contexts/SettingsContext";
import { getStaff } from "../redux/action";
import CreateStaffModal from "../models/CreateStaffModal";

const Staff = () => {
  const corpid = useSelector((state) => state.auth?.corpId || null);
  const dispatch = useDispatch();
  const { theme } = useSettings();

  const isDark = theme === "dark";

  // Redux state selectors (matches student pattern with fallback defaults)
  const staffList = useSelector(
    (state) => state.auth?.staff || state.staff?.staffList || [],
  );
  const loading = useSelector((state) => state.staff?.loading || false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getStaff(corpid));
  }, [dispatch, corpid]);

  const filteredStaff = staffList.filter((member) => {
    const value = search.toLowerCase();

    return (
      member.name?.toLowerCase().includes(value) ||
      member.email?.toLowerCase().includes(value) ||
      member.designation?.toLowerCase().includes(value) ||
      member.department?.toLowerCase().includes(value) ||
      member.employeeId?.toString().toLowerCase().includes(value) ||
      member.loginId?.toLowerCase().includes(value)
    );
  });

  return (
    <div
      className={`min-h-full p-6 transition-colors duration-200 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-xs ${
              isDark
                ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-400"
                : "border-indigo-200 bg-indigo-50 text-indigo-600"
            }`}
          >
            <UserCog size={22} strokeWidth={1.9} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Staff Members
              </h1>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isDark
                    ? "bg-slate-800 text-slate-300"
                    : "bg-slate-200/80 text-slate-700"
                }`}
              >
                {staffList.length}
              </span>
            </div>
            <p
              className={`text-xs sm:text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Manage non-teaching staff, administration & department personnel
            </p>
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-95"
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* ================= SEARCH & TOOLBAR ================= */}
      <div
        className={`mb-5 rounded-2xl border p-3.5 backdrop-blur-xl transition-all ${
          isDark
            ? "border-slate-800/80 bg-slate-900/60"
            : "border-slate-200/80 bg-white/80 shadow-xs"
        }`}
      >
        <div className="relative max-w-md">
          <Search
            size={16}
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, employee ID, role, department..."
            className={`w-full rounded-xl border py-2 pl-10 pr-4 text-xs font-medium outline-none transition-all ${
              isDark
                ? "border-slate-800 bg-slate-950/70 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            }`}
          />
        </div>
      </div>

      {/* ================= STAFF TABLE ================= */}
      <div
        className={`overflow-hidden rounded-2xl border backdrop-blur-xl ${
          isDark
            ? "border-slate-800/80 bg-slate-900/60 shadow-black/20"
            : "border-slate-200/80 bg-white/80 shadow-xs"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead
              className={`border-b text-[11px] font-semibold uppercase tracking-wider ${
                isDark
                  ? "border-slate-800 bg-slate-900 text-slate-400"
                  : "border-slate-100 bg-slate-50 text-slate-500"
              }`}
            >
              <tr>
                {[
                  "Emp ID",
                  "Staff Member",
                  "Department",
                  "Designation",
                  "Contact",
                  "Login ID",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`px-5 py-3.5 ${
                      heading === "Actions" ? "text-right" : ""
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody
              className={`divide-y text-xs ${
                isDark ? "divide-slate-800/70" : "divide-slate-100"
              }`}
            >
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                      <span>Loading staff records...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-14 text-center">
                    <UserCog
                      size={36}
                      className={`mx-auto mb-2 ${
                        isDark ? "text-slate-600" : "text-slate-300"
                      }`}
                    />
                    <p
                      className={`text-sm font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      No staff members found
                    </p>
                    <p
                      className={`mt-0.5 text-xs ${
                        isDark ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {search
                        ? "Try searching with a different term"
                        : "Click 'Add Staff Member' to register personnel"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStaff.map((member) => {
                  const empId =
                    member.employeeId ||
                    member.id ||
                    `EMP-${member._id?.slice(-4) || "001"}`;
                  const initial = member.name?.charAt(0)?.toUpperCase() || "S";

                  return (
                    <tr
                      key={member.id || member._id || empId}
                      className={`transition-colors ${
                        isDark
                          ? "hover:bg-slate-800/50"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Employee ID */}
                      <td
                        className={`px-5 py-3.5 font-mono text-[11px] font-medium ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        #{empId}
                      </td>

                      {/* Staff Member Info */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-xs font-bold text-white shadow-xs">
                            {initial}
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`truncate font-semibold ${
                                isDark ? "text-slate-100" : "text-slate-900"
                              }`}
                            >
                              {member.name}
                            </p>
                            <p
                              className={`truncate text-[11px] ${
                                isDark ? "text-slate-400" : "text-slate-500"
                              }`}
                            >
                              {member.email || "No email provided"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td
                        className={`px-5 py-3.5 font-medium ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {member.department || "General"}
                      </td>

                      {/* Designation */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[11px] font-medium ${
                            isDark
                              ? "border-slate-700/60 bg-slate-800 text-slate-300"
                              : "border-slate-200 bg-slate-100 text-slate-700"
                          }`}
                        >
                          {member.designation || member.role || "Staff"}
                        </span>
                      </td>

                      {/* Contact */}
                      <td
                        className={`px-5 py-3.5 ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Phone size={12} className="text-slate-400" />
                          <span>{member.phone || member.contact || "—"}</span>
                        </div>
                      </td>

                      {/* Login ID */}
                      <td
                        className={`px-5 py-3.5 font-mono text-[11px] ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {member.loginId || member.username || "—"}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                            member.isActive !== false
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20"
                              : "border-rose-500/20 bg-rose-500/10 text-rose-500 dark:bg-rose-500/20"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              member.isActive !== false
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                            }`}
                          />
                          {member.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            title="View Details"
                            className={`rounded-lg p-1.5 transition-colors ${
                              isDark
                                ? "text-slate-400 hover:bg-slate-800 hover:text-indigo-400"
                                : "text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                            }`}
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            title="Edit Staff"
                            className={`rounded-lg p-1.5 transition-colors ${
                              isDark
                                ? "text-slate-400 hover:bg-slate-800 hover:text-indigo-400"
                                : "text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                            }`}
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            title="Delete"
                            className={`rounded-lg p-1.5 transition-colors ${
                              isDark
                                ? "text-slate-400 hover:bg-rose-950/40 hover:text-rose-400"
                                : "text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                            }`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CREATE STAFF MODAL ================= */}
      {isModalOpen && (
        <CreateStaffModal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Staff;
