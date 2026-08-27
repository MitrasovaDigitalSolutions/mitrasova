import React from 'react';
import { ConsoleHeader } from '@/features/admin';

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#060911] text-slate-100">
      <ConsoleHeader />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
