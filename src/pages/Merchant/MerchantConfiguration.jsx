
import React, { useContext, useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  LockKeyhole,
  ShieldCheck,
  Wallet,
  Building2,
  Settings2,
  Globe,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Plus,
  Trash2,
  CreditCard,
  Landmark,
  Server,
  KeyRound,FileText,BriefcaseBusiness,CalendarDays
} from "lucide-react";

import { Theme } from "../../Contexts/Theme";
import { getMerchentVaDetails ,getMerchentDashboardDetails} from "../../redux/action";
import {useParams} from "react-router-dom"
import{useDispatch,useSelector} from "react-redux"

const MerchantConfiguration = () => {
  const{corp_id:routCorpid} =useParams()
  const dispatch = useDispatch()

  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPassword, setShowPassword] = useState(false);


const merchantVadetails = useSelector((state)=>state.merchantconfig?.vaDetails);
const merchantDashboarddetails = useSelector((state)=>state.merchantconfig?.dashboardDetails);
console.log("merchantDashboarddetails",merchantDashboarddetails);



  useEffect(()=>{
dispatch(getMerchentVaDetails(routCorpid))
dispatch(getMerchentDashboardDetails(routCorpid))
  },[dispatch,routCorpid])



  // Replace this object with your API response
  const merchant = {
    username: "acme_admin",
    email: "admin@acme.com",
    password: "••••••••••••",
    loginStatus: "Active",
    merchantId: "MER-10001",
    companyName: "Acme Technologies",
    lastLogin: "24 Sep 2026, 02:42 PM",
    createdOn: "12 Aug 2026",
  };

  const [wallet, setWallet] = useState({
    status: "Active",
    balance: "₹2,45,800.00",
    availableBalance: "₹2,18,500.00",
    blockedAmount: "₹27,300.00",
    currency: "INR",
  });

  const [virtualAccount, setVirtualAccount] = useState({
    status: "Active",
    accountNumber: "123456789012",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank",
    accountName: "Acme Technologies",
  });

  const [services, setServices] = useState({
    collection: true,
    payout: true,
    refund: true,
    settlement: true,
    virtualAccount: true,
    autoSettlement: false,
  });

  const [ipAddresses, setIpAddresses] = useState([
    {
      id: 1,
      ip: "103.25.48.10",
      type: "Production",
      status: "Active",
      addedOn: "20 Sep 2026",
    },
    {
      id: 2,
      ip: "103.25.48.11",
      type: "Production",
      status: "Active",
      addedOn: "21 Sep 2026",
    },
  ]);

  const [newIp, setNewIp] = useState("");

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: UserRound,
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: Wallet,
    },
    {
      id: "virtual-account",
      label: "Virtual Account",
      icon: Landmark,
    },
    {
      id: "services",
      label: "Services",
      icon: Settings2,
    },
    {
      id: "ip",
      label: "IP",
      icon: Globe,
    },
  ];

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const toggleService = (key) => {
    setServices((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const addIp = () => {
    if (!newIp.trim()) return;

    const exists = ipAddresses.some(
      (item) => item.ip === newIp.trim()
    );

    if (exists) return;

    setIpAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        ip: newIp.trim(),
        type: "Production",
        status: "Active",
        addedOn: "24 Sep 2026",
      },
    ]);

    setNewIp("");
  };

  const removeIp = (id) => {
    setIpAddresses((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleIpStatus = (id) => {
    setIpAddresses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : item
      )
    );
  };

  const cardClass = `rounded-xl border ${
    isDark
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200"
  }`;

  const inputClass = `w-full px-3 py-2.5 rounded-lg border text-sm outline-none ${
    isDark
      ? "bg-gray-950 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-indigo-500"
      : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-indigo-400"
  }`;

  const labelClass = `text-xs font-medium ${
    isDark ? "text-gray-400" : "text-gray-500"
  }`;

  const valueClass = `text-sm font-semibold ${
    isDark ? "text-gray-100" : "text-gray-800"
  }`;

  const statusBadge = (status) => {
    if (status === "Active") {
      return isDark
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-green-50 text-green-600 border-green-200";
    }

    if (status === "Blocked") {
      return isDark
        ? "bg-red-500/10 text-red-400 border-red-500/20"
        : "bg-red-50 text-red-600 border-red-200";
    }

    return isDark
      ? "bg-gray-800 text-gray-400 border-gray-700"
      : "bg-gray-100 text-gray-600 border-gray-200";
  };

  const renderHeader = () => (
    <div
      className={`px-5 py-5 border-b ${
        isDark ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isDark
                ? "bg-indigo-500/10 text-indigo-400"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            <Settings2 size={21} />
          </div>

          <div>
            <h2
              className={`text-lg font-semibold ${
                isDark ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Merchant Configuration
            </h2>

            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Manage merchant account, wallet, services and access.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              isDark
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-green-50 text-green-600 border-green-200"
            }`}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
            Merchant Active
          </span>

          <span
            className={`px-3 py-1.5 rounded-lg border text-xs ${
              isDark
                ? "bg-gray-900 border-gray-800 text-gray-400"
                : "bg-gray-50 border-gray-200 text-gray-500"
            }`}
          >
            {merchant.merchantId}
          </span>
        </div>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div
      className={`px-5 border-b overflow-x-auto ${
        isDark ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-1 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? isDark
                    ? "text-indigo-400"
                    : "text-indigo-600"
                  : isDark
                  ? "text-gray-500 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={16} />
              {tab.label}

              {isActive && (
                <span
                  className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${
                    isDark
                      ? "bg-indigo-500"
                      : "bg-indigo-600"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="p-5 space-y-5">
      {/* PROFILE SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${cardClass} p-4`}>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              <UserRound size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Username
              </p>

              <p className={valueClass}>
                {merchant.username}
              </p>
            </div>
          </div>
        </div>

        <div className={`${cardClass} p-4`}>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <Mail size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className={`${valueClass} truncate`}>
                {merchant.email}
              </p>
            </div>
          </div>
        </div>

        <div className={`${cardClass} p-4`}>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark
                  ? "bg-green-500/10 text-green-400"
                  : "bg-green-50 text-green-600"
              }`}
            >
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Login Status
              </p>

              <span
                className={`inline-flex mt-1 px-2.5 py-1 rounded-md border text-xs font-semibold ${statusBadge(
                  merchant.loginStatus
                )}`}
              >
                {merchant.loginStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* LOGIN DETAILS */}
      <div className={`${cardClass} overflow-hidden`}>
        <div
          className={`px-4 py-3 border-b flex items-center gap-2 ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <KeyRound size={17} className="text-indigo-500" />

          <div>
            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Login Credentials
            </h3>

            <p className="text-[11px] text-gray-500">
              Merchant login account information
            </p>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Username
            </label>

            <div className="relative mt-1.5">
              <input
                value={merchant.username}
                readOnly
                className={`${inputClass} pr-10`}
              />

              <button
                onClick={() =>
                  copyText(merchant.username)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
              >
                <Copy size={15} />
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Email
            </label>

            <div className="relative mt-1.5">
              <input
                value={merchant.email}
                readOnly
                className={`${inputClass} pr-10`}
              />

              <button
                onClick={() => copyText(merchant.email)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
              >
                <Copy size={15} />
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Password
            </label>

            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                value={merchant.password}
                readOnly
                className={`${inputClass} pr-10`}
              />

              <button
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
              >
                {showPassword ? (
                  <EyeOff size={15} />
                ) : (
                  <Eye size={15} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Login Status
            </label>

            <div className="mt-1.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold ${statusBadge(
                  merchant.loginStatus
                )}`}
              >
                <CheckCircle2 size={14} />
                {merchant.loginStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ACCOUNT INFORMATION */}
      <div className={`${cardClass} p-4`}>
        <div className="flex items-center gap-2 mb-4">
          <Building2
            size={17}
            className="text-violet-500"
          />

          <h3
            className={`text-sm font-semibold ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Account Information
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">
              Merchant ID
            </p>
            <p className={`mt-1 ${valueClass}`}>
              {merchant.merchantId}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Company
            </p>
            <p className={`mt-1 ${valueClass}`}>
              {merchant.companyName}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Last Login
            </p>
            <p className={`mt-1 ${valueClass}`}>
              {merchant.lastLogin}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Created On
            </p>
            <p className={`mt-1 ${valueClass}`}>
              {merchant.createdOn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

const renderDashboard = () => (
  <div className="p-5">

    {/* =====================================================
        MERCHANT USER CARD
    ===================================================== */}
    <div
      className={`relative overflow-hidden rounded-2xl border shadow-sm ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950/40 border-gray-800"
          : "bg-gradient-to-br from-white via-indigo-50/40 to-blue-50 border-gray-200"
      }`}
    >

      {/* Decorative Background */}
      <div
        className={`absolute -right-20 -top-20 w-56 h-56 rounded-full blur-3xl ${
          isDark ? "bg-indigo-500/10" : "bg-indigo-400/20"
        }`}
      />

      <div
        className={`absolute -left-20 -bottom-24 w-52 h-52 rounded-full blur-3xl ${
          isDark ? "bg-blue-500/10" : "bg-blue-400/10"
        }`}
      />

      <div className="relative p-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold ${
                isDark
                  ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                  : "bg-indigo-100 text-indigo-600 border border-indigo-200"
              }`}
            >
              {merchantDashboarddetails?.name
                ? merchantDashboarddetails.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word.charAt(0))
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>

            <div>

              <p
                className={`text-[10px] uppercase tracking-[0.16em] font-semibold ${
                  isDark ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                Merchant User
              </p>

              <h2
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {merchantDashboarddetails?.name || "—"}
              </h2>

              <div className="flex flex-wrap items-center gap-2 mt-1">

                <span className="text-xs text-gray-500">
                  {merchantDashboarddetails?.email || "No email"}
                </span>

                {merchantDashboarddetails?.role && (
                  <>
                    <span className="text-gray-400">•</span>

                    <span className="text-xs text-gray-500">
                      {merchantDashboarddetails.role}
                    </span>
                  </>
                )}

              </div>

            </div>

          </div>


          {/* STATUS */}
          <span
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-semibold self-start sm:self-auto ${statusBadge(
              merchantDashboarddetails?.status || "Inactive"
            )}`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                merchantDashboarddetails?.status === "Active"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            />

            {merchantDashboarddetails?.status || "Inactive"}

            {merchantDashboarddetails?.status === "Active" && (
              <CheckCircle2 size={14} />
            )}
          </span>

        </div>


        {/* USER DETAILS */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-7 pt-5 border-t ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >

          {/* LOGIN ID */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-gray-800/40 border-gray-800"
                : "bg-white/70 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">

              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <UserRound size={15} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Login ID
                </p>

                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {merchantDashboarddetails?.login_id || "—"}
                </p>
              </div>

            </div>
          </div>


          {/* COMPANY ID */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-gray-800/40 border-gray-800"
                : "bg-white/70 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">

              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-violet-500/10 text-violet-400"
                    : "bg-violet-50 text-violet-600"
                }`}
              >
                <Building2 size={15} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Company ID
                </p>

                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {merchantDashboarddetails?.company_id || "—"}
                </p>
              </div>

            </div>
          </div>


          {/* DESIGNATION */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-gray-800/40 border-gray-800"
                : "bg-white/70 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">

              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-orange-500/10 text-orange-400"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                <BriefcaseBusiness size={15} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Designation
                </p>

                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {merchantDashboarddetails?.designation || "—"}
                </p>
              </div>

            </div>
          </div>


          {/* ROLE */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-gray-800/40 border-gray-800"
                : "bg-white/70 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">

              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                <ShieldCheck size={15} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  Role
                </p>

                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {merchantDashboarddetails?.role || "—"}
                </p>
              </div>

            </div>
          </div>

        </div>


        {/* CREATED / UPDATED */}



        {/* FOOTER */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-4 border-t ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={16}
              className="text-indigo-500"
            />

            <div>
              <p
                className={`text-xs font-semibold ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Merchant Account
              </p>

              <p className="text-[10px] text-gray-500">
                Account information and access details
              </p>
            </div>

          </div>


          <div className="flex items-center gap-2">

            <span className="text-[10px] uppercase tracking-wider text-gray-500">
              User ID
            </span>

            <span
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold ${
                isDark
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              #{merchantDashboarddetails?.id || "—"}
            </span>

          </div>

        </div>

      </div>
    </div>
    </div>
  );


const renderVirtualAccount = () => {
  const va = merchantVadetails || {};

  const formattedStatus = va.status
    ? va.status.charAt(0).toUpperCase() + va.status.slice(1)
    : "Inactive";

  const isActive = formattedStatus === "Active";

  return (
    <div className="p-5">

      {/* =====================================================
          VIRTUAL ACCOUNT CARD
      ===================================================== */}
      <div
        className={`relative overflow-hidden rounded-2xl border shadow-sm ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950/40 border-gray-800"
            : "bg-gradient-to-br from-white via-blue-50/40 to-indigo-50 border-gray-200"
        }`}
      >

        {/* Decorative Background */}
        <div
          className={`absolute -right-16 -top-16 w-52 h-52 rounded-full blur-3xl ${
            isDark ? "bg-blue-500/10" : "bg-blue-400/20"
          }`}
        />

        <div
          className={`absolute -left-20 -bottom-20 w-48 h-48 rounded-full blur-3xl ${
            isDark ? "bg-indigo-500/10" : "bg-indigo-400/10"
          }`}
        />

        <div className="relative p-6">

          {/* =================================================
              HEADER
          ================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isDark
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "bg-white text-blue-600 border border-blue-100 shadow-sm"
                }`}
              >
                <Landmark size={22} />
              </div>

              <div>
                <p
                  className={`text-[10px] uppercase tracking-[0.15em] font-semibold ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Banking Details
                </p>

                <h3
                  className={`text-lg font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Virtual Account
                </h3>

                <p className="text-xs text-gray-500 mt-0.5">
                  Merchant virtual banking account
                </p>
              </div>

            </div>

            {/* STATUS */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-semibold self-start sm:self-auto ${statusBadge(
                formattedStatus
              )}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              />

              {formattedStatus}

              {isActive && <CheckCircle2 size={14} />}
            </div>

          </div>


          {/* =================================================
              ACCOUNT NUMBER
          ================================================= */}
          <div className="mt-8">

            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">
              Account Number
            </p>

            <div className="flex items-center gap-3 mt-1.5">

              <h2
                className={`text-2xl sm:text-3xl font-bold tracking-[0.12em] font-mono ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {va.account_number || "—"}
              </h2>

              {va.account_number && (
                <button
                  onClick={() => copyText(va.account_number)}
                  title="Copy account number"
                  className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center transition ${
                    isDark
                      ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                      : "bg-white text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-200"
                  }`}
                >
                  <Copy size={15} />
                </button>
              )}

            </div>

          </div>


          {/* =================================================
              ACCOUNT INFORMATION
          ================================================= */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-7 pt-5 border-t ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >

            {/* VA ID */}
            <div
              className={`p-3.5 rounded-xl border ${
                isDark
                  ? "bg-gray-800/40 border-gray-800"
                  : "bg-white/70 border-gray-200"
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Virtual Account ID
              </p>

              <div className="flex items-center gap-2 mt-1.5">

                <p
                  className={`text-sm font-semibold truncate ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {va.va_id || "—"}
                </p>

                {va.va_id && (
                  <button
                    onClick={() => copyText(va.va_id)}
                    className="shrink-0 text-gray-400 hover:text-indigo-500 transition"
                  >
                    <Copy size={13} />
                  </button>
                )}

              </div>
            </div>


            {/* IFSC */}
            <div
              className={`p-3.5 rounded-xl border ${
                isDark
                  ? "bg-gray-800/40 border-gray-800"
                  : "bg-white/70 border-gray-200"
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                IFSC Code
              </p>

              <div className="flex items-center gap-2 mt-1.5">

                <p
                  className={`text-sm font-semibold font-mono ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {va.ifsc_code || "—"}
                </p>

                {va.ifsc_code && (
                  <button
                    onClick={() => copyText(va.ifsc_code)}
                    className="shrink-0 text-gray-400 hover:text-indigo-500 transition"
                  >
                    <Copy size={13} />
                  </button>
                )}

              </div>
            </div>


            {/* COMPANY ID */}
            <div
              className={`p-3.5 rounded-xl border ${
                isDark
                  ? "bg-gray-800/40 border-gray-800"
                  : "bg-white/70 border-gray-200"
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Company ID
              </p>

              <div className="flex items-center gap-2 mt-1.5">

                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {va.company_id || "—"}
                </p>

                {va.company_id && (
                  <button
                    onClick={() => copyText(va.company_id)}
                    className="shrink-0 text-gray-400 hover:text-indigo-500 transition"
                  >
                    <Copy size={13} />
                  </button>
                )}

              </div>
            </div>


            {/* CREATED ON */}
            <div
              className={`p-3.5 rounded-xl border ${
                isDark
                  ? "bg-gray-800/40 border-gray-800"
                  : "bg-white/70 border-gray-200"
              }`}
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-500">
                Created On
              </p>

              <p
                className={`text-sm font-semibold mt-1.5 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {va.create_on || "—"}
              </p>
            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-4 border-t ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >

            <div className="flex items-center gap-2">

              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <ShieldCheck size={14} />
              </div>

              <p className="text-[11px] text-gray-500">
                Banking details linked to merchant account
              </p>

            </div>

            {/* STATUS */}
            <div className="flex items-center gap-2">

              <span className="text-[10px] uppercase tracking-wider text-gray-500">
                Account Status
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold ${statusBadge(
                  formattedStatus
                )}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                />

                {formattedStatus}
              </span>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};



  const serviceItems = [
    {
      key: "collection",
      title: "Payment Collection",
      description:
        "Allow merchant to collect payments from customers.",
      icon: CreditCard,
    },
    {
      key: "payout",
      title: "Payout",
      description:
        "Allow merchant to initiate customer payouts.",
      icon: Wallet,
    },
    {
      key: "refund",
      title: "Refund",
      description:
        "Allow merchant to process customer refunds.",
      icon: RefreshCw,
    },
    {
      key: "settlement",
      title: "Settlement",
      description:
        "Enable settlement processing for this merchant.",
      icon: Landmark,
    },
    {
      key: "virtualAccount",
      title: "Virtual Account",
      description:
        "Enable virtual account collection facility.",
      icon: Building2,
    },
    {
      key: "autoSettlement",
      title: "Auto Settlement",
      description:
        "Automatically process merchant settlements.",
      icon: Server,
    },
  ];

  const renderServices = () => (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviceItems.map((service) => {
          const Icon = service.icon;
          const enabled = services[service.key];

          return (
            <div
              key={service.key}
              className={`${cardClass} p-4 transition`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div
                    className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
                      enabled
                        ? isDark
                          ? "bg-green-500/10 text-green-400"
                          : "bg-green-50 text-green-600"
                        : isDark
                        ? "bg-gray-800 text-gray-500"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-semibold ${
                        isDark
                          ? "text-gray-200"
                          : "text-gray-800"
                      }`}
                    >
                      {service.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1 leading-5">
                      {service.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    toggleService(service.key)
                  }
                  className={`relative w-10 h-5.5 rounded-full transition shrink-0 ${
                    enabled
                      ? "bg-indigo-600"
                      : isDark
                      ? "bg-gray-700"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition ${
                      enabled
                        ? "left-5"
                        : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Service Status
                </span>

                <span
                  className={`text-xs font-semibold ${
                    enabled
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderIp = () => (
    <div className="p-5 space-y-5">
      {/* ADD IP */}
      <div className={`${cardClass} p-4`}>
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} className="text-indigo-500" />

          <div>
            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Add IP Address
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              Add a trusted IP address for merchant access.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
            placeholder="Enter IP address"
            className={inputClass}
          />

          <button
            onClick={addIp}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition active:scale-95"
          >
            <Plus size={16} />
            Add IP
          </button>
        </div>
      </div>

      {/* IP TABLE */}
      <div className={`${cardClass} overflow-hidden`}>
        <div
          className={`px-4 py-3 border-b flex items-center justify-between ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div>
            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Allowed IP Addresses
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              {ipAddresses.length} configured IP address
              {ipAddresses.length !== 1 ? "es" : ""}
            </p>
          </div>

          <Server
            size={17}
            className="text-gray-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr
                className={`border-b text-[11px] uppercase tracking-wider ${
                  isDark
                    ? "bg-gray-950 border-gray-800 text-gray-500"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                <th className="px-5 py-3">
                  IP Address
                </th>

                <th className="px-5 py-3">
                  Environment
                </th>

                <th className="px-5 py-3">
                  Added On
                </th>

                <th className="px-5 py-3">
                  Status
                </th>

                <th className="px-5 py-3 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {ipAddresses.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b ${
                    isDark
                      ? "border-gray-800 hover:bg-gray-950"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDark
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        <Globe size={14} />
                      </div>

                      <span
                        className={`text-sm font-semibold ${
                          isDark
                            ? "text-gray-200"
                            : "text-gray-800"
                        }`}
                      >
                        {item.ip}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-500">
                      {item.type}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-500">
                      {item.addedOn}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-md border text-xs font-medium ${statusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          toggleIpStatus(item.id)
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold transition ${
                          item.status === "Active"
                            ? isDark
                              ? "border-orange-500/20 text-orange-400 hover:bg-orange-500/10"
                              : "border-orange-200 text-orange-600 hover:bg-orange-50"
                            : isDark
                            ? "border-green-500/20 text-green-400 hover:bg-green-500/10"
                            : "border-green-200 text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {item.status === "Active" ? (
                          <>
                            <XCircle size={13} />
                            Block
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={13} />
                            Activate
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => removeIp(item.id)}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-md border transition ${
                          isDark
                            ? "border-gray-800 text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                            : "border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {ipAddresses.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center"
                  >
                    <Globe
                      size={28}
                      className="mx-auto text-gray-400"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                      No IP addresses configured.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "wallet":
        return renderWallet();

      case "virtual-account":
        return renderVirtualAccount();

      case "services":
        return renderServices();

      case "ip":
        return renderIp();

      default:
        return renderDashboard();
    }
  };

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden ${
        isDark
          ? "bg-gray-950 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {renderHeader()}

      {renderTabs()}

      {renderContent()}
    </div>
  );
};

export default MerchantConfiguration;

