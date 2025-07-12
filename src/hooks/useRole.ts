import React, { useContext } from 'react'
import { RoleContextType } from '../types';
import { RoleContext } from '../contexts/RoleContext';

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};