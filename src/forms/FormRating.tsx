import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

interface FormRatingProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  maxRating?: number;
}

export function FormRating<T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  maxRating = 5,
}: FormRatingProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>

          <View style={styles.ratingContainer}>
            {Array.from({ length: maxRating }, (_, index) => {
              const rating = index + 1;
              const isSelected = value >= rating;

              return (
                <TouchableOpacity
                  key={rating}
                  style={[styles.star, isSelected && styles.selectedStar]}
                  onPress={() => onChange(rating)}
                >
                  <Text
                    style={[
                      styles.starText,
                      isSelected && styles.selectedStarText,
                    ]}
                  >
                    {isSelected ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <Text style={styles.ratingValue}>
              {value ? `${value}/${maxRating}` : `0/${maxRating}`}
            </Text>
          </View>

          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.danger,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: SPACING.xs,
  },
  selectedStar: {
    // Additional styling for selected stars if needed
  },
  starText: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textSecondary,
  },
  selectedStarText: {
    color: COLORS.warning,
  },
  ratingValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
});
