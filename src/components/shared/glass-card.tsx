import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
  padding?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  hoverEffect = false,
  className,
  padding = 'p-6',
  ...props
}) => {
  return (
    <Card
      className={cn(
        'glass-card rounded-2xl text-slate-100',
        hoverEffect && 'glass-card-hover',
        className
      )}
      {...props}
    >
      <CardContent className={cn(padding, 'relative z-10')}>{children}</CardContent>
    </Card>
  );
};
