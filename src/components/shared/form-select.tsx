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

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormSelectProps {
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
        <Label className="block text-xs font-semibold text-slate-300">
          {label}
        </Label>
      )}
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'bg-slate-900/90 border-slate-800 text-slate-100 focus:ring-cyan-400 focus:border-cyan-400 rounded-xl h-11 px-4 text-xs font-sans transition-all cursor-pointer',
            error && 'border-rose-500/80 focus:ring-rose-500',
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-slate-950/95 border-slate-800 text-slate-100 backdrop-blur-2xl rounded-xl">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="text-xs hover:bg-indigo-600/30 hover:text-cyan-300 focus:bg-indigo-600/30 focus:text-cyan-300 cursor-pointer"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p className="text-[11px] text-rose-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
