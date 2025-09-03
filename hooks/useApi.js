import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import api, { SEED_DATA } from '@/lib/api';

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
const handleQueryError = (error, seedDataKey) => {
  // تقليل الـ console errors للتركيز على المشاكل الحقيقية
  if (process.env.NODE_ENV === 'development') {
    console.warn(`⚠️ ${seedDataKey} API unavailable, using seed data`);
  }
  
  if (error?.shouldUseSeedData && SEED_DATA[seedDataKey]) {
    console.log(`🌱 Using seed data for ${seedDataKey}`);
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
export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: async () => {
      console.log('🔄 Fetching products with params:', params);
      try {
        const response = await api.get('/products', { params });
        console.log('✅ Products fetched successfully:', response);
        
        // إذا كانت البيانات فارغة، استخدم seed data
        if (!response.data || response.data.length === 0) {
          console.log('🌱 No products found, using seed data');
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
    retry: (failureCount, error) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
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
        // للمنتج الواحد، استخدم أول منتج من seed data
        if (error?.shouldUseSeedData && SEED_DATA.products[0]) {
          console.log('🌱 Using seed data for single product');
          return {
            success: true,
            data: { ...SEED_DATA.products[0], id },
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
    retry: (failureCount, error) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
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
        
        if (!response.data || response.data.length === 0) {
          console.log('🌱 No featured products found, using seed data');
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
    retry: (failureCount, error) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
  });
};

// Categories Hooks
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
        // إرجاع categories افتراضية
        return {
          success: true,
          data: [
            { id: 1, name: "منظفات", slug: "cleaners" },
            { id: 2, name: "غسيل", slug: "laundry" },
            { id: 3, name: "مسحوق", slug: "powder" }
          ],
          message: 'عرض فئات افتراضية',
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
        return {
          success: true,
          data: [
            { id: 1, name: "منظفات", slug: "cleaners", products_count: 15 },
            { id: 2, name: "غسيل", slug: "laundry", products_count: 8 },
            { id: 3, name: "مسحوق", slug: "powder", products_count: 12 }
          ],
          message: 'عرض فئات افتراضية مع العدد',
          isSeedData: true,
        };
      }
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
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
export const useBlogs = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BLOGS, params],
    queryFn: async () => {
      console.log('🔄 Fetching blogs with params:', params);
      try {
        const response = await api.get('/blogs', { params });
        console.log('✅ Blogs fetched successfully:', response);
        
        // إذا كانت البيانات فارغة، استخدم seed data
        if (!response.data || response.data.length === 0) {
          console.log('🌱 No blogs found, using seed data');
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
    retry: (failureCount, error) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
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
        // للمقال الواحد، استخدم أول مقال من seed data
        if (error?.shouldUseSeedData && SEED_DATA.blogs[0]) {
          console.log('🌱 Using seed data for single blog');
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
    retry: (failureCount, error) => {
      if (error?.status === 404 || error?.status === 500) return false;
      return failureCount < 2;
    },
  });
};

// Contact Mutation
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
        
        // في حالة خطأ الاتصال، نرجع نجاح وهمي
        if (error?.shouldUseSeedData || error?.status === 500) {
          console.log('🌱 Simulating successful contact submission');
          return {
            success: true,
            message: 'تم إرسال رسالتك بنجاح (محاكاة)',
            data: contactData,
            isSeedData: true,
          };
        }
        
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

// Search Hook
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
        // في حالة خطأ البحث، نرجع نتائج فارغة
        return {
          success: true,
          data: [],
          message: 'لا توجد نتائج للبحث',
          count: 0,
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
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
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
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};