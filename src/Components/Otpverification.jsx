import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { verify_otp } from "../redux/action";
import { useNavigate } from "react-router-dom";
import "../App.css"
import {motion} from "framer-motion"

const Otpverification = () => {
  const navigate = useNavigate()
    const dispatch =useDispatch()
    const [load, setLoad] = useState(false)
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

    
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {

   
       dispatch(verify_otp(enteredOtp,setLoad,setError,navigate))
    
      
    }

  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    inputRefs.current[0].focus();
    
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <motion.section initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="w-[400px] bg-white shadow-xl rounded-2xl p-8 border border-gray-200 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">OTP Verification</h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 flex justify-center items-center h-[50px] hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
            > { load?
             
             

                <div className="loader2"></div>
                             
                             
                             :"Verify OTP"}
              
            </button>
          </form>
          {error?<div className="py-6">
            <p className="text-red-600 font-medium text-lg">
            ❌ OTP Verification not successfull
            </p>
          </div>:""}
   
          
        

        {/* Resend Link */}
        {/* {!verified && (
          <div className="mt-6 text-sm text-gray-500">
            Didn’t receive the code?{" "}
            <button
              onClick={handleResend}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          </div>
        )} */}
      </motion.section>
    </div>
  );
};

export default Otpverification;
