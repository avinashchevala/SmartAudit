import React from 'react';
import { Control, Controller, FieldValues, FieldPath } from 'react-hook-form';
import { CustomPicker } from '../components/ui/CustomPicker';

interface FormPickerProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  items: string[];
  placeholder?: string;
  required?: boolean;
}

export function FormPicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  items,
  placeholder,
  required = false,
}: FormPickerProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CustomPicker
          label={label}
          selectedValue={value || ''}
          onValueChange={onChange}
          items={items}
          placeholder={placeholder}
          error={error?.message}
          required={required}
        />
      )}
    />
  );
}
