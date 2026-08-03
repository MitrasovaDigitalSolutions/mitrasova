import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
  padding?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  hoverEffect = true,
  className,
  padding = 'p-6',
  ...props
}) => {
  return (
    <Card
      className={cn(
        'glass-card rounded-2xl backdrop-blur-md relative overflow-hidden border-slate-800/80 bg-slate-900/60 text-slate-100',
        hoverEffect && 'glass-card-hover',
        className
      )}
      {...props}
    >
      {/* Decorative radial ambient light */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      <CardContent className={cn(padding, 'relative z-10')}>{children}</CardContent>
    </Card>
  );
};
