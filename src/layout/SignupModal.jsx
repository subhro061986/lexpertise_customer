import React, { useState } from "react";
import closecircle from "../assets/close-circle.png";
import emailIcon from "../assets/sms-yellow.png";
import eyeIcon from "../assets/eye.png";
import contactIcon from "../assets/profile-circle.png";
import callIcon from "../assets/call-yellow.png";
import locationTickIcon from "../assets/location-tick.svg";

const SignUpModal = ({ open, onClose, onLoginClick }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!open) return null;

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

        {/* ================= BODY (SCROLLABLE) ================= */}
        <div className="px-6 py-6 overflow-y-auto flex-1">

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
                onClick={() => setStep(2)}
                className="w-40 mt-8 py-3 rounded-full btn_primary block mx-auto"
              >
                Send OTP
              </button>

              <div className="text-center text-sm mt-6">
                Already have an account?{" "}
                <span
                  onClick={onLoginClick}
                  className="font-bold cursor-pointer"
                >
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
                placeholder="000000"
                className="w-full mt-1 px-3 py-2 rounded-md input_border tracking-widest text-center"
              />

              <button
                onClick={() => setStep(3)}
                className="w-40 mt-8 py-3 rounded-full btn_primary block mx-auto"
              >
                Validate
              </button>

              <div className="text-center text-sm mt-6">
                Already have an account?{" "}
                <span
                  onClick={onLoginClick}
                  className="font-bold cursor-pointer"
                >
                  Sign in
                </span>
              </div>
            </>
          )}

          {/* ========== STEP 3 : CONTACT INFORMATION ========== */}
          {step === 3 && (
            <div className="space-y-4">

              {/* Email again (before Full Name) */}
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
                    placeholder="Enter Your Name"
                    className="w-full px-3 py-2 rounded-md input_border pr-10"
                  />
                  <img
                    src={contactIcon}
                    alt="Name"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Phone No</label>
                <div className="relative mt-1">
                  <input
                    placeholder="+91"
                    className="w-full px-3 py-2 rounded-md input_border pr-10"
                  />
                  <img
                    src={callIcon}
                    alt="Phone"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Street Address</label>
                <div className="relative mt-1">
                  <input
                    placeholder="Your full address"
                    className="w-full px-3 py-2 rounded-md input_border pr-10"
                  />
                  <img
                    src={locationTickIcon}
                    alt="Address"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-sm font-medium">City</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-md input_border">
                    <option>Your City</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <label className="text-sm font-medium">State</label>
                  <select className="w-full mt-1 px-3 py-2 rounded-md input_border">
                    <option>Your State</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Profession</label>
                <select className="w-full mt-1 px-3 py-2 rounded-md input_border">
                  <option>Judge</option>
                  <option>Advocate</option>
                  <option>Student</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Institution / Organization
                </label>
                <input
                  placeholder="Type here"
                  className="w-full mt-1 px-3 py-2 rounded-md input_border"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Year of Graduation
                </label>
                <input
                  placeholder="Type here"
                  className="w-full mt-1 px-3 py-2 rounded-md input_border"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="w-full px-3 py-2 rounded-md input_border pr-10"
                  />
                  <img
                    src={eyeIcon}
                    alt="View"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2 rounded-md input_border pr-10"
                  />
                  <img
                    src={eyeIcon}
                    alt="View"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>

              <button className="w-52 mt-6 py-3 rounded-full btn_primary block mx-auto">
                Create Account
              </button>

              <div className="text-center text-sm mt-6">
                Already have an account?{" "}
                <span
                  onClick={onLoginClick}
                  className="font-bold cursor-pointer"
                >
                  Sign in
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
