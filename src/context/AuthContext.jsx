import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Config from "../config/config.json";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  /* ================= SEND OTP ================= */
  const sendOtp = async (email) => {
    try {
      setLoading(true);

      const response = await axios.post(
        Config.API_URL + "/otp/send",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async (email, otp) => {
    try {
      setLoading(true);

      const response = await axios.post(
        Config.API_URL + "/otp/verify",
        {
          email,
          otp: Number(otp),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE ACCOUNT ================= */
  const createAccount = async (payload) => {
    try {
      setLoading(true);

      const response = await axios.post(
        Config.API_URL + "/users/create-account",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    } catch (error) {
      const detail = error.response?.data?.detail;

      if (Array.isArray(detail)) {
        const message = detail.map((err) => err.msg).join("\n");
        throw new Error(message);
      }

      throw new Error(detail || "Account creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        sendOtp,
        verifyOtp,
        createAccount,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
