
import React, { useEffect, useState, } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";






const TopMenu = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
       <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e6dedb] dark:border-[#3e2c26] bg-white/90 dark:bg-[#2e1d19]/90 backdrop-blur-md px-6 py-3 lg:px-20">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        
        <img src="/logo.svg" alt="LexSearch Logo" className="h-20 w-20" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Databases
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Help
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-3">
            <button class="px-4 py-2 border btn_bordered rounded-full">
                Login
            </button>
            <button class="px-4 py-2 border btn_bordered rounded-full">
                Sign Up
            </button>
        </div>
      </div>
    </header>
    );
}

export default TopMenu;