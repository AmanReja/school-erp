import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Users,
  Eye,
  Edit,
  Trash2,
  Loader2,
  UserRound,
} from "lucide-react";

import { getStudents } from "../../redux/action";
import { useSettings } from "../../Contexts/SettingsContext";

const Students = () => {
  const dispatch = useDispatch();

  const { theme } = useSettings();
  const isDark = theme === "dark";

  const {
    students = [],
    studentsLoading,
    studentsError,
    corpId,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (corpId) {
      dispatch(getStudents(corpId));
    }
  }, [dispatch, corpId]);

  const cardClass = isDark
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const textClass = isDark ? "text-white" : "text-gray-900";

  const mutedClass = isDark
    ? "text-gray-400"
    : "text-gray-500";

  const tableHeaderClass = isDark
    ? "bg-gray-800/70 text-gray-300"
    : "bg-gray-50 text-gray-600";

  const rowClass = isDark
    ? "border-gray-800 hover:bg-gray-800/50"
    : "border-gray-100 hover:bg-gray-50";

  const inputClass = isDark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400";

  if (!corpId) {
    return (
      <div className="p-6">
        <div
          className={`rounded-xl border p-8 text-center ${cardClass}`}
        >
          <Users className={`mx-auto mb-3 ${mutedClass}`} size={40} />

          <h3 className={`text-lg font-semibold ${textClass}`}>
            Company not found
          </h3>

          <p className={`mt-1 text-sm ${mutedClass}`}>
            Unable to load students because company ID is missing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-5">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                isDark ? "bg-blue-500/10" : "bg-blue-50"
              }`}
            >
              <Users
                size={22}
                className="text-blue-500"
              />
            </div>

            <div>
              <h1 className={`text-xl font-bold ${textClass}`}>
                Students
              </h1>

              <p className={`text-sm ${mutedClass}`}>
                Manage all students
              </p>
            </div>
          </div>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 ${cardClass}`}
        >
          <p className={`text-xs ${mutedClass}`}>
            Total Students
          </p>

          <p className={`text-xl font-bold ${textClass}`}>
            {students.length}
          </p>
        </div>
      </div>

      {/* =========================
          SEARCH / FILTER
      ========================= */}
      <div
        className={`rounded-xl border p-4 ${cardClass}`}
      >
        <div className="relative max-w-md">
          <Search
            size={18}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${mutedClass}`}
          />

          <input
            type="text"
            placeholder="Search students..."
            className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 ${inputClass}`}
          />
        </div>
      </div>

      {/* =========================
          ERROR
      ========================= */}
      {studentsError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
          {studentsError}
        </div>
      )}

      {/* =========================
          TABLE
      ========================= */}
      <div
        className={`overflow-hidden rounded-xl border ${cardClass}`}
      >
        {studentsLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2
                size={30}
                className="animate-spin text-blue-500"
              />

              <p className={`text-sm ${mutedClass}`}>
                Loading students...
              </p>
            </div>
          </div>
        ) : students.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <UserRound
              size={42}
              className={mutedClass}
            />

            <h3 className={`mt-3 font-semibold ${textClass}`}>
              No students found
            </h3>

            <p className={`mt-1 text-sm ${mutedClass}`}>
              There are no students available.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">

              {/* TABLE HEADER */}
              <thead>
                <tr className={tableHeaderClass}>
                  <th className="px-5 py-3 text-xs font-semibold uppercase">
                    Student
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase">
                    Roll Number
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase">
                    Class
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase">
                    Email
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase">
                    Phone
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className={`border-t transition ${rowClass}`}
                  >
                    {/* STUDENT */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            isDark
                              ? "bg-blue-500/10"
                              : "bg-blue-50"
                          }`}
                        >
                          <UserRound
                            size={18}
                            className="text-blue-500"
                          />
                        </div>

                        <div>
                          <p
                            className={`font-medium ${textClass}`}
                          >
                            {student.name || "N/A"}
                          </p>

                          <p
                            className={`text-xs ${mutedClass}`}
                          >
                            ID: {student.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* ROLL NUMBER */}
                    <td
                      className={`px-5 py-4 text-sm ${textClass}`}
                    >
                      {student.rollNumber || "N/A"}
                    </td>

                    {/* CLASS */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                          isDark
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-purple-50 text-purple-600"
                        }`}
                      >
                        {student.class?.name || "N/A"}
                      </span>
                    </td>

                    {/* EMAIL */}
                    <td
                      className={`px-5 py-4 text-sm ${mutedClass}`}
                    >
                      {student.email || "N/A"}
                    </td>

                    {/* PHONE */}
                    <td
                      className={`px-5 py-4 text-sm ${mutedClass}`}
                    >
                      {student.phone || "N/A"}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          className={`rounded-lg p-2 transition ${
                            isDark
                              ? "text-gray-400 hover:bg-gray-800 hover:text-blue-400"
                              : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                          }`}
                          title="View"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          className={`rounded-lg p-2 transition ${
                            isDark
                              ? "text-gray-400 hover:bg-gray-800 hover:text-yellow-400"
                              : "text-gray-500 hover:bg-gray-100 hover:text-yellow-600"
                          }`}
                          title="Edit"
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          type="button"
                          className={`rounded-lg p-2 transition ${
                            isDark
                              ? "text-gray-400 hover:bg-gray-800 hover:text-red-400"
                              : "text-gray-500 hover:bg-gray-100 hover:text-red-600"
                          }`}
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;