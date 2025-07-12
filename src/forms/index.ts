// Form Components
export { FormInput } from './FormInput';
export { FormPicker } from './FormPicker';
export { FormRating } from './FormRating';
export { FormCheckbox } from './FormCheckbox';

// Validation Schemas
export { validationSchemas } from './validationSchemas';

// Form Types
export interface LoginFormData {
  username: string;
  password: string;
  role: 'Admin' | 'Auditor' | 'Viewer';
}

export interface AuditStep1FormData {
  auditTitle: string;
  auditLocation: string;
  auditDate: string;
  auditType: string;
}

export interface AuditStep2FormData {
  overallRating: number;
  complianceRating: number;
  safetyRating: number;
  qualityRating: number;
  checklistItems: Record<string, boolean>;
}

export interface AuditStep3FormData {
  findings: string;
  recommendations: string;
  actionItems?: string;
  priority?: string;
  images?: string[];
}

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
