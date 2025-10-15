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
  getDetails
} from "../Redux/action";

const Settlement = () => {


    const { merchantId } = useParams();
    console.log(19,merchantId);
  const { theme } = useContext(Theme);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state
  const [formValues, setFormValues] = useState({
    account_name: "",
    account_number: "",
    ifsc_code: "",
    is_validated: "false",
    status: "active",
  });

  // State for update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    account_name: "",
    account_number: "",
    ifsc_code: "",
    is_validated: "",
    status: "",
  });

  // Get settlements from Redux store
  const settlementsData = useSelector((state) => state.settlements?.settlements || []);
  
  const settlementRowsArray = settlementsData
  ?.map(item => item.data?.filteredRows || [])
  .flat(); // Flatten into a single array

console.log("All settlements:", settlementRowsArray);

  // Load settlements on component mount
  useEffect(() => {
    dispatch(getSettlements());
  }, [dispatch]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare form data for submission
    const submissionData = {
      ...formValues,
      is_validated: formValues.is_validated === ""
    };

    console.log("Form submitted with data:", submissionData);
    dispatch(createSettlement(submissionData,merchantId))
      .then(() => {
        // Reset form and step on successful submission
        setFormValues({
          account_name: "",
          account_number: "",
          ifsc_code: "",
          is_validated: "",
          status: "",
        });
        setStep(1);
        // Refresh settlements list
        dispatch(getSettlements());
      })
      .catch((error) => {
        console.error("Error creating settlement:", error);
      });
  };

  // Handle Edit - Open update modal with settlement data
  const handleEdit = (settlement) => {
    setSelectedSettlement(settlement);
    setUpdateFormData({
      account_name: settlement.account_name || "",
      account_number: settlement.account_number || "",
      ifsc_code: settlement.ifsc_code || "",
      is_validated: settlement.is_validated  || "",
      status: settlement.status || "",
    });
    setIsUpdateModalOpen(true);
  };

  // Handle Update - Submit updated data
  const handleUpdate = () => {
    if (selectedSettlement) {
      const updateData = {
        ...updateFormData,
        is_validated: updateFormData.is_validated === "true"
      };
      
      dispatch(updateSettlement(selectedSettlement.corp_id, updateData))
        .then(() => {
          setIsUpdateModalOpen(false);
          setSelectedSettlement(null);
          // Refresh settlements list
          dispatch(getSettlements());
        })
        .catch((error) => {
          console.error("Error updating settlement:", error);
        });
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

  const handleDelete = (settlement) => {
    if (window.confirm("Are you sure you want to delete this settlement?")) {
      dispatch(deleteSettlement(settlement.company_id))
        .then(() => {
          // Refresh settlements list
          dispatch(getSettlements());
        })
        .catch((error) => {
          console.error("Error deleting settlement:", error);
        });
    }
  };

  const steps = ["Account Details", "Validation & Status"];

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
          {/* Settlement Form */}
          <form onSubmit={handleSubmit} className={formCardStyle}>
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
                  name="account_name"
                  value={formValues.account_name} 
                  onChange={handleInputChange} 
                  placeholder="Enter account name" 
                  className="input" 
                  required 
                />

                <label className="font-medium">Account Number</label>
                <input 
                  type="text" 
                  name="account_number"
                  value={formValues.account_number} 
                  onChange={handleInputChange} 
                  placeholder="Enter account number" 
                  className="input" 
                  required 
                />

                <label className="font-medium">IFSC Code</label>
                <input 
                  type="text" 
                  name="ifsc_code"
                  value={formValues.ifsc_code} 
                  onChange={handleInputChange} 
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
                  name="is_validated"
                  value={formValues.is_validated} 
                  onChange={handleInputChange} 
                  className="input" 
                  required
                >
                  <option value="false">Not Validated</option>
                  <option value="true">Validated</option>
                </select>

                <label className="font-medium">Account Status</label>
                <select 
                  name="status"
                  value={formValues.status} 
                  onChange={handleInputChange} 
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

          {/* Settlements Table */}
          <div
            className={`flex sm:w-[68%] w-full h-full flex-col rounded-xl overflow-y-auto border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-100 text-gray-800"
            }`}
          >
            <div className="flex justify-between items-center p-4 h-[60px] w-full">
              <h2 className="text-[16px] font-semibold">Settlements List</h2>
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
            settlement.is_validated === "YES" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}>
            {settlement.is_validated === "YES" ? "Validated" : "Not Validated"}
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
                    name="account_name"
                    value={updateFormData.account_name}
                    onChange={handleUpdateInputChange}
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
                    name="account_number"
                    value={updateFormData.account_number}
                    onChange={handleUpdateInputChange}
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
                    name="ifsc_code"
                    value={updateFormData.ifsc_code}
                    onChange={handleUpdateInputChange}
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
                    name="is_validated"
                    value={updateFormData.is_validated}
                    onChange={handleUpdateInputChange}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                  >
                    <option value="false">Not Validated</option>
                    <option value="true">Validated</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Account Status</label>
                  <select
                    name="status"
                    value={updateFormData.status}
                    onChange={handleUpdateInputChange}
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