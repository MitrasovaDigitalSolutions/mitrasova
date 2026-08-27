import { NextRequest, NextResponse } from 'next/server';
import { postsService } from '@/lib/posts-service';
import { postSchema } from '@/features/admin/schemas/post-schema';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const post = await postsService.getPostByIdOrSlug(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Postingan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('[API /api/posts/[id] GET Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil detail postingan' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
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

    const updated = await postsService.updatePost(id, parsed.data);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Postingan yang ingin diperbarui tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Postingan berhasil diperbarui',
    });
  } catch (error) {
    console.error('[API /api/posts/[id] PUT Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui postingan' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const deleted = await postsService.deletePost(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Postingan tidak ditemukan untuk dihapus' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Postingan berhasil dihapus dari sistem',
    });
  } catch (error) {
    console.error('[API /api/posts/[id] DELETE Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus postingan' },
      { status: 500 }
    );
  }
}
