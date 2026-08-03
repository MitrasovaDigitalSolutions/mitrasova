import React from 'react';
import { PostItem } from '@/types';
import { User, Calendar } from 'lucide-react';

interface ArticleHeaderProps {
  post: PostItem;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ post }) => {
  return (
    <div className="space-y-3 pb-6 border-b border-slate-800">
      <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
        <span className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 font-semibold">
          {post.categoryName}
        </span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
        <span className="flex items-center gap-1">
          <User className="w-3.5 h-3.5 text-slate-500" />
          {post.authorName}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          Diperbarui: {post.updatedAt}
        </span>
      </div>
    </div>
  );
};
