export type User={
  _id: string;
  phoneNumber: string;
  username?: string;
  isOnline: boolean;
  lastActive?: Date; // add this property
  customName?: string; 
}

export interface Message {
  _id: string;
  sender: string; // User ID
  receiver: string; // User ID
  content: string;
  timestamp: string | null; // ISO Date string
}
 
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    phoneNumber: string;
    username?: string;
  };
}

export interface ErrorResponse {
  error: string;
}

// For API responses
export interface UsersApiResponse {
  success: boolean;
  users: User[];
  error?: string;
  message?: string; // For search when no users found
}

export interface ProfileApiResponse {
  success: boolean;
  user: User;
  error?: string;
}