
import React, { useContext, useMemo, useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  CalendarDays,
  UserRound,
  FileText,
  Eye,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { Theme } from "../../Contexts/Theme";

const ResolveDisputes = () => {
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Replace with API response
  const disputes = [
    {
      id: "DSP-3001",
      merchant: "Acme Technologies",
      amount: "₹15,500",
      reason: "Payment not received",
      updatedDate: "18 Sep 2026",
      assignedTo: "Admin",
      status: "Ready to Resolve",
    },
    {
      id: "DSP-3002",
      merchant: "Global Traders",
      amount: "₹9,200",
      reason: "Duplicate transaction",
      updatedDate: "17 Sep 2026",
      assignedTo: "Support",
      status: "Under Review",
    },
    {
      id: "DSP-3003",
      merchant: "Nova Solutions",
      amount: "₹21,800",
      reason: "Incorrect amount",
      updatedDate: "16 Sep 2026",
      assignedTo: "Admin",
      status: "Ready to Resolve",
    },
    {
      id: "DSP-3004",
      merchant: "Vertex Retail",
      amount: "₹6,750",
      reason: "Refund issue",
      updatedDate: "15 Sep 2026",
      assignedTo: "Support",
      status: "Under Review",
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

  const statusClass = (value) => {
    if (value === "Ready to Resolve") {
      return isDark
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-green-50 text-green-600 border-green-200";
    }

    if (value === "Under Review") {
      return isDark
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
        : "bg-blue-50 text-blue-600 border-blue-200";
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
      {/* HEADER */}
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
                  ? "bg-violet-500/10 text-violet-400"
                  : "bg-violet-50 text-violet-600"
              }`}
            >
              <ShieldCheck size={21} />
            </div>

            <div>
              <h2
                className={`text-lg font-semibold ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Resolve Disputes
              </h2>

              <p
                className={`text-xs mt-0.5 ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Review eligible disputes and complete their resolution.
              </p>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-xl border ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Ready to Resolve
            </p>

            <p
              className={`text-lg font-bold ${
                isDark ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {
                disputes.filter(
                  (x) => x.status === "Ready to Resolve"
                ).length
              }
            </p>
          </div>

        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5">

        <div
          className={`rounded-xl border p-4 ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Ready
            </span>

            <CheckCircle2 size={16} className="text-green-500" />
          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {
              disputes.filter(
                (x) => x.status === "Ready to Resolve"
              ).length
            }
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
            <span className="text-xs text-gray-500">
              Under Review
            </span>

            <Clock3 size={16} className="text-blue-500" />
          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {
              disputes.filter(
                (x) => x.status === "Under Review"
              ).length
            }
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
            <span className="text-xs text-gray-500">
              Resolution Amount
            </span>

            <FileText size={16} className="text-violet-500" />
          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            ₹53.2K
          </p>
        </div>

      </div>

      {/* FILTER */}
      <div className="px-5 pb-5">
        <div className="flex flex-col lg:flex-row gap-3">

          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search dispute ID, merchant or reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-indigo-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400"
              }`}
            />
          </div>

          <div className="relative">
            <Filter
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`appearance-none pl-9 pr-9 py-2.5 rounded-lg border text-sm outline-none ${
                isDark
                  ? "bg-gray-900 border-gray-800 text-gray-300"
                  : "bg-white border-gray-200 text-gray-700"
              }`}
            >
              <option value="All">All Status</option>
              <option value="Ready to Resolve">
                Ready to Resolve
              </option>
              <option value="Under Review">
                Under Review
              </option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setStatus("All");
            }}
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

      {/* TABLE */}
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
              <th className="px-5 py-3">Dispute</th>
              <th className="px-5 py-3">Merchant</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Reason</th>
              <th className="px-5 py-3">Updated</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredDisputes.map((item) => (
              <tr
                key={item.id}
                className={`border-b transition ${
                  isDark
                    ? "border-gray-800 hover:bg-gray-900/60"
                    : "border-gray-100 hover:bg-gray-50"
                }`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isDark
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-violet-50 text-violet-600"
                      }`}
                    >
                      <FileText size={14} />
                    </div>

                    <span className="text-sm font-semibold">
                      {item.id}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <UserRound size={15} className="text-gray-400" />
                    <span className="text-sm">
                      {item.merchant}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm font-semibold">
                    {item.amount}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm text-gray-500">
                    {item.reason}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-gray-400" />

                    <span className="text-sm text-gray-500">
                      {item.updatedDate}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md border text-xs font-medium ${statusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">

                    <button
                      className="
                        inline-flex items-center gap-1.5
                        px-3 py-1.5 rounded-md
                        text-xs font-semibold
                        bg-indigo-50 text-indigo-600
                        border border-indigo-200
                        hover:bg-indigo-600 hover:text-white
                        transition active:scale-95
                      "
                    >
                      <Eye size={13} />
                      View
                    </button>

                    <button
                      className="
                        inline-flex items-center gap-1.5
                        px-3 py-1.5 rounded-md
                        text-xs font-semibold
                        bg-violet-50 text-violet-600
                        border border-violet-200
                        hover:bg-violet-600 hover:text-white
                        transition active:scale-95
                      "
                    >
                      <CheckCircle2 size={13} />
                      Resolve
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* FOOTER */}
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
          Resolution records
        </span>
      </div>
    </div>
  );
};

export default ResolveDisputes;

