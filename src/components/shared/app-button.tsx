import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AppButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<NonNullable<AppButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30 hover:shadow-indigo-500/40 active:scale-[0.98]',
  secondary:
    'bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-600 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30 hover:shadow-cyan-500/40 active:scale-[0.98]',
  outline:
    'border border-slate-700/90 bg-slate-900/70 hover:bg-slate-800 text-slate-200 hover:border-slate-500 backdrop-blur-md active:scale-[0.98]',
  ghost:
    'text-slate-300 hover:text-white hover:bg-slate-800/60 active:scale-[0.98]',
  danger:
    'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-lg shadow-rose-500/20 border border-rose-400/30 active:scale-[0.98]',
};

const sizeStyles: Record<NonNullable<AppButtonProps['size']>, string> = {
  sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8 rounded-lg font-medium',
  md: 'text-xs sm:text-sm px-5 py-2.5 gap-2 h-10 rounded-xl font-medium',
  lg: 'text-sm sm:text-base px-7 py-3.5 gap-2.5 h-12 rounded-xl font-semibold',
};

export const AppButton: React.FC<AppButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'cursor-pointer transition-all duration-200 select-none inline-flex items-center justify-center font-medium min-h-[36px]',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </Button>
  );
};
