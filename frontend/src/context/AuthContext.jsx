import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  // Check if token already exists
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Login function
  const login = (token) => {

    localStorage.setItem("token", token);

    setIsAuthenticated(true);

  };

  // Logout function
  const logout = () => {

    localStorage.removeItem("token");

    setIsAuthenticated(false);

  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}