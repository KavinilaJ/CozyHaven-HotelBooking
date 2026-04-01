import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Simple JWT payload decoder (no library needed)
function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload) setUser({ token, userId: payload.userId, email: payload.sub, role: payload.role });
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem('token', token);
    const payload = parseJwt(token);
    console.log({ token, userId: payload.userId, email: payload.sub, role: payload.role })
    setUser({ token, userId: payload.userId, email: payload.sub, role: payload.role });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
