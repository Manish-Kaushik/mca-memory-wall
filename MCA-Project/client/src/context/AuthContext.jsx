import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) setUser(userInfo.user);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // API call logic inside pages usually, but here is context helper
  };

  // Ye function naya add kiya hai Profile update ke liye
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      userInfo.user = updatedUser;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  };

  return (
  <AuthContext.Provider
    value={{ user, setUser, updateUser, loading }}
  >
    {children}
  </AuthContext.Provider>
);
};