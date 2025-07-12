/**
 * Storage Service
 * 
 * Handles all data persistence operations using AsyncStorage.
 * Provides methods for CRUD operations on audits, draft management,
 * and data cleanup functionality.
 * 
 * Features:
 * - Audit data persistence (create, read, update, delete)
 * - Draft audit data management
 * - Error handling with logging
 * - Type-safe operations with TypeScript interfaces
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuditFormData } from '../types';
import { STORAGE_KEYS } from '../constants';

/**
 * Static service class for handling all storage operations
 * Uses AsyncStorage for persistent data storage on device
 */
export class StorageService {
  /**
   * Save audit data to AsyncStorage
   */
  static async saveAudit(audit: AuditFormData): Promise<void> {
    try {
      const existingAudits = await this.getAudits();
      const updatedAudits = [...existingAudits, audit];
      await AsyncStorage.setItem(
        STORAGE_KEYS.AUDITS,
        JSON.stringify(updatedAudits),
      );
    } catch (error) {
      console.error('Error saving audit:', error);
      throw error;
    }
  }

  /**
   * Get all audits from AsyncStorage
   */
  static async getAudits(): Promise<AuditFormData[]> {
    try {
      const auditsData = await AsyncStorage.getItem(STORAGE_KEYS.AUDITS);
      return auditsData ? JSON.parse(auditsData) : [];
    } catch (error) {
      console.error('Error getting audits:', error);
      return [];
    }
  }

  /**
   * Update an existing audit
   */
  static async updateAudit(
    auditId: string,
    updatedAudit: AuditFormData,
  ): Promise<void> {
    try {
      const audits = await this.getAudits();
      const updatedAudits = audits.map(audit =>
        audit.id === auditId ? updatedAudit : audit,
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.AUDITS,
        JSON.stringify(updatedAudits),
      );
    } catch (error) {
      console.error('Error updating audit:', error);
      throw error;
    }
  }

  /**
   * Delete an audit (Admin only)
   */
  static async deleteAudit(auditId: string): Promise<void> {
    try {
      const audits = await this.getAudits();
      const filteredAudits = audits.filter(audit => audit.id !== auditId);
      await AsyncStorage.setItem(
        STORAGE_KEYS.AUDITS,
        JSON.stringify(filteredAudits),
      );
    } catch (error) {
      console.error('Error deleting audit:', error);
      throw error;
    }
  }

  /**
   * Save draft audit data
   */
  static async saveDraft(draft: Partial<AuditFormData>): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(draft));
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  }

  /**
   * Get draft audit data
   */
  static async getDraft(): Promise<Partial<AuditFormData> | null> {
    try {
      const draftData = await AsyncStorage.getItem(STORAGE_KEYS.DRAFTS);
      return draftData ? JSON.parse(draftData) : null;
    } catch (error) {
      console.error('Error getting draft:', error);
      return null;
    }
  }

  /**
   * Clear draft data
   */
  static async clearDraft(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.DRAFTS);
    } catch (error) {
      console.error('Error clearing draft:', error);
      throw error;
    }
  }

  /**
   * Get audit by ID
   */
  static async getAuditById(auditId: string): Promise<AuditFormData | null> {
    try {
      const audits = await this.getAudits();
      return audits.find(audit => audit.id === auditId) || null;
    } catch (error) {
      console.error('Error getting audit by ID:', error);
      return null;
    }
  }

  /**
   * Clear all data (for testing purposes)
   */
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUDITS,
        STORAGE_KEYS.DRAFTS,
        STORAGE_KEYS.USER,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }
}
