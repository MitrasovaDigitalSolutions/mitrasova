import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  helperText?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onValueChange?: (value: string) => void;
  name?: string;
  className?: string;
  disabled?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  options,
  helperText,
  placeholder = 'Pilih opsi...',
  value,
  defaultValue,
  onChange,
  onValueChange,
  name,
  className,
  disabled,
}) => {
  const handleValueChange = (val: string) => {
    if (onValueChange) {
      onValueChange(val);
    }
    if (onChange) {
      onChange({ target: { value: val, name } });
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label className="block text-xs font-mono font-semibold text-slate-300">
          {label}
        </Label>
      )}
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger className={cn(error && 'border-rose-500 focus:ring-rose-500', className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p className="text-xs text-rose-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
