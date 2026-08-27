import { PostItem } from '@/types';

export interface BlogHubProps {
  initialPosts?: PostItem[];
}

export interface BlogArticleProps {
  post: PostItem;
  relatedPosts?: PostItem[];
}
