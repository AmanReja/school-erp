import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/action";

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handelLogin = async (e) => {
    e.preventDefault();
      const admin = {
        username: userid,
        password: password,
      };


      dispatch(login(admin,setLoading,navigate))

    
  
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/10 shadow-2xl rounded-3xl p-8 w-[90%] sm:w-[400px] border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Login
        </h2>

        <form onSubmit={(e)=>{handelLogin(e)}} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-3 text-white/70" size={20} />
            <input
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/70" size={20} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-300 transition"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-400 to-blue-500 hover:from-violet-500 hover:to-indigo-500 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-800 text-sm mt-6">
          Forgot your password?{" "}
          <span className="text-gray-800 cursor-pointer hover:underline">
            Reset here
          </span>
        </p>
      </motion.div>
    </div>
  );
};
