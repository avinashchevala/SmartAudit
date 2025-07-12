/**
 * useRole Hook
 * 
 * Custom hook for accessing role context throughout the application.
 * Provides type-safe access to user authentication state and role information.
 * 
 * @throws {Error} If used outside of RoleProvider
 * @returns {RoleContextType} User context with authentication state and methods
 */

import React, { useContext } from 'react'
import { RoleContextType } from '../types';
import { RoleContext } from '../contexts/RoleContext';

/**
 * Hook to access role-based authentication context
 * Must be used within a RoleProvider component
 */
export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  
  // Ensure hook is used within proper context provider
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  
  return context;
};