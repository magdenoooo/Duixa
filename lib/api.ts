import axios from 'axios';
import { QueryListData, QuerySingleData, Product, Blog, Category } from '@/models';

// بيانات تجريبية محسنة كـ fallback
export const SEED_DATA = {
  products: [
    {
      id: 1,
      title: "مسحوق غسيل ديوكس الفاخر",
      description: "مسحوق غسيل عالي الجودة مع عطر منعش يدوم طويلاً. تركيبة متطورة تضمن نظافة فائقة مع الحفاظ على الأقمشة.",
      price: "299.99",
      rate: 4.8,
      total_rate: 1250,
      in_stock: 50,
      main_image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
      images: [
        "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
        "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg",
        "https://images.pexels.com/photos/4239140/pexels-photo-4239140.jpeg"
      ],
      attributes: ["مناسب للغسالات العادية", "عطر منعش", "تركيبة متقدمة", "صديق للبيئة"],
      product_details: [
        { key: "الوزن", value: "3 كيلو" },
        { key: "النوع", value: "مسحوق غسيل" },
        { key: "العطر", value: "زهور الربيع" },
        { key: "المنشأ", value: "مصر" }
      ],
      notes: "<p>مسحوق غسيل متطور بتركيبة خاصة تضمن نظافة فائقة مع الحفاظ على الأقمشة. يحتوي على مكونات طبيعية آمنة على البشرة والبيئة.</p>",
      purchase_links: [
        { name: "شراء من أمازون", url: "https://amazon.com", color: "#FF9900" },
        { name: "شراء من نون", url: "https://noon.com", color: "#F4DF08" }
      ],
      files: [
        { name: "دليل الاستخدام", size: "2.5 MB", src: "#" },
        { name: "شهادة الجودة", size: "1.2 MB", src: "#" }
      ],
      categories: [
        { id: 1, name: "منظفات" },
        { id: 2, name: "غسيل" }
      ]
    },
    {
      id: 2,
      title: "منظف الأطباق ديوكس",
      description: "منظف أطباق فعال يزيل الدهون والأوساخ بسهولة مع رائحة منعشة.",
      price: "89.99",
      rate: 4.6,
      total_rate: 890,
      in_stock: 75,
      main_image: "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg",
      images: [
        "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg",
        "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg"
      ],
      attributes: ["تركيبة مركزة", "لطيف على اليدين", "رائحة الليمون"],
      product_details: [
        { key: "الحجم", value: "500 مل" },
        { key: "النوع", value: "منظف أطباق" },
        { key: "العطر", value: "ليمون طبيعي" }
      ],
      notes: "<p>منظف أطباق بتركيبة مركزة تزيل أصعب البقع والدهون مع الحفاظ على نعومة اليدين.</p>",
      purchase_links: [
        { name: "شراء من أمازون", url: "https://amazon.com", color: "#FF9900" }
      ],
      files: [],
      categories: [
        { id: 1, name: "منظفات" }
      ]
    },
    {
      id: 3,
      title: "معطر الملابس ديوكس",
      description: "معطر ملابس برائحة زكية تدوم طويلاً وتترك ملابسك منعشة.",
      price: "149.99",
      rate: 4.7,
      total_rate: 650,
      in_stock: 30,
      main_image: "https://images.pexels.com/photos/4239140/pexels-photo-4239140.jpeg",
      images: [
        "https://images.pexels.com/photos/4239140/pexels-photo-4239140.jpeg"
      ],
      attributes: ["رائحة تدوم طويلاً", "آمن على الأقمشة", "تركيبة طبيعية"],
      product_details: [
        { key: "الحجم", value: "750 مل" },
        { key: "النوع", value: "معطر ملابس" },
        { key: "العطر", value: "ورد دمشقي" }
      ],
      notes: "<p>معطر ملابس بتركيبة طبيعية يترك رائحة منعشة تدوم لفترة طويلة.</p>",
      purchase_links: [
        { name: "شراء من نون", url: "https://noon.com", color: "#F4DF08" }
      ],
      files: [],
      categories: [
        { id: 3, name: "معطرات" }
      ]
    }
  ] as Product[],
  blogs: [
    {
      id: "1",
      title: "أفضل طرق العناية بالملابس",
      description: "تعرف على أحدث الطرق للعناية بملابسك والحفاظ عليها لأطول فترة ممكنة. نصائح مهمة من خبراء التنظيف.",
      image: "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg",
      time_ago: "منذ يومين",
      tags: ["عناية", "ملابس", "نصائح"]
    },
    {
      id: "2", 
      title: "كيفية اختيار المنظف المناسب لمنزلك",
      description: "دليل شامل لاختيار أفضل المنظفات المنزلية حسب نوع السطح والاستخدام.",
      image: "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg",
      time_ago: "منذ أسبوع",
      tags: ["منظفات", "منزل", "دليل"]
    },
    {
      id: "3",
      title: "نصائح لتوفير المال عند شراء منتجات التنظيف",
      description: "طرق ذكية لتوفير المال عند شراء منتجات التنظيف دون التضحية بالجودة.",
      image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
      time_ago: "منذ 3 أيام",
      tags: ["توفير", "نصائح", "اقتصاد"]
    }
  ] as Blog[],
  categories: [
    { id: 1, name: "منظفات", slug: "cleaners", products_count: 15 },
    { id: 2, name: "غسيل", slug: "laundry", products_count: 8 },
    { id: 3, name: "معطرات", slug: "fragrances", products_count: 12 },
    { id: 4, name: "عناية شخصية", slug: "personal-care", products_count: 6 }
  ] as Category[]
};

// إنشاء axios instance مع إعدادات محسنة
const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// دالة لتوحيد شكل الاستجابات من الـ API
export const normalizeResponse = (response: any): QueryListData<any> | QuerySingleData<any> => {
  if (!response || typeof response !== 'object') {
    return {
      success: false,
      data: [],
      message: 'لا توجد استجابة من الخادم',
      count: 0,
      meta: null,
      isSeedData: false,
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
      isSeedData: false,
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
      isSeedData: false,
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
      isSeedData: false,
    };
  }
  
  // للمنتج الواحد أو المقال الواحد
  if (response.id) {
    return {
      success: true,
      data: response,
      message: '',
      isSeedData: false,
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
      isSeedData: false,
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
      isSeedData: false,
    };
  }
  
  // الاستجابة الافتراضية
  return {
    success: response.success !== false,
    data: response,
    message: response.message || '',
    count: 0,
    meta: null,
    isSeedData: false,
  };
};

// إضافة interceptors للتعامل مع الاستجابات والأخطاء
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return normalizeResponse(response.data);
  },
  (error) => {
    // تحسين رسائل الخطأ
    let errorMessage = 'حدث خطأ غير متوقع';
    let shouldUseSeedData = false;
    
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      errorMessage = 'خطأ في الاتصال بالخادم';
      shouldUseSeedData = true;
    } else if (error.response?.status === 404) {
      errorMessage = 'المورد المطلوب غير موجود';
    } else if (error.response?.status === 500) {
      errorMessage = 'خطأ في الخادم';
      shouldUseSeedData = true;
    } else if (error.response?.status === 503) {
      errorMessage = 'الخادم غير متاح حالياً';
      shouldUseSeedData = true;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    const errorResponse = {
      success: false,
      message: errorMessage,
      error: error.response?.data?.error || error.message || 'Network Error',
      status: error.response?.status,
      shouldUseSeedData,
    };
    
    return Promise.reject(errorResponse);
  }
);

export default api;