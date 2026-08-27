import React from 'react';
import { PostItem } from '@/types';
import { ArticleHeader } from './article-header';

export const ArticleContent: React.FC<{ post: PostItem }> = ({ post }) => {
  return (
    <article className="glass-card rounded-2xl p-6 sm:p-10 border-slate-800 bg-slate-950/70">
      <ArticleHeader post={post} />

      <div
        className="prose prose-invert max-w-none pt-6 text-slate-300 text-xs sm:text-sm leading-relaxed
          prose-headings:text-white prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-2
          prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-indigo-300
          prose-code:text-cyan-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-slate-800
          prose-strong:text-white prose-a:text-cyan-400 hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
};
