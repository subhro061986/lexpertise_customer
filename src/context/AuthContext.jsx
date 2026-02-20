import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import Config from "../config/config.json";

const AuthContext = createContext();

function persistSession(token, user) {
  localStorage.setItem("access_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth_user");
}

const AuthProvider = ({ children }) => {
  const [loading, setLoading]               = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalMessage, setLoginModalMessage] = useState(""); // red warning message

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = Boolean(currentUser);

  // ── Modal controls ─────────────────────────────────────────────────────
  const openLoginModal  = useCallback(() => {
    setLoginModalMessage("");
    setLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setLoginModalMessage("");
    setLoginModalOpen(false);
  }, []);

  // ── Force logout with a warning message ────────────────────────────────
  const forceLogout = useCallback((message = "") => {
    clearSession();
    setCurrentUser(null);
    setLoginModalMessage(message);
    setLoginModalOpen(true);
  }, []);

  // ── Attach token to every axios request ───────────────────────────────
  useEffect(() => {
    const req = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => axios.interceptors.request.eject(req);
  }, []);

  // ── Global 401 handler ─────────────────────────────────────────────────
  useEffect(() => {
    const res = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && currentUser) {
          forceLogout("You've been logged out because your account was signed in on another device.");
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(res);
  }, [currentUser, forceLogout]);

  /* ─── SEND OTP ──────────────────────────────────────────────────────── */
  const sendOtp = async (email) => {
    try {
      setLoading(true);
      const res = await axios.post(Config.API_URL + "/otp/send", { email });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.detail || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ─── VERIFY OTP ────────────────────────────────────────────────────── */
  const verifyOtp = async (email, otp) => {
    try {
      setLoading(true);
      const res = await axios.post(Config.API_URL + "/otp/verify", { email, otp: Number(otp) });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.detail || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* ─── CREATE ACCOUNT ────────────────────────────────────────────────── */
  const createAccount = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post(Config.API_URL + "/users/create-account", payload);
      return res.data;
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) throw new Error(detail.map((e) => e.msg).join("\n"));
      throw new Error(detail || "Account creation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ─── LOGIN ─────────────────────────────────────────────────────────── */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(Config.API_URL + "/users/login", { email, password });
      const { access_token, user } = res.data;
      persistSession(access_token, user);
      setCurrentUser(user);
      setLoginModalOpen(false);
      setLoginModalMessage("");
      return user;
    } catch (err) {
      throw new Error(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ─── GOOGLE LOGIN ──────────────────────────────────────────────────── */
  const googleLogin = async (idToken) => {
    try {
      setLoading(true);
      const res = await axios.post(Config.API_URL + "/users/google-login", { id_token: idToken });
      const { access_token, user } = res.data;
      persistSession(access_token, user);
      setCurrentUser(user);
      setLoginModalOpen(false);
      setLoginModalMessage("");
      return user;
    } catch (err) {
      throw new Error(err.response?.data?.detail || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ─── LOGOUT ────────────────────────────────────────────────────────── */
  const logout = useCallback(() => {
    clearSession();
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      sendOtp, verifyOtp, createAccount,
      login, googleLogin, logout,
      loading, currentUser, isAuthenticated,
      loginModalOpen, loginModalMessage,
      openLoginModal, closeLoginModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };