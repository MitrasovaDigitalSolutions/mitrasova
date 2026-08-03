import React from 'react';
import { SelectPrimitive, SelectPrimitiveProps } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps extends SelectPrimitiveProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  helperText?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, helperText, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <Label htmlFor={selectId} className="block text-xs font-semibold text-slate-300">
            {label}
          </Label>
        )}
        <SelectPrimitive
          id={selectId}
          ref={ref}
          className={cn(
            'bg-slate-900 border-slate-800 text-slate-100 rounded-xl h-11 px-4 text-xs focus:ring-indigo-500 transition-colors',
            error && 'border-rose-500 focus:ring-rose-500',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
        </SelectPrimitive>
        {error ? (
          <p className="text-xs text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
FormSelect.displayName = 'FormSelect';
