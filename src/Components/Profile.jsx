import React, { useEffect, useState, useContext } from "react";
import User from "../assets/images/5.png";
import { motion } from "framer-motion";
import { Save, User as UserIcon, Mail, Briefcase, Shield } from "lucide-react";
import { Theme } from "../Contexts/Theme";

const Profile = () => {
  const { theme } = useContext(Theme);

  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  // Mock user details (you can replace this with your API response later)
  useEffect(() => {
    const fakeUser = {
      name: "John Doe",
      email: "john@example.com",
      designation: "Sales Manager",
      role: "Admin",
      status: "Active",
    };
    setName(fakeUser.name);
    setEmail(fakeUser.email);
    setDesignation(fakeUser.designation);
    setRole(fakeUser.role);
    setStatus(fakeUser.status);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedInfo = { name, email, designation, role, status };
    console.log("Form submitted:", updatedInfo);
    // You can replace this console.log with your API call later
  };

  return (
    <div className="w-full rounded-2xl 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col">
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="flex flex-col w-full p-4 sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] gap-[30px]">
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

            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden w-full border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row">
                {/* Left Profile Section */}
                <div className="md:w-1/3 bg-gradient-to-br from-violet-700 to-blue-800 p-10 text-white flex flex-col items-center gap-6">
                  <img
                    className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-white/30"
                    src={User}
                    alt="User"
                  />
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-sm text-gray-200 mt-1">{designation}</p>
                    <ul className="mt-6 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Mail size={16} /> {email}
                      </li>
                      <li className="flex items-center gap-2">
                        <Briefcase size={16} /> {role}
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield size={16} /> {status}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Edit Section */}
                <div className="md:w-2/3 p-10">
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
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

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-3 text-gray-400"
                            size={18}
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      {/* Designation */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Designation
                        </label>
                        <div className="relative">
                          <Briefcase
                            className="absolute left-3 top-3 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Enter your designation"
                          />
                        </div>
                      </div>

                      {/* Role */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Role
                        </label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="">Select role</option>
                          <option value="Sales Manager">Sales Manager</option>
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                    </div>

                    {/* Save Button */}
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
