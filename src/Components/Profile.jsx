import React, { useEffect, useState,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admin_details, update_admin_details } from "../redux/action";
import User from "../assets/images/5.png";
import { motion } from "framer-motion";
import { Save, User as UserIcon, Mail, Briefcase, Shield } from "lucide-react";
import { Theme } from "../Contexts/Theme";

const Profile = () => {
  const {theme,setTheme} =useContext(Theme)
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const admindata = useSelector((state)=>state.admindetails.admindetails?.data
);
console.log(52,admindata);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(admin_details());
  }, [dispatch]);

  useEffect(() => {
    if (admindata) {
      setEmail(admindata.email || "");
      
      setName(admindata.fullName || "");
      setRole(admindata.roleName
        || "");
     
    }
  }, [admindata]);

  const handelupdate = (e) => {
    e.preventDefault();
    const updatedInfo = {
      fullName:name,
      email:email,
       roleName:role, 
     };
    dispatch(update_admin_details(updatedInfo));
  };

  return (
<div className=" w-[100%] rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%]   flex flex-col">
    <main className="w-full  h-full flex flex-col overflow-y-scroll">
      
    <section className="flex flex-col w-full p-4 sm:min-h-[600px] 2xl:h-[780px]  sm:h-[600px] gap-[30px]">
  


    <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-6xl mx-auto w-full"
      >
       
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            Edit <span className="text-red-600">Profile</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Update your personal details and manage your account settings.
          </p>
        </div>
  

        <div className={` ${theme==="dark"?"bg-gray-900/80 text-white border-gray-700":"bg-white/80 text-gray-900 border-gray-200"}  backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-full border`}>
          <div className="flex flex-col md:flex-row">
       
            <div className="md:w-1/3 bg-gradient-to-br from-violet-700 to-blue-800 p-10 text-white flex flex-col items-center gap-6">
              <img
                className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-white/30"
                src={User}
                alt="User"
              />
           <div className="text-center flex flex-col items-center justify-center">
  <h2 className="flex items-center justify-center gap-1">
    <Briefcase size={16} /> {admindata?.roleName}
  </h2>

  <h2 className="text-2xl font-bold">{admindata?.fullName}</h2>

  <ul className="mt-6 space-y-2 text-sm">
    <li className="flex items-center justify-center gap-2">
      <Mail size={16} /> {admindata?.email}
    </li>
  </ul>
</div>

            </div>
  
       
            <div className={`md:w-2/3 p-10 ${theme==="dark"?"bg-gray-900 text-white":"bg-white text-gray-900"} `}>
              <form onSubmit={handelupdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
  
                  <div>
                    <label className="block text-sm font-semibold  mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-3 "
                        size={18}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 outline-none dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 "
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
  
            
                  {/* <div>
                    <label className="block text-sm font-semibold  mb-1">
                      Designation
                    </label>
                    <div className="relative">
                      <Briefcase
                        className="absolute left-3 top-3 "
                        size={18}
                      />
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 outline-none dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 "
                        placeholder="Enter your designation"
                      />
                    </div>
                  </div> */}
  
             
                
                </div>
  
       <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium rounded-lg shadow-md hover:opacity-90 transition duration-300"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

    </section>

     
    </main>
  </div>



  
  
  );
};

export default Profile;
