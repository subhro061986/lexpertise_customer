import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import hamburgerIcon from "../assets/hamburger.png";
import profileIcon from "../assets/profile-circle.png";
import { useAuth } from "../context/AuthContext";

const TopMenu = ({ onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { currentUser, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // ─── User avatar / initials ────────────────────────────────────────────
  const UserAvatar = () => {
    if (currentUser?.avatar_url) {
      return (
        <img
          src={currentUser.avatar_url}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover border border-yellow-400"
        />
      );
    }
    const initials = currentUser?.full_name
      ? currentUser.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
      : "?";
    return (
      <div className="w-9 h-9 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm font-bold">
        {initials}
      </div>
    );
  };

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
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>

        {/* ── Auth: logged-in vs logged-out ── */}
        <div className="hidden md:flex gap-3 text-sm items-center">
          {isAuthenticated ? (
            /* ── User dropdown ── */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <UserAvatar />
                <span className="text-sm font-medium max-w-[120px] truncate">
                  {currentUser?.full_name || currentUser?.email}
                </span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Login / Sign Up buttons ── */
            <>
              <button
                onClick={onLoginClick}
                className="px-4 py-2 border btn_bordered rounded-full"
              >
                Login
              </button>
              <button
                onClick={onSignupClick}
                className="px-4 py-2 border btn_bordered rounded-full"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={hamburgerIcon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#2e1d19] border-t md:hidden shadow-xl z-50">
          <nav className="flex flex-col items-center gap-4 p-6 text-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">About Us</Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium">Pricing</Link>

            <div className="w-60 h-px bg-[#e6dedb] dark:bg-[#3e2c26] my-2" />

            {isAuthenticated ? (
              <div className="flex flex-col items-center gap-3">
                <UserAvatar />
                <p className="text-sm font-medium">{currentUser?.full_name || currentUser?.email}</p>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-sm text-red-600 border border-red-300 rounded-full hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex justify-center gap-4 mt-2 text-sm">
                <button
                  onClick={() => { setIsMenuOpen(false); onSignupClick(); }}
                  className="px-6 py-2 border btn_bordered rounded-full"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); onLoginClick(); }}
                  className="px-6 py-2 border btn_bordered rounded-full"
                >
                  Login
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopMenu;