import { useState, useEffect } from 'react';
import { AuditFormData } from '../types';
import { StorageService } from '../services/StorageService';

export const useAuditForm = () => {
  const [audits, setAudits] = useState<AuditFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const saveAudit = async (audit: AuditFormData) => {
    setLoading(true);
    setError(null);
    try {
      await StorageService.saveAudit(audit);
      await loadAudits(); // Refresh the list
    } catch (err) {
      setError('Failed to save audit');
      console.error('Error saving audit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAudit = async (auditId: string) => {
    setLoading(true);
    setError(null);
    try {
      await StorageService.deleteAudit(auditId);
      await loadAudits(); // Refresh the list
    } catch (err) {
      setError('Failed to delete audit');
      console.error('Error deleting audit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    loadAudits();
  }, []);

  return {
    audits,
    loading,
    error,
    loadAudits,
    saveAudit,
    deleteAudit,
    getAuditById,
  };
};

export default useAuditForm;
