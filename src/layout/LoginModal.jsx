import React from "react";
import googleLogo from "../assets/google.png";
import closecircle from "../assets/close-circle.png";

const LoginModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="relative bg-white w-[92%] max-w-md rounded-2xl p-1 overflow-hidden">
        <div className="bg-[#F5F6F7] p-6 mb-6 relative rounded-t-2xl">
          <button onClick={onClose} className="absolute top-4 right-4">
            <img src={closecircle} alt="Close" className="w-7 h-7" />
          </button>

          <h2 className="text-2xl font-bold text-center mb-2">Login</h2>

          <p className="text-center text-sm">
            Access thousands of judgments and associated information to begin
            your legal research journey
          </p>
        </div>

        <div className="px-6 pb-6">
          <button className="w-full py-3 rounded-lg border btn_bordered mb-5 flex items-center justify-center gap-3">
            <img src={googleLogo} alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email ID"
                className="w-full mt-1 px-3 py-2 rounded-md input_border"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full mt-1 px-3 py-2 rounded-md input_border"
              />
            </div>
          </div>

          <div className="text-right text-sm mt-2">Forget Password?</div>

          <button className="w-40 mt-6 py-3 rounded-full btn_primary block mx-auto">
            Login
          </button>

          <div className="text-center text-sm mt-6">
            Don&apos;t have an account?{" "}
            <span className="font-bold cursor-pointer">Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
