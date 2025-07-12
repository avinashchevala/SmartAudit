export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  info: '#5AC8FA',
  light: '#F2F2F7',
  dark: '#1C1C1E',
  gray: '#8E8E93',
  white: '#FFFFFF',
  black: '#000000',
  background: '#F8F9FA',
  card: '#FFFFFF',
  border: '#E5E5EA',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  title: 28,
  header: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

export const AUDIT_TYPES = [
  'Internal Quality Audit',
  'Safety Audit',
  'Compliance Audit',
  'Financial Audit',
  'IT Security Audit',
  'Environmental Audit',
];

export const PRIORITY_LEVELS = [
  { label: 'Low', value: 'Low', color: COLORS.success },
  { label: 'Medium', value: 'Medium', color: COLORS.warning },
  { label: 'High', value: 'High', color: COLORS.danger },
  { label: 'Critical', value: 'Critical', color: '#DC143C' },
];

export const CHECKLIST_ITEMS = [
  'Documentation properly maintained',
  'Staff training records up to date',
  'Safety protocols followed',
  'Equipment properly calibrated',
  'Compliance standards met',
  'Risk assessment completed',
  'Emergency procedures in place',
  'Quality standards maintained',
];

export const STORAGE_KEYS = {
  USER: '@user',
  AUDITS: '@audits',
  DRAFTS: '@drafts',
};

export const POLICY_URL = 'https://www.iso.org/iso-19011-auditing.html';
