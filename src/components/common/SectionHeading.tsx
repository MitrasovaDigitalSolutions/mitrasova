import React from 'react';
import { clsx } from 'clsx';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  gradientText?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  gradientText,
  description,
  align = 'center',
  className,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={clsx('flex flex-col max-w-3xl mb-12', alignmentClasses[align], className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}{' '}
        {gradientText && (
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
            {gradientText}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
