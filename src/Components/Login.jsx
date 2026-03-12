import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/action";

const stats = [
  { value: "1M+", label: "Businesses" },
  { value: "$1B+", label: "Monthly Payments" },
  { value: "99.9%", label: "Uptime" },
];

const features = [
  { icon: Zap, label: "Instant Settlements" },
  { icon: Shield, label: "Bank-Grade Security" },
  { icon: TrendingUp, label: "Real-Time Analytics" },
];

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handelLogin = async (e) => {
    e.preventDefault();
    const admin = { username: userid, password };
    dispatch(login(admin, setLoading, navigate));
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Left Panel ── */}
      <div className="relative lg:w-[55%] flex flex-col justify-between overflow-hidden
                      bg-[#0c0e1a] px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16
                      min-h-[280px] lg:min-h-screen">

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #6d28d9 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-2.5">
          <div style={{ fontFamily: "Righteous, cursive" }} className="w-8 h-8 rounded-lg text-white bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg">
            B
          </div>
          <span className="text-white text-xl font-bold tracking-tight"
            style={{ fontFamily: "Righteous, cursive" }}>
            busybox
          </span>
        </motion.div>

        {/* Main copy */}
        <motion.div className="relative z-10 flex flex-col gap-6 my-auto py-10 lg:py-0"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 text-xs font-medium tracking-wide">Next-Gen Banking Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
            Welcome to the<br />
            <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              World of New Age
            </span><br />
            Banking
          </h1>

          <p className="text-gray-400 text-sm lg:text-base leading-relaxed max-w-md">
            Powering businesses with seamless transactions, fast settlements,
            and financial infrastructure built for growth.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <Icon size={11} className="text-violet-400" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div className="relative z-10 grid grid-cols-3 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} className={`flex flex-col items-center py-4 px-2 gap-0.5 ${i < stats.length - 1 ? "border-r border-white/10" : ""}`}>
              <strong className="text-lg sm:text-xl font-bold text-white">{value}</strong>
              <span className="text-[10px] sm:text-xs text-gray-400 text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right Panel ── */}
      <div className="lg:w-[45%] flex items-center justify-center bg-[#f8f7ff] px-6 py-12 sm:px-10 lg:px-16 min-h-screen lg:min-h-0">
        <motion.div className="w-full max-w-[400px]"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 p-8 sm:p-10">

            {/* Header */}
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-200 mb-5">
                <Lock size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Login</h2>
              <p className="text-sm text-gray-400 mt-1">Sign in to your dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handelLogin} className="space-y-4">

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Username</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
                    type="text"
                    placeholder="Enter your username"
                    className="w-full h-11 pl-10 pr-4 text-sm border border-gray-200 rounded-xl bg-gray-50
                               focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100
                               outline-none transition-all text-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full h-11 pl-10 pr-4 text-sm border border-gray-200 rounded-xl bg-gray-50
                               focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100
                               outline-none transition-all text-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" onClick={() => navigate("/forgotpass")}
                  className="text-xs text-violet-600 hover:text-violet-700 hover:underline transition-all">
                  Forgot password?
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className={`w-full h-11 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2
                  bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700
                  shadow-md shadow-violet-200 transition-all
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>Sign In <ArrowRight size={15} /></>
                )}
              </motion.button>
            </form>

            {/* Footer note */}
            <p className="text-center text-[11px] text-gray-400 mt-6">
              Protected by enterprise-grade encryption
            </p>
          </div>

          {/* Bottom caption */}
          <p className="text-center text-xs text-gray-400 mt-5">
            © {new Date().getFullYear()} busybox. All rights reserved.
          </p>
        </motion.div>
      </div>

    </div>
  );
};