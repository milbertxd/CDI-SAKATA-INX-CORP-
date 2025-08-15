import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

interface Admin {
  id: number;
  username: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  admin: null,
  token: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isLoading, setIsLoading] = useState(true);

  // Set up axios interceptor for adding token to requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify token on app start
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/auth/verify`);
          setAdmin(response.data.admin);
          console.log('Token verified successfully:', response.data.admin);
        } catch (error) {
          console.error('Token verification failed:', error);
          // Only remove token if it's actually invalid (not network error)
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('adminToken');
            setToken(null);
            setAdmin(null);
          }
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login with:', { username, password }); // Debug
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      console.log('Login response:', response.data); // Debug

      if (response.data.success) {
        const { token: newToken, admin: adminData } = response.data;
        setToken(newToken);
        setAdmin(adminData);
        localStorage.setItem('adminToken', newToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
