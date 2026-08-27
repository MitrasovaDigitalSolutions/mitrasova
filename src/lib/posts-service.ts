import { INITIAL_POSTS, INITIAL_CATEGORIES } from '@/lib/data';
import { PostItem } from '@/types';
import { PostFormValues } from '@/features/admin/schemas/post-schema';
import { prisma } from '@/lib/prisma';

// Global cache store initialized from data.ts across server execution
const globalForPosts = globalThis as unknown as {
  mitrasovaPosts: PostItem[] | undefined;
};

if (!globalForPosts.mitrasovaPosts) {
  globalForPosts.mitrasovaPosts = [...INITIAL_POSTS];
}

const memoryPosts = globalForPosts.mitrasovaPosts;

const getCategoryName = (slug: string): string => {
  const cat = INITIAL_CATEGORIES.find((c) => c.slug === slug);
  if (cat) return cat.name;
  if (slug === 'wawasan-blog') return 'Wawasan & Blog';
  if (slug === 'berita-media') return 'Berita & Media';
  if (slug === 'event-agenda') return 'Events & Agenda';
  if (slug === 'rilis-produk') return 'Rilis Produk';
  return 'Wawasan & Blog';
};

const calculateReadTime = (html: string): string => {
  const plainText = html.replace(/<[^>]+>/g, ' ');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return `${minutes} min baca`;
};

const parseTags = (tagsInput?: string): string[] => {
  if (!tagsInput) return [];
  return tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
};

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedPostsResult {
  items: PostItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const postsService = {
  async getAllPosts(filters?: {
    search?: string;
    categorySlug?: string;
  }): Promise<PostItem[]> {
    try {
      // Try fetching from database first if available
      const dbPosts = await prisma.post.findMany({
        include: {
          category: true,
          author: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (dbPosts && dbPosts.length > 0) {
        let results: PostItem[] = dbPosts.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          summary: p.summary || '',
          contentHtml: p.contentHtml,
          categorySlug: p.category.slug,
          categoryName: p.category.name,
          authorName: p.author.name || 'Mitrasova Editorial',
          readTime: p.readTime || '5 min baca',
          tags: p.tags,
          featured: p.featured,
          eventDate: p.eventDate ? p.eventDate.toISOString() : undefined,
          eventLocation: p.eventLocation || undefined,
          createdAt: p.createdAt.toISOString().split('T')[0],
          updatedAt: p.updatedAt.toISOString().split('T')[0],
        }));

        if (filters?.search) {
          const q = filters.search.toLowerCase();
          results = results.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.summary.toLowerCase().includes(q) ||
              p.tags?.some((t) => t.toLowerCase().includes(q))
          );
        }

        if (filters?.categorySlug && filters.categorySlug !== 'ALL' && filters.categorySlug !== 'all') {
          results = results.filter((p) => p.categorySlug === filters.categorySlug);
        }

        return results;
      }
    } catch {
      // Fallback to memory store if DB query fails or table is empty
    }

    // Memory store fallback
    let results = [...memoryPosts];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters?.categorySlug && filters.categorySlug !== 'ALL' && filters.categorySlug !== 'all') {
      results = results.filter((p) => p.categorySlug === filters.categorySlug);
    }

    return results;
  },

  async getPaginatedPosts(filters?: {
    search?: string;
    categorySlug?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedPostsResult> {
    const page = Math.max(1, filters?.page || 1);
    const pageSize = Math.max(1, Math.min(100, filters?.pageSize || 10));

    const allFiltered = await this.getAllPosts({
      search: filters?.search,
      categorySlug: filters?.categorySlug,
    });

    const total = allFiltered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const items = allFiltered.slice(startIndex, startIndex + pageSize);

    return {
      items,
      total,
      page: safePage,
      pageSize,
      totalPages,
    };
  },

  async getPostByIdOrSlug(idOrSlug: string): Promise<PostItem | null> {
    try {
      const dbPost = await prisma.post.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
        include: {
          category: true,
          author: true,
        },
      });

      if (dbPost) {
        return {
          id: dbPost.id,
          title: dbPost.title,
          slug: dbPost.slug,
          summary: dbPost.summary || '',
          contentHtml: dbPost.contentHtml,
          categorySlug: dbPost.category.slug,
          categoryName: dbPost.category.name,
          authorName: dbPost.author.name || 'Mitrasova Editorial',
          readTime: dbPost.readTime || '5 min baca',
          tags: dbPost.tags,
          featured: dbPost.featured,
          eventDate: dbPost.eventDate ? dbPost.eventDate.toISOString() : undefined,
          eventLocation: dbPost.eventLocation || undefined,
          createdAt: dbPost.createdAt.toISOString().split('T')[0],
          updatedAt: dbPost.updatedAt.toISOString().split('T')[0],
        };
      }
    } catch {
      // ignore & fallback to memory
    }

    const found = memoryPosts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
    return found ? { ...found } : null;
  },

  async createPost(data: PostFormValues): Promise<PostItem> {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const newId = `post-${Date.now()}`;
    const categoryName = getCategoryName(data.categorySlug);
    const readTime = calculateReadTime(data.contentHtml);
    const tags = parseTags(data.tags);

    const newPostItem: PostItem = {
      id: newId,
      title: data.title,
      slug: data.slug,
      summary: data.summary || '',
      contentHtml: data.contentHtml,
      categorySlug: data.categorySlug,
      categoryName,
      authorName: 'Raihan Marwanda',
      authorRole: 'Solution Architect',
      readTime,
      tags,
      featured: false,
      eventDate: data.eventDate || undefined,
      eventLocation: data.eventLocation || undefined,
      createdAt: dateStr,
      updatedAt: dateStr,
    };

    // Try DB insertion if DB is available
    try {
      const category = await prisma.category.findUnique({
        where: { slug: data.categorySlug },
      });
      const author = await prisma.user.findFirst();

      if (category && author) {
        const created = await prisma.post.create({
          data: {
            title: data.title,
            slug: data.slug,
            summary: data.summary || '',
            contentHtml: data.contentHtml,
            status: 'PUBLISHED',
            categoryId: category.id,
            authorId: author.id,
            readTime,
            tags,
            eventDate: data.eventDate ? new Date(data.eventDate) : null,
            eventLocation: data.eventLocation || null,
          },
        });
        newPostItem.id = created.id;
      }
    } catch {
      // ignore DB failure and keep in-memory post
    }

    // Unshift to in-memory store
    memoryPosts.unshift(newPostItem);
    return newPostItem;
  },

  async updatePost(idOrSlug: string, data: PostFormValues): Promise<PostItem | null> {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const categoryName = getCategoryName(data.categorySlug);
    const readTime = calculateReadTime(data.contentHtml);
    const tags = parseTags(data.tags);

    // Try DB update
    try {
      const existing = await prisma.post.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });

      if (existing) {
        let categoryId = existing.categoryId;
        const category = await prisma.category.findUnique({
          where: { slug: data.categorySlug },
        });
        if (category) {
          categoryId = category.id;
        }

        await prisma.post.update({
          where: { id: existing.id },
          data: {
            title: data.title,
            slug: data.slug,
            summary: data.summary || '',
            contentHtml: data.contentHtml,
            categoryId,
            readTime,
            tags,
            eventDate: data.eventDate ? new Date(data.eventDate) : null,
            eventLocation: data.eventLocation || null,
          },
        });
      }
    } catch {
      // ignore DB failure and update memory
    }

    // Update in memory store
    const index = memoryPosts.findIndex((p) => p.id === idOrSlug || p.slug === idOrSlug);
    if (index !== -1) {
      const existing = memoryPosts[index];
      const updated: PostItem = {
        ...existing,
        title: data.title,
        slug: data.slug,
        summary: data.summary || '',
        contentHtml: data.contentHtml,
        categorySlug: data.categorySlug,
        categoryName,
        readTime,
        tags,
        eventDate: data.eventDate || undefined,
        eventLocation: data.eventLocation || undefined,
        updatedAt: dateStr,
      };
      memoryPosts[index] = updated;
      return updated;
    }

    return null;
  },

  async deletePost(idOrSlug: string): Promise<boolean> {
    // Try DB deletion
    try {
      const existing = await prisma.post.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
      });
      if (existing) {
        await prisma.post.delete({
          where: { id: existing.id },
        });
      }
    } catch {
      // ignore DB error
    }

    // Delete from memory store
    const index = memoryPosts.findIndex((p) => p.id === idOrSlug || p.slug === idOrSlug);
    if (index !== -1) {
      memoryPosts.splice(index, 1);
      return true;
    }

    return true;
  },
};
