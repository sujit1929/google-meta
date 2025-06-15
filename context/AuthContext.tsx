// src/context/AuthContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { clearAuthData, getToken, getUserData, setToken, setUserData } from '@/lib/auth';
import { AuthResponse, User } from '@/types';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  phoneNumber: string;
  exp: number; // Expiration time in Unix timestamp
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; phoneNumber: string; username?: string } | null;
  token: string | null;
  isLoading: boolean;
}

// 1. Create the Context
// ✅ add export here
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


// 2. Create the Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; phoneNumber: string; username?: string } | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getToken();
    const storedUserData = getUserData();

    if (storedToken && storedUserData) {
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);
        // Check if token is expired
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setTokenState(storedToken);
          setUser(storedUserData);
        } else {
          clearAuthData(); // Token expired
          setIsAuthenticated(false);
          setUser(null);
          setTokenState(null);
        }
      } catch (error) {
        console.error('Failed to decode or verify token:', error);
        clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
        setTokenState(null);
      }
    }
    setIsLoading(false);
  }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}