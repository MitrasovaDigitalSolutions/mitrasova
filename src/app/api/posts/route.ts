import { NextRequest, NextResponse } from 'next/server';
import { postsService } from '@/lib/posts-service';
import { postSchema } from '@/features/admin/schemas/post-schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const categorySlug = searchParams.get('categorySlug') || undefined;
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize') || searchParams.get('limit');

    if (pageParam || pageSizeParam) {
      const page = pageParam ? parseInt(pageParam, 10) : 1;
      const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : 10;

      const paginated = await postsService.getPaginatedPosts({
        search,
        categorySlug,
        page,
        pageSize,
      });

      return NextResponse.json({
        success: true,
        data: paginated.items,
        pagination: {
          total: paginated.total,
          page: paginated.page,
          pageSize: paginated.pageSize,
          totalPages: paginated.totalPages,
        },
      });
    }

    const posts = await postsService.getAllPosts({
      search,
      categorySlug,
    });

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length,
    });
  } catch (error) {
    console.error('[API /api/posts GET Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data postingan' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validasi form gagal',
          issues: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const created = await postsService.createPost(parsed.data);

    return NextResponse.json(
      {
        success: true,
        data: created,
        message: 'Postingan berhasil dibuat dan dipublikasikan',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /api/posts POST Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat postingan baru' },
      { status: 500 }
    );
  }
}
