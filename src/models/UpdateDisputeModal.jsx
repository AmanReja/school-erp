
import React, { useEffect, useState } from "react";
import {
  X,
  FileText,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertCircle,
  Save,
  Loader2,
} from "lucide-react";


const UpdateDisputeModal = ({
  dispute,
  onClose,
  onUpdate,
  isDark,
  loading = false,
}) => {
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  

  /* --------------------------------
     Load existing dispute data
  -------------------------------- */

  useEffect(() => {
    if (dispute) {
      setStatus(dispute.status || "open");
      setRemarks(dispute.dispute_remarks || "");
    }
  }, [dispute]);

  if (!dispute) return null;

  /* --------------------------------
     Status configuration
  -------------------------------- */

  const statusOptions = [
    {
      value: "open",
      label: "Open",
      icon: AlertCircle,
    },
    {
      value: "under_review",
      label: "Under Review",
      icon: Clock3,
    },
    {
      value: "resolved",
      label: "Resolved",
      icon: CheckCircle2,
    },
    {
      value: "rejected",
      label: "Rejected",
      icon: XCircle,
    },
  ];

  const getStatusColor = (value) => {
    switch (value) {
      case "open":
        return isDark
          ? "text-orange-400 bg-orange-500/10 border-orange-500/30"
          : "text-orange-600 bg-orange-50 border-orange-200";

      case "under_review":
        return isDark
          ? "text-blue-400 bg-blue-500/10 border-blue-500/30"
          : "text-blue-600 bg-blue-50 border-blue-200";

      case "resolved":
        return isDark
          ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
          : "text-emerald-600 bg-emerald-50 border-emerald-200";

      case "rejected":
        return isDark
          ? "text-red-400 bg-red-500/10 border-red-500/30"
          : "text-red-600 bg-red-50 border-red-200";

      default:
        return isDark
          ? "text-gray-400 bg-gray-500/10 border-gray-500/30"
          : "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  /* --------------------------------
     Submit
  -------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) return;

    await onUpdate({
    //   id: dispute.id,
      status:status,
      dispute_remarks: remarks.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={!loading ? onClose : undefined}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden ${
          isDark
            ? "bg-gray-900 border-gray-800 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >

        {/* ============================
            HEADER
        ============================ */}

        <div
          className={`flex items-center justify-between px-6 py-5 border-b ${
            isDark
              ? "border-gray-800"
              : "border-gray-200"
          }`}
        >

          <div className="flex items-center gap-3">

            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <FileText size={21} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Update Dispute
              </h2>

              <p
                className={`text-xs mt-0.5 ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Update dispute status and remarks
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
              isDark
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <X size={20} />
          </button>

        </div>

        {/* ============================
            FORM
        ============================ */}

        <form onSubmit={handleSubmit}>

          <div className="p-6 space-y-6">

            {/* Dispute ID */}

            <div
              className={`rounded-xl border p-4 ${
                isDark
                  ? "bg-gray-800/40 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <p
                    className={`text-xs mb-1 ${
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    Dispute ID
                  </p>

                  <p className="text-sm font-semibold">
                    #{dispute.id}
                  </p>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                    dispute.status
                  )}`}
                >
                  {dispute.status
                    ?.replace(/_/g, " ")
                    .replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                </div>

              </div>

            </div>

            {/* ============================
                STATUS
            ============================ */}

            <div>

              <label
                className={`block text-sm font-medium mb-3 ${
                  isDark
                    ? "text-gray-200"
                    : "text-gray-700"
                }`}
              >
                Dispute Status
              </label>

              <div className="grid grid-cols-2 gap-3">

                {statusOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = status === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        setStatus(option.value)
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        selected
                          ? getStatusColor(option.value)
                          : isDark
                          ? "bg-gray-800/40 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                          : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      }`}
                    >
                      <Icon size={17} />

                      <span>
                        {option.label}
                      </span>

                      {selected && (
                        <CheckCircle2
                          size={15}
                          className="ml-auto"
                        />
                      )}

                    </button>
                  );
                })}

              </div>

            </div>

            {/* ============================
                REMARKS
            ============================ */}

            <div>

              <label
                className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                  isDark
                    ? "text-gray-200"
                    : "text-gray-700"
                }`}
              >
                <MessageSquare size={16} />

                Dispute Remarks
              </label>

              <textarea
                value={remarks}
                onChange={(e) =>
                  setRemarks(e.target.value)
                }
                disabled={loading}
                rows={5}
                placeholder="Enter remarks about this dispute..."
                className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-blue-500"
                    : "bg-white border-gray-200 text-gray-700 placeholder-gray-400 focus:border-blue-500"
                }`}
              />

              <div className="flex justify-end mt-1">

                <span
                  className={`text-xs ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {remarks.length} characters
                </span>

              </div>

            </div>

          </div>

          {/* ============================
              FOOTER
          ============================ */}

          <div
            className={`flex justify-end gap-3 px-6 py-4 border-t ${
              isDark
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !status}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >

              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  Updating...
                </>
              ) : (
                <>
                  <Save size={16} />

                  Update Dispute
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default UpdateDisputeModal;

