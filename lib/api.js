import axios from 'axios';

// إنشاء axios instance مع إعدادات محسنة
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'https://api.dieuxeg.com/api',
  timeout: 15000, // زيادة timeout إلى 15 ثانية
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  // إضافة إعدادات إضافية لحل مشاكل CORS
  withCredentials: false,
});

// دالة لتوحيد شكل الاستجابات من الـ API حسب api.md
export const normalizeResponse = (response) => {
  console.log('Raw API Response:', response);
  
  // التحقق من وجود البيانات
  if (!response) {
    return {
      success: false,
      data: [],
      message: 'لا توجد استجابة من الخادم',
      count: 0,
      meta: null,
    };
  }
  
  // إذا كانت الاستجابة تحتوي على products (حسب api.md)
  if (response.products && Array.isArray(response.products)) {
    return {
      success: response.success !== false,
      data: response.products,
      message: response.message || '',
      count: response.count || response.products.length,
      meta: response.meta || null,
    };
  }
  
  // إذا كانت الاستجابة تحتوي على blogs (حسب api.md)
  if (response.blogs && Array.isArray(response.blogs)) {
    return {
      success: response.success !== false,
      data: response.blogs,
      message: response.message || '',
      count: response.count || response.blogs.length,
      meta: response.meta || null,
    };
  }
  
  // إذا كانت الاستجابة تحتوي على categories (حسب api.md)
  if (response.categories && Array.isArray(response.categories)) {
    return {
      success: response.success !== false,
      data: response.categories,
      message: response.message || '',
      count: response.count || response.categories.length,
      meta: response.meta || null,
    };
  }
  
  // للمنتج الواحد أو المقال الواحد (response مباشر مع id)
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
      success: response.success !== false,
      data: response.data,
      message: response.message || '',
      count: response.count || 0,
      meta: response.meta || null,
    };
  }
  
  // إذا كانت الاستجابة array مباشرة
  if (Array.isArray(response)) {
    return {
      success: true,
      data: response,
      message: '',
      count: response.length,
      meta: null,
    };
  }
  
  // الاستجابة الافتراضية
  return {
    success: response.success !== false,
    data: response,
    message: response.message || '',
    count: 0,
    meta: null,
  };
};

// إضافة interceptors للتعامل مع الاستجابات والأخطاء
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.params);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', response.status, response.data);
    return normalizeResponse(response.data);
  },
  (error) => {
    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      }
    });
    
    // تحسين رسائل الخطأ
    let errorMessage = 'حدث خطأ غير متوقع';
    
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      errorMessage = 'خطأ في الاتصال بالخادم. تحقق من اتصال الإنترنت.';
    } else if (error.response?.status === 404) {
      errorMessage = 'المورد المطلوب غير موجود';
    } else if (error.response?.status === 500) {
      errorMessage = 'خطأ في الخادم. حاول مرة أخرى لاحقاً.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    return Promise.reject({
      success: false,
      message: errorMessage,
      error: error.response?.data?.error || error.message || 'Network Error',
      status: error.response?.status,
      originalError: error,
    });
  }
);

export default api;