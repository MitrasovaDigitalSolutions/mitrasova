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
  features: FeatureItem[];
  faqs: FaqItem[];
}

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
  serviceSlug: string;
  categorySlug: string;
  categoryName: string;
  authorName: string;
  readTime: string;
  updatedAt: string;
}
