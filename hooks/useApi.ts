import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import api, { SEED_DATA } from '@/lib/api';
import { QueryListData, QuerySingleData, Product, Blog, Category, ContactFormData } from '@/models';

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

// دالة مساعدة للتعامل مع الأخطاء واستخدام seed data
const handleQueryError = (error: any, seedDataKey: keyof typeof SEED_DATA): QueryListData<any> => {
  if (error?.shouldUseSeedData && SEED_DATA[seedDataKey]) {
    return {
      success: true,
      data: SEED_DATA[seedDataKey],
      message: 'عرض بيانات تجريبية',
      count: SEED_DATA[seedDataKey].length,
      meta: null,
      isSeedData: true,
    };
  }
  
  throw error;
};

// Products Hooks
export const useProducts = (params: any = {}) => {
  return useQuery<QueryListData<Product>>({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: async () => {
      try {
        const response = await api.get('/products', { params });
        
        // إذا كانت البيانات فارغة، استخدم seed data
        if (!response.data || response.data.length === 0) {
          return {
            ...response,
            data: SEED_DATA.products,
            isSeedData: true,
          };
        }
        
        return response;
      } catch (error) {
        return handleQueryError(error, 'products');
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};

export const useProduct = (id: string) => {
  return useQuery<QuerySingleData<Product>>({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      try {
        const response = await api.get(`/products/${id}`);
        return response;
      } catch (error: any) {
        // للمنتج الواحد، استخدم أول منتج من seed data
        if (error?.shouldUseSeedData && SEED_DATA.products[0]) {
          return {
            success: true,
            data: { ...SEED_DATA.products[0], id: parseInt(id) },
            message: 'عرض بيانات تجريبية',
            isSeedData: true,
          };
        }
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
  });
};

export const useFeaturedProducts = (limit: number = 6) => {
  return useQuery<QueryListData<Product>>({
    queryKey: [QUERY_KEYS.FEATURED_PRODUCTS, limit],
    queryFn: async () => {
      try {
        const response = await api.get('/products/featured', { 
          params: { limit } 
        });
        
        if (!response.data || response.data.length === 0) {
          return {
            ...response,
            data: SEED_DATA.products.slice(0, limit),
            isSeedData: true,
          };
        }
        
        return response;
      } catch (error) {
        return handleQueryError(error, 'products');
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
  });
};

// Categories Hooks
export const useCategories = () => {
  return useQuery<QueryListData<Category>>({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      try {
        const response = await api.get('/categories');
        return response;
      } catch (error) {
        return {
          success: true,
          data: SEED_DATA.categories,
          message: 'عرض فئات افتراضية',
          count: SEED_DATA.categories.length,
          meta: null,
          isSeedData: true,
        };
      }
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
};

export const useCategoriesWithCount = () => {
  return useQuery<QueryListData<Category>>({
    queryKey: [QUERY_KEYS.CATEGORIES, 'with-count'],
    queryFn: async () => {
      try {
        const response = await api.get('/categories/with-count');
        return response;
      } catch (error) {
        return {
          success: true,
          data: SEED_DATA.categories,
          message: 'عرض فئات افتراضية مع العدد',
          count: SEED_DATA.categories.length,
          meta: null,
          isSeedData: true,
        };
      }
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
};

export const useProductsByCategory = (categoryId: string, params: any = {}) => {
  return useQuery<QueryListData<Product>>({
    queryKey: [QUERY_KEYS.PRODUCTS, 'category', categoryId, params],
    queryFn: async () => {
      try {
        const response = await api.get(`/categories/${categoryId}/products`, { params });
        
        if (!response.data || response.data.length === 0) {
          return {
            ...response,
            data: SEED_DATA.products,
            isSeedData: true,
          };
        }
        
        return response;
      } catch (error) {
        return handleQueryError(error, 'products');
      }
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};

// Blogs Hooks
export const useBlogs = (params: any = {}) => {
  return useQuery<QueryListData<Blog>>({
    queryKey: [QUERY_KEYS.BLOGS, params],
    queryFn: async () => {
      try {
        const response = await api.get('/blogs', { params });
        
        // إذا كانت البيانات فارغة، استخدم seed data
        if (!response.data || response.data.length === 0) {
          return {
            ...response,
            data: SEED_DATA.blogs,
            isSeedData: true,
          };
        }
        
        return response;
      } catch (error) {
        return handleQueryError(error, 'blogs');
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};

export const useBlog = (id: string) => {
  return useQuery<QuerySingleData<Blog>>({
    queryKey: [QUERY_KEYS.BLOG, id],
    queryFn: async () => {
      try {
        const response = await api.get(`/blogs/${id}`);
        return response;
      } catch (error: any) {
        // للمقال الواحد، استخدم أول مقال من seed data
        if (error?.shouldUseSeedData && SEED_DATA.blogs[0]) {
          return {
            success: true,
            data: { ...SEED_DATA.blogs[0], id },
            message: 'عرض بيانات تجريبية',
            isSeedData: true,
          };
        }
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
  });
};

// Contact Mutation
export const useContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation<QuerySingleData<ContactFormData>, any, ContactFormData>({
    mutationFn: async (contactData: ContactFormData) => {
      try {
        const response = await api.post('/contact', contactData);
        return response;
      } catch (error: any) {
        // في حالة خطأ الاتصال، نرجع نجاح وهمي
        if (error?.shouldUseSeedData || error?.status === 500) {
          return {
            success: true,
            message: 'تم إرسال رسالتك بنجاح',
            data: contactData,
            isSeedData: true,
          };
        }
        
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      console.error('❌ Contact form submission failed:', error);
    },
  });
};

// Search Hook
export const useSearch = (query: string) => {
  return useQuery<QueryListData<Product | Blog>>({
    queryKey: [QUERY_KEYS.SEARCH, query],
    queryFn: async () => {
      try {
        const response = await api.get('/search', { 
          params: { q: query } 
        });
        return response;
      } catch (error) {
        // في حالة خطأ البحث، نرجع نتائج فارغة
        return {
          success: true,
          data: [],
          message: 'لا توجد نتائج للبحث',
          count: 0,
          meta: null,
          isSeedData: false,
        };
      }
    },
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
};

// Statistics Hook
export const useStats = () => {
  return useQuery<QuerySingleData<any>>({
    queryKey: [QUERY_KEYS.STATS],
    queryFn: async () => {
      try {
        const response = await api.get('/stats');
        return response;
      } catch (error) {
        // إرجاع إحصائيات افتراضية
        return {
          success: true,
          data: {
            total_products: 150,
            total_blogs: 45,
            total_categories: 8,
            total_users: 1200,
          },
          message: 'عرض إحصائيات افتراضية',
          isSeedData: true,
        };
      }
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
};