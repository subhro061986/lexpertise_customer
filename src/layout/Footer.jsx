
import React, { useEffect, useState, } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";






const Footer = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
      <footer class="bg-white dark:bg-[#2e1d19] border-t border-[#e6dedb] dark:border-[#3e2c26] py-8">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2">
            <img src="/logo.svg" alt="LexSearch Logo" className="h-20 w-20" />
          </div>
          <div class="flex gap-6 text-sm text-[#8a6b60] dark:text-[#a08d87]">
            <a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a class="hover:text-primary transition-colors" href="#">Terms of Use</a>
            <a class="hover:text-primary transition-colors" href="#">Disclaimer</a>
          </div>
          <p class="text-xs text-[#8a6b60] dark:text-[#a08d87]">© 2026 Lexpertise Inc. All rights reserved.</p>
        </div>
      </footer>
    );
}

export default Footer;