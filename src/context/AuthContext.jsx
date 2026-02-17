import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import Config from "../config/config.json";

const AuthContext = createContext();

const POLL_INTERVAL_MS = 1_000; // check every 1 second

function persistSession(token, user) {
  localStorage.setItem("access_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("auth_user");
}

const AuthProvider = ({ children }) => {
  const [loading, setLoading]           = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const pollRef = useRef(null);

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
  const openLoginModal  = useCallback(() => setLoginModalOpen(true),  []);
  const closeLoginModal = useCallback(() => setLoginModalOpen(false), []);

  // ── Force logout helper (used by poller + interceptor) ─────────────────
  const forceLogout = useCallback(() => {
    clearSession();
    setCurrentUser(null);
    setLoginModalOpen(true);
  }, []);

  // ── Session poller ─────────────────────────────────────────────────────
  // Starts when user logs in, stops when user logs out.
  // Hits GET /auth/verify-session every 30s with the stored token.
  // If the server returns 401 (another device logged in), force logout.
  useEffect(() => {
    if (!isAuthenticated) {
      // Clear any running poller when logged out
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }

    const checkSession = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        await axios.get(Config.API_URL + "/auth/verify-session", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // 200 → session still valid, do nothing
      } catch (err) {
        if (err.response?.status === 401) {
          // Another device has logged in — kick this one out
          forceLogout();
        }
        // Other errors (network timeout etc.) — silently ignore, try again next tick
      }
    };

    // Run once immediately when user logs in, then on interval
    checkSession();
    pollRef.current = setInterval(checkSession, POLL_INTERVAL_MS);

    return () => {
      clearInterval(pollRef.current);
      pollRef.current = null;
    };
  }, [isAuthenticated, forceLogout]);

  // ── Attach token to every axios request ───────────────────────────────
  useEffect(() => {
    const req = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => axios.interceptors.request.eject(req);
  }, []);

  // ── Global 401 interceptor (catches any other API call) ───────────────
  useEffect(() => {
    const res = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && currentUser) {
          forceLogout();
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
      loginModalOpen, openLoginModal, closeLoginModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };