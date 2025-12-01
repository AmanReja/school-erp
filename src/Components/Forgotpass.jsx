import React, { useState } from "react";
import { Mail } from "lucide-react";
import { send_otp } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"
import{motion} from "framer-motion"


const Forgotpass = () => {
  const [load, setLoad] = useState(false)
  const navigate =useNavigate()

const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [error, seterror] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // 🔥 You can call your API here to send reset link
  
    dispatch(send_otp(email,seterror,navigate,setLoad))

    
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <motion.section  initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="w-[400px] bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your email address and we’ll send you otp
        </p>

      

        
          <form onSubmit={(e)=>{handleSubmit(e)}} className="flex flex-col gap-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-gray-700 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center h-[50px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
            >
             { load?
             
             

<div className="loader2"></div>
             
             
             :"send otp"}
            </button>
            {error?<div className="text-center text-red-500">failed to send otp</div>:""}
          </form>
      

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            Back to Login
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Forgotpass;
