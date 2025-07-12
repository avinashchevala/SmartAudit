/**
 * Input Component
 * 
 * Reusable text input component with consistent styling and validation support.
 * Extends React Native's TextInput with additional features like labels,
 * error states, and required field indicators.
 * 
 * Features:
 * - Optional label with required field indicator
 * - Error state display with styling
 * - Consistent design system integration
 * - Customizable styling options
 * - Full TextInput props support
 */

import React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';

interface InputProps extends TextInputProps {
  /** Optional label text displayed above the input */
  label?: string;
  /** Error message to display below the input */
  error?: string;
  /** Custom style for the container view */
  containerStyle?: ViewStyle;
  /** Whether to show required field indicator (*) */
  required?: boolean;
}

/**
 * Reusable input component with label and error handling
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  required = false,
  style,
  ...props // Spread remaining TextInput props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Optional label with required indicator */}
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      {/* Main text input with error styling */}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={COLORS.textSecondary}
        {...props}
      />
      
      {/* Error message display */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  // Container for the entire input component
  container: {
    marginBottom: SPACING.md,
  },
  
  // Label text styling
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  
  // Required field indicator styling
  required: {
    color: COLORS.danger,
  },
  
  // Main input field styling
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    minHeight: 44, // Ensure touch target size
  },
  
  // Error state input styling
  inputError: {
    borderColor: COLORS.danger,
  },
  
  // Error message text styling
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.danger,
    marginTop: SPACING.xs,
  },
});
