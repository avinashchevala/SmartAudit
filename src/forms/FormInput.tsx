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
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  required?: boolean;
  editable?: boolean;
}

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
