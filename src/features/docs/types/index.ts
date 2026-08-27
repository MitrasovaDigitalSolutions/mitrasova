import { ServiceItem, CategoryItem, PostItem } from '@/types';

export interface DocsArticleProps {
  post: PostItem;
  currentService: ServiceItem;
  allServices: ServiceItem[];
  allCategories: CategoryItem[];
  allPosts: PostItem[];
}

export interface DocsHubProps {
  services?: ServiceItem[];
  posts?: PostItem[];
}
