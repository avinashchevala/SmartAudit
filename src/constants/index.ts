/**
 * Application Constants
 * 
 * This file contains all constant values used throughout the SmartAudit application
 * including colors, spacing, typography, and predefined data sets.
 */

/**
 * Color palette for consistent theming across the application
 * Based on iOS Human Interface Guidelines color system
 */
export const COLORS = {
  // Primary brand colors
  primary: '#007AFF',        // Main brand blue
  secondary: '#5856D6',      // Secondary purple accent
  
  // Status colors for feedback
  success: '#34C759',        // Green for success states
  danger: '#FF3B30',         // Red for errors and destructive actions
  warning: '#FF9500',        // Orange for warnings
  info: '#5AC8FA',          // Light blue for informational content
  
  // Neutral colors
  light: '#F2F2F7',         // Light gray background
  dark: '#1C1C1E',          // Dark text/background
  gray: '#8E8E93',          // Medium gray for secondary elements
  white: '#FFFFFF',         // Pure white
  black: '#000000',         // Pure black
  
  // Semantic UI colors
  background: '#F8F9FA',    // App background color
  card: '#FFFFFF',          // Card/container background
  border: '#E5E5EA',        // Border color for separators
  text: '#1C1C1E',          // Primary text color
  textSecondary: '#8E8E93', // Secondary text color
};

/**
 * Consistent spacing scale for margins, padding, and gaps
 * Based on 4px grid system for visual harmony
 */
export const SPACING = {
  xs: 4,    // Extra small spacing
  sm: 8,    // Small spacing
  md: 16,   // Medium spacing (base unit)
  lg: 24,   // Large spacing
  xl: 32,   // Extra large spacing
  xxl: 48,  // Extra extra large spacing
};

/**
 * Typography scale for consistent text sizing
 * Optimized for mobile readability
 */
export const FONT_SIZES = {
  xs: 12,     // Caption text
  sm: 14,     // Small body text
  md: 16,     // Regular body text
  lg: 18,     // Large body text
  xl: 20,     // Subheading
  xxl: 24,    // Heading
  title: 28,  // Page titles
  header: 32, // Large headers
};

/**
 * Border radius values for consistent rounded corners
 */
export const BORDER_RADIUS = {
  sm: 4,      // Small radius for buttons/inputs
  md: 8,      // Medium radius for cards
  lg: 12,     // Large radius for modals
  xl: 16,     // Extra large radius
  round: 50,  // Fully rounded (circles)
};

/**
 * Predefined audit types available in the system
 * Can be extended based on organizational needs
 */
export const AUDIT_TYPES = [
  'Internal Quality Audit',
  'Safety Audit',
  'Compliance Audit',
  'Financial Audit',
  'IT Security Audit',
  'Environmental Audit',
];

/**
 * Priority levels for audit findings with associated colors
 * Used for visual categorization and filtering
 */
export const PRIORITY_LEVELS = [
  { label: 'Low', value: 'Low', color: COLORS.success },
  { label: 'Medium', value: 'Medium', color: COLORS.warning },
  { label: 'High', value: 'High', color: COLORS.danger },
  { label: 'Critical', value: 'Critical', color: '#DC143C' }, // Deep red for critical issues
];

/**
 * Standard checklist items for audit evaluations
 * Provides consistent evaluation criteria across audits
 */
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

/**
 * Storage keys for AsyncStorage persistence
 * Prevents key naming conflicts and ensures consistency
 */
export const STORAGE_KEYS = {
  USER: '@user',      // Current user session data
  AUDITS: '@audits',  // Completed audit records
  DRAFTS: '@drafts',  // Draft audit data
};

/**
 * External URL for audit policy reference
 * Links to ISO 19011 auditing guidelines
 */
export const POLICY_URL = 'https://www.iso.org/iso-19011-auditing.html';
