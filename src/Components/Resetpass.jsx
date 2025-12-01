import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotpassword } from "../redux/action"; 
import "../App.css";

const Resetpass = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [checkpass,setcheckpass]=useState(false)
  const [checkpassconfirm,setcheckpassconfirm]=useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelcheckpass=()=>{
    setcheckpass((prev)=>!prev)
  }

  const handelcheckpassconfirm=()=>{
    setcheckpassconfirm((prev)=>!prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPass) {
      alert("Both fields are required!");
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

   

  
    dispatch(forgotpassword(password, navigate, setLoad,setError));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <div className="w-[400px] bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Reset Password
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter a new password for your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
        
     
          <div className={`relative border border-gray-300 ${error ? "border-red-500" : "border-gray-300"}  focus:border-violet-500 focus:ring-2 rounded-xl pr-[8px] focus:ring-violet-200 flex items-center`}>
                  <input
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                    required
                    type={checkpass ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-12 pl-12 pr-4  outline-none  transition"
                  />
                  <svg
                    className="w-5 h-5  text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.5 12a7.5 7.5 0 01-15 0"
                    />
                  </svg>

                  {checkpass ? (
                    <svg
                      onClick={handelcheckpass}
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      onClick={handelcheckpass}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  )}
                </div>
          <div className={`relative border border-gray-300 ${error ? "border-red-500" : "border-gray-300"}  focus:border-violet-500 focus:ring-2 rounded-xl pr-[8px] focus:ring-violet-200 flex items-center`}>
                  <input
                    onChange={(e) => {
                        setConfirmPass(e.target.value);
                    }}
                    value={confirmPass}
                    required
                    type={checkpassconfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full h-12 pl-12 pr-4  outline-none  transition"
                  />
                  <svg
                    className="w-5 h-5  text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.5 12a7.5 7.5 0 01-15 0"
                    />
                  </svg>

                  {checkpassconfirm ? (
                    <svg
                      onClick={handelcheckpassconfirm}
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      onClick={handelcheckpassconfirm}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21"
                          stroke="#000000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  )}
                </div>

          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        
          <button
            type="submit"
            className="w-full flex justify-center items-center h-[50px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          >
            {load ? <div className="loader2"></div> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpass;
