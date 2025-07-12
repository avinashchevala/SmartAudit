/**
 * FormInput Component
 * 
 * React Hook Form integrated input component that wraps the base Input component.
 * Provides form validation, error handling, and seamless integration with
 * react-hook-form's Controller component.
 * 
 * Features:
 * - Type-safe form field integration
 * - Automatic validation error display
 * - Support for various input types (text, password, multiline)
 * - Customizable input behavior and appearance
 */

import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  FieldPath,
} from 'react-hook-form';
import { Input } from '../components/ui/Input';

interface FormInputProps<TFieldValues extends FieldValues> {
  /** Field name for form registration */
  name: FieldPath<TFieldValues>;
  /** React Hook Form control object */
  control: Control<TFieldValues>;
  /** Label text displayed above the input */
  label: string;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Whether to hide input text (for passwords) */
  secureTextEntry?: boolean;
  /** Auto-capitalization behavior */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Whether to enable auto-correction */
  autoCorrect?: boolean;
  /** Whether input supports multiple lines */
  multiline?: boolean;
  /** Number of lines for multiline input */
  numberOfLines?: number;
  /** Whether field is required (for UI indication) */
  required?: boolean;
  /** Whether input is editable */
  editable?: boolean;
}

/**
 * Form input component with react-hook-form integration
 * Provides controlled input with validation and error handling
 */
export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  multiline = false,
  numberOfLines = 1,
  required = false,
  editable = true,
}: FormInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Input
          label={label}
          value={value || ''}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          error={error?.message}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          multiline={multiline}
          numberOfLines={numberOfLines}
          required={required}
          editable={editable}
        />
      )}
    />
  );
}
