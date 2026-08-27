import { Client } from 'pg';
import 'dotenv/config';

async function migrate() {
  console.log('🔄 Menjalankan safe schema synchronization ke database...');
  const connStr = process.env.DIRECT_URL || process.env.DATABASE_URL || '';
  const client = new Client({ connectionString: connStr });

  try {
    await client.connect();
    console.log('🔌 Terhubung ke database.');

    // 1. Enums
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      DO $$ BEGIN
        CREATE TYPE "PostType" AS ENUM ('ARTICLE', 'NEWS', 'EVENT', 'RELEASE');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      DO $$ BEGIN
        CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      DO $$ BEGIN
        CREATE TYPE "ConsultationStatus" AS ENUM ('NEW', 'CONTACTED', 'RESOLVED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log('✅ Enums terverifikasi.');

    // 2. User Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT,
        "email" TEXT UNIQUE NOT NULL,
        "passwordHash" TEXT NOT NULL,
        "image" TEXT,
        "role" "Role" DEFAULT 'ADMIN'::"Role" NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // 3. Service Table & Column "badge"
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Service" (
        "id" TEXT PRIMARY KEY,
        "title" TEXT NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "heroTagline" TEXT NOT NULL,
        "summary" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "icon" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "badge" TEXT,
        "features" JSONB NOT NULL,
        "faqs" JSONB,
        "isActive" BOOLEAN DEFAULT true NOT NULL,
        "order" INTEGER DEFAULT 0 NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
      ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "badge" TEXT;
      ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "heroTagline" TEXT DEFAULT '' NOT NULL;
      ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "summary" TEXT DEFAULT '' NOT NULL;
    `);
    console.log('✅ Tabel Service dan kolom badge terverifikasi.');

    // 4. Category Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Category" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "description" TEXT,
        "order" INTEGER DEFAULT 0 NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
    console.log('✅ Tabel Category terverifikasi.');

    // 5. Post Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Post" (
        "id" TEXT PRIMARY KEY,
        "title" TEXT NOT NULL,
        "slug" TEXT UNIQUE NOT NULL,
        "summary" TEXT,
        "contentHtml" TEXT NOT NULL,
        "contentJson" JSONB,
        "coverImage" TEXT,
        "type" "PostType" DEFAULT 'ARTICLE'::"PostType" NOT NULL,
        "status" "PostStatus" DEFAULT 'DRAFT'::"PostStatus" NOT NULL,
        "featured" BOOLEAN DEFAULT false NOT NULL,
        "readTime" TEXT,
        "eventDate" TIMESTAMP(3),
        "eventLocation" TEXT,
        "tags" TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
        "categoryId" TEXT NOT NULL REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        "authorId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        "views" INTEGER DEFAULT 0 NOT NULL,
        "publishedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
      ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "type" "PostType" DEFAULT 'ARTICLE'::"PostType";
      ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "featured" BOOLEAN DEFAULT false;
      ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "readTime" TEXT;
      ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "eventDate" TIMESTAMP(3);
      ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "eventLocation" TEXT;
      ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
      ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3);
    `);
    console.log('✅ Tabel Post terverifikasi.');

    // 6. Consultation Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Consultation" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "company" TEXT,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "selectedServices" TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
        "message" TEXT NOT NULL,
        "status" "ConsultationStatus" DEFAULT 'NEW'::"ConsultationStatus" NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
    console.log('✅ Tabel Consultation terverifikasi.');

    await client.end();
    console.log('🎉 Sinkronisasi struktur tabel selesai dengan sukses!');
  } catch (err: any) {
    console.error('❌ Error migrasi schema:', err.message || err);
    try { await client.end(); } catch {}
    process.exit(1);
  }
}

migrate();
