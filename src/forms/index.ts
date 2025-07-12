/**
 * Forms Module Exports
 * 
 * Central export file for all form-related components, types, and validation schemas.
 * Provides a clean API for importing form functionality throughout the application.
 */

// Form Components - Reusable form field components
export { FormInput } from './FormInput';
export { FormPicker } from './FormPicker';
export { FormRating } from './FormRating';
export { FormCheckbox } from './FormCheckbox';

// Validation Schemas - Yup-based validation rules
export { validationSchemas } from './validationSchemas';

/**
 * Form Data Types
 * TypeScript interfaces for form data structures used throughout the app
 */

/** Login form data structure */
export interface LoginFormData {
  username: string;
  password: string;
  role: 'Admin' | 'Auditor' | 'Viewer';
}

/** Audit form step 1 data structure */
export interface AuditStep1FormData {
  auditTitle: string;
  auditLocation: string;
  auditDate: string;
  auditType: string;
}

/** Audit form step 2 data structure */
export interface AuditStep2FormData {
  overallRating: number;
  complianceRating: number;
  safetyRating: number;
  qualityRating: number;
  checklistItems: Record<string, boolean>;
}

/** Audit form step 3 data structure */
export interface AuditStep3FormData {
  findings: string;
  recommendations: string;
  actionItems?: string;
  priority?: string;
  images?: string[];
}

/** Complete audit form data combining all steps */
export interface FullAuditFormData
  extends AuditStep1FormData,
    AuditStep2FormData,
    AuditStep3FormData {
  createdBy: string;
  createdAt: string;
  status: string;
  priority: string;
  id: string;
}
