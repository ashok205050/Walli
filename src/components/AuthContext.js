import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication check (you can replace this with your own logic)
    const user = JSON.parse(localStorage.getItem('user')); // Example: get user data from localStorage
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Replace this with your login API call
    // Example: Authenticate user and set the currentUser state
    const user = { username }; // Mock user data
    localStorage.setItem('user', JSON.stringify(user)); // Save user data in localStorage
    setCurrentUser(user);
  };

  const logout = () => {
    // Replace this with your logout API call
    localStorage.removeItem('user'); // Remove user data from localStorage
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
