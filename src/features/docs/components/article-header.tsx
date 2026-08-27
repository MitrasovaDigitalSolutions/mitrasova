import React from 'react';
import { PostItem } from '@/types';
import { Clock, User, Calendar } from 'lucide-react';

export const ArticleHeader: React.FC<{ post: PostItem }> = ({ post }) => {
  return (
    <div className="space-y-4 border-b border-slate-800 pb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-cyan-300 text-xs font-mono font-semibold border border-indigo-500/30">
          {post.categoryName}
        </span>
        <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono">
          {post.serviceSlug}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
        {post.title}
      </h1>

      {post.summary && (
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          {post.summary}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-2">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-400" />
          <span>{post.authorName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{post.updatedAt}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </div>
  );
};
