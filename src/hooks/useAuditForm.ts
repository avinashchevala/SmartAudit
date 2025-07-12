/**
 * useAuditForm Hook
 * 
 * Custom hook for managing audit form data and operations.
 * Provides CRUD operations for audit data with loading states and error handling.
 * 
 * Features:
 * - Load all audits from storage
 * - Save new audit data
 * - Delete existing audits
 * - Get specific audit by ID
 * - Loading states for async operations
 * - Error handling with user-friendly messages
 */

import { useState, useEffect } from 'react';
import { AuditFormData } from '../types';
import { StorageService } from '../services/StorageService';

/**
 * Hook for managing audit form operations
 * Provides state management and CRUD operations for audits
 * 
 * @returns Object with audit data, loading states, and operation methods
 */
export const useAuditForm = () => {
  // State for audit data and UI feedback
  const [audits, setAudits] = useState<AuditFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Loads all audits from storage
   * Updates local state with fetched data
   */
  const loadAudits = async () => {
    setLoading(true);
    setError(null);
    try {
      const auditData = await StorageService.getAudits();
      setAudits(auditData);
    } catch (err) {
      setError('Failed to load audits');
      console.error('Error loading audits:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Saves a new audit to storage
   * Refreshes the audit list after successful save
   * 
   * @param audit - Complete audit data to save
   * @throws Error if save operation fails
   */
  const saveAudit = async (audit: AuditFormData) => {
    setLoading(true);
    setError(null);
    try {
      await StorageService.saveAudit(audit);
      await loadAudits(); // Refresh the list with new data
    } catch (err) {
      setError('Failed to save audit');
      console.error('Error saving audit:', err);
      throw err; // Re-throw for caller to handle
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes an audit from storage
   * Refreshes the audit list after successful deletion
   * 
   * @param auditId - Unique identifier of audit to delete
   * @throws Error if delete operation fails
   */
  const deleteAudit = async (auditId: string) => {
    setLoading(true);
    setError(null);
    try {
      await StorageService.deleteAudit(auditId);
      await loadAudits(); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete audit');
      console.error('Error deleting audit:', err);
      throw err; // Re-throw for caller to handle
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retrieves a specific audit by its ID
   * 
   * @param auditId - Unique identifier of the audit
   * @returns Audit data or null if not found
   */
  const getAuditById = async (
    auditId: string,
  ): Promise<AuditFormData | null> => {
    try {
      return await StorageService.getAuditById(auditId);
    } catch (err) {
      console.error('Error getting audit by ID:', err);
      return null;
    }
  };

  // Load audits when hook is first used
  useEffect(() => {
    loadAudits();
  }, []);

  return {
    audits,         // Array of all audit data
    loading,        // Loading state for async operations
    error,          // Error message for failed operations
    loadAudits,     // Function to refresh audit data
    saveAudit,      // Function to save new audit
    deleteAudit,    // Function to delete audit
    getAuditById,   // Function to get specific audit
  };
};

export default useAuditForm;
