/**
 * Button Component
 * 
 * Reusable button component with multiple variants, sizes, and states.
 * Provides consistent styling and behavior across the application.
 * 
 * Features:
 * - Multiple variants: primary, secondary, danger, outline
 * - Three sizes: small, medium, large
 * - Loading state with spinner
 * - Disabled state with visual feedback
 * - Customizable styles and text styles
 * - Accessible touch feedback
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';

interface ButtonProps {
  /** Text to display on the button */
  title: string;
  /** Function to call when button is pressed */
  onPress: () => void;
  /** Custom style object for the button container */
  style?: ViewStyle;
  /** Custom style object for the button text */
  textStyle?: TextStyle;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether to show loading spinner */
  loading?: boolean;
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  /** Size variant of the button */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Reusable Button component with customizable appearance and behavior
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
}) => {
  // Combine styles based on props
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8} // Provide visual feedback on press
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base button styles
  button: {
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  // Button variant styles
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
  
  // Button size styles
  small: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    minHeight: 56,
  },
  
  // Disabled state
  disabled: {
    opacity: 0.5,
  },
  
  // Base text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Text colors for variants
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  dangerText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  
  // Text sizes
  smallText: {
    fontSize: FONT_SIZES.sm,
  },
  mediumText: {
    fontSize: FONT_SIZES.md,
  },
  largeText: {
    fontSize: FONT_SIZES.lg,
  },
  
  // Disabled text state
  disabledText: {
    opacity: 0.7,
  },
});
