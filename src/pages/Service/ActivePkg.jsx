import React, { useContext, useEffect, useState } from "react";

import {
  Search,
  CheckCircle2,
  Pencil,
  Trash2,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { Theme } from "../../Contexts/Theme";

import {
  getServiceList,
  deleteService,
  updateService,
} from "../../redux/action";

const ActivePkg = () => {
  const { theme } = useContext(Theme);

  const isDark = theme === "dark";

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const [perPage, setPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const serviceData = useSelector(
    (state) => state.services?.services
  );

  const serviceList =
    serviceData?.data || [];

  const totalPages =
    serviceData?.totalPages || 1;

  const total =
    serviceData?.total || 0;

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

  const handleDelete = (serviceId) => {
    dispatch(deleteService(serviceId));
  };

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        isDark
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >

      {/* Header */}

      <div
        className={`px-5 py-5 border-b ${
          isDark
            ? "border-gray-800"
            : "border-gray-200"
        }`}
      >

        <div className="flex items-center justify-between">

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

        </div>

      </div>

      {/* Search */}

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
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-200 text-gray-700"
            }`}
          />

        </div>

      </div>

      {/* Table */}

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

              serviceList.map((service, index) => (

                <tr
                  key={service.service_id}
                  className={`border-t ${
                    isDark
                      ? "border-gray-800 hover:bg-gray-800/50"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >

                  <td className="px-5 py-4 text-xs text-gray-500">
                    {(page - 1) *
                      perPage +
                      index +
                      1}
                  </td>

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

                      <span className="font-medium">
                        {service.service_name}
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4 font-mono text-xs text-gray-500">
                    {service.service_id}
                  </td>

                  <td className="px-5 py-4">

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-green-50 text-green-600 border border-green-200">

                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />

                      Active

                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          handleDelete(
                            service.service_id
                          )
                        }
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

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

      {/* Pagination */}

      <div
        className={`px-5 py-4 flex items-center justify-between border-t ${
          isDark
            ? "border-gray-800"
            : "border-gray-100"
        }`}
      >

        <span className="text-xs text-gray-500">
          Page {page} of {totalPages}
        </span>

        <div className="flex items-center gap-1">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage((p) => p - 1)
            }
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage((p) => p + 1)
            }
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ActivePkg;