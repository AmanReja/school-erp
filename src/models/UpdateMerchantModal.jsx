
import React, { useEffect, useState, useContext } from "react";
import {
  X,
  Save,
  User,
  Wallet,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { Theme } from "../Contexts/Theme";


import {
  updateMerchant,
  getDetails,
} from "../redux/action";
import { toast } from "sonner";

const UpdateMerchantModal = ({
  isOpen,
  onClose,
  merchant,
}) => {
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    wallet_id: "",
    userid: "",
    user_pass: "",
    address: "",
    pan: "",
    email: "",
    mobile_number: "",
    gst: "",
    kyc_status: "",
  });

  // =========================
  // LOAD MERCHANT DATA
  // =========================

  useEffect(() => {
    if (!merchant || !isOpen) return;

    setFormData({
      name: merchant.name || "",
      wallet_id: merchant.wallet_id || "",
      userid: merchant.userid || merchant.user_id || "",
      user_pass: merchant.user_pass || "",
      address: merchant.address || "",
      pan: merchant.pan || "",
      email: merchant.email || "",
      mobile_number: merchant.mobile_number || "",
      gst: merchant.gst || "",
      kyc_status: merchant.kyc_status || "",
    });
  }, [merchant, isOpen]);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CLOSE
  // =========================

  const handleClose = () => {
    if (isSubmitting) return;

    setFormData({
      name: "",
      wallet_id: "",
      userid: "",
      user_pass: "",
      address: "",
      pan: "",
      email: "",
      mobile_number: "",
      gst: "",
      kyc_status: "",
    });

    onClose();
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Merchant name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailRegex.test(formData.email)) {
    //    toast.error("Please enter a valid email address");
    //   return false;
    // }

    if (!formData.mobile_number) {
       toast.error("Mobile number is required");
      return false;
    }

    if (!formData.userid.trim()) {
       toast.error("User ID is required");
      return false;
    }

    if (!formData.address.trim()) {
       toast.error("Address is required");
      return false;
    }

    if (!formData.pan.trim()) {
       toast.error("PAN number is required");
      return false;
    }

    if (!formData.kyc_status) {
       toast.error("Please select KYC status");
      return false;
    }

    return true;
  };

  // =========================
  // UPDATE MERCHANT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!merchant?.corp_id) {
      alert("Merchant ID is missing");
      return;
    }

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      console.log("Updating Merchant:", {
        corp_id: merchant.corp_id,
        ...formData,
      });

      await dispatch(
        updateMerchant(
          merchant.corp_id,
          formData
        )
      );

      // Refresh merchant list
      dispatch(getDetails(1, 10));

    

      handleClose();

    } catch (error) {
      console.error(
        "Update merchant error:",
        error
      );

      toast.error(
        error?.message ||
          "Failed to update merchant"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl shadow-2xl border ${
          isDark
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >

        {/* =========================
            HEADER
        ========================= */}

        <div
          className={`px-6 py-5 border-b ${
            isDark
              ? "border-gray-700"
              : "border-gray-200"
          }`}
        >

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-3">

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isDark
                    ? "bg-violet-500/10 text-violet-400"
                    : "bg-violet-50 text-violet-600"
                }`}
              >
                <User size={21} />
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Update Merchant
                </h2>

                <p
                  className={`text-sm mt-1 ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Update merchant account information
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className={`p-2 rounded-xl transition ${
                isDark
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-500"
              }`}
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[70vh]"
        >

          <div className="p-6 space-y-7">

            {/* =========================
                BASIC INFORMATION
            ========================= */}

            <section>

              <div className="flex items-center gap-2 mb-4">

                <User size={18} className="text-violet-500" />

                <h3 className="font-semibold">
                  Basic Information
                </h3>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Name */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Merchant Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter merchant name"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

                {/* Email */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="merchant@example.com"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

                {/* Mobile */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="mobile_number"
                    maxLength={10}
                    value={formData.mobile_number}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        mobile_number:
                          e.target.value.replace(
                            /\D/g,
                            ""
                          ),
                      }))
                    }
                    placeholder="10 digit mobile number"
                    className={`w-full px-4 py-3 rounded-xl border outline-none ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

                {/* User ID */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    User ID *
                  </label>

                  <input
                    type="text"
                    name="userid"
                    value={formData.userid}
                    onChange={handleChange}
                    placeholder="Enter user ID"
                    className={`w-full px-4 py-3 rounded-xl border outline-none ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

              </div>

            </section>

            {/* =========================
                LOGIN DETAILS
            ========================= */}

            <section>

              <div className="flex items-center gap-2 mb-4">

                <ShieldCheck
                  size={18}
                  className="text-violet-500"
                />

                <h3 className="font-semibold">
                  Login Details
                </h3>

              </div>

              <div>

                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <input
                  type="text"
                  name="user_pass"
                  value={formData.user_pass}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`w-full px-4 py-3 rounded-xl border outline-none ${
                    isDark
                      ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                      : "bg-gray-50 border-gray-200 focus:border-violet-500"
                  }`}
                />

              </div>

            </section>

            {/* =========================
                ADDRESS
            ========================= */}

            <section>

              <div className="flex items-center gap-2 mb-4">

                <User
                  size={18}
                  className="text-violet-500"
                />

                <h3 className="font-semibold">
                  Address
                </h3>

              </div>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter merchant address"
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border outline-none resize-none ${
                  isDark
                    ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                    : "bg-gray-50 border-gray-200 focus:border-violet-500"
                }`}
              />

            </section>

            {/* =========================
                FINANCIAL DETAILS
            ========================= */}

            <section>

              <div className="flex items-center gap-2 mb-4">

                <Wallet
                  size={18}
                  className="text-violet-500"
                />

                <h3 className="font-semibold">
                  Financial Details
                </h3>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Wallet */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Wallet ID
                  </label>

                  <input
                    type="text"
                    name="wallet_id"
                    value={formData.wallet_id}
                    onChange={handleChange}
                    placeholder="Enter wallet ID"
                    className={`w-full px-4 py-3 rounded-xl border outline-none ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

                {/* PAN */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    PAN *
                  </label>

                  <input
                    type="text"
                    name="pan"
                    maxLength={10}
                    value={formData.pan}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pan: e.target.value
                          .toUpperCase()
                          .slice(0, 10),
                      }))
                    }
                    placeholder="ABCDE1234F"
                    className={`w-full px-4 py-3 rounded-xl border outline-none uppercase ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

                {/* GST */}
                <div className="md:col-span-2">

                  <label className="block text-sm font-medium mb-2">
                    GST Number
                  </label>

                  <input
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gst: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="Enter GST number"
                    className={`w-full px-4 py-3 rounded-xl border outline-none uppercase ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

              </div>

            </section>

            {/* =========================
                KYC STATUS
            ========================= */}

            <section>

              <div className="flex items-center gap-2 mb-4">

                <CreditCard
                  size={18}
                  className="text-violet-500"
                />

                <h3 className="font-semibold">
                  KYC Status
                </h3>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Pending */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      kyc_status: "0",
                    }))
                  }
                  className={`p-4 rounded-xl border text-left transition ${
                    formData.kyc_status === "0"
                      ? "border-orange-500 bg-orange-500/10"
                      : isDark
                      ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold">
                    Pending
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    KYC verification is pending
                  </p>
                </button>

                {/* Completed */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      kyc_status: "1",
                    }))
                  }
                  className={`p-4 rounded-xl border text-left transition ${
                    formData.kyc_status === "1"
                      ? "border-green-500 bg-green-500/10"
                      : isDark
                      ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold">
                    Completed
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    KYC verification is completed
                  </p>
                </button>

              </div>

            </section>

          </div>

          {/* =========================
              FOOTER
          ========================= */}

          <div
            className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
              isDark
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className={`px-5 py-2.5 rounded-xl font-medium ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-xl text-white font-medium flex items-center gap-2 ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
            >

              <Save size={17} />

              {isSubmitting
                ? "Updating..."
                : "Update Merchant"}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default UpdateMerchantModal;

