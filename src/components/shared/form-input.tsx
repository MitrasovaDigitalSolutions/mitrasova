import React from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FormInputProps extends InputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <Label htmlFor={inputId} className="block text-xs font-semibold text-slate-300">
            {label}
          </Label>
        )}
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            'bg-slate-900/90 border-slate-800 text-slate-100 placeholder:text-slate-500 focus-visible:ring-indigo-500 focus-visible:border-cyan-400 rounded-xl h-11 px-4 text-xs font-sans transition-all',
            error && 'border-rose-500/80 focus-visible:ring-rose-500',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
FormInput.displayName = 'FormInput';
