import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

interface Post {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  createdAt: string;
  updatedAt: string;
}

const usePosts = (
  page: number,
  limit: number,
  order: string,
  searchQuery: string,
  from: string,
  to: string
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/posts/search', {
        params: {
          page,
          limit,
          order,
          q: searchQuery,
          ...(from && { from }),
          ...(to && { to }),
        },
      });

      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, order, searchQuery, from, to]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, totalPages, isLoading, error, fetchPosts };
};

export default usePosts;
