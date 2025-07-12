/**
 * Type Definitions for SmartAudit Application
 * 
 * This file contains all TypeScript interfaces and types used throughout
 * the application for type safety and better development experience.
 */

/**
 * Defines the possible user roles in the audit system
 * - Admin: Full access to create, view, edit, and delete audits
 * - Auditor: Can create and view audits  
 * - Viewer: Can only view existing audits
 */
export type UserRole = 'Admin' | 'Auditor' | 'Viewer';

/**
 * User entity representing a person using the audit system
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** Display name of the user */
  name: string;
  /** Role determining user permissions */
  role: UserRole;
}

/**
 * Data structure for the first step of audit creation
 * Contains basic audit information
 */
export interface AuditStep1Data {
  /** Title/name of the audit */
  auditTitle: string;
  /** Physical location where audit is conducted */
  auditLocation: string;
  /** Date when the audit was performed */
  auditDate: string;
  /** Category/type of audit being performed */
  auditType: string;
}

/**
 * Data structure for the second step of audit creation
 * Contains rating information and checklist items
 */
export interface AuditStep2Data {
  /** Overall rating score (1-5) */
  overallRating: number;
  /** Compliance-specific rating (1-5) */
  complianceRating: number;
  /** Safety-specific rating (1-5) */
  safetyRating: number;
  /** Quality-specific rating (1-5) */
  qualityRating: number;
  /** Dynamic checklist items with boolean completion status */
  checklistItems: {
    [key: string]: boolean;
  };
}

/**
 * Data structure for the third step of audit creation
 * Contains findings, recommendations, and action items
 */
export interface AuditStep3Data {
  /** Detailed findings from the audit */
  findings: string;
  /** Recommendations based on audit findings */
  recommendations: string;
  /** Optional action items to be taken (can be empty) */
  actionItems?: string;
  /** Priority level for addressing audit findings */
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  /** Optional array of image URLs/paths for evidence */
  images?: string[];
}

/**
 * Complete audit form data combining all steps
 * Extends all three step interfaces and adds metadata
 */
export interface AuditFormData
  extends AuditStep1Data,
    AuditStep2Data,
    AuditStep3Data {
  /** Unique identifier for the audit record */
  id: string;
  /** Timestamp when audit was created */
  createdAt: string;
  /** Name of the user who created the audit */
  createdBy: string;
  /** Current status of the audit in the workflow */
  status: 'Draft' | 'Submitted' | 'Reviewed';
}

/**
 * Context type for role-based access control
 * Provides user state and authentication methods
 */
export interface RoleContextType {
  /** Current authenticated user (null if not logged in) */
  user: User | null;
  /** Function to set/update current user */
  setUser: (user: User | null) => void;
  /** Function to log out current user */
  logout: () => void;
}

/**
 * Props interface for navigation components
 * Standardizes navigation prop structure across screens
 */
export interface NavigationProps {
  /** React Navigation object for screen navigation */
  navigation: any;
  /** Optional route parameters passed to screen */
  route?: any;
}
