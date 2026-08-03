import React from 'react';
import Link from 'next/link';
import { DocsArticleProps } from '../types';
import { ServiceDocsLeftSidebar } from './ServiceDocsLeftSidebar';
import { ArticleContent } from './ArticleContent';
import { TableOfContents } from '@/components/common/TableOfContents';
import { BookOpen, ChevronRight } from 'lucide-react';

export const DocsArticleContainer: React.FC<DocsArticleProps> = ({
  post,
  currentService,
  allServices,
  allCategories,
  allPosts,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 overflow-x-auto pb-2">
        <Link href="/docs" className="hover:text-indigo-400 flex items-center gap-1 shrink-0">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Docs Hub</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-600" />
        <Link href="/docs" className="text-cyan-400 font-semibold shrink-0">
          {currentService.title}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-600" />
        <span className="text-slate-200 font-medium truncate">{post.title}</span>
      </div>

      {/* 3-COLUMN SERVICE SCOPED DOCS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <ServiceDocsLeftSidebar
          currentService={currentService}
          post={post}
          allServices={allServices}
          allCategories={allCategories}
          allPosts={allPosts}
        />

        <main className="lg:col-span-6 space-y-6">
          <ArticleContent post={post} />
        </main>

        <aside className="lg:col-span-3">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
};
