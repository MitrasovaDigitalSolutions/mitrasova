'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PostItem } from '@/types';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  RefreshCw,
  Tag,
  FileText,
  Newspaper,
  CalendarDays,
  Rocket,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { usePostsQuery, useDeletePostMutation } from '../api/posts-api';
import { DeletePostDialog } from './delete-post-dialog';
import { cn } from '@/lib/utils';

export const AdminPostsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [postToDelete, setPostToDelete] = useState<PostItem | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [bannerNotice, setBannerNotice] = useState<string | null>(null);

  const { data: posts = [], isLoading, isFetching, refetch, error: queryError } = usePostsQuery();
  const deleteMutation = useDeletePostMutation();

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, pageSize]);

  const filterTabs = [
    { label: 'Semua', value: 'ALL', icon: SlidersHorizontal, count: posts.length },
    {
      label: 'Wawasan & Blog',
      value: 'wawasan-blog',
      icon: FileText,
      count: posts.filter((p) => p.categorySlug === 'wawasan-blog').length,
    },
    {
      label: 'Berita & Media',
      value: 'berita-media',
      icon: Newspaper,
      count: posts.filter((p) => p.categorySlug === 'berita-media').length,
    },
    {
      label: 'Events & Agenda',
      value: 'event-agenda',
      icon: CalendarDays,
      count: posts.filter((p) => p.categorySlug === 'event-agenda').length,
    },
    {
      label: 'Rilis Produk',
      value: 'rilis-produk',
      icon: Rocket,
      count: posts.filter((p) => p.categorySlug === 'rilis-produk').length,
    },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCat = selectedCategory === 'ALL' || post.categorySlug === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.summary?.toLowerCase().includes(q) ||
        post.categoryName.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q) ||
        post.tags?.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, searchTerm]);

  // Pagination calculations
  const totalItems = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, startIndex, endIndex]);

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    setDeleteError(null);

    try {
      await deleteMutation.mutateAsync(postToDelete.id);
      setBannerNotice(`Postingan "${postToDelete.title}" berhasil dihapus.`);
      setPostToDelete(null);
      setTimeout(() => setBannerNotice(null), 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menghapus postingan';
      setDeleteError(msg);
    }
  };

  const getCategoryBadge = (categorySlug: string) => {
    switch (categorySlug) {
      case 'wawasan-blog':
        return {
          style: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
        };
      case 'berita-media':
        return {
          style: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30',
        };
      case 'event-agenda':
        return {
          style: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
        };
      case 'rilis-produk':
        return {
          style: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
        };
      default:
        return {
          style: 'text-slate-300 bg-slate-800 border-slate-700',
        };
    }
  };

  // Generate page numbers array (with ellipsis if large number of pages)
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) pages.push('...');
      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (safeCurrentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safeCurrentPage]);

  return (
    <div className="space-y-4">
      {/* Toast Banner Notice */}
      <AnimatePresence>
        {bannerNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between gap-2 shadow-lg shadow-emerald-950/30"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{bannerNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setBannerNotice(null)}
              className="text-emerald-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern High-Density Toolbar */}
      <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3 sm:p-4 backdrop-blur-md space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedCategory(tab.value)}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer select-none shrink-0',
                    isSelected
                      ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/40 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isSelected ? 'text-cyan-400' : 'text-slate-500')} />
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'px-1.5 py-0.2 rounded-md text-[10px] font-mono',
                      isSelected ? 'bg-indigo-500/20 text-cyan-200' : 'bg-slate-800 text-slate-400'
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter judul, tag, penulis..."
                className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500/50 transition-colors font-sans"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              title="Refresh Data"
              disabled={isFetching}
              className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={cn('w-3.5 h-3.5', isFetching && 'animate-spin text-cyan-400')} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-2 py-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-slate-900/50 border border-slate-850 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Query Error State */}
      {queryError && (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-2">
          <p className="text-sm font-semibold text-rose-300">Gagal memuat data postingan</p>
          <p className="text-xs text-slate-400 font-mono">
            {queryError instanceof Error ? queryError.message : 'Terjadi kendala koneksi'}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !queryError && filteredPosts.length === 0 && (
        <div className="py-16 px-4 text-center rounded-2xl bg-slate-900/30 border border-slate-800/60 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Filter className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Tidak ada data publikasi</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Tidak ada konten yang sesuai dengan filter atau kata kunci &quot;{searchTerm}&quot;.
            </p>
          </div>
          {(searchTerm || selectedCategory !== 'ALL') ? (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('ALL');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          ) : (
            <Link
              href="/console/posts/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-mono font-semibold text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Postingan Pertama</span>
            </Link>
          )}
        </div>
      )}

      {/* Main Studio Data Table */}
      {!isLoading && !queryError && filteredPosts.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90 shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                  <th className="py-3.5 px-5 font-semibold">Judul Konten & Info</th>
                  <th className="py-3.5 px-4 font-semibold">Kategori</th>
                  <th className="py-3.5 px-4 font-semibold">Penulis & Estimasi</th>
                  <th className="py-3.5 px-4 font-semibold">Status & Tanggal</th>
                  <th className="py-3.5 px-5 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-200 font-sans">
                {paginatedPosts.map((post, idx) => {
                  const badge = getCategoryBadge(post.categorySlug);
                  return (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.02 }}
                      className="hover:bg-slate-900/70 transition-colors group"
                    >
                      {/* Title & Summary */}
                      <td className="py-4 px-5 max-w-sm sm:max-w-md">
                        <div className="space-y-1">
                          <Link
                            href={`/console/posts/${encodeURIComponent(post.id)}/edit`}
                            className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-1 block cursor-pointer"
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-slate-400 line-clamp-1 font-normal">
                            {post.summary || 'Tidak ada ringkasan artikel'}
                          </p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex items-center gap-1 pt-1 overflow-hidden">
                              <Tag className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-[10px] font-mono text-slate-500">
                                  +{post.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={cn(
                            'px-2.5 py-1 rounded-md font-mono text-[11px] font-bold border inline-block',
                            badge.style
                          )}
                        >
                          {post.categoryName}
                        </span>
                      </td>

                      {/* Author & Read Time */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-slate-200 block text-xs">
                            {post.authorName}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </td>

                      {/* Status & Date */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20 inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Published
                          </span>
                          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>{post.updatedAt || post.createdAt}</span>
                          </div>
                        </div>
                      </td>

                      {/* Action Group */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Live Preview */}
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                            title="Preview Halaman Publik"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>

                          {/* Edit Button */}
                          <Link
                            href={`/console/posts/${encodeURIComponent(post.id)}/edit`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 hover:text-white font-mono text-xs font-semibold transition-all"
                            title="Edit Konten Postingan"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Edit</span>
                          </Link>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteError(null);
                              setPostToDelete(post);
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:text-white transition-all cursor-pointer"
                            title="Hapus Postingan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Interactive Pagination & Footer Controls */}
          <div className="px-5 py-3.5 bg-slate-900/60 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            {/* Left: Total Entries Info & Page Size Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <span>
                Menampilkan <strong className="text-white font-bold">{totalItems > 0 ? startIndex + 1 : 0}</strong>–<strong className="text-white font-bold">{endIndex}</strong> dari <strong className="text-cyan-300 font-bold">{totalItems}</strong> entri
              </span>

              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-slate-500 hidden md:inline">Baris:</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 text-[11px] font-mono outline-none focus:border-cyan-500/50 cursor-pointer"
                >
                  <option value={5}>5 / hal</option>
                  <option value={10}>10 / hal</option>
                  <option value={20}>20 / hal</option>
                </select>
              </div>
            </div>

            {/* Right: Modern Pagination Navigation */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                {/* First Page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  disabled={safeCurrentPage === 1}
                  title="Halaman Pertama"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronsLeft className="w-3.5 h-3.5" />
                </button>

                {/* Prev Page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safeCurrentPage === 1}
                  title="Halaman Sebelumnya"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1 px-1">
                  {pageNumbers.map((page, i) => {
                    if (typeof page === 'string') {
                      return (
                        <span key={`ellipsis-${i}`} className="px-1.5 text-slate-600 font-mono text-xs">
                          ...
                        </span>
                      );
                    }
                    const isActive = page === safeCurrentPage;
                    return (
                      <button
                        key={`page-${page}`}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          'w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center',
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        )}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safeCurrentPage === totalPages}
                  title="Halaman Selanjutnya"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Last Page */}
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={safeCurrentPage === totalPages}
                  title="Halaman Terakhir"
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ChevronsRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeletePostDialog
        post={postToDelete}
        isOpen={Boolean(postToDelete)}
        isDeleting={deleteMutation.isPending}
        error={deleteError}
        onClose={() => {
          if (!deleteMutation.isPending) {
            setPostToDelete(null);
            setDeleteError(null);
          }
        }}
        onConfirmDelete={handleDeleteConfirm}
      />
    </div>
  );
};
