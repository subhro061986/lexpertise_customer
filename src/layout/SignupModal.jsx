import React, { useEffect, useState } from "react";
import closecircle from "../assets/close-circle.png";
import emailIcon from "../assets/sms-yellow.png";
import eyeIcon from "../assets/eye.png";
import contactIcon from "../assets/profile-circle.png";
import callIcon from "../assets/call-yellow.png";
import locationTickIcon from "../assets/location-tick.svg";

import { useAuth } from "../context/AuthContext";

const SignUpModal = ({ open, onClose, onLoginClick }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    profession: "",
    institution: "",
    graduation_year: "",
    password: "",
    confirm_password: "",
  });

  const { sendOtp, verifyOtp, createAccount, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
      setEmail("");
      setOtp("");
      setForm({
        full_name: "",
        phone: "",
        street_address: "",
        city: "",
        state: "",
        profession: "",
        institution: "",
        graduation_year: "",
        password: "",
        confirm_password: "",
      });
      setError("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [open]);

  if (!open) return null;

  /* ================= BACKEND HANDLERS ================= */

  const handleSendOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setError("");
      await sendOtp(email);
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      setError("");
      await verifyOtp(email, otp);
      setStep(3);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      setError("");

      await createAccount({
        email,
        ...form,
        graduation_year: Number(form.graduation_year),
      });

      onClose();
      onLoginClick();
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="relative bg-white w-[92%] max-w-md rounded-2xl shadow-md overflow-hidden max-h-[90vh] flex flex-col">

        {/* ================= HEADER ================= */}
        <div className="bg-[#F5F6F7] p-6 relative flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4">
            <img src={closecircle} alt="Close" className="w-7 h-7" />
          </button>

          <h2 className="text-2xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-center text-sm">
            Access the comprehensive case judgements database.
          </p>
        </div>

        {/* ================= BODY ================= */}
        <div className="px-6 py-6 overflow-y-auto flex-1">

          {error && (
            <p className="text-red-600 text-sm text-left mb-5 whitespace-pre-line leading-snug">
              {error}
            </p>
          )}

          {/* ========== STEP 1 : EMAIL ========== */}
          {step === 1 && (
            <>
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-md input_border pr-10"
                />
                <img
                  src={emailIcon}
                  alt="Email"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-40 mt-8 py-3 rounded-full btn_primary block mx-auto"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              <div className="text-center text-sm mt-6">
                Already have an account?{" "}
                <span onClick={onLoginClick} className="font-bold cursor-pointer">
                  Sign in
                </span>
              </div>
            </>
          )}

          {/* ========== STEP 2 : OTP ========== */}
          {step === 2 && (
            <>
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-3 py-2 rounded-md input_border bg-gray-100 pr-10"
                />
                <img
                  src={emailIcon}
                  alt="Email"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                />
              </div>

              <label className="text-sm font-medium mt-4 block">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full mt-1 px-3 py-2 rounded-md input_border tracking-widest text-center"
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-40 mt-8 py-3 rounded-full btn_primary block mx-auto"
              >
                {loading ? "Validating..." : "Validate"}
              </button>
            </>
          )}

          {/* ========== STEP 3 : CONTACT INFORMATION ========== */}
          {step === 3 && (
            <div className="space-y-4">

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative mt-1">
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-3 py-2 rounded-md input_border bg-gray-100 pr-10"
                  />
                  <img
                    src={emailIcon}
                    alt="Email"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative mt-1">
                  <input
                    value={form.full_name}
                    onChange={(e) =>
                      setForm({ ...form, full_name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-md input_border pr-10"
                  />
                  <img src={contactIcon} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Phone No</label>
                <div className="relative mt-1">
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-md input_border pr-10"
                  />
                  <img src={callIcon} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Street Address</label>
                <div className="relative mt-1">
                  <input
                    value={form.street_address}
                    onChange={(e) =>
                      setForm({ ...form, street_address: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-md input_border pr-10"
                  />
                  <img src={locationTickIcon} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                </div>
              </div>

              <div className="flex gap-4">
                <input
                  placeholder="City"
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                  className="w-1/2 px-3 py-2 rounded-md input_border"
                />
                <input
                  placeholder="State"
                  value={form.state}
                  onChange={(e) =>
                    setForm({ ...form, state: e.target.value })
                  }
                  className="w-1/2 px-3 py-2 rounded-md input_border"
                />
              </div>

              <select
                value={form.profession}
                onChange={(e) =>
                  setForm({ ...form, profession: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md input_border"
              >
                <option value="">Select Profession</option>
                <option>Judge</option>
                <option>Advocate</option>
                <option>Student</option>
              </select>

              <input
                placeholder="Institution / Organization"
                value={form.institution}
                onChange={(e) =>
                  setForm({ ...form, institution: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md input_border"
              />

              <input
                placeholder="Year of Graduation"
                value={form.graduation_year}
                onChange={(e) =>
                  setForm({ ...form, graduation_year: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md input_border"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md input_border pr-10"
                  placeholder="Enter Password"
                />
                <img
                  src={eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirm_password}
                  onChange={(e) =>
                    setForm({ ...form, confirm_password: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md input_border pr-10"
                  placeholder="Confirm Password"
                />
                <img
                  src={eyeIcon}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                />
              </div>

              <button
                onClick={handleCreateAccount}
                disabled={loading}
                className="w-52 mt-6 py-3 rounded-full btn_primary block mx-auto"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
