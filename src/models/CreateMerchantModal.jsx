
import React, { useEffect, useState, useContext } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { Theme } from "../Contexts/Theme";

import {
  createMerchant,
  getDetails,
} from "../redux/action";
import { toast } from "sonner";

const CreateMerchantModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(Theme);
  const isDark = theme === "dark";

  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================
  // FORM STATES
  // =========================

  const [name, setName] = useState("");
  const [wallet_id, setWalletId] = useState("");
  const [user_id, setUserId] = useState("");
  const [user_pass, setUserPass] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [gst, setGst] = useState("");
  const [kyc_status, setKycStatus] = useState("");

  // =========================
  // STEPS
  // =========================

  const steps = [
    {
      number: 1,
      title: "Basic Info",
      description: "Merchant information",
    },
    {
      number: 2,
      title: "User Details",
      description: "Login information",
    },
    {
      number: 3,
      title: "Financial",
      description: "Wallet & tax details",
    },
    {
      number: 4,
      title: "KYC Status",
      description: "Verification status",
    },
  ];

  // =========================
  // GENERATE PASSWORD
  // =========================

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    let password = "";

    for (let i = 0; i < 10; i++) {
      password += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    return password;
  };

  // Generate password whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    setUserPass(generatePassword());
  }, [isOpen]);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setStep(1);

    setName("");
    setWalletId("");
    setUserId("");
    setUserPass("");
    setAddress("");
    setPan("");
    setEmail("");
    setMobileNumber("");
    setGst("");
    setKycStatus("");

    setCopied(false);
    setIsSubmitting(false);
  };

  // =========================
  // CLOSE MODAL
  // =========================

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // =========================
  // STEP NAVIGATION
  // =========================

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // =========================
  // VALIDATION
  // =========================

  const validateStep = () => {
    // STEP 1
    if (step === 1) {
      if (!name.trim() || !email.trim() || !mobile_number.trim()) {
        toast.error("Please fill all required fields");
        return false;
      }

      // FIXED EMAIL REGEX
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
         toast.error("Please enter a valid email address");
        return false;
      }

      if (!/^\d{10}$/.test(mobile_number)) {
         toast.error("Mobile number should be exactly 10 digits");
        return false;
      }
    }

    // STEP 2
    if (step === 2) {
      if (!user_id.trim()) {
         toast.error("User ID is required");
        return false;
      }

      if (!user_pass.trim()) {
         toast.error("Password is required");
        return false;
      }

      if (!address.trim()) {
         toast.error("Address is required");
        return false;
      }
    }

    // STEP 3
    if (step === 3) {
      if (!pan.trim()) {
         toast.error("PAN number is required");
        return false;
      }

      // Optional PAN format validation
    //   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

      if (!pan) {
        alert("Please enter a valid PAN number");
        return false;
      }
    }

    // STEP 4
    if (step === 4) {
      if (!kyc_status) {
        alert("Please select KYC status");
        return false;
      }
    }

    return true;
  };

  // =========================
  // NEXT BUTTON
  // =========================

  const handleNext = () => {
    if (!validateStep()) return;

    nextStep();
  };

  // =========================
  // COPY PASSWORD
  // =========================

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(user_pass);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy password error:", error);
    }
  };

  // =========================
  // PREVENT ENTER SUBMIT
  // =========================

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter" && step !== 4) {
      e.preventDefault();
    }
  };

  // =========================
  // CREATE MERCHANT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Never submit before final step
    if (step !== 4) {
      return;
    }

    if (!validateStep()) {
      return;
    }

    const formData = {
      name,
      wallet_id,
      userid: user_id,
      user_pass,
      address,
      pan,
      email,
      mobile_number,
      gst,
      kyc_status,
    };

    console.log("Merchant Payload:", formData);

    try {
      setIsSubmitting(true);

      /*
       * Same payload structure as your Createmerchants component.
       */
      await dispatch(createMerchant(formData));

      /*
       * Refresh merchant list after successful creation.
       *
       * If your getDetails supports pagination, use:
       * dispatch(getDetails(1, 10));
       */
      dispatch(getDetails(1, 10));

     

      handleClose();
    } catch (error) {
      console.error("Create merchant error:", error);

    

      setIsSubmitting(false);
    }
  };

  // =========================
  // MODAL
  // =========================

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
        className={`relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-3xl shadow-2xl border ${
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
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between">

            <div>
              <h2 className="text-xl font-bold">
                Create Merchant
              </h2>

              <p
                className={`text-sm mt-1 ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Add a new merchant to your platform
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className={`p-2 rounded-xl transition ${
                isDark
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-500"
              }`}
            >
              <X size={20} />
            </button>

          </div>

          {/* =========================
              PROGRESS
          ========================= */}

          <div className="mt-6">

            <div className="flex items-center">

              {steps.map((item, index) => (
                <React.Fragment key={item.number}>

                  <div className="flex flex-col items-center min-w-[70px]">

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                        step >= item.number
                          ? "bg-violet-600 text-white"
                          : isDark
                          ? "bg-gray-800 text-gray-500"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {item.number}
                    </div>

                    <span
                      className={`text-xs mt-2 font-medium ${
                        step >= item.number
                          ? "text-violet-600"
                          : isDark
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {item.title}
                    </span>

                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-[2px] flex-1 mx-2 ${
                        step > item.number
                          ? "bg-violet-600"
                          : isDark
                          ? "bg-gray-700"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>
        </div>

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          onKeyDown={handleFormKeyDown}
          className="overflow-y-auto max-h-[58vh]"
        >

          <div className="p-6">

            {/* =========================
                STEP 1
            ========================= */}

            {step === 1 && (
              <div className="space-y-5">

                <div>
                  <h3 className="text-lg font-semibold">
                    Basic Information
                  </h3>

                  <p
                    className={`text-sm mt-1 ${
                      isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Enter the merchant's basic contact information.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Merchant Name *
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="merchant@example.com"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                        isDark
                          ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                          : "bg-gray-50 border-gray-200 focus:border-violet-500"
                      }`}
                    />
                  </div>

                  {/* Mobile */}
                  <div className="md:col-span-2">

                    <label className="block text-sm font-medium mb-2">
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      value={mobile_number}
                      maxLength={10}
                      onChange={(e) =>
                        setMobileNumber(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="Enter 10 digit mobile number"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                        isDark
                          ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                          : "bg-gray-50 border-gray-200 focus:border-violet-500"
                      }`}
                    />

                  </div>

                </div>
              </div>
            )}

            {/* =========================
                STEP 2
            ========================= */}

            {step === 2 && (
              <div className="space-y-5">

                <div>
                  <h3 className="text-lg font-semibold">
                    User Details
                  </h3>

                  <p
                    className={`text-sm mt-1 ${
                      isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Configure the merchant's login credentials.
                  </p>
                </div>

                {/* User ID */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    User ID *
                  </label>

                  <input
                    type="text"
                    value={user_id}
                    onChange={(e) =>
                      setUserId(e.target.value)
                    }
                    placeholder="Enter user ID"
                    className={`w-full px-4 py-3 rounded-xl border outline-none ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

                {/* Password */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Generated Password
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      value={user_pass}
                      readOnly
                      className={`w-full px-4 py-3 pr-24 rounded-xl border outline-none ${
                        isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={copyPassword}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-violet-600 text-white text-xs flex items-center gap-1 hover:bg-violet-700"
                    >
                      {copied ? (
                        <>
                          <Check size={14} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copy
                        </>
                      )}
                    </button>

                  </div>
                </div>

                {/* Address */}
                <div>

                  <label className="block text-sm font-medium mb-2">
                    Address *
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    placeholder="Enter merchant address"
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border outline-none resize-none ${
                      isDark
                        ? "bg-gray-800 border-gray-700 focus:border-violet-500"
                        : "bg-gray-50 border-gray-200 focus:border-violet-500"
                    }`}
                  />

                </div>

              </div>
            )}

            {/* =========================
                STEP 3
            ========================= */}

            {step === 3 && (
              <div className="space-y-5">

                <div>
                  <h3 className="text-lg font-semibold">
                    Financial Details
                  </h3>

                  <p
                    className={`text-sm mt-1 ${
                      isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Add wallet and tax information.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Wallet */}
                  <div>

                    <label className="block text-sm font-medium mb-2">
                      Wallet ID
                    </label>

                    <input
                      type="text"
                      value={wallet_id}
                      onChange={(e) =>
                        setWalletId(e.target.value)
                      }
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
                      value={pan}
                      onChange={(e) =>
                        setPan(
                          e.target.value
                            .toUpperCase()
                            .slice(0, 10)
                        )
                      }
                      placeholder="ABCDE1234F"
                      maxLength={10}
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
                      value={gst}
                      onChange={(e) =>
                        setGst(
                          e.target.value.toUpperCase()
                        )
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
              </div>
            )}

            {/* =========================
                STEP 4
            ========================= */}

            {step === 4 && (
              <div className="space-y-5">

                <div>
                  <h3 className="text-lg font-semibold">
                    KYC Status
                  </h3>

                  <p
                    className={`text-sm mt-1 ${
                      isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Select the current verification status.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Pending */}
                  <button
                    type="button"
                    onClick={() =>
                      setKycStatus("0")
                    }
                    className={`p-5 rounded-2xl border text-left transition ${
                      kyc_status === "0"
                        ? "border-orange-500 bg-orange-500/10"
                        : isDark
                        ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold">
                      Pending
                    </div>

                    <p
                      className={`text-sm mt-1 ${
                        isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      KYC verification is pending.
                    </p>
                  </button>

                  {/* Completed */}
                  <button
                    type="button"
                    onClick={() =>
                      setKycStatus("1")
                    }
                    className={`p-5 rounded-2xl border text-left transition ${
                      kyc_status === "1"
                        ? "border-green-500 bg-green-500/10"
                        : isDark
                        ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold">
                      Completed
                    </div>

                    <p
                      className={`text-sm mt-1 ${
                        isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      KYC verification is completed.
                    </p>
                  </button>

                </div>

                {/* Summary */}
                <div
                  className={`rounded-2xl p-5 border ${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >

                  <h4 className="font-semibold mb-4">
                    Merchant Summary
                  </h4>

                  <div className="grid grid-cols-2 gap-4 text-sm">

                    <div>
                      <span className="text-gray-500">
                        Name
                      </span>

                      <p className="font-medium mt-1">
                        {name || "-"}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        Email
                      </span>

                      <p className="font-medium mt-1 break-all">
                        {email || "-"}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        Mobile
                      </span>

                      <p className="font-medium mt-1">
                        {mobile_number || "-"}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        PAN
                      </span>

                      <p className="font-medium mt-1">
                        {pan || "-"}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        User ID
                      </span>

                      <p className="font-medium mt-1">
                        {user_id || "-"}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        KYC
                      </span>

                      <p className="font-medium mt-1">
                        {kyc_status || "-"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* =========================
              FOOTER
          ========================= */}

          <div
            className={`px-6 py-4 border-t flex items-center justify-between ${
              isDark
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* Back / Cancel */}
            <button
              type="button"
              onClick={
                step === 1
                  ? handleClose
                  : prevStep
              }
              disabled={isSubmitting}
              className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {step === 1 ? (
                "Cancel"
              ) : (
                <>
                  <ChevronLeft size={18} />
                  Back
                </>
              )}
            </button>

            {/* Continue / Submit */}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium flex items-center gap-2 transition"
              >
                Continue
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !kyc_status}
                className={`px-6 py-2.5 rounded-xl text-white font-medium transition ${
                  isSubmitting || !kyc_status
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting
                  ? "Creating..."
                  : "Create Merchant"}
              </button>
            )}

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateMerchantModal;

