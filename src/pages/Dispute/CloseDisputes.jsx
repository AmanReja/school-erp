
import React, { useContext, useMemo, useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  CalendarDays,
  UserRound,
  FileText,
  Eye,
  RotateCcw,
} from "lucide-react";

import { Theme } from "../../Contexts/Theme";

const CloseDisputes = () => {
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Replace this with your API response
  const disputes = [
    {
      id: "DSP-1001",
      merchant: "Acme Technologies",
      amount: "₹12,500",
      reason: "Payment not received",
      closedDate: "18 Sep 2026",
      closedBy: "Admin",
      status: "Closed",
    },
    {
      id: "DSP-1002",
      merchant: "Global Traders",
      amount: "₹8,200",
      reason: "Duplicate transaction",
      closedDate: "17 Sep 2026",
      closedBy: "Support",
      status: "Closed",
    },
    {
      id: "DSP-1003",
      merchant: "Nova Solutions",
      amount: "₹24,800",
      reason: "Incorrect amount",
      closedDate: "15 Sep 2026",
      closedBy: "Admin",
      status: "Closed",
    },
    {
      id: "DSP-1004",
      merchant: "Vertex Retail",
      amount: "₹5,750",
      reason: "Refund issue",
      closedDate: "13 Sep 2026",
      closedBy: "Support",
      status: "Closed",
    },
  ];

  const filteredDisputes = useMemo(() => {
    return disputes.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(searchText) ||
        item.merchant.toLowerCase().includes(searchText) ||
        item.reason.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "All" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div
      className={`w-full rounded-2xl border ${
        isDark
          ? "bg-gray-950 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* ================= HEADER ================= */}
      <div
        className={`px-5 py-5 border-b ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-green-500/10 text-green-400"
                  : "bg-green-50 text-green-600"
              }`}
            >
              <CheckCircle2 size={21} />
            </div>

            <div>
              <h2
                className={`text-lg font-semibold ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Closed Disputes
              </h2>

              <p
                className={`text-xs mt-0.5 ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Review disputes that have already been closed.
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
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Total Closed
            </p>

            <p
              className={`text-lg font-bold ${
                isDark ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {disputes.length}
            </p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5">

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Closed Today
            </span>

            <CalendarDays size={16} className="text-indigo-500" />
          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            1
          </p>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              This Month
            </span>

            <CheckCircle2 size={16} className="text-green-500" />
          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            12
          </p>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Resolved Amount
            </span>

            <FileText size={16} className="text-violet-500" />
          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            ₹51.2K
          </p>
        </div>

      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="px-5 pb-5">
        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={17}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            />

            <input
              type="text"
              placeholder="Search dispute ID, merchant or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none transition ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-indigo-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400"
              }`}
            />
          </div>

          {/* Status */}
          <div className="relative">
            <Filter
              size={15}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`appearance-none pl-9 pr-9 py-2.5 rounded-lg border text-sm outline-none cursor-pointer ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-300"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              <option value="All">All Status</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setSearch("");
              setStatus("All");
            }}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition ${
              isDark
                ? "border-gray-800 text-gray-400 hover:bg-gray-900 hover:text-gray-200"
                : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <RotateCcw size={15} />
            Reset
          </button>

        </div>
      </div>

      {/* ================= TABLE ================= */}
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
              <th className="px-5 py-3 font-semibold">
                Dispute
              </th>

              <th className="px-5 py-3 font-semibold">
                Merchant
              </th>

              <th className="px-5 py-3 font-semibold">
                Amount
              </th>

              <th className="px-5 py-3 font-semibold">
                Reason
              </th>

              <th className="px-5 py-3 font-semibold">
                Closed Date
              </th>

              <th className="px-5 py-3 font-semibold">
                Closed By
              </th>

              <th className="px-5 py-3 font-semibold text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredDisputes.length > 0 ? (
              filteredDisputes.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b transition ${
                    isDark
                      ? "border-gray-800 hover:bg-gray-900/60"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {/* ID */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDark
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        <FileText size={14} />
                      </div>

                      <span
                        className={`text-sm font-semibold ${
                          isDark
                            ? "text-gray-200"
                            : "text-gray-800"
                        }`}
                      >
                        {item.id}
                      </span>
                    </div>
                  </td>

                  {/* Merchant */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <UserRound
                        size={15}
                        className={
                          isDark
                            ? "text-gray-600"
                            : "text-gray-400"
                        }
                      />

                      <span
                        className={`text-sm ${
                          isDark
                            ? "text-gray-300"
                            : "text-gray-700"
                        }`}
                      >
                        {item.merchant}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        isDark
                          ? "text-gray-200"
                          : "text-gray-800"
                      }`}
                    >
                      {item.amount}
                    </span>
                  </td>

                  {/* Reason */}
                  <td className="px-5 py-4">
                    <span
                      className={`text-sm ${
                        isDark
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {item.reason}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays
                        size={14}
                        className={
                          isDark
                            ? "text-gray-600"
                            : "text-gray-400"
                        }
                      />

                      <span
                        className={`text-sm ${
                          isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {item.closedDate}
                      </span>
                    </div>
                  </td>

                  {/* Closed By */}
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                        isDark
                          ? "bg-gray-800 text-gray-400"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.closedBy}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 text-right">
                    <button
                      className="
                        inline-flex items-center gap-1.5
                        px-3 py-1.5
                        rounded-md
                        text-xs font-semibold
                        bg-indigo-50 text-indigo-600
                        border border-indigo-200
                        hover:bg-indigo-600 hover:text-white
                        transition-all duration-200
                        active:scale-95
                      "
                    >
                      <Eye size={13} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-16 text-center"
                >
                  <div className="flex flex-col items-center">

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isDark
                          ? "bg-gray-900 text-gray-600"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      <FileText size={22} />
                    </div>

                    <p
                      className={`mt-3 text-sm font-semibold ${
                        isDark
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      No closed disputes found
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        isDark
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      Try changing your search or filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div
        className={`px-5 py-3 border-t flex items-center justify-between ${
          isDark
            ? "border-gray-800 text-gray-600"
            : "border-gray-200 text-gray-400"
        }`}
      >
        <span className="text-xs">
          Showing {filteredDisputes.length} of {disputes.length} disputes
        </span>

        <span className="text-xs">
          Closed records
        </span>
      </div>
    </div>
  );
};

export default CloseDisputes;

