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
};

// Products Hooks - مطابق لـ api.md
export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: async () => {
      console.log('Fetching products with params:', params);
      const response = await api.get('/products', { params });
      console.log('Products response:', response);
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      console.log('Fetching product with id:', id);
      const response = await api.get(`/products/${id}`);
      console.log('Product response:', response);
      return response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useFeaturedProducts = (limit = 6) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'featured', limit],
    queryFn: async () => {
      console.log('Fetching featured products with limit:', limit);
      const response = await api.get('/products/featured', { 
        params: { limit } 
      });
      console.log('Featured products response:', response);
      return response;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Categories Hooks - مطابق لـ api.md
export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      console.log('Fetching categories');
      const response = await api.get('/categories');
      console.log('Categories response:', response);
      return response;
    },
    staleTime: 10 * 60 * 1000, // Categories don't change often
    gcTime: 30 * 60 * 1000,
  });
};

export const useCategoriesWithCount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, 'with-count'],
    queryFn: async () => {
      const response = await api.get('/categories/with-count');
      return response;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useProductsByCategory = (categoryId, params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'category', categoryId, params],
    queryFn: async () => {
      const response = await api.get(`/categories/${categoryId}/products`, { params });
      return response;
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Blogs Hooks - مطابق لـ api.md
export const useBlogs = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BLOGS, params],
    queryFn: async () => {
      console.log('Fetching blogs with params:', params);
      const response = await api.get('/blogs', { params });
      console.log('Blogs response:', response);
      return response;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useBlog = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BLOG, id],
    queryFn: async () => {
      console.log('Fetching blog with id:', id);
      const response = await api.get(`/blogs/${id}`);
      console.log('Blog response:', response);
      return response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Contact Mutation - مطابق لـ api.md
export const useContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contactData) => {
      console.log('Sending contact data:', contactData);
      const response = await api.post('/contact', contactData);
      console.log('Contact response:', response);
      return response;
    },
    onSuccess: () => {
      // يمكن إضافة إجراءات إضافية عند نجاح الإرسال
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      console.error('Contact form submission error:', error);
    },
  });
};

// Search Hook - مطابق لـ api.md
export const useSearch = (query) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH, query],
    queryFn: async () => {
      const response = await api.get('/search', { 
        params: { q: query } 
      });
      return response;
    },
    enabled: !!query && query.length > 2, // البحث فقط إذا كان النص أكثر من حرفين
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000,
  });
};

// Statistics Hook - مطابق لـ api.md
export const useStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATS],
    queryFn: async () => {
      const response = await api.get('/stats');
      return response;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000,
  });
};

// Infinite Query للمنتجات مع pagination
export const useProductsInfinite = (limit = 10, filters = {}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'infinite', limit, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get('/products', {
        params: {
          page: pageParam,
          limit,
          ...filters,
        },
      });
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      // إذا كان عدد المنتجات في الصفحة الحالية أقل من الحد المطلوب، فلا توجد صفحة تالية
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Infinite Query للمقالات
export const useBlogsInfinite = (limit = 10, filters = {}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.BLOGS, 'infinite', limit, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get('/blogs', {
        params: {
          page: pageParam,
          limit,
          ...filters,
        },
      });
      return response;
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
  });
};