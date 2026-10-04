import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  School,
  GraduationCap,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/action";

const highlights = [
  {
    icon: GraduationCap,
    title: "Student & Faculty Portal",
    desc: "Centralized grading, attendance & academic records.",
  },
  {
    icon: ClipboardCheck,
    title: "Instant Attendance",
    desc: "Automated biometric & daily roll-call tracking.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Security",
    desc: "Fine-grained permissions for Admin, Teachers & Staff.",
  },
];

const campusStats = [
  { value: "99.8%", label: "System Uptime" },
  { value: "50k+", label: "Daily Logins" },
  { value: "Real-time", label: "Sync Engine" },
];

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((s) => s.auth || {});

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userid || !password) return;
    const credentials = { username: userid, password };
    dispatch(loginUser(credentials, navigate));
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col lg:flex-row bg-slate-950 text-slate-100 overflow-hidden select-none"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* ================= LEFT SHOWCASE PANEL ================= */}
      <div className="relative lg:w-[58%] flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-800/80 overflow-hidden">
        {/* Ambient Gradient Mesh Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            }}
          />
          {/* Subtle Grid Dot Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30">
            <School size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-200 via-white to-violet-200 bg-clip-text text-transparent">
                School ERP
              </span>
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400">
                Cloud Suite
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Institutional Governance & Academics
            </p>
          </div>
        </motion.div>

        {/* Hero Narrative */}
        <motion.div
          className="relative z-10 my-auto py-10 lg:py-0 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 mb-6 backdrop-blur-md">
            <Sparkles size={13} className="text-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300">
              Next-Generation Campus Administration
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Streamlining Education,{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              One Campus
            </span>{" "}
            at a Time.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">
            Empower your faculty, administration, and students with real-time
            attendance, course management, and actionable institutional
            analytics.
          </p>

          {/* Feature Highlights Grid */}
          <div className="mt-8 space-y-3">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3.5 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 backdrop-blur-md transition-colors hover:border-slate-700/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">
                    {title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          className="relative z-10 grid grid-cols-3 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl p-1"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {campusStats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col items-center py-3 px-2 text-center ${
                i < campusStats.length - 1 ? "border-r border-slate-800/80" : ""
              }`}
            >
              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                {value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================= RIGHT FORM PANEL ================= */}
      <div className="lg:w-[42%] flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <motion.div
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Form Container Card */}
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/70 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-black/60">
            {/* Header */}
            <div className="mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 mb-4">
                <Lock size={20} strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Sign In
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your credentials to access the ERP dashboard.
              </p>
            </div>

            {/* Error Message Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400"
                >
                  <AlertCircle size={16} className="shrink-0 text-rose-400" />
                  <span className="leading-snug">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Login ID / Username
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                  <input
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
                    type="text"
                    required
                    placeholder="e.g. admin or staff ID"
                    className="w-full h-11 pl-10 pr-4 text-xs font-medium rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgotpass")}
                    className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your security password"
                    className="w-full h-11 pl-10 pr-10 text-xs font-medium rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className={`w-full mt-2 h-11 rounded-xl font-semibold text-xs text-white flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30 transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Dashboard</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Bottom Security Footer */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>256-bit SSL encrypted institutional session</span>
            </div>
          </div>

          {/* Copyright Tag */}
          <p className="mt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} School ERP. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
