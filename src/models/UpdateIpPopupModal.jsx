import {
  X,
  Save,
  Globe,
  CalendarDays,
  Server,
  RefreshCw,
} from "lucide-react";

import { toast } from "sonner";
import { updateEntityIp } from "../redux/action";
import { useEffect, useState } from "react";

const UpdateIpPopupModal = ({
  show,
  onClose,
  corp_id,
  ipData,
  dispatch,
  isDark,
  inputClass,
  labelClass,
//   onSuccess,
}) => {
  // ==============================
  // CURRENT DATE TIME
  // ==============================
  const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // ==============================
  // STATES
  // ==============================
  const [ip_address, setIpAddress] = useState("");
  const [effective_from, setEffectiveFrom] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  // ==============================
  // LOAD SELECTED IP
  // ==============================
useEffect(() => {
  if (!ipData) return;

  setIpAddress(
    ipData?.ip_address ||
      ipData?.ip ||
      ""
  );

  setStatus(
    ipData?.status ||
      "Pending"
  );

  if (ipData?.effective_from) {
    const formattedDate = String(ipData.effective_from)
      .trim()
      .replace(" ", "T")
      .slice(0, 16);

    setEffectiveFrom(formattedDate);
  } else {
    setEffectiveFrom(getCurrentDateTime());
  }
}, [ipData, show]);
  // ==============================
  // SUBMIT UPDATE
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ipData) {
      toast.error("IP details not found");
      return;
    }

    if (!ip_address.trim()) {
      toast.error("IP address is required");
      return;
    }

    if (!effective_from) {
      toast.error("Effective date and time is required");
      return;
    }

    const ipId =
      ipData?.id ||
      ipData?._id ||
      ipData?.entity_ip_id;

    if (!ipId) {
      toast.error("IP ID is missing");
      return;
    }

    // Convert:
    // 2026-09-25T14:30
    //
    // to:
    // 2026-09-25 14:30:00

    const formattedDateTime =
      effective_from.replace("T", " ") + ":00";

    const payload = {
      ip_address: ip_address.trim(),
      effective_from: formattedDateTime,
      status: status || "Pending",
    };

    console.log(
      "Update Entity IP:",
      corp_id,
      ipId,
      payload
    );

    try {
      setLoading(true);

      const result = await dispatch(
        updateEntityIp(
          corp_id,
          ipId,
          payload
        )
      );

      if (result !== false) {
        toast.success(
          "Entity IP updated successfully"
        );

        onClose();

        // onSuccess?.();
      }

    } catch (error) {
      console.error(
        "Update IP error:",
        error
      );

      toast.error(
        error?.message ||
          "Failed to update Entity IP"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // CLOSE
  // ==============================
  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">

      {/* ==============================
          OVERLAY
      ============================== */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* ==============================
          MODAL
      ============================== */}
      <div
        className={`
          relative
          w-full
          max-w-md
          rounded-2xl
          border
          shadow-2xl
          overflow-hidden
          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >

        {/* ==============================
            HEADER
        ============================== */}
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
                rounded-lg
                flex items-center justify-center
                ${
                  isDark
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }
              `}
            >
              <Globe size={17} />
            </div>

            <div>

              <h2
                className={`text-base font-semibold ${
                  isDark
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                Update Entity IP
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Update the IP configuration.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className={`
              w-8 h-8
              rounded-lg
              flex items-center justify-center
              transition
              disabled:opacity-40
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

        {/* ==============================
            FORM
        ============================== */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >

          {/* IP ADDRESS */}
          <div>

            <label className={labelClass}>
              IP Address
              <span className="text-red-500 ml-1">
                *
              </span>
            </label>

            <div className="relative">

              <Globe
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={ip_address}
                onChange={(e) =>
                  setIpAddress(
                    e.target.value
                  )
                }
                placeholder="192.168.1.100"
                disabled={loading}
                className={`${inputClass} pl-9`}
              />

            </div>

          </div>

          {/* EFFECTIVE FROM */}
          <div>

            <label className={labelClass}>
              Effective From
              <span className="text-red-500 ml-1">
                *
              </span>
            </label>

            <div className="relative">

              <CalendarDays
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              <input
                type="datetime-local"
                value={effective_from}
                onChange={(e) =>
                  setEffectiveFrom(
                    e.target.value
                  )
                }
                disabled={loading}
                className={`${inputClass} pl-9`}
              />

            </div>

          </div>

          {/* STATUS */}
          <div>

            <label className={labelClass}>
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              disabled={loading}
              className={inputClass}
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

          {/* ==============================
              PREVIEW
          ============================== */}
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
                  w-9 h-9
                  rounded-lg
                  flex items-center justify-center
                  ${
                    isDark
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                  }
                `}
              >
                <Server size={16} />
              </div>

              <div className="min-w-0">

                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  IP Configuration
                </p>

                <p
                  className={`text-sm font-semibold mt-0.5 truncate ${
                    isDark
                      ? "text-gray-200"
                      : "text-gray-800"
                  }`}
                >
                  {ip_address ||
                    "No IP entered"}
                </p>

                <div className="flex items-center gap-2 mt-1">

                  <span className="text-[10px] text-gray-500">
                    {effective_from
                      ? effective_from.replace(
                          "T",
                          " "
                        )
                      : "No date selected"}
                  </span>

                  <span className="text-gray-400">
                    •
                  </span>

                  <span
                    className={`text-[10px] font-medium ${
                      status === "Active"
                        ? "text-green-500"
                        : status === "Inactive"
                        ? "text-orange-500"
                        : "text-gray-500"
                    }`}
                  >
                    {status}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ==============================
              BUTTONS
          ============================== */}
          <div
            className={`
              flex items-center justify-end gap-2
              pt-2
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
              onClick={handleClose}
              disabled={loading}
              className={`
                px-4 py-2
                rounded-lg
                text-xs
                font-medium
                border
                disabled:opacity-50
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
                  Updating...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Update IP
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default UpdateIpPopupModal;