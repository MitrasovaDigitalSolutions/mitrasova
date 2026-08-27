import React from 'react';
import { Textarea, TextareaProps } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FormTextareaProps extends TextareaProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <Label htmlFor={textareaId} className="block text-xs font-semibold text-slate-300">
            {label}
          </Label>
        )}
        <Textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'bg-slate-900/90 border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-xl p-4 text-xs focus-visible:ring-indigo-500 focus-visible:border-cyan-400 transition-all leading-relaxed',
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
FormTextarea.displayName = 'FormTextarea';
