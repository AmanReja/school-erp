import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { createStudent, getStudents } from "../redux/action";
import { useSettings } from "../Contexts/SettingsContext";

const CreateStudentModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { theme } = useSettings();

  const isDark = theme === "dark";

  const [corpId, setCorpId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    loginId: "",
    password: "",
    rollNumber: "",
    classId: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setCorpId("");

    setFormData({
      name: "",
      age: "",
      address: "",
      loginId: "",
      password: "",
      rollNumber: "",
      classId: "",
    });

    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createStudent(corpId, formData));

      // Refresh student list
      dispatch(getStudents(corpId));

      handleClose();
    } catch (error) {
      console.error("Create student error:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isDark ? "bg-black/70" : "bg-black/50"
      }`}
    >
      <div
        className={`w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b px-6 py-4 ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div>
            <h2
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Create Student
            </h2>

            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Add a new student
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className={`rounded-lg p-2 transition ${
              isDark
                ? "text-gray-400 hover:bg-gray-800"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] overflow-y-auto p-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Corporation ID */}
            <div className="md:col-span-2">
              <label
                className={`mb-1.5 block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Corporation ID
              </label>

              <input
                value={corpId}
                onChange={(e) => setCorpId(e.target.value)}
                placeholder="Enter corporation ID"
                required
                className={`student-input ${
                  isDark ? "student-input-dark" : ""
                }`}
              />
            </div>

            {/* Name */}
            <div>
              <label
                className={`mb-1.5 block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Student Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
                className={`student-input ${
                  isDark ? "student-input-dark" : ""
                }`}
              />
            </div>

            {/* Age */}
            <div>
              <label
                className={`mb-1.5 block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
                className={`student-input ${
                  isDark ? "student-input-dark" : ""
                }`}
              />
            </div>

            {/* Roll Number */}
            <div>
              <label
                className={`mb-1.5 block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Roll Number
              </label>

              <input
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                required
                className={`student-input ${
                  isDark ? "student-input-dark" : ""
                }`}
              />
            </div>

            {/* Class */}
            <div>
              <label
                className={`mb-1.5 block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Class ID
              </label>

              <input
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                placeholder="Enter class ID"
                required
                className={`student-input ${
                  isDark ? "student-input-dark" : ""
                }`}
              />
            </div>

            {/* Login ID */}
            <div>
              <label
                className={`mb-1.5 block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Login ID
              </label>

              <input
                name="loginId"
                value={formData.loginId}
                onChange={handleChange}
                placeholder="Enter login ID"
                required
                className={`student-input ${
                  isDark ? "student-input-dark" : ""
                }`}
              />
            </div>

            {/* Password */}
            <div>
              <label
                className={`mb-1.5 block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className={`student-input ${
                  isDark ? "student-input-dark" : ""
                }`}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label
                className={`mb-1.5 block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={3}
                required
                className={`student-input resize-none ${
                  isDark ? "student-input-dark" : ""
                }`}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className={`mt-6 flex justify-end gap-3 border-t pt-5 ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <button
              type="button"
              onClick={handleClose}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <Save size={17} />
              Create Student
            </button>
          </div>
        </form>
      </div>

      {/* Input styles */}
      <style>{`
        .student-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          color: #111827;
          transition: 0.2s;
        }

        .student-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .student-input-dark {
          background: #1f2937;
          border-color: #374151;
          color: white;
        }

        .student-input-dark::placeholder {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default CreateStudentModal;
