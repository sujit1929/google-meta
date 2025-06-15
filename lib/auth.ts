// src/lib/auth.ts

const TOKEN_KEY = 'jwt_token';
const USER_DATA_KEY = 'user_data';

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

interface StoredUserData {
  id: string;
  phoneNumber: string;
  username?: string;
}

export const setUserData = (userData: StoredUserData) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

export const getUserData = (): StoredUserData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const removeUserData = () => {
  localStorage.removeItem(USER_DATA_KEY);
};

export const clearAuthData = () => {
  removeToken();
  removeUserData();
};