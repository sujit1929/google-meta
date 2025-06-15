// hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types/post';
import { getApi } from '@/app/api';
import { toast } from 'sonner';

interface PostsResponse {
  success: boolean;
  posts: Post[];
  page: number;
  limit: number;
  totalPosts: number;
  hasMore: boolean;
}

export const usePosts = (page: number, limit = 10) => {
  return useQuery<PostsResponse, Error>({
    queryKey: ['posts', page],
    queryFn: async () => {
      try {
        const response = await getApi<PostsResponse>(`/posts/infinity?page=${page}&limit=${limit}`);
        return response;
      } catch (error: any) {
        console.error('Error fetching posts:', error);
        toast.error(error.message || 'Failed to fetch posts.');
        throw error;
      }
    },
    staleTime: 60 * 1000, // Optional: 1 minute
  });
};
