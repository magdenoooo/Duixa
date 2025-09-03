// API Endpoints Tester
// هذا الملف لفحص جميع الـ API endpoints

export const API_ENDPOINTS = {
  // Public Endpoints
  PRODUCTS: '/api/products',
  PRODUCT_DETAILS: '/api/products/{id}',
  CATEGORIES: '/api/categories',
  BLOGS: '/api/blogs',
  BLOG_DETAILS: '/api/blogs/{id}',
  CONTACT: '/api/contact',
  
  // Admin Endpoints (إذا كانت موجودة)
  ADMIN_PRODUCTS: '/api/admin/products',
  ADMIN_BLOGS: '/api/admin/blogs',
  ADMIN_CATEGORIES: '/api/admin/categories',
  ADMIN_UPLOADS: '/api/admin/uploads',
};

export const testEndpoint = async (endpoint: string, method = 'GET', data?: any) => {
  try {
    const baseURL = 'https://api.dieuxeg.com';
    const fullUrl = `${baseURL}${endpoint}`;
    
    console.log(`🧪 Testing: ${method} ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    const result = {
      endpoint,
      status: response.status,
      ok: response.ok,
      data: null,
      error: null,
    };
    
    if (response.ok) {
      result.data = await response.json();
      console.log(`✅ ${endpoint} - Success:`, result.data);
    } else {
      result.error = await response.text();
      console.log(`❌ ${endpoint} - Error ${response.status}:`, result.error);
    }
    
    return result;
  } catch (error) {
    console.log(`💥 ${endpoint} - Network Error:`, error.message);
    return {
      endpoint,
      status: 0,
      ok: false,
      data: null,
      error: error.message,
    };
  }
};

export const runAllTests = async () => {
  console.log('🚀 بدء فحص جميع API Endpoints...\n');
  
  const results = [];
  
  // Test Public Endpoints
  results.push(await testEndpoint('/api/products'));
  results.push(await testEndpoint('/api/products/1'));
  results.push(await testEndpoint('/api/categories'));
  results.push(await testEndpoint('/api/blogs'));
  results.push(await testEndpoint('/api/blogs/1'));
  
  // Test Contact endpoint
  results.push(await testEndpoint('/api/contact', 'POST', {
    full_name: 'Test User',
    email: 'test@example.com',
    phone_number: '01234567890',
    message: 'Test message'
  }));
  
  return results;
};