import React, { useState, useContext,useEffect } from "react";
import Hdfc from "../assets/images/HDFC.png";
import { Link,useNavigate } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { useDispatch,useSelector } from "react-redux";
import { createMerchant ,getDetails,updateMerchant, deleteMerchant} from "../Redux/action";
import { X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Merchant = () => {
  const { theme } = useContext(Theme);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const navigate =useNavigate()


  

  // ✅ Individual state hooks for each field
  const [name, setName] = useState("");
  const [org_id, setOrgId] = useState("");
  const [program_id, setProgramId] = useState("");
  const [wallet_id, setWalletId] = useState("");
 
  const [user_id, setUserId] = useState("");
  const [user_pass, setUserPass] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [gst, setGst] = useState("");
  const [kyc_status, setKyc_status] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // State for update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    org_id: "",
    program_id: "",
    wallet_id: "",
    userid: "",
    user_pass: "",
    address: "",
    pan: "",
    email: "",
    mobile_number: "",
    gst: "",
    kyc_status: ""
  });


   // Pagination functions
   const handlePageChange = (page) => {
    setCurrentPage(page);
    // You can dispatch getDetails with page parameter if your API supports pagination
    // dispatch(getDetails(page, itemsPerPage));
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    // You can dispatch getDetails with new items per page if your API supports it
    // dispatch(getDetails(1, newItemsPerPage));
  };

  const merchantsResponse = useSelector((state) => state.merchants?.merchants || {});
  console.log(52,merchantsResponse);
  
  // Extract merchants data
  const merchantsData = merchantsResponse.data || [];
  const totalRecords = merchantsResponse.total || 0;
  const totalPages = merchantsResponse.totalPages || 1;
  const currentLimit = merchantsResponse.limit || itemsPerPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = merchantsData.slice(startIndex, endIndex);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  
  
  

  useEffect(() => {
    const generatePassword = () => {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
      let pass = "";
      for (let i = 0; i < 10; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return pass;
    };
    setUserPass(generatePassword());
  }, []);
  useEffect(() => {
    dispatch(getDetails(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);
  

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = {
      name,
      org_id,
      program_id,
      wallet_id,
      userid: user_id,     
      user_pass,
      address,
      pan,
      email,
      mobile_number,
      gst,
      kyc_status: kyc_status 
    };
  
    console.log("Payload:", formData); // debug
    dispatch(createMerchant(formData,setStep));
  };

  // Handle Edit - Open update modal with merchant data
  const handleEdit = (merchant) => {
    setSelectedMerchant(merchant);
    setUpdateFormData({
      name: merchant.name || "",
      org_id: merchant.org_id || "",
      program_id: merchant.program_id || "",
      wallet_id: merchant.wallet_id || "",
      userid: merchant.userid || "",
      user_pass: merchant.user_pass || "",
      address: merchant.address || "",
      pan: merchant.pan || "",
      email: merchant.email || "",
      mobile_number: merchant.mobile_number || "",
      gst: merchant.gst || "",
      kyc_status: merchant.kyc_status || ""
    });
    setIsUpdateModalOpen(true);
  };

  // Handle Update - Submit updated data
  const handleUpdate = async () => {
    if (selectedMerchant) {
      await dispatch(updateMerchant(selectedMerchant.corp_id, updateFormData));
      // Fetch updated list
      dispatch(getDetails());
  
      setIsUpdateModalOpen(false);
      setSelectedMerchant(null);
    }
  };

  // Handle input change in update form
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleDelete = async(merchant) => {
    if (window.confirm("Are you sure you want to delete this merchant?")) {
      await dispatch(deleteMerchant(merchant.corp_id))
    }
  };

  const steps = ["Basic Info", "Organization", "User Details", "Financial", "Status"];

  const formCardStyle = `
    w-full sm:w-[30%] min-w-[350px] flex flex-col gap-6 rounded-2xl border p-6 shadow-md
    ${theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-800"}
  `;

  return (
    <div
      className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
        theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
      }`}
    >
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-row gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">
          {/* Single Payout Form */}
          <form onSubmit={handleSubmit} className={formCardStyle}>
          <h2 className="text-xl font-bold text-center mb-2">Create Merchant</h2>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((n) => (
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

          {/* STEP 1 - Basic Info */}
          {step === 1 && (
            <div className="flex flex-col gap-3">
              <label className="font-medium">Name</label>
              <input type="text"  value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" className="input" required />

              <label className="font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="input" required />

              <label className="font-medium">Mobile Number</label>
              <input type="tel" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter mobile number" className="input" required />

              <button type="button" onClick={nextStep} className="btn-primary mt-3">Next</button>
            </div>
          )}

          {/* STEP 2 - Organization */}
          {step === 2 && (
            <div className="flex flex-col gap-3">
              <label className="font-medium">Organization ID</label>
              <input type="text" value={org_id} onChange={(e) => setOrgId(e.target.value)} placeholder="Enter organization ID" className="input" required />

              <label className="font-medium">Program ID</label>
              <input type="text" value={program_id} onChange={(e) => setProgramId(e.target.value)} placeholder="Enter program ID" className="input" required />

              <div className="flex justify-between gap-3 mt-3">
                <button type="button" onClick={prevStep} className="btn-secondary">Back</button>
                <button type="button" onClick={nextStep} className="btn-primary">Next</button>
              </div>
            </div>
          )}

          {/* STEP 3 - User Details */}
          {step === 3 && (
            <div className="flex flex-col gap-3">
              <label className="font-medium">User ID</label>
              <input type="text" value={user_id} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user ID" className="input" required />

              <label className="font-medium">Password</label>
              <div className="relative">
                <input type="text" value={user_pass} readOnly className="input pr-20" />
                <button type="button" onClick={() => { navigator.clipboard.writeText(user_pass); alert("Password copied to clipboard!"); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded-md text-sm">Copy</button>
              </div>

              <label className="font-medium">Address</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" rows="3" className="input" required />

              <div className="flex justify-between gap-3 mt-3">
                <button type="button" onClick={prevStep} className="btn-secondary">Back</button>
                <button type="button" onClick={nextStep} className="btn-primary">Next</button>
              </div>
            </div>
          )}

          {/* STEP 4 - Financial */}
          {step === 4 && (
            <div className="flex flex-col gap-3">
              <label className="font-medium">Wallet ID</label>
              <input type="text" value={wallet_id} onChange={(e) => setWalletId(e.target.value)} placeholder="Enter wallet ID" className="input" required />

              <label className="font-medium">PAN</label>
              <input type="text" value={pan} onChange={(e) => setPan(e.target.value)} placeholder="Enter PAN number" className="input" required />

              <label className="font-medium">GST</label>
              <input type="text" value={gst} onChange={(e) => setGst(e.target.value)} placeholder="Enter GST number" className="input" required />

              <div className="flex justify-between gap-3 mt-3">
                <button type="button" onClick={prevStep} className="btn-secondary">Back</button>
                <button type="button" onClick={nextStep} className="btn-primary">Next</button>
              </div>
            </div>
          )}

          {/* STEP 5 - KYC Status */}
          {step === 5 && (
            <div className="flex flex-col gap-3">
              <label className="font-medium">KYC Status</label>
              <select value={kyc_status} onChange={(e) => setKyc_status(e.target.value)} className="input" required>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="flex justify-between gap-3 mt-3">
                <button type="button" onClick={prevStep} className="btn-secondary">Back</button>
                <button type="submit" className="btn-success">Submit</button>
              </div>
            </div>
          )}
        </form>

          {/* Transactions Table */}
          <div
            className={`flex sm:w-[68%] w-full h-full flex-col rounded-xl overflow-y-auto border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-100 text-gray-800"
            }`}
          >
            <div className="flex justify-between items-center p-4 h-[60px] w-full">
              <h2 className="text-[16px] font-semibold">Merchant list</h2>
             
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
      <th className="px-4 py-4">Name</th>
      <th className="px-4 py-4">Org ID</th>
      <th className="px-4 py-4">Program ID</th>
      <th className="px-4 py-4">Wallet ID</th>
      <th className="px-4 py-4">Email</th>
      <th className="px-4 py-4">Mobile</th>
      <th className="px-4 py-4">KYC Status</th>
      <th className="px-4 py-4">Actions</th>
    </tr>
  </thead>

  <tbody className="text-[12px] font-semibold">
  {merchantsData? (
    merchantsData?.map((merchant, i) => (
      <tr key={i} className={`border-b hover:bg-gray-50 ${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"}`}>
        <td className="px-4 py-2">{merchant.name}</td>
        <td className="px-4 py-2">{merchant.org_id}</td>
        <td className="px-4 py-2">{merchant.program_id}</td>
        <td className="px-4 py-2">{merchant.wallet_id}</td>
        <td className="px-4 py-2">{merchant.email}</td>
        <td className="px-4 py-2">{merchant.mobile_number}</td>
        <td className="px-4 py-2">{merchant.kyc_status}</td>
        <td className="px-4 py-2 flex gap-2">
        <button
  onClick={() => navigate(`/dashboard/settlement/${merchant.corp_id}`)}
  className="bg-red-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
>
  Settlement
</button>
          <button onClick={() => handleEdit(merchant)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">Edit</button>
          <button onClick={() => handleDelete(merchant)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={8} className="text-center py-4 text-gray-400">
        No merchants found.
      </td>
    </tr>
  )}
</tbody>
</table>

<div className={`flex flex-col sm:flex-row justify-between items-center p-4 border-t ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}>
              <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                Showing {startIndex + 1} to {Math.min(endIndex, totalRecords)} of {totalRecords} entries
              </div>
              
              <div className="flex items-center gap-1">
                {/* First Page */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronsLeft size={16} />
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[32px] h-8 rounded text-sm font-medium ${
                      currentPage === page
                        ? "bg-violet-600 text-white"
                        : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Page */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={16} />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>


          </div>
        </section>
      </main>

      {/* Update Merchant Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl border shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
            theme === "dark" 
              ? "bg-gray-800 border-gray-700 text-gray-200" 
              : "bg-white border-gray-200 text-gray-800"
          }`}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">Update Merchant</h2>
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
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={updateFormData.name}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Organization ID</label>
                  <input
                    type="text"
                    name="org_id"
                    value={updateFormData.org_id}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Program ID</label>
                  <input
                    type="text"
                    name="program_id"
                    value={updateFormData.program_id}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Wallet ID</label>
                  <input
                    type="text"
                    name="wallet_id"
                    value={updateFormData.wallet_id}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updateFormData.email}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile_number"
                    value={updateFormData.mobile_number}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">PAN</label>
                  <input
                    type="text"
                    name="pan"
                    value={updateFormData.pan}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">GST</label>
                  <input
                    type="text"
                    name="gst"
                    value={updateFormData.gst}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <textarea
                    name="address"
                    value={updateFormData.address}
                    onChange={handleUpdateInputChange}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">KYC Status</label>
                  <select
                    name="kyc_status"
                    value={updateFormData.kyc_status}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
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
                  Update Merchant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Merchant;