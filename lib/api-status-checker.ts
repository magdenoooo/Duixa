// API Status Checker - للفحص المباشر من console

export const checkApiStatus = async () => {
  const baseURL = 'https://api.dieuxeg.com';
  
  console.log('🔍 فحص حالة API Endpoints...\n');
  
  const endpoints = [
    { name: 'Products List', url: '/api/products', method: 'GET' },
    { name: 'Single Product', url: '/api/products/1', method: 'GET' },
    { name: 'Categories', url: '/api/categories', method: 'GET' },
    { name: 'Blogs List', url: '/api/blogs', method: 'GET' },
    { name: 'Single Blog', url: '/api/blogs/1', method: 'GET' },
    { name: 'Contact Form', url: '/api/contact', method: 'POST' },
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`🧪 Testing: ${endpoint.name} (${endpoint.method} ${endpoint.url})`);
      
      const response = await fetch(`${baseURL}${endpoint.url}`, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: endpoint.method === 'POST' ? JSON.stringify({
          full_name: 'Test User',
          email: 'test@example.com',
          phone_number: '01234567890',
          message: 'Test message'
        }) : undefined,
      });
      
      const status = response.status;
      const isSuccess = response.ok;
      
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = await response.text();
      }
      
      const result = {
        name: endpoint.name,
        endpoint: endpoint.url,
        method: endpoint.method,
        status,
        success: isSuccess,
        data: isSuccess ? data : null,
        error: !isSuccess ? data : null,
      };
      
      results.push(result);
      
      if (isSuccess) {
        console.log(`✅ ${endpoint.name}: SUCCESS (${status})`);
        if (data && typeof data === 'object') {
          console.log(`   📊 Data Count: ${Array.isArray(data) ? data.length : Object.keys(data).length} items`);
        }
      } else {
        console.log(`❌ ${endpoint.name}: FAILED (${status})`);
        console.log(`   🚨 Error: ${data}`);
      }
      
    } catch (error) {
      console.log(`💥 ${endpoint.name}: NETWORK ERROR`);
      console.log(`   🚨 Error: ${error.message}`);
      
      results.push({
        name: endpoint.name,
        endpoint: endpoint.url,
        method: endpoint.method,
        status: 0,
        success: false,
        data: null,
        error: error.message,
      });
    }
    
    console.log(''); // فاصل بين النتائج
  }
  
  // ملخص النتائج
  console.log('📋 ملخص النتائج:');
  console.log('================');
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`✅ نجح: ${successCount}/${totalCount}`);
  console.log(`❌ فشل: ${totalCount - successCount}/${totalCount}`);
  
  console.log('\n📊 تفاصيل النتائج:');
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name}: ${result.status} (${result.method} ${result.endpoint})`);
  });
  
  return results;
};

// دالة للفحص السريع من console
export const quickApiCheck = () => {
  console.log('🚀 بدء الفحص السريع للـ API...');
  checkApiStatus();
};

// تصدير للاستخدام في console
if (typeof window !== 'undefined') {
  (window as any).checkApiStatus = checkApiStatus;
  (window as any).quickApiCheck = quickApiCheck;
}