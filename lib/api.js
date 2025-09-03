import axios from 'axios';

// إنشاء axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'https://api.dieuxeg.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// دالة لتوحيد شكل الاستجابات من الـ API حسب api.md
export const normalizeResponse = (response) => {
  // إذا كانت الاستجابة تحتوي على products (حسب api.md)
  if (response.products) {
    return {
      success: response.success || true,
      data: response.products,
      message: response.message || '',
      count: response.count || response.products.length,
      meta: response.meta || null,
    };
  }
  
  // إذا كانت الاستجابة تحتوي على blogs (حسب api.md)
  if (response.blogs) {
    return {
      success: response.success || true,
      data: response.blogs,
      message: response.message || '',
      count: response.count || response.blogs.length,
      meta: response.meta || null,
    };
  }
  
  // إذا كانت الاستجابة تحتوي على categories (حسب api.md)
  if (response.categories) {
    return {
      success: response.success || true,
      data: response.categories,
      message: response.message || '',
      count: response.count || response.categories.length,
      meta: response.meta || null,
    };
  }
  
  // للمنتج الواحد أو المقال الواحد (response مباشر)
  if (response.id) {
    return {
      success: true,
      data: response,
      message: '',
    };
  }
  
  // إذا كانت الاستجابة تحتوي على data مباشرة
  if (response.data) {
    return {
      success: response.success || true,
      data: response.data,
      message: response.message || '',
      count: response.count || 0,
      meta: response.meta || null,
    };
  }
  
  // الاستجابة الافتراضية
  return {
    success: response.success || true,
    data: response,
    message: response.message || '',
    count: 0,
    meta: null,
  };
};

// إضافة interceptors للتعامل مع الاستجابات والأخطاء
api.interceptors.response.use(
  (response) => {
    return normalizeResponse(response.data);
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'حدث خطأ غير متوقع';
    
    return Promise.reject({
      success: false,
      message: errorMessage,
      error: error.response?.data?.error || 'Network Error',
      status: error.response?.status,
    });
  }
);

export default api;