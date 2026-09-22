import React, { useEffect, useRef } from "react";
import {
  X,
  FileText,
  CalendarDays,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
  Clock3,
  XCircle,
  Building2,
  CreditCard,
  MessageSquare,
  Landmark,
  UserRound,
  Hash,
  Wallet,
  Send,
} from "lucide-react";

import { getDisputeMessages } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

const DisputeViewModal = ({ dispute, onClose, isDark }) => {
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);

  /* =================================
     REDUX
  ================================= */

  const messageState = useSelector(
    (state) => state.dispute?.messagelist.data
  );

  console.log("messageState:", messageState);

  /* =================================
     FETCH CHAT HISTORY
  ================================= */

  useEffect(() => {
    if (!dispute?.transaction_id) return;

    dispatch(getDisputeMessages(dispute.transaction_id));
  }, [dispatch, dispute?.transaction_id]);

  /* =================================
     CHAT DATA
  ================================= */

  const chatHistory = messageState?.chat_history || [];

  /* =================================
     AUTO SCROLL CHAT
  ================================= */

  useEffect(() => {
    if (chatHistory.length > 0) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [chatHistory.length]);

  /* =================================
     HELPERS
  ================================= */

  const formatDate = (date) => {
    if (!date) return "N/A";

    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  const formatChatDate = (date) => {
    if (!date) return "";

    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  const formatAmount = (amount) => {
    if (
      amount === null ||
      amount === undefined ||
      amount === ""
    ) {
      return "₹0.00";
    }

    return `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatStatus = (status) => {
    if (!status) return "N/A";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  /* =================================
     STATUS
  ================================= */

  const status = dispute?.status || "open";

  const getStatusStyle = () => {
    const value = status.toLowerCase();

    if (value === "resolved" || value === "closed") {
      return isDark
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-emerald-50 text-emerald-600 border-emerald-200";
    }

    if (value === "rejected") {
      return isDark
        ? "bg-red-500/10 text-red-400 border-red-500/20"
        : "bg-red-50 text-red-600 border-red-200";
    }

    if (value === "open" || value === "pending") {
      return isDark
        ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
        : "bg-orange-50 text-orange-600 border-orange-200";
    }

    if (
      value === "under_review" ||
      value === "under review"
    ) {
      return isDark
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
        : "bg-blue-50 text-blue-600 border-blue-200";
    }

    return isDark
      ? "bg-gray-500/10 text-gray-400 border-gray-500/20"
      : "bg-gray-50 text-gray-600 border-gray-200";
  };

  const getStatusIcon = () => {
    const value = status.toLowerCase();

    if (value === "resolved" || value === "closed") {
      return <CheckCircle2 size={14} />;
    }

    if (value === "rejected") {
      return <XCircle size={14} />;
    }

    if (value === "open" || value === "pending") {
      return <AlertCircle size={14} />;
    }

    return <Clock3 size={14} />;
  };

  /* =================================
     MESSAGE ALIGNMENT
  ================================= */

  const isAdminMessage = (message) => {
    return (
      message?.sender_type?.toLowerCase() === "admin"
    );
  };

  /* =================================
     EMPTY DISPUTE
  ================================= */

  if (!dispute) return null;

  /* =================================
     UI
  ================================= */

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border shadow-2xl ${
          isDark
            ? "bg-gray-900 border-gray-800 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >

        {/* =================================
            HEADER
        ================================= */}

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
              <FileText size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Dispute Details
              </h2>

              <p
                className={`text-xs mt-0.5 ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Complete information about this dispute
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
              isDark
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-800"
            }`}
          >
            <X size={20} />
          </button>

        </div>

        {/* =================================
            CONTENT
        ================================= */}

        <div className="p-6 overflow-y-auto max-h-[calc(92vh-145px)]">

          {/* =================================
              DISPUTE SUMMARY
          ================================= */}

          <div
            className={`rounded-xl border p-5 mb-6 ${
              isDark
                ? "bg-gray-800/50 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>

                <p
                  className={`text-xs mb-1 ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Transaction ID
                </p>

                <div className="flex items-center gap-2">

                  <Hash
                    size={16}
                    className={
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }
                  />

                  <p className="font-semibold text-base">
                    {dispute.transaction_id}
                  </p>

                </div>

              </div>

              <span
                className={`inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle()}`}
              >
                {getStatusIcon()}
                {formatStatus(status)}
              </span>

            </div>

          </div>

          {/* =================================
              AMOUNT SUMMARY
          ================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

            <div
              className={`rounded-xl border p-5 ${
                isDark
                  ? "bg-blue-500/5 border-blue-500/10"
                  : "bg-blue-50/50 border-blue-100"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <IndianRupee size={19} />
                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Dispute Amount
                  </p>

                  <p className="text-lg font-bold mt-0.5">
                    {formatAmount(
                      messageState?.amount ||
                        dispute.dispute_amount
                    )}
                  </p>

                </div>

              </div>

            </div>

            <div
              className={`rounded-xl border p-5 ${
                isDark
                  ? "bg-emerald-500/5 border-emerald-500/10"
                  : "bg-emerald-50/50 border-emerald-100"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  <Wallet size={19} />
                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Merchant ID
                  </p>

                  <p className="text-lg font-bold mt-0.5">
                    {messageState?.merchant_id ||
                      dispute.merchant_id ||
                      "N/A"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================
              DISPUTE INFORMATION
          ================================= */}

          <SectionTitle
            title="Dispute Information"
            isDark={isDark}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">

            <InfoCard
              isDark={isDark}
              icon={<FileText size={17} />}
              label="Dispute Type"
              value={dispute.dispute_type}
            />

            <InfoCard
              isDark={isDark}
              icon={<CalendarDays size={17} />}
              label="Dispute Date"
              value={formatDate(
                dispute.dispute_date ||
                  messageState?.dispute_opened_at
              )}
            />

            <InfoCard
              isDark={isDark}
              icon={<CreditCard size={17} />}
              label="Transaction ID"
              value={
                dispute.transaction_id ||
                messageState?.transaction_id
              }
            />

            <InfoCard
              isDark={isDark}
              icon={<Hash size={17} />}
              label="RRN"
              value={dispute.rrn}
            />

            <InfoCard
              isDark={isDark}
              icon={<CalendarDays size={17} />}
              label="Payout Date"
              value={formatDate(dispute.payout_date)}
            />

            <InfoCard
              isDark={isDark}
              icon={<UserRound size={17} />}
              label="Created By"
              value={
                dispute.created_by ||
                messageState?.merchant_id
              }
            />

          </div>

          {/* =================================
              CORPORATE INFORMATION
          ================================= */}

          <SectionTitle
            title="Corporate Information"
            isDark={isDark}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">

            <InfoCard
              isDark={isDark}
              icon={<Building2 size={17} />}
              label="Corporate ID"
              value={dispute.corp_id}
            />

            <InfoCard
              isDark={isDark}
              icon={<Building2 size={17} />}
              label="Corporate Name"
              value={dispute.corp_name}
            />

          </div>

          {/* =================================
              BANK INFORMATION
          ================================= */}

          <SectionTitle
            title="Bank Information"
            isDark={isDark}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">

            <InfoCard
              isDark={isDark}
              icon={<Landmark size={17} />}
              label="Bank Name"
              value={dispute.bank_name}
            />

            <InfoCard
              isDark={isDark}
              icon={<CreditCard size={17} />}
              label="Account Number"
              value={dispute.account_no}
            />

            <InfoCard
              isDark={isDark}
              icon={<Hash size={17} />}
              label="IFSC Code"
              value={dispute.ifsc_code}
            />

          </div>

          {/* =================================
              DISPUTE REMARKS
          ================================= */}

          <SectionTitle
            title="Dispute Remarks"
            isDark={isDark}
          />

          <div
            className={`rounded-xl border p-4 mb-6 ${
              isDark
                ? "bg-gray-800/40 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >

            <div className="flex gap-3">

              <div
                className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-orange-500/10 text-orange-400"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                <MessageSquare size={17} />
              </div>

              <div>

                <p
                  className={`text-xs mb-1 ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Remarks
                </p>

                <p
                  className={`text-sm leading-6 ${
                    isDark
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  {dispute.dispute_remarks ||
                    "No remarks provided"}
                </p>

              </div>

            </div>

          </div>

          {/* =================================
              CHAT HISTORY
          ================================= */}

          <SectionTitle
            title="Dispute Conversation"
            isDark={isDark}
          />

          <div
            className={`rounded-2xl border overflow-hidden mb-4 ${
              isDark
                ? "border-gray-700 bg-gray-950/40"
                : "border-gray-200 bg-gray-50"
            }`}
          >

            {/* Chat Header */}

            <div
              className={`flex items-center justify-between px-4 py-3 border-b ${
                isDark
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <MessageSquare size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Dispute History
                  </p>

                  <p
                    className={`text-[11px] ${
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {chatHistory.length}{" "}
                    {chatHistory.length === 1
                      ? "message"
                      : "messages"}
                  </p>
                </div>

              </div>

              <div
                className={`text-[11px] px-2.5 py-1 rounded-full ${
                  isDark
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {messageState?.status ||
                  dispute.status ||
                  "open"}
              </div>

            </div>

            {/* Chat Body */}

            <div
              className={`h-[360px] overflow-y-auto p-4 space-y-4 ${
                isDark
                  ? "bg-gray-950"
                  : "bg-gray-50"
              }`}
            >

              {chatHistory.length === 0 ? (

                <div className="h-full flex flex-col items-center justify-center">

                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      isDark
                        ? "bg-gray-800 text-gray-500"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <MessageSquare size={22} />
                  </div>

                  <p
                    className={`text-sm font-medium ${
                      isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    No conversation yet
                  </p>

                  <p
                    className={`text-xs mt-1 ${
                      isDark
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    No messages have been added to this dispute.
                  </p>

                </div>

              ) : (

                chatHistory.map((message) => {

                  const isAdmin =
                    isAdminMessage(message);

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isAdmin
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`max-w-[75%] ${
                          isAdmin
                            ? "items-end"
                            : "items-start"
                        } flex flex-col`}
                      >

                        {/* Sender */}

                        <div
                          className={`flex items-center gap-2 mb-1 ${
                            isAdmin
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >

                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              isAdmin
                                ? isDark
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-blue-100 text-blue-600"
                                : isDark
                                ? "bg-gray-800 text-gray-400"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {isAdmin ? (
                              <UserRound size={13} />
                            ) : (
                              <Building2 size={13} />
                            )}
                          </div>

                          <span
                            className={`text-[10px] font-medium ${
                              isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          >
                            {isAdmin
                              ? message.login_id ||
                                "Admin"
                              : message.login_id ||
                                "Merchant"}
                          </span>

                        </div>

                        {/* Message Bubble */}

                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-5 ${
                            isAdmin
                              ? isDark
                                ? "bg-blue-600 text-white rounded-br-md"
                                : "bg-blue-600 text-white rounded-br-md"
                              : isDark
                              ? "bg-gray-800 text-gray-200 rounded-bl-md"
                              : "bg-white text-gray-700 border border-gray-200 rounded-bl-md"
                          }`}
                        >
                          {message.message}
                        </div>

                        {/* Time */}

                        <span
                          className={`text-[10px] mt-1 ${
                            isDark
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {formatChatDate(
                            message.created_at
                          )}
                        </span>

                      </div>

                    </div>
                  );
                })

              )}

              <div ref={chatEndRef} />

            </div>

            {/* Chat Footer */}

            <div
              className={`px-4 py-3 border-t ${
                isDark
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >

              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                  isDark
                    ? "bg-gray-800 text-gray-500"
                    : "bg-gray-100 text-gray-400"
                }`}
              >

                <MessageSquare size={17} />

                <span className="text-xs">
                  Conversation history is shown here
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =================================
            FOOTER
        ================================= */}

        <div
          className={`flex justify-end px-6 py-4 border-t ${
            isDark
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >

          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

/* =================================
   SECTION TITLE
================================= */

const SectionTitle = ({ title, isDark }) => {
  return (
    <h3
      className={`text-sm font-semibold mb-3 ${
        isDark
          ? "text-gray-200"
          : "text-gray-700"
      }`}
    >
      {title}
    </h3>
  );
};

/* =================================
   INFO CARD
================================= */

const InfoCard = ({
  icon,
  label,
  value,
  isDark,
}) => {
  return (
    <div
      className={`rounded-xl border p-4 ${
        isDark
          ? "bg-gray-800/40 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >

      <div className="flex items-start gap-3">

        {icon && (
          <div
            className={`mt-0.5 shrink-0 ${
              isDark
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            {icon}
          </div>
        )}

        <div className="min-w-0">

          <p
            className={`text-xs mb-1 ${
              isDark
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            {label}
          </p>

          <p
            className={`text-sm font-medium break-words ${
              isDark
                ? "text-gray-200"
                : "text-gray-700"
            }`}
          >
            {value || "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default DisputeViewModal;