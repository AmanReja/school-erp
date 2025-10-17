import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSettlements,
  createSettlement,
  updateSettlement,
  deleteSettlement,
 
} from "../redux/action";

const Settlement = () => {
  const { merchantId } = useParams();
  console.log(19, merchantId);
  
  const { theme } = useContext(Theme);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openform, setOpenform] = useState(false);
  console.log(26, openform);

  const handelopen = () => {
    setOpenform((prev) => !prev);
  };

  // Individual form states
  const [account_name, setAccountName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [ifsc_code, setIfscCode] = useState("");
  const [is_validated, setIsValidated] = useState('');
  const [status, setStatus] = useState("");



  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  console.log(41,searchStatus);
  console.log(42,searchTerm);


  

  // State for update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  
  // Individual update form states
  const [updateAccountName, setUpdateAccountName] = useState("");
  const [updateAccountNumber, setUpdateAccountNumber] = useState("");
  const [updateIfscCode, setUpdateIfscCode] = useState("");
  const [updateIsValidated, setUpdateIsValidated] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  // Get settlements from Redux store
  const settlementsData = useSelector((state) => state.settlements?.settlements || []);
  
  const settlementRowsArray = settlementsData
  ?.map(item => item.data || [])
  .flat(); // Flatten into a single array

console.log(66, settlementRowsArray);

  // Load settlements on component mount
  useEffect(() => {
    dispatch(getSettlements(merchantId,searchTerm,searchStatus));
  }, [dispatch, merchantId,searchTerm,searchStatus]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare form data for submission
    const submissionData = {
      account_name,
      account_number,
      ifsc_code,
      is_validated: is_validated,
      status,
    };

    console.log("Form submitted with data:", submissionData);
    dispatch(createSettlement(submissionData, merchantId))
      .then(async() => {
        // Reset form and step on successful submission
        setAccountName("");
        setAccountNumber("");
        setIfscCode("");
        setIsValidated("");
        setStatus("");
        setStep(1);
        // Refresh settlements list
       await dispatch(getSettlements(merchantId));
      })
      .catch((error) => {
        console.error("Error creating settlement:", error);
      });
  };

  // Handle Edit - Open update modal with settlement data
  const handleEdit = (settlement) => {
    setSelectedSettlement(settlement);
    setUpdateAccountName(settlement.account_name);
    setUpdateAccountNumber(settlement.account_number);
    setUpdateIfscCode(settlement.ifsc_code);
    setUpdateIsValidated(settlement.is_validated);
    setUpdateStatus(settlement.status);
    setIsUpdateModalOpen(true);
  };

  // Handle Update - Submit updated data
  const handleUpdate = () => {
    if (selectedSettlement) {
      const updateData = {
        account_name: updateAccountName,
        account_number: updateAccountNumber,
        ifsc_code: updateIfscCode,
        is_validated: updateIsValidated,
        status: updateStatus,
      };
      
      dispatch(updateSettlement(selectedSettlement.account_number,selectedSettlement.company_id, updateData))
        .then(() => {
          setIsUpdateModalOpen(false);
          setSelectedSettlement(null);
          // Refresh settlements list
          dispatch(getSettlements(merchantId));
        })
        .catch((error) => {
          console.error("Error updating settlement:", error);
        });
    }
  };

  const handleDelete = (settlement) => {
    if (window.confirm("Are you sure you want to delete this settlement?")) {
      dispatch(deleteSettlement(settlement.account_number, settlement.company_id))
        .then(() => {
          // Refresh settlements list
          dispatch(getSettlements(merchantId));
        })
        .catch((error) => {
          console.error("Error deleting settlement:", error);
        });
    }
  };

  const steps = ["Account Details", "Validation & Status"];

  const formCardStyle = `
    w-full sm:w-[30%] min-w-[350px] absolute top-[79px] ${openform ? "left-[70%]" : "left-[100%]"} duration-300 z-50 flex flex-col gap-6 rounded-2xl border p-4 shadow-md
    ${theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-800"}
  `;

  return (
    <div
      className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
        theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
      }`}
    >
      <form onSubmit={handleSubmit} className={formCardStyle}>
        <X onClick={handelopen}></X>
        <h2 className="text-xl font-bold text-center mb-2">Create Settlement</h2>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2].map((n) => (
            <div
              key={n}
              className={`w-3 h-3 rounded-full ${
                step === n
                  ? "bg-violet-600"
                  : theme === "dark"
                  ? "bg-gray-600"
                  : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* STEP 1 - Account Details */}
        {step === 1 && (
          <div className="flex flex-col gap-3">
            <label className="font-medium">Account Name</label>
            <input 
              type="text" 
              value={account_name} 
              onChange={(e) => setAccountName(e.target.value)} 
              placeholder="Enter account name" 
              className="input" 
              required 
            />

            <label className="font-medium">Account Number</label>
            <input 
              type="text" 
              value={account_number} 
              onChange={(e) => setAccountNumber(e.target.value)} 
              placeholder="Enter account number" 
              className="input" 
              required 
            />

            <label className="font-medium">IFSC Code</label>
            <input 
              type="text" 
              value={ifsc_code} 
              onChange={(e) => setIfscCode(e.target.value)} 
              placeholder="Enter IFSC code" 
              className="input" 
              required 
            />

            <button type="button" onClick={nextStep} className="btn-primary mt-3">Next</button>
          </div>
        )}

        {/* STEP 2 - Validation & Status */}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            <label className="font-medium">Validation Status</label>
            <select 
              value={is_validated} 
              onChange={(e) => setIsValidated(e.target.value)} 
              className="input" 
              required
            >
              <option selected  value="0">Not Validated</option>
              <option value="1">Validated</option>
            </select>

            <label className="font-medium">Account Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="input" 
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <div className="flex justify-between gap-3 mt-3">
              <button type="button" onClick={prevStep} className="btn-secondary">Back</button>
              <button type="submit" className="btn-success">Create Settlement</button>
            </div>
          </div>
        )}
      </form>

      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-row gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">
          {/* Settlements Table */}
          <div
            className={`flex sm:w-[100%] w-full h-full flex-col rounded-xl overflow-y-auto border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-100 text-gray-800"
            }`}
          >
          <div className="flex justify-between items-center px-6 py-4 h-16 w-full bg-gradient-to-r from-white to-gray-50 shadow-md rounded-xl border border-gray-100">
  {/* Title */}
  <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
    Settlements List
  </h2>

  {/* Search Input */}
  <div className="flex items-center gap-4">
  {/* 🔍 Search Input */}
  <div className="relative w-[220px]">
    <input
      type="text"
      value={searchTerm}
      onChange={(e)=>{setSearchTerm(e.target.value)}}
      placeholder="Search settlements..."
      className="w-full border outline-none border-gray-200 rounded-[10px] pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-400 transition-all duration-300 ease-in-out shadow-sm"
    />
   
  </div>

  {/* 📋 Status Dropdown */}
  <select onChange={(e)=>{setSearchStatus(e.target.value)}}
  value={searchStatus}
    className="border border-gray-200 rounded-[5px] px-4 py-2 text-sm text-gray-700 bg-gray-50 focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-400 outline-none transition-all duration-300 ease-in-out shadow-sm cursor-pointer"
    defaultValue=""
  >
    <option selected value="" disabled>
      Select Status
    </option>
    <option value="active">ACTIVE</option>
    <option value="inactive">INACTIVE</option>
    <option value="suspended">SUSPENDED</option>
  </select>
</div>


  {/* Button */}
  <button
    onClick={handelopen}
    className="bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-medium py-2.5 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
    Open Settlement
  </button>
</div>


            <table className="w-full text-sm text-left">
              <thead
                className={`text-[11px] uppercase border-b border-t ${
                  theme === "dark"
                    ? "text-gray-400 border-gray-600 bg-gray-700"
                    : "text-gray-400 border-gray-300 bg-[#fcfcfc]"
                }`}
              >
                <tr>
                  <th className="px-4 py-4">Account Name</th>
                  <th className="px-4 py-4">Account Number</th>
                  <th className="px-4 py-4">IFSC Code</th>
                  <th className="px-4 py-4">Validated</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="text-[12px] font-semibold">
                {Array.isArray(settlementRowsArray) && settlementRowsArray.length > 0 ? (
                  settlementRowsArray.map((settlement, i) => (
                    <tr key={i} className={`border-b hover:bg-gray-50 ${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"}`}>
                      <td className="px-4 py-2">{settlement.account_name}</td>
                      <td className="px-4 py-2">{settlement.account_number}</td>
                      <td className="px-4 py-2">{settlement.ifsc_code}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          settlement.is_validated === "1" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}>
                          {settlement.is_validated === "1" ? "Validated" : "Not Validated"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          settlement.status === 'active' 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : settlement.status === 'inactive'
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {settlement.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEdit(settlement)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">Edit</button>
                        <button onClick={() => handleDelete(settlement)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-400">
                      No settlements found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Update Settlement Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl border shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
            theme === "dark" 
              ? "bg-gray-800 border-gray-700 text-gray-200" 
              : "bg-white border-gray-200 text-gray-800"
          }`}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">Update Settlement</h2>
              <button 
                onClick={() => setIsUpdateModalOpen(false)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Account Name</label>
                  <input
                    type="text"
                    value={updateAccountName}
                    onChange={(e) => setUpdateAccountName(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Account Number</label>
                  <input
                    type="text"
                    value={updateAccountNumber}
                    onChange={(e) => setUpdateAccountNumber(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">IFSC Code</label>
                  <input
                    type="text"
                    value={updateIfscCode}
                    onChange={(e) => setUpdateIfscCode(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Validation Status</label>
                  <select
                    value={updateIsValidated}
                    onChange={(e) => setUpdateIsValidated(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  >
                    <option selected value="0">Not Validated</option>
                    <option value="1">Validated</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Account Status</label>
                  <select
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsUpdateModalOpen(false)}
                  className={`px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                      : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Update Settlement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settlement;