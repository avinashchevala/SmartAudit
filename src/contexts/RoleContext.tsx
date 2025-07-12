/**
 * Role Context
 * 
 * Provides role-based authentication and user management throughout the app.
 * Handles user session persistence, authentication state, and role-based
 * access control for the entire application.
 * 
 * Features:
 * - User authentication state management
 * - Persistent user sessions using AsyncStorage
 * - Role-based access control context
 * - Logout functionality
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, RoleContextType } from '../types';
import { STORAGE_KEYS } from '../constants';

// Create context with undefined default (will be checked in hook)
export const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

/**
 * Role Provider Component
 * 
 * Wraps the app with authentication context and manages user state.
 * Automatically loads user data from storage on app start.
 */
export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on component mount
  useEffect(() => {
    loadUser();
  }, []);

  /**
   * Loads user data from AsyncStorage on app initialization
   */
  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Saves user data to AsyncStorage and updates context state
   * 
   * @param newUser - User object to save (null to clear)
   */
  const saveUser = async (newUser: User | null) => {
    try {
      if (newUser) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      }
      setUser(newUser);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  /**
   * Logs out the current user and clears stored session data
   */
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Context value object with user state and methods
  const value: RoleContextType = {
    user,
    setUser: saveUser,
    logout,
  };

  // Show nothing while loading user data
  if (isLoading) {
    return null; // Could return a loading component here
  }

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};


