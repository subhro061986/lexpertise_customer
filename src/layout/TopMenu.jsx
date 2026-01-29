import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hamburgerIcon from "../assets/hamburger.png";

const TopMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e6dedb] dark:border-[#3e2c26] bg-white/90 dark:bg-[#2e1d19]/90 backdrop-blur-md px-6 py-3 lg:px-20">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="LexSearch Logo" className="h-20 w-20" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="px-4 py-2 border btn_bordered rounded-full">
            Login
          </button>
          <button className="px-4 py-2 border btn_bordered rounded-full">
            Sign Up
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img src={hamburgerIcon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#2e1d19] border-t md:hidden">
          <nav className="flex flex-col items-center gap-4 p-6 text-center">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium"
            >
              About Us
            </Link>

            <Link
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium"
            >
              Pricing
            </Link>

            {/* Divider */}
            <div className="w-60 h-px bg-[#e6dedb] dark:bg-[#3e2c26] my-2"></div>

            {/* Auth Buttons */}
            <div className="flex justify-center gap-4 mt-2">
              <button className="px-6 py-2 border btn_bordered rounded-full">
                Sign Up
              </button>
              <button className="px-6 py-2 border btn_bordered rounded-full">
                Login
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopMenu;
