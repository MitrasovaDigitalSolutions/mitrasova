import { PostItem, ServiceItem, CategoryItem } from '@/types';

export interface DocsArticleProps {
  post: PostItem;
  currentService: ServiceItem;
  allServices: ServiceItem[];
  allCategories: CategoryItem[];
  allPosts: PostItem[];
}
