import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

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
  const customVariantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 hover:shadow-indigo-500/40',
    secondary:
      'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30 hover:shadow-cyan-500/40',
    outline:
      'border border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:border-slate-500 backdrop-blur-md',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/50',
  };

  const customSizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8 rounded-lg',
    md: 'text-sm px-5 py-2.5 gap-2 h-10 rounded-xl font-medium',
    lg: 'text-base px-7 py-3.5 gap-2.5 h-12 rounded-xl font-semibold',
  };

  return (
    <Button
      className={cn(
        'cursor-pointer transition-all duration-300 font-medium',
        customVariantStyles[variant],
        customSizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </Button>
  );
};
