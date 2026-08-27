import React from 'react';
import { cn } from '@/lib/utils';

export interface MitrasovaLogoProps {
  className?: string;
  size?: number;
  variant?: 'gradient' | 'white' | 'monochrome' | 'outline';
}

export const MitrasovaLogo: React.FC<MitrasovaLogoProps> = ({
  className,
  size = 36,
  variant = 'gradient',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 select-none transition-transform', className)}
    >
      {/* Background Rounded Container */}
      {variant === 'gradient' && (
        <>
          <rect width="120" height="120" rx="28" fill="#0A0F1D" stroke="#1E293B" strokeWidth="2" />
          <rect x="4" y="4" width="112" height="112" rx="24" fill="url(#ms-bg-grad)" fillOpacity="0.25" />
          <rect x="4" y="4" width="112" height="112" rx="24" stroke="url(#ms-border-grad)" strokeWidth="1.5" strokeOpacity="0.6" />
        </>
      )}

      {variant === 'monochrome' && (
        <rect width="120" height="120" rx="28" fill="#0F172A" stroke="#334155" strokeWidth="2" />
      )}

      {variant === 'outline' && (
        <rect width="120" height="120" rx="28" fill="transparent" stroke="currentColor" strokeWidth="4" />
      )}

      {variant === 'white' && (
        <rect width="120" height="120" rx="28" fill="#FFFFFF" />
      )}

      {/* Modern Geometrical Monogram 'M' with Center Stem */}
      <path
        d="M28 86V34H42L60 58L78 34H92V86H78V52L60 76L42 52V86H28Z"
        fill={
          variant === 'white'
            ? '#090D16'
            : variant === 'gradient'
            ? 'url(#ms-m-grad)'
            : 'currentColor'
        }
      />
      <path
        d="M54 70H66V86H54V70Z"
        fill={
          variant === 'white'
            ? '#090D16'
            : variant === 'gradient'
            ? 'url(#ms-m-grad)'
            : 'currentColor'
        }
      />

      {/* Gradients Definitions */}
      <defs>
        <linearGradient id="ms-bg-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="0.5" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="ms-border-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="ms-m-grad" x1="28" y1="34" x2="92" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#E2E8F0" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
    </svg>
  );
};
