export type UserRole = 'Admin' | 'Auditor' | 'Viewer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface AuditStep1Data {
  auditTitle: string;
  auditLocation: string;
  auditDate: string;
  auditType: string;
}

export interface AuditStep2Data {
  overallRating: number;
  complianceRating: number;
  safetyRating: number;
  qualityRating: number;
  checklistItems: {
    [key: string]: boolean;
  };
}

export interface AuditStep3Data {
  findings: string;
  recommendations: string;
  actionItems?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  images?: string[];
}

export interface AuditFormData
  extends AuditStep1Data,
    AuditStep2Data,
    AuditStep3Data {
  id: string;
  createdAt: string;
  createdBy: string;
  status: 'Draft' | 'Submitted' | 'Reviewed';
}

export interface RoleContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export interface NavigationProps {
  navigation: any;
  route?: any;
}
