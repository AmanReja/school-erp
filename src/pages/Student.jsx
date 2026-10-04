import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Search, Users, Pencil, Trash2, Eye } from "lucide-react";

import { useSettings } from "../Contexts/SettingsContext";
import { getStudents } from "../redux/action";
import CreateStudentModal from "../models/CreateStudentModal";

const Student = () => {
  const corpid = useSelector((state) => state.auth?.corpId || null);
  console.log("corpId in Student.jsx:", corpid);
  const dispatch = useDispatch();
  const { theme } = useSettings();

  const isDark = theme === "dark";

  const students = useSelector((state) => state.auth?.students || []);

  const loading = useSelector((state) => state.student?.loading || false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getStudents(corpid));
  }, [dispatch, corpid]);

  const filteredStudents = students.filter((student) => {
    const value = search.toLowerCase();

    return (
      student.name?.toLowerCase().includes(value) ||
      student.loginId?.toLowerCase().includes(value) ||
      student.rollNumber?.toString().includes(value)
    );
  });

  return (
    <div
      className={`min-h-full p-6 transition-colors ${
        isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
              isDark ? "bg-indigo-900/30" : "bg-indigo-100"
            }`}
          >
            <Users size={21} className="text-indigo-600" />
          </div>

          <div>
            <h1
              className={`text-2xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Students
            </h1>

            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage all students
            </p>
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Student
        </button>
      </div>

      {/* Search */}
      <div
        className={`mb-5 rounded-2xl border p-4 ${
          isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}
      >
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student..."
            className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none transition ${
              isDark
                ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-indigo-500"
                : "border-gray-200 bg-gray-50 text-gray-900 focus:border-indigo-500"
            }`}
          />
        </div>
      </div>

      {/* Student Table */}
      <div
        className={`overflow-hidden rounded-2xl border ${
          isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead
              className={`border-b ${
                isDark
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <tr>
                {[
                  "ID",
                  "Student",
                  "Age",
                  "Roll Number",
                  "Class",
                  "Login ID",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`px-5 py-4 text-xs font-semibold uppercase ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    } ${heading === "Actions" ? "text-right" : ""}`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody
              className={`divide-y ${
                isDark ? "divide-gray-800" : "divide-gray-100"
              }`}
            >
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-10 text-center text-sm text-gray-500"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-10 text-center">
                    <Users size={35} className="mx-auto mb-3 text-gray-300" />

                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      No students found
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Create your first student
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className={`transition ${
                      isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
                    }`}
                  >
                    {/* ID */}
                    <td
                      className={`px-5 py-4 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      #{student.id}
                    </td>

                    {/* Student */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                          {student.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <p
                            className={`text-sm font-medium ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {student.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {student.address || "No address"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Age */}
                    <td
                      className={`px-5 py-4 text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {student.age || "-"}
                    </td>

                    {/* Roll */}
                    <td
                      className={`px-5 py-4 text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {student.rollNumber || "-"}
                    </td>

                    {/* Class */}
                    <td
                      className={`px-5 py-4 text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {student.classId || "-"}
                    </td>

                    {/* Login */}
                    <td
                      className={`px-5 py-4 text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {student.loginId || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          student.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          title="View"
                          className={`rounded-lg p-2 transition ${
                            isDark
                              ? "text-gray-400 hover:bg-gray-800 hover:text-indigo-400"
                              : "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                          }`}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          title="Edit"
                          className={`rounded-lg p-2 transition ${
                            isDark
                              ? "text-gray-400 hover:bg-gray-800 hover:text-indigo-400"
                              : "text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                          }`}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          title="Delete"
                          className={`rounded-lg p-2 transition ${
                            isDark
                              ? "text-gray-400 hover:bg-red-900/20 hover:text-red-400"
                              : "text-gray-500 hover:bg-red-50 hover:text-red-600"
                          }`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Student Modal */}
      <CreateStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Student;
