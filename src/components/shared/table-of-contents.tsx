'use client';

import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const articleElement = document.querySelector('article');
    if (!articleElement) return;

    const headingNodes = Array.from(
      articleElement.querySelectorAll('h2, h3')
    ) as HTMLElement[];

    const items: TocItem[] = headingNodes.map((node, index) => {
      if (!node.id) {
        node.id = `heading-${index}-${node.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
      }
      return {
        id: node.id,
        text: node.textContent || '',
        level: node.tagName === 'H2' ? 2 : 3,
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headingNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-5 sticky top-28 border border-slate-800/90 bg-slate-950/70">
      <div className="flex items-center gap-2 font-semibold text-xs text-slate-200 mb-4 pb-3 border-b border-slate-800 uppercase tracking-wider font-mono">
        <List className="w-4 h-4 text-cyan-400" />
        <span>Daftar Isi</span>
      </div>
      <nav className="space-y-1.5 text-xs">
        {headings.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              setActiveId(item.id);
            }}
            className={cn(
              'block transition-all duration-200 py-1 font-medium flex items-center gap-1.5 rounded-lg px-2',
              item.level === 3 ? 'pl-4 text-slate-400 text-[11px]' : 'text-slate-300',
              activeId === item.id
                ? 'text-cyan-300 font-semibold bg-indigo-500/15 border-l-2 border-cyan-400'
                : 'hover:text-white hover:bg-slate-900/60'
            )}
          >
            {item.level === 2 && <ChevronRight className="w-3 h-3 shrink-0 text-slate-500" />}
            <span className="truncate">{item.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};
