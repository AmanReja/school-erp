
import React, { useContext, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Store,
  CheckCircle2,
  CalendarDays,
  UserRound,
  FileText,
  Eye,
  RotateCcw,
  AlertCircle,
  Clock3,
  XCircle,
} from "lucide-react";

import { Theme } from "../../Contexts/Theme";

const Merchants = () => {
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Replace this with your API response
  const merchants = [
    {
      id: "MER-1001",
      name: "Acme Technologies",
      email: "support@acme.com",
      phone: "+91 9876543210",
      totalDisputes: 46,
      openDisputes: 12,
      resolvedDisputes: 24,
      closedDisputes: 10,
      disputedAmount: "₹2,45,800",
      status: "Active",
      lastDispute: "18 Sep 2026",
    },
    {
      id: "MER-1002",
      name: "Global Traders",
      email: "contact@globaltraders.com",
      phone: "+91 9876543211",
      totalDisputes: 30,
      openDisputes: 5,
      resolvedDisputes: 18,
      closedDisputes: 7,
      disputedAmount: "₹1,84,500",
      status: "Active",
      lastDispute: "17 Sep 2026",
    },
    {
      id: "MER-1003",
      name: "Nova Solutions",
      email: "admin@novasolutions.com",
      phone: "+91 9876543212",
      totalDisputes: 14,
      openDisputes: 3,
      resolvedDisputes: 9,
      closedDisputes: 2,
      disputedAmount: "₹96,200",
      status: "Active",
      lastDispute: "15 Sep 2026",
    },
    {
      id: "MER-1004",
      name: "Vertex Retail",
      email: "support@vertexretail.com",
      phone: "+91 9876543213",
      totalDisputes: 21,
      openDisputes: 4,
      resolvedDisputes: 11,
      closedDisputes: 6,
      disputedAmount: "₹1,28,750",
      status: "Inactive",
      lastDispute: "13 Sep 2026",
    },
  ];

  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        merchant.id.toLowerCase().includes(searchText) ||
        merchant.name.toLowerCase().includes(searchText) ||
        merchant.email.toLowerCase().includes(searchText) ||
        merchant.phone.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "All" || merchant.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const totalMerchants = merchants.length;

  const activeMerchants = merchants.filter(
    (merchant) => merchant.status === "Active"
  ).length;

  const totalDisputes = merchants.reduce(
    (sum, merchant) => sum + merchant.totalDisputes,
    0
  );

  const totalOpen = merchants.reduce(
    (sum, merchant) => sum + merchant.openDisputes,
    0
  );

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
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              <Store size={21} />
            </div>

            <div>
              <h2
                className={`text-lg font-semibold ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Merchants
              </h2>

              <p
                className={`text-xs mt-0.5 ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Manage merchants and monitor their dispute activity.
              </p>
            </div>

          </div>

          {/* Total Merchants */}
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
              Total Merchants
            </p>

            <p
              className={`text-lg font-bold ${
                isDark ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {totalMerchants}
            </p>
          </div>

        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5">

        {/* Active Merchants */}
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
              Active Merchants
            </span>

            <CheckCircle2
              size={16}
              className="text-green-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {activeMerchants}
          </p>
        </div>

        {/* Total Disputes */}
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
              Total Disputes
            </span>

            <FileText
              size={16}
              className="text-indigo-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {totalDisputes}
          </p>
        </div>

        {/* Open Disputes */}
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
              Open Disputes
            </span>

            <AlertCircle
              size={16}
              className="text-orange-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {totalOpen}
          </p>
        </div>

        {/* Last Updated */}
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
              System Status
            </span>

            <Clock3
              size={16}
              className="text-violet-500"
            />

          </div>

          <p
            className={`mt-2 text-xl font-bold ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Active
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
              placeholder="Search merchant, ID, email or phone..."
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
              <option value="All">
                All Merchants
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

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
                Merchant
              </th>

              <th className="px-5 py-3 font-semibold">
                Contact
              </th>

              <th className="px-5 py-3 font-semibold">
                Total
              </th>

              <th className="px-5 py-3 font-semibold">
                Open
              </th>

              <th className="px-5 py-3 font-semibold">
                Resolved
              </th>

              <th className="px-5 py-3 font-semibold">
                Closed
              </th>

              <th className="px-5 py-3 font-semibold">
                Amount
              </th>

              <th className="px-5 py-3 font-semibold">
                Status
              </th>

              <th className="px-5 py-3 font-semibold text-right">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredMerchants.length > 0 ? (

              filteredMerchants.map((merchant) => (

                <tr
                  key={merchant.id}
                  className={`border-b transition ${
                    isDark
                      ? "border-gray-800 hover:bg-gray-900/60"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >

                  {/* ================= MERCHANT ================= */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          isDark
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        <Store size={16} />
                      </div>

                      <div>

                        <p
                          className={`text-sm font-semibold ${
                            isDark
                              ? "text-gray-200"
                              : "text-gray-800"
                          }`}
                        >
                          {merchant.name}
                        </p>

                        <p
                          className={`text-[11px] mt-0.5 ${
                            isDark
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {merchant.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ================= CONTACT ================= */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <UserRound
                        size={14}
                        className={
                          isDark
                            ? "text-gray-600"
                            : "text-gray-400"
                        }
                      />

                      <div>

                        <p
                          className={`text-xs ${
                            isDark
                              ? "text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          {merchant.email}
                        </p>

                        <p
                          className={`text-[11px] mt-0.5 ${
                            isDark
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {merchant.phone}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* ================= TOTAL ================= */}
                  <td className="px-5 py-4">

                    <span
                      className={`text-sm font-semibold ${
                        isDark
                          ? "text-gray-200"
                          : "text-gray-800"
                      }`}
                    >
                      {merchant.totalDisputes}
                    </span>

                  </td>

                  {/* ================= OPEN ================= */}
                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                        isDark
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {merchant.openDisputes}
                    </span>

                  </td>

                  {/* ================= RESOLVED ================= */}
                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                        isDark
                          ? "bg-green-500/10 text-green-400"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {merchant.resolvedDisputes}
                    </span>

                  </td>

                  {/* ================= CLOSED ================= */}
                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                        isDark
                          ? "bg-gray-800 text-gray-400"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {merchant.closedDisputes}
                    </span>

                  </td>

                  {/* ================= AMOUNT ================= */}
                  <td className="px-5 py-4">

                    <span
                      className={`text-sm font-semibold ${
                        isDark
                          ? "text-gray-200"
                          : "text-gray-800"
                      }`}
                    >
                      {merchant.disputedAmount}
                    </span>

                  </td>

                  {/* ================= STATUS ================= */}
                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        merchant.status === "Active"
                          ? isDark
                            ? "bg-green-500/10 text-green-400"
                            : "bg-green-50 text-green-600"
                          : isDark
                          ? "bg-red-500/10 text-red-400"
                          : "bg-red-50 text-red-600"
                      }`}
                    >

                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          merchant.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />

                      {merchant.status}

                    </span>

                  </td>

                  {/* ================= ACTION ================= */}
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
                  colSpan="9"
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
                      <Store size={22} />
                    </div>

                    <p
                      className={`mt-3 text-sm font-semibold ${
                        isDark
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      No merchants found
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
          Showing {filteredMerchants.length} of{" "}
          {merchants.length} merchants
        </span>

        <span className="text-xs">
          Merchant records
        </span>

      </div>

    </div>
  );
};

export default Merchants;
