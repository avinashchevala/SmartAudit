import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../constants';

interface LogoutButtonProps {
  onPress: () => void;
  style?: any;
  textStyle?: any;
  title?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onPress,
  style,
  textStyle,
  title = 'Logout',
}) => {
  return (
    <TouchableOpacity style={[styles.logoutButton, style]} onPress={onPress}>
      <Text style={[styles.logoutButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
