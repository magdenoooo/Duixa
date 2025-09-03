import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

// Query Keys
export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  CATEGORIES: 'categories',
  BLOGS: 'blogs',
  BLOG: 'blog',
  STATS: 'stats',
  SEARCH: 'search',
  FEATURED_PRODUCTS: 'featured-products',
};

// Products Hooks - مطابق لـ api.md
export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: async () => {
      console.log('🔄 Fetching products with params:', params);
      try {
        const response = await api.get('/products', { params });
        console.log('✅ Products fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Products fetch error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      console.log('🔄 Fetching product with id:', id);
      try {
        const response = await api.get(`/products/${id}`);
        console.log('✅ Product fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Product fetch error:', error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};

export const useFeaturedProducts = (limit = 6) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FEATURED_PRODUCTS, limit],
    queryFn: async () => {
      console.log('🔄 Fetching featured products with limit:', limit);
      try {
        const response = await api.get('/products/featured', { 
          params: { limit } 
        });
        console.log('✅ Featured products fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Featured products fetch error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};

// Categories Hooks - مطابق لـ api.md
export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      console.log('🔄 Fetching categories');
      try {
        const response = await api.get('/categories');
        console.log('✅ Categories fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Categories fetch error:', error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // Categories don't change often
    gcTime: 30 * 60 * 1000,
    retry: 3,
  });
};

export const useCategoriesWithCount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, 'with-count'],
    queryFn: async () => {
      console.log('🔄 Fetching categories with count');
      try {
        const response = await api.get('/categories/with-count');
        console.log('✅ Categories with count fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Categories with count fetch error:', error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
  });
};

export const useProductsByCategory = (categoryId, params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'category', categoryId, params],
    queryFn: async () => {
      console.log('🔄 Fetching products by category:', categoryId, params);
      try {
        const response = await api.get(`/categories/${categoryId}/products`, { params });
        console.log('✅ Products by category fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Products by category fetch error:', error);
        throw error;
      }
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};

// Blogs Hooks - مطابق لـ api.md
export const useBlogs = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BLOGS, params],
    queryFn: async () => {
      console.log('🔄 Fetching blogs with params:', params);
      try {
        const response = await api.get('/blogs', { params });
        console.log('✅ Blogs fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Blogs fetch error:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};

export const useBlog = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BLOG, id],
    queryFn: async () => {
      console.log('🔄 Fetching blog with id:', id);
      try {
        const response = await api.get(`/blogs/${id}`);
        console.log('✅ Blog fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Blog fetch error:', error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};

// Contact Mutation - مطابق لـ api.md
export const useContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contactData) => {
      console.log('🔄 Sending contact data:', contactData);
      try {
        const response = await api.post('/contact', contactData);
        console.log('✅ Contact sent successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Contact submission error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('✅ Contact form submission successful:', data);
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      console.error('❌ Contact form submission failed:', error);
    },
  });
};

// Search Hook - مطابق لـ api.md
export const useSearch = (query) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH, query],
    queryFn: async () => {
      console.log('🔄 Searching for:', query);
      try {
        const response = await api.get('/search', { 
          params: { q: query } 
        });
        console.log('✅ Search results:', response);
        return response;
      } catch (error) {
        console.error('❌ Search error:', error);
        throw error;
      }
    },
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
  });
};

// Statistics Hook - مطابق لـ api.md
export const useStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATS],
    queryFn: async () => {
      console.log('🔄 Fetching stats');
      try {
        const response = await api.get('/stats');
        console.log('✅ Stats fetched successfully:', response);
        return response;
      } catch (error) {
        console.error('❌ Stats fetch error:', error);
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
  });
};

// Infinite Query للمنتجات مع pagination
export const useProductsInfinite = (limit = 10, filters = {}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'infinite', limit, filters],
    queryFn: async ({ pageParam = 1 }) => {
      console.log('🔄 Fetching infinite products, page:', pageParam);
      try {
        const response = await api.get('/products', {
          params: {
            page: pageParam,
            limit,
            ...filters,
          },
        });
        console.log('✅ Infinite products fetched:', response);
        return response;
      } catch (error) {
        console.error('❌ Infinite products fetch error:', error);
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};

// Infinite Query للمقالات
export const useBlogsInfinite = (limit = 10, filters = {}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.BLOGS, 'infinite', limit, filters],
    queryFn: async ({ pageParam = 1 }) => {
      console.log('🔄 Fetching infinite blogs, page:', pageParam);
      try {
        const response = await api.get('/blogs', {
          params: {
            page: pageParam,
            limit,
            ...filters,
          },
        });
        console.log('✅ Infinite blogs fetched:', response);
        return response;
      } catch (error) {
        console.error('❌ Infinite blogs fetch error:', error);
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
  });
};

export { useFeaturedProducts };