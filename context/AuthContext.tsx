
import React, { createContext, useState, ReactNode, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, these would come from .env
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'password123';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!sessionStorage.getItem('authToken'));

  const login = useCallback((user: string, pass: string): boolean => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      // In a real app, this would be a JWT
      const fakeToken = 'super-secret-auth-token';
      sessionStorage.setItem('authToken', fakeToken);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
