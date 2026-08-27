export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  heroTagline: string;
  summary: string;
  description: string;
  icon: string;
  category: string;
  badge: string;
  gradient: string;
  externalUrl?: string;
  features: FeatureItem[];
  faqs: FaqItem[];
}

export type ProductItem = ServiceItem;

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface PostItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  contentHtml: string;
  categorySlug: string;
  categoryName: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  readTime: string;
  tags?: string[];
  featured?: boolean;
  eventDate?: string;
  eventLocation?: string;
  updatedAt: string;
  createdAt?: string;
}

export interface ProductDetailItem extends ServiceItem {
  tagline: string;
  targetAudience: string[];
  valueProps: {
    title: string;
    description: string;
    icon: string;
  }[];
  modules: {
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
    badge?: string;
  }[];
  specs: {
    label: string;
    value: string;
  }[];
}
