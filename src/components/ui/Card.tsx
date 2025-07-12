/**
 * Card Component
 * 
 * Reusable card container component with consistent styling and elevation.
 * Can be used as a static container or touchable element.
 * 
 * Features:
 * - Optional title and subtitle header
 * - Touch interaction support
 * - Consistent shadow and elevation
 * - Customizable styling
 * - Accessible design with proper feedback
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';

interface CardProps {
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Custom style object for the card container */
  style?: ViewStyle;
  /** Optional onPress handler to make card touchable */
  onPress?: () => void;
  /** Optional title text for card header */
  title?: string;
  /** Optional subtitle text for card header */
  subtitle?: string;
}

/**
 * Reusable card container component with optional interactivity
 */
export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  title,
  subtitle,
}) => {
  // Use TouchableOpacity if onPress is provided, otherwise use View
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1} // Touch feedback only when interactive
    >
      {/* Optional header section with title and subtitle */}
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  // Main card container with elevation and shadow
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    // Shadow for iOS
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  
  // Header section styling
  header: {
    marginBottom: SPACING.sm,
  },
  
  // Title text styling
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs / 2,
  },
  
  // Subtitle text styling
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
