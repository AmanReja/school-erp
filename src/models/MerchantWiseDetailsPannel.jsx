import React from "react";
import {
  X,
  Building2,
  WalletCards,
  Wallet,
  Globe2,
  Workflow,
  BookOpen,
  ArrowLeftRight,
  ChevronRight,SlidersHorizontal ,Cog 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MerchantWiseDetailsPannel = ({
  isOpen,
  onClose,
  corpId,
  merchantName,
  isDark,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    if (!corpId) return;

    navigate(`/dashboard/${path}/${corpId}`);
    onClose();
  };

  const menuItems = [
    {
      label: "Set Commercial",
      description: "Manage Commercial operations",
      path: "commerciallist/commercialmaster",
      icon: WalletCards,
      darkIcon: "text-orange-400",
      lightIcon: "text-orange-600",
      darkBg: "bg-orange-500/10",
      lightBg: "bg-orange-50",
      darkHover: "hover:border-orange-500/40 hover:bg-orange-500/5",
      lightHover: "hover:border-orange-200 hover:bg-orange-50/50",
    },
    {
      label: "Manual Fund",
      description: "Manage manual fund operations",
      path: "fundbycorp",
      icon: WalletCards,
      darkIcon: "text-orange-400",
      lightIcon: "text-orange-600",
      darkBg: "bg-orange-500/10",
      lightBg: "bg-orange-50",
      darkHover: "hover:border-orange-500/40 hover:bg-orange-500/5",
      lightHover: "hover:border-orange-200 hover:bg-orange-50/50",
    },
    {
      label: "Virtual Fund",
      description: "View and manage virtual funds",
      path: "Virfundbycorpid",
      icon: Wallet,
      darkIcon: "text-green-400",
      lightIcon: "text-green-600",
      darkBg: "bg-green-500/10",
      lightBg: "bg-green-50",
      darkHover: "hover:border-green-500/40 hover:bg-green-500/5",
      lightHover: "hover:border-green-200 hover:bg-green-50/50",
    },
    {
      label: "IP Request",
      description: "Manage merchant IP requests",
      path: "entityIp",
      icon: Globe2,
      darkIcon: "text-blue-400",
      lightIcon: "text-blue-600",
      darkBg: "bg-blue-500/10",
      lightBg: "bg-blue-50",
      darkHover: "hover:border-blue-500/40 hover:bg-blue-500/5",
      lightHover: "hover:border-blue-200 hover:bg-blue-50/50",
    },
    {
      label: "Entity Callback",
      description: "Configure entity callback settings",
      path: "entitycallback",
      icon: Workflow,
      darkIcon: "text-purple-400",
      lightIcon: "text-purple-600",
      darkBg: "bg-purple-500/10",
      lightBg: "bg-purple-50",
      darkHover: "hover:border-purple-500/40 hover:bg-purple-500/5",
      lightHover: "hover:border-purple-200 hover:bg-purple-50/50",
    },
    {
      label: "Ledger",
      description: "View merchant ledger records",
      path: "ledger",
      icon: BookOpen,
      darkIcon: "text-cyan-400",
      lightIcon: "text-cyan-600",
      darkBg: "bg-cyan-500/10",
      lightBg: "bg-cyan-50",
      darkHover: "hover:border-cyan-500/40 hover:bg-cyan-500/5",
      lightHover: "hover:border-cyan-200 hover:bg-cyan-50/50",
    },
    {
      label: "Transactions",
      description: "View merchant transactions",
      path: "transaction/transactionMaster",
      icon: ArrowLeftRight,
      darkIcon: "text-indigo-400",
      lightIcon: "text-indigo-600",
      darkBg: "bg-indigo-500/10",
      lightBg: "bg-indigo-50",
      darkHover: "hover:border-indigo-500/40 hover:bg-indigo-500/5",
      lightHover: "hover:border-indigo-200 hover:bg-indigo-50/50",
    },
    {
      label: "Settlement",
      description: "View merchant Settlements",
      path: "Settlement",
      icon: SlidersHorizontal,
      darkIcon: "text-pink-400",
      lightIcon: "text-pink-600",
      darkBg: "bg-indigo-500/10",
      lightBg: "bg-indigo-50",
      darkHover: "hover:border-indigo-500/40 hover:bg-indigo-500/5",
      lightHover: "hover:border-indigo-200 hover:bg-indigo-50/50",
    },
    {
      label: "Merchant Config",
      description: "View and edit merchant configaration",
      path: "merchant/merchant_configuration",
      icon: Cog ,
      darkIcon: "text-pink-400",
      lightIcon: "text-pink-600",
      darkBg: "bg-indigo-500/10",
      lightBg: "bg-indigo-50",
      darkHover: "hover:border-indigo-500/40 hover:bg-indigo-500/5",
      lightHover: "hover:border-indigo-200 hover:bg-indigo-50/50",
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[100] h-full w-full sm:w-[430px] shadow-2xl border-l flex flex-col ${
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
                  Merchant Details
                </h2>

                <p
                  className={`text-xs mt-1 ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  Manage merchant services
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
            <div className="flex items-center justify-between gap-3">
              <div>
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
              </div>

              <Building2
                size={17}
                className="text-gray-400"
              />
            </div>

            {corpId && (
              <div
                className={`mt-3 pt-3 border-t flex items-center justify-between ${
                  isDark
                    ? "border-gray-800"
                    : "border-gray-200"
                }`}
              >
                <span className="text-xs text-gray-500">
                  Corp ID
                </span>

                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
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

        {/* ================= SERVICES ================= */}

        <div className="px-5 py-6 flex-1 overflow-y-auto">
          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-wider text-gray-500">
              Merchant Services
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Select an option to manage merchant data.
            </p>
          </div>

          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  disabled={!corpId}
                  className={`group w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                    isDark
                      ? `bg-gray-900 border-gray-800 ${item.darkHover}`
                      : `bg-white border-gray-200 ${item.lightHover}`
                  } ${
                    !corpId
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDark
                          ? `${item.darkBg} ${item.darkIcon}`
                          : `${item.lightBg} ${item.lightIcon}`
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          isDark
                            ? "text-gray-100"
                            : "text-gray-800"
                        }`}
                      >
                        {item.label}
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-gray-400 group-hover:translate-x-1 transition-transform shrink-0"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <div
          className={`px-5 py-4 border-t ${
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

export default MerchantWiseDetailsPannel;