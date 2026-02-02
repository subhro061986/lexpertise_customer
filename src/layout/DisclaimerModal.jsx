import React, { useState } from "react";
import closecircle from "../assets/close-circle.png";
import tickIcon from "../assets/tick-square.png";

const DisclaimerModal = ({ open, onClose, onAgree }) => {
  const [checked, setChecked] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      {/* Modal Container */}
      <div className="relative bg-white w-[92%] max-w-md rounded-2xl shadow-md overflow-hidden max-h-[90vh] flex flex-col">
        {/* ===== HEADER ===== */}
        <div className="bg-[#F5F6F7] p-6 relative flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4">
            <img src={closecircle} alt="Close" className="w-7 h-7" />
          </button>

          <h2 className="text-2xl font-bold text-center">Disclaimer</h2>
        </div>

        {/* ===== BODY (SCROLLABLE) ===== */}
        <div className="px-6 py-6 overflow-y-auto flex-1 text-sm text-[#1B2053] leading-relaxed space-y-4 text-justify">
          <p>
            The judgment summaries available on this platform are generated with
            the assistance of artificial intelligence tools and are intended
            exclusively for informational, educational and research purposes.
            While every effort is made to ensure accuracy, clarity and
            coherence, these summaries do not represent the official text of the
            judgment and must not be relied upon as a substitute for the
            original judicial decision.
          </p>

          <p>
            Users are advised to verify all legal propositions with the official
            judgment. These summaries are not intended to provide legal advice
            or to replace careful judicial reading. The platform disclaims all
            liability for any direct, indirect, incidental, consequential, or
            punitive damages arising from use or reliance on AI-generated
            summaries. We would, however, appreciate being informed of any
            errors or omissions so that appropriate corrections may be
          </p>

          {/* Checkbox */}
          <label className="flex items-center gap-3 pt-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="
      appearance-none
      w-5 h-5
      border-2 border-[#E8B34D]
      rounded
      flex items-center justify-center
      checked:bg-[#E8B34D]
      checked:border-[#E8B34D]
      relative
      transition
    "
            />

            <span className="text-sm text-[#1B2053]">
              I agree with the disclaimer
            </span>
          </label>
        </div>

        {/* ===== FOOTER ACTIONS ===== */}
        <div className="px-6 pb-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border btn_bordered"
          >
            Disagree
          </button>

          <button
            disabled={!checked}
            onClick={() => {
              if (checked && onAgree) onAgree();
            }}
            className={`px-8 py-2 rounded-full font-bold
              ${
                checked
                  ? "btn_primary"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
