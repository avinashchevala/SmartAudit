import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  required = false,
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onChange(!value)}
          >
            <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
              {value && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>
              {label}
              {required && <Text style={styles.required}> *</Text>}
            </Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginRight: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  checkedCheckbox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  label: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    flex: 1,
  },
  required: {
    color: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
    marginLeft: 36, // Align with label
  },
});
