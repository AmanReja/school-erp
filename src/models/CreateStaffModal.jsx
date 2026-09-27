
import React, { useState } from "react";
import {
  X,
  UserPlus,
  User,
  Lock,
  MapPin,
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { createStaff } from "../redux/action";

const CreateStaffModal = ({
  show,
  onClose,
  corpId,
  dispatch,
  isDark,
  inputClass,
  labelClass,
}) => {
  const [formData, setFormData] = useState({
    role: "TEACHER",
    name: "",
    age: "",
    address: "",
    loginId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      role: "TEACHER",
      name: "",
      age: "",
      address: "",
      loginId: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!corpId) {
      toast.error("Company ID is required");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.loginId.trim()) {
      toast.error("Login ID is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (!formData.age) {
      toast.error("Age is required");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }

    try {
      setLoading(true);

      const result = await dispatch(
        createStaff(corpId, {
          ...formData,
          name: formData.name.trim(),
          loginId: formData.loginId.trim(),
          address: formData.address.trim(),
        })
      );

      if (result) {
        toast.success("Staff created successfully");
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error("Create staff error:", error);
      toast.error(
        error?.message || "Failed to create staff"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={`
          relative
          w-full
          max-w-lg
          max-h-[90vh]
          overflow-hidden
          rounded-2xl
          border
          shadow-2xl
          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >

        {/* Header */}
        <div
          className={`
            px-5 py-4
            border-b
            flex items-center justify-between
            ${
              isDark
                ? "border-gray-800"
                : "border-gray-200"
            }
          `}
        >
          <div className="flex items-center gap-3">

            <div
              className={`
                w-9 h-9
                rounded-xl
                flex items-center justify-center
                ${
                  isDark
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }
              `}
            >
              <UserPlus size={17} />
            </div>

            <div>
              <h2
                className={`
                  text-base
                  font-semibold
                  ${
                    isDark
                      ? "text-gray-100"
                      : "text-gray-800"
                  }
                `}
              >
                Create Staff
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Create a teacher or staff account.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`
              w-8 h-8
              rounded-lg
              flex items-center justify-center
              transition
              ${
                isDark
                  ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }
            `}
          >
            <X size={17} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 overflow-y-auto max-h-[calc(90vh-73px)]"
        >

          {/* Company */}
          <div
            className={`
              rounded-xl border px-3 py-2.5
              ${
                isDark
                  ? "bg-gray-800/40 border-gray-800"
                  : "bg-gray-50 border-gray-200"
              }
            `}
          >
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Company
            </p>

            <p
              className={`
                text-xs font-medium mt-1
                ${
                  isDark
                    ? "text-gray-300"
                    : "text-gray-700"
                }
              `}
            >
              {corpId || "No company selected"}
            </p>
          </div>

          {/* Role + Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className={labelClass}>
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="TEACHER">
                  Teacher
                </option>

                <option value="STAFF">
                  Staff
                </option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Name
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

          </div>

          {/* Age + Login ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className={labelClass}>
                Age
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <CalendarDays
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="number"
                  name="age"
                  min="1"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Login ID
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="loginId"
                  value={formData.loginId}
                  onChange={handleChange}
                  placeholder="Enter login ID"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={labelClass}>
              Address
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="relative">
              <MapPin
                size={15}
                className="absolute left-3 top-3 text-gray-400"
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={3}
                className={`${inputClass} pl-9 resize-none`}
              />
            </div>
          </div>

          {/* Preview */}
          <div
            className={`
              rounded-xl
              border
              p-3
              ${
                isDark
                  ? "bg-gray-800/40 border-gray-800"
                  : "bg-gray-50 border-gray-200"
              }
            `}
          >
            <div className="flex items-center gap-3">

              <div
                className={`
                  w-8 h-8
                  rounded-lg
                  flex items-center justify-center
                  ${
                    isDark
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                  }
                `}
              >
                <UserPlus size={15} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Staff Account
                </p>

                <p
                  className={`
                    text-xs font-medium mt-0.5
                    ${
                      isDark
                        ? "text-gray-300"
                        : "text-gray-700"
                    }
                  `}
                >
                  {formData.name || "New Staff"}
                </p>

                <p className="text-[10px] text-gray-500 mt-0.5">
                  {formData.role} •{" "}
                  {formData.loginId || "No login ID"}
                </p>
              </div>

            </div>
          </div>

          {/* Buttons */}
          <div
            className={`
              flex items-center justify-end gap-2
              pt-3
              border-t
              ${
                isDark
                  ? "border-gray-800"
                  : "border-gray-200"
              }
            `}
          >

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`
                px-4 py-2
                rounded-lg
                text-xs
                font-medium
                border
                ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                px-4 py-2
                rounded-lg
                bg-indigo-600
                hover:bg-indigo-700
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-white
                text-xs
                font-semibold
                flex items-center gap-2
              "
            >

              {loading ? (
                <>
                  <RefreshCw
                    size={14}
                    className="animate-spin"
                  />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Create Staff
                </>
              )}

            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateStaffModal;

