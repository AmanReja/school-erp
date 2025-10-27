import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/action";

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
   
      <div className="flex sm:flex-row flex-col h-screen font-sans bg-gradient-to-br from-violet-800 to-[#152c6b]">
    
        {/* Left Section */}
        <div className="w-full sm:w-1/2 text-white hidden sm:flex flex-col justify-center p-16">
          <div className="flex flex-col">
    
            <div
              style={{ fontFamily: "Righteous" }}
              className="flex tracking-wide h-[53px] relative text-5xl font-normal
              bg-gradient-to-r from-white via-yellow-500 to-pink-500 
              bg-clip-text text-transparent"
            >
              busybox
            </div>
    
            <div className="flex flex-col mt-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Welcome to the World of <br />
                <span className="bg-gradient-to-r from-white via-violet-400 to-sky-400 
                bg-clip-text text-transparent">
                  New Age Banking
                </span>
              </h1>
    
              <p className="text-gray-300 text-sm md:text-base max-w-md leading-relaxed mb-10">
                Powering businesses with seamless transactions, fast settlements,
                and next-gen financial infrastructure built for growth.
              </p>
    
              <div className="w-[500px] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="flex justify-between items-center text-sm divide-x divide-gray-300/30">
    
                  <div className="flex-1 flex flex-col items-center px-4 py-6 hover:scale-105 transition-transform">
                    <strong className="block text-xl font-bold text-white">1M+</strong>
                    <p className="text-xs text-gray-300">Registered Businesses</p>
                  </div>
    
                  <div className="flex-1 flex flex-col items-center px-4 py-6 hover:scale-105 transition-transform">
                    <strong className="block text-xl font-bold text-white">$1B+</strong>
                    <p className="text-xs text-gray-300">Monthly Payments</p>
                  </div>
    
                  <div className="flex-1 flex flex-col items-center px-4 py-6 hover:scale-105 transition-transform">
                    <strong className="block text-xl font-bold text-white">1M+</strong>
                    <p className="text-xs text-gray-300">Daily Transactions</p>
                  </div>
    
                </div>
              </div>
            </div>
    
          </div>
        </div>
    
        {/* Right Section */}
        <div className="w-full sm:w-1/2 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-10 lg:p-14 flex flex-col sm:h-[550px] h-full rounded bg-white overflow-hidden justify-center shadow-2xl"
          >
            <div className="max-w-md mx-auto w-full space-y-6">
    
              <h1 className="text-3xl font-bold text-gray-800 text-center">
                Admin Login
              </h1>
    
              {/* Login Form */}
              <form onSubmit={(e)=> handelLogin(e)} className="space-y-5">
    
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    value={userid}
                    onChange={(e)=> setUserid(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="w-full h-12 pl-10 pr-4 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
    
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full h-12 pl-10 pr-4 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
    
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  type="submit"
                  className={`w-full h-12 rounded-xl font-semibold text-white 
                  bg-gradient-to-r from-blue-600 to-indigo-600 transition
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Logging in..." : "Login"}
                </motion.button>
              </form>
    
              {/* Forgot password */}
              <p className="text-center text-gray-600 text-sm">
                Forgot your password?
                <span className="text-indigo-600 cursor-pointer hover:underline">
                  Reset here
                </span>
              </p>
    
            </div>
          </motion.div>
        </div>
    
      </div>
    
    
  );
};
