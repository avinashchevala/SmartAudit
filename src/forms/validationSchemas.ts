/**
 * Validation Schemas
 * 
 * Yup-based validation schemas for form validation throughout the application.
 * Provides type-safe validation with clear error messages for user feedback.
 * 
 * Features:
 * - User login validation
 * - Multi-step audit form validation
 * - Field-level validation rules
 * - Custom error messages
 * - Type safety with TypeScript
 */

import * as yup from 'yup';

/**
 * User Login Validation Schema
 * Validates user authentication form fields
 */
export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  role: yup
    .mixed<'Admin' | 'Auditor' | 'Viewer'>()
    .oneOf(['Admin', 'Auditor', 'Viewer'], 'Please select a valid role')
    .required('Role is required'),
});

/**
 * Audit Form Step 1 Validation Schema
 * Validates basic audit information (title, location, date, type)
 */
export const auditStep1ValidationSchema = yup.object().shape({
  auditTitle: yup
    .string()
    .required('Audit title is required')
    .min(5, 'Audit title must be at least 5 characters')
    .max(100, 'Audit title cannot exceed 100 characters'),
  auditLocation: yup
    .string()
    .required('Audit location is required')
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location cannot exceed 100 characters'),
  auditDate: yup
    .string()
    .required('Audit date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  auditType: yup.string().required('Audit type is required'),
});

/**
 * Audit Form Step 2 Validation Schema
 * Validates rating fields and checklist items
 */
export const auditStep2ValidationSchema = yup.object().shape({
  overallRating: yup
    .number()
    .required('Overall rating is required')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  complianceRating: yup
    .number()
    .required('Compliance rating is required')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  safetyRating: yup
    .number()
    .required('Safety rating is required')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  qualityRating: yup
    .number()
    .required('Quality rating is required')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  checklistItems: yup.object().required('Checklist items are required'),
});

/**
 * Audit Form Step 3 Validation Schema
 * Validates findings, recommendations, and optional fields
 */
export const auditStep3ValidationSchema = yup.object().shape({
  findings: yup
    .string()
    .required('Findings are required')
    .min(10, 'Findings must be at least 10 characters')
    .max(1000, 'Findings cannot exceed 1000 characters'),
  recommendations: yup
    .string()
    .required('Recommendations are required')
    .min(10, 'Recommendations must be at least 10 characters')
    .max(1000, 'Recommendations cannot exceed 1000 characters'),
  actionItems: yup
    .string()
    .optional()
    .max(1000, 'Action items cannot exceed 1000 characters'),
  priority: yup
    .string()
    .optional()
    .oneOf(['Low', 'Medium', 'High', 'Critical'], 'Invalid priority level'),
  images: yup
    .array()
    .optional()
    .of(yup.string())
    .max(5, 'Maximum 5 images allowed'),
});

/**
 * Combined Audit Form Validation Schema
 * Merges all step schemas for complete form validation
 */
export const fullAuditValidationSchema = yup.object().shape({
  ...auditStep1ValidationSchema.fields,
  ...auditStep2ValidationSchema.fields,
  ...auditStep3ValidationSchema.fields,
});

/**
 * Exported validation schemas object for easy access
 */
export const validationSchemas = {
  login: loginValidationSchema,
  auditStep1: auditStep1ValidationSchema,
  auditStep2: auditStep2ValidationSchema,
  auditStep3: auditStep3ValidationSchema,
  fullAudit: fullAuditValidationSchema,
};
