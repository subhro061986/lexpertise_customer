import React from "react";
import fbIcon from "../assets/facebook.png";
import igIcon from "../assets/instagram.png";
import xIcon from "../assets/x.png";
import inIcon from "../assets/linkedin.png";
import lexpertiseLogo from "../assets/logo.png";
import smslogo from "../assets/sms.png";
import calllogo from "../assets/call.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#e6dedb]">
      
      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-12 space-y-10">

        {/* Brand */}
        <div className="space-y-3">
          <img src={lexpertiseLogo} alt="Lexpertise" className="h-14 w-14" />
          <p className="text-sm text-[#6d544b]">
            Judgments. Simplified.
          </p>
        </div>

        {/* Links + Platforms */}
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <h4 className="font-bold text-[#1B2053]">Links</h4>
            <ul className="space-y-2 text-sm text-[#6d544b]">
              <li>About Us</li>
              <li>Lexpertise</li>
              <li>Law Commission Reports</li>
              <li>Open Access Law Journals</li>
              <li>Bare Acts</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#1B2053]">Platforms</h4>
            <ul className="space-y-2 text-sm text-[#6d544b]">
              <li>EBooks Junction</li>
            </ul>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#1B2053]">Lexpertise</h4>
          <p className="text-sm text-[#6d544b] leading-relaxed">
            Plot 13, Heritage Phase II Telephone Nagar,  
            Perungudi Chennai - 600096
          </p>
        </div>

        {/* CIN */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-[#1B2053]">CIN No:</span>
          <span className="text-[#6d544b]">
            U22219TN2022PTC151260
          </span>
        </div>

        {/* Contact + Social */}
        <div className="grid grid-cols-2 gap-10">
          
          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#1B2053]">Contact Us</h4>

            <div className="flex items-center gap-2">
              <img src={smslogo} alt="Email" className="h-4 w-4" />
              <p className="text-sm text-[#6d544b]">
                sales@lexpertise.in
              </p>
            </div>

            <div className="flex items-center gap-2">
              <img src={calllogo} alt="Phone" className="h-4 w-4" />
              <p className="text-sm text-[#6d544b]">
                +1 (650) 555-0111
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#1B2053]">Follow us on</h4>
            <div className="flex gap-3">
              <img src={fbIcon} alt="Facebook" className="h-6 w-6" />
              <img src={igIcon} alt="Instagram" className="h-6 w-6" />
              <img src={xIcon} alt="X" className="h-6 w-6" />
              <img src={inIcon} alt="LinkedIn" className="h-6 w-6" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1a1a1a] text-center py-4">
        <p className="text-xs text-white">
          Powered by <span className="underline">Lexpertise</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
