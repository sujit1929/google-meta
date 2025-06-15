import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // ✅ correct import

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
//4516