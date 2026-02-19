import React, { useState, useEffect, useRef } from "react";
import googleLogo from "../assets/google.png";
import closecircle from "../assets/close-circle.png";
import emailIcon from "../assets/sms-yellow.png";
import eyeIcon from "../assets/eye.png";
import { useAuth } from "../context/AuthContext";

/* global google */

// ─── Paste your Google Client ID here ────────────────────────────────────────
const GOOGLE_CLIENT_ID = "693926858933-lgct9tuenmd8ai182lijskk3cifbbucn.apps.googleusercontent.com";
// ─────────────────────────────────────────────────────────────────────────────

function loadGsiScript() {
  return new Promise((resolve, reject) => {
    if (typeof google !== "undefined" && google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.getElementById("gsi-script");
    if (existing) {
      existing.addEventListener("load", resolve);
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.id = "gsi-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Failed to load Google Sign-In script"));
    document.head.appendChild(script);
  });
}

const LoginModal = ({ open, onClose, onSignupClick }) => {
  const { login, googleLogin, loading } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [gsiReady, setGsiReady] = useState(false);
  const [gsiError, setGsiError] = useState(false);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setError("");
      setShowPass(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    loadGsiScript()
      .then(() => setGsiReady(true))
      .catch(() => setGsiError(true));
  }, [open]);

  useEffect(() => {
    if (!gsiReady || !open || !googleBtnRef.current) return;

    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes("YOUR_CLIENT_ID")) {
      console.error("Replace GOOGLE_CLIENT_ID in LoginModal.jsx with your actual client ID");
      setGsiError(true);
      return;
    }

    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: googleBtnRef.current.offsetWidth || 380,
        text: "continue_with",
      });
    } catch (err) {
      console.error("[GSI] renderButton failed:", err);
      setGsiError(true);
    }
  }, [gsiReady, open]);

  const handleGoogleResponse = async (response) => {
    try {
      setError("");
      await googleLogin(response.credential);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      setError("");
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!open) return null;

  // return (
  //   <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
  //     <div className="relative bg-white w-[92%] max-w-md rounded-2xl p-1 overflow-hidden">

  //       {/* Header */}
  //       <div className="bg-[#F5F6F7] p-6 mb-6 relative rounded-t-2xl">
  //         <button onClick={onClose} className="absolute top-4 right-4">
  //           <img src={closecircle} alt="Close" className="w-7 h-7" />
  //         </button>
  //         <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
  //         <p className="text-center text-sm text-gray-500">
  //           Access thousands of judgments and associated information to begin
  //           your legal research journey
  //         </p>
  //       </div>

  //       {/* Body */}
  //       <div className="px-6 pb-6">

  //         {error && (
  //           <p className="text-red-600 text-sm mb-4 whitespace-pre-line">{error}</p>
  //         )}

  //         {/* Google button container */}
  //         {!gsiError ? (
  //           <div ref={googleBtnRef} className="w-full mb-2 min-h-[44px] flex items-center justify-center">
  //             {!gsiReady && (
  //               <div className="w-full py-3 rounded-lg border border-gray-200 flex items-center justify-center gap-3 text-sm text-gray-400">
  //                 <img src={googleLogo} alt="Google" className="w-5 h-5 opacity-50" />
  //                 <span>Loading Google Sign-In...</span>
  //               </div>
  //             )}
  //           </div>
  //         ) : (
  //           <p className="text-xs text-center text-gray-400 mb-2">
  //             Google Sign-In unavailable
  //           </p>
  //         )}

  //         <div className="flex items-center my-4">
  //           <div className="flex-1 h-px bg-gray-300" />
  //           <span className="px-3 text-sm text-gray-500">Or</span>
  //           <div className="flex-1 h-px bg-gray-300" />
  //         </div>

  //         {/* Email */}
  //         <div className="mb-4">
  //           <label className="text-sm font-medium">Email Address</label>
  //           <div className="relative mt-1">
  //             <input
  //               type="email"
  //               placeholder="Enter Email ID"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               onKeyDown={(e) => e.key === "Enter" && handleLogin()}
  //               className="w-full px-3 py-2 rounded-md input_border pr-10"
  //             />
  //             <img src={emailIcon} alt="Email" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" />
  //           </div>
  //         </div>

  //         {/* Password */}
  //         <div className="mb-2">
  //           <label className="text-sm font-medium">Password</label>
  //           <div className="relative mt-1">
  //             <input
  //               type={showPass ? "text" : "password"}
  //               placeholder="Enter Your Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               onKeyDown={(e) => e.key === "Enter" && handleLogin()}
  //               className="w-full px-3 py-2 rounded-md input_border pr-10"
  //             />
  //             <img
  //               src={eyeIcon}
  //               alt="Show"
  //               onClick={() => setShowPass(!showPass)}
  //               className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
  //             />
  //           </div>
  //         </div>

  //         <div className="text-right text-sm mt-1 cursor-pointer hover:underline text-gray-500">
  //           Forgot Password?
  //         </div>

  //         <button
  //           onClick={handleLogin}
  //           disabled={loading}
  //           className="w-40 mt-6 py-3 rounded-full btn_primary block mx-auto disabled:opacity-50"
  //         >
  //           {loading ? "Logging in..." : "Login"}
  //         </button>

  //         <div className="text-center text-sm mt-6">
  //           Don&apos;t have an account?{" "}
  //           <span
  //             className="font-bold cursor-pointer hover:underline"
  //             onClick={() => { onClose(); onSignupClick?.(); }}
  //           >
  //             Sign up
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return(
    <h1 className="text-center text-xl font-bold">Coming Soon</h1>
  )
};

export default LoginModal;