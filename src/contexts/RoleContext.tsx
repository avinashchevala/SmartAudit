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

export const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

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

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value: RoleContextType = {
    user,
    setUser: saveUser,
    logout,
  };

  if (isLoading) {
    return null; // You can return a loading component here
  }

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};


