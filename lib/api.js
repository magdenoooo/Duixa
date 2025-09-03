import axios from 'axios';

// إنشاء axios instance مع إعدادات محسنة
const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// بيانات تجريبية كـ fallback
export const SEED_DATA = {
  products: [
    {
      id: "1",
      title: "مسحوق غسيل ديوكس الفاخر",
      description: "مسحوق غسيل عالي الجودة مع عطر منعش يدوم طويلاً",
      price: "299.99",
      rate: 4.8,
      total_rate: 1250,
      in_stock: 50,
      main_image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
      images: [
        "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
        "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg"
      ],
      attributes: ["مناسب للغسالات العادية", "عطر منعش", "تركيبة متقدمة"],
      product_details: [
        { key: "الوزن", value: "3 كيلو" },
        { key: "النوع", value: "مسحوق غسيل" },
        { key: "العطر", value: "زهور الربيع" }
      ],
      notes: "<p>مسحوق غسيل متطور بتركيبة خاصة تضمن نظافة فائقة مع الحفاظ على الأقمشة</p>",
      purchase_links: [
        { name: "شراء من أمازون", url: "#", color: "#FF9900" },
        { name: "شراء من نون", url: "#", color: "#F4DF08" }
      ]
    }
  ],
  blogs: [
    {
      id: "1",
      title: "أفضل طرق العناية بالملابس",
      description: "تعرف على أحدث الطرق للعناية بملابسك والحفاظ عليها لأطول فترة ممكنة",
      image: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg",
      time_ago: "منذ يومين",
      tags: ["عناية", "ملابس", "نصائح"]
    }
  ]
};

// دالة لتوحيد شكل الاستجابات من الـ API
export const normalizeResponse = (response) => {
  console.log('🔍 Raw API Response:', response);
  
  // التحقق من وجود البيانات وأنها object صالح
  if (!response || typeof response !== 'object') {
    console.warn('⚠️ Invalid response format, using seed data');
    return {
      success: false,
      data: [],
      message: 'لا توجد استجابة من الخادم',
      count: 0,
      meta: null,
    };
  }
  
  // إذا كانت الاستجابة تحتوي على products
  if (response.products && Array.isArray(response.products)) {
    return {
      success: response.success !== false,
      data: response.products,
      message: response.message || '',
      count: response.count || response.products.length,
      meta: response.meta || null,
    };
  }
  
  // إذا كانت الاستجابة تحتوي على blogs
  if (response.blogs && Array.isArray(response.blogs)) {
    return {
      success: response.success !== false,
      data: response.blogs,
      message: response.message || '',
      count: response.count || response.blogs.length,
      meta: response.meta || null,
    };
  }
  
  // إذا كانت الاستجابة تحتوي على categories
  if (response.categories && Array.isArray(response.categories)) {
    return {
      success: response.success !== false,
      data: response.categories,
      message: response.message || '',
      count: response.count || response.categories.length,
      meta: response.meta || null,
    };
  }
  
  // للمنتج الواحد أو المقال الواحد
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
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url, config.params);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Success:', response.status, response.data);
    return normalizeResponse(response.data);
  },
  (error) => {
    console.error('❌ API Error Details:', {
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
    
    // تحسين رسائل الخطأ مع تفاصيل أكثر
    let errorMessage = 'حدث خطأ غير متوقع';
    let shouldUseSeedData = false;
    
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      errorMessage = 'خطأ في الاتصال بالخادم. سيتم عرض بيانات تجريبية.';
      shouldUseSeedData = true;
    } else if (error.response?.status === 404) {
      errorMessage = 'المورد المطلوب غير موجود';
    } else if (error.response?.status === 500) {
      errorMessage = 'خطأ في الخادم. سيتم عرض بيانات تجريبية.';
      shouldUseSeedData = true;
    } else if (error.response?.status === 503) {
      errorMessage = 'الخادم غير متاح حالياً. سيتم عرض بيانات تجريبية.';
      shouldUseSeedData = true;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    const errorResponse = {
      success: false,
      message: errorMessage,
      error: error.response?.data?.error || error.message || 'Network Error',
      status: error.response?.status,
      originalError: error,
      shouldUseSeedData,
    };
    
    console.log('🔄 Error Response:', errorResponse);
    return Promise.reject(errorResponse);
  }
);

export default api;