import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Derive everything from AuthContext so there's a single source of truth
  const { currentUser, isAuthenticated, logout, loading } = useAuth();

  return (
    <UserContext.Provider value={{ currentUser, isAuthenticated, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  return useContext(UserContext);
}

export { UserContext, UserProvider, useUser };