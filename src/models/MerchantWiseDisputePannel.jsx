import React from "react";
import {
  X,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Building2,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MerchantWiseDisputePanel = ({
  isOpen,
  onClose,
  corpId,
  merchantName,
  isDark,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    navigate(`/dashboard/dispute/${path}/${corpId}`);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[100] h-full w-full sm:w-[420px] shadow-2xl border-l ${
          isDark
            ? "bg-gray-950 border-gray-800 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        {/* ================= HEADER ================= */}

        <div
          className={`px-5 py-5 border-b ${
            isDark
              ? "border-gray-800"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-3">

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isDark
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <Building2 size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Merchant Disputes
                </h2>

                <p
                  className={`text-xs mt-1 ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  Manage disputes for this merchant
                </p>
              </div>

            </div>

            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                isDark
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-500"
              }`}
            >
              <X size={18} />
            </button>

          </div>
        </div>

        {/* ================= MERCHANT INFO ================= */}

        <div className="px-5 pt-5">

          <div
            className={`rounded-xl border p-4 ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
          >

            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              Merchant
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${
                isDark
                  ? "text-gray-100"
                  : "text-gray-800"
              }`}
            >
              {merchantName || "Selected Merchant"}
            </p>

            {corpId && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">
                  Corp ID
                </span>

                <span
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold ${
                    isDark
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  {corpId}
                </span>
              </div>
            )}

          </div>

        </div>

        {/* ================= MENU ================= */}

        <div className="px-5 py-6">

          <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-3">
            Dispute Management
          </p>

          <div className="space-y-3">

            {/* OPEN */}

            <button
              onClick={() => handleNavigate("open")}
              className={`group w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                isDark
                  ? "bg-gray-900 border-gray-800 hover:border-orange-500/40 hover:bg-orange-500/5"
                  : "bg-white border-gray-200 hover:border-orange-200 hover:bg-orange-50/50"
              }`}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  <AlertCircle size={19} />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold">
                    Open Disputes
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Review active disputes
                  </p>
                </div>

              </div>

              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* RESOLVED */}

            <button
              onClick={() => handleNavigate("resolve")}
              className={`group w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                isDark
                  ? "bg-gray-900 border-gray-800 hover:border-green-500/40 hover:bg-green-500/5"
                  : "bg-white border-gray-200 hover:border-green-200 hover:bg-green-50/50"
              }`}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-green-500/10 text-green-400"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  <CheckCircle2 size={19} />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold">
                    Resolved Disputes
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    View completed disputes
                  </p>
                </div>

              </div>

              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* REJECTED */}

            <button
              onClick={() => handleNavigate("rejected")}
              className={`group w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                isDark
                  ? "bg-gray-900 border-gray-800 hover:border-red-500/40 hover:bg-red-500/5"
                  : "bg-white border-gray-200 hover:border-red-200 hover:bg-red-50/50"
              }`}
            >
              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-red-500/10 text-red-400"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  <XCircle size={19} />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold">
                    Rejected Disputes
                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">
                    View rejected disputes
                  </p>
                </div>

              </div>

              <ChevronRight
                size={18}
                className="text-gray-400 group-hover:translate-x-1 transition-transform"
              />
            </button>

          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <div
          className={`absolute bottom-0 left-0 right-0 px-5 py-4 border-t ${
            isDark
              ? "border-gray-800 bg-gray-950"
              : "border-gray-200 bg-white"
          }`}
        >
          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-lg text-sm font-medium border transition ${
              isDark
                ? "border-gray-800 text-gray-400 hover:bg-gray-900"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            Close Panel
          </button>
        </div>

      </div>
    </>
  );
};

export default MerchantWiseDisputePanel;