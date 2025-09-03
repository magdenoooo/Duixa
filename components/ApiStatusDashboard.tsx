"use client";

import { useState, useEffect } from 'react';
import { useProducts, useProduct, useCategories, useBlogs, useBlog } from '@/hooks/useApi';

export default function ApiStatusDashboard() {
  const [testResults, setTestResults] = useState<any[]>([]);
  
  // Test all hooks
  const productsQuery = useProducts();
  const productQuery = useProduct('1');
  const categoriesQuery = useCategories();
  const blogsQuery = useBlogs();
  const blogQuery = useBlog('1');

  useEffect(() => {
    const results = [
      {
        name: 'Products List',
        endpoint: '/api/products',
        status: productsQuery.isSuccess ? 200 : productsQuery.isError ? 500 : 'Loading',
        success: productsQuery.isSuccess,
        loading: productsQuery.isLoading,
        error: productsQuery.error,
        data: productsQuery.data,
        isSeedData: productsQuery.data?.isSeedData,
        dataCount: productsQuery.data?.data?.length || 0,
      },
      {
        name: 'Single Product',
        endpoint: '/api/products/1',
        status: productQuery.isSuccess ? 200 : productQuery.isError ? 500 : 'Loading',
        success: productQuery.isSuccess,
        loading: productQuery.isLoading,
        error: productQuery.error,
        data: productQuery.data,
        isSeedData: productQuery.data?.isSeedData,
        dataCount: productQuery.data?.data ? 1 : 0,
      },
      {
        name: 'Categories',
        endpoint: '/api/categories',
        status: categoriesQuery.isSuccess ? 200 : categoriesQuery.isError ? 500 : 'Loading',
        success: categoriesQuery.isSuccess,
        loading: categoriesQuery.isLoading,
        error: categoriesQuery.error,
        data: categoriesQuery.data,
        isSeedData: categoriesQuery.data?.isSeedData,
        dataCount: categoriesQuery.data?.data?.length || 0,
      },
      {
        name: 'Blogs List',
        endpoint: '/api/blogs',
        status: blogsQuery.isSuccess ? 200 : blogsQuery.isError ? 500 : 'Loading',
        success: blogsQuery.isSuccess,
        loading: blogsQuery.isLoading,
        error: blogsQuery.error,
        data: blogsQuery.data,
        isSeedData: blogsQuery.data?.isSeedData,
        dataCount: blogsQuery.data?.data?.length || 0,
      },
      {
        name: 'Single Blog',
        endpoint: '/api/blogs/1',
        status: blogQuery.isSuccess ? 200 : blogQuery.isError ? 500 : 'Loading',
        success: blogQuery.isSuccess,
        loading: blogQuery.isLoading,
        error: blogQuery.error,
        data: blogQuery.data,
        isSeedData: blogQuery.data?.isSeedData,
        dataCount: blogQuery.data?.data ? 1 : 0,
      },
    ];
    
    setTestResults(results);
  }, [
    productsQuery.isSuccess, productsQuery.isError, productsQuery.isLoading,
    productQuery.isSuccess, productQuery.isError, productQuery.isLoading,
    categoriesQuery.isSuccess, categoriesQuery.isError, categoriesQuery.isLoading,
    blogsQuery.isSuccess, blogsQuery.isError, blogsQuery.isLoading,
    blogQuery.isSuccess, blogQuery.isError, blogQuery.isLoading,
  ]);

  const successCount = testResults.filter(r => r.success).length;
  const loadingCount = testResults.filter(r => r.loading).length;
  const errorCount = testResults.filter(r => !r.success && !r.loading).length;
  const seedDataCount = testResults.filter(r => r.isSeedData).length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 API Status Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{successCount}</div>
          <div className="text-sm text-green-700">نجح</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{loadingCount}</div>
          <div className="text-sm text-blue-700">جاري التحميل</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{errorCount}</div>
          <div className="text-sm text-red-700">فشل</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{seedDataCount}</div>
          <div className="text-sm text-yellow-700">بيانات تجريبية</div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">تفاصيل النتائج:</h3>
        {testResults.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              result.loading 
                ? 'bg-blue-50 border-blue-200'
                : result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{result.name}</span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{result.endpoint}</code>
              </div>
              <div className="flex items-center gap-2">
                {result.isSeedData && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                    SEED DATA
                  </span>
                )}
                <span className={`px-2 py-1 rounded text-sm ${
                  result.loading 
                    ? 'bg-blue-100 text-blue-800'
                    : result.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {result.loading ? 'Loading...' : result.status}
                </span>
              </div>
            </div>
            
            {result.success && (
              <div className="text-sm text-green-700">
                ✅ يعمل بشكل صحيح - عدد العناصر: {result.dataCount}
                {result.isSeedData && ' (بيانات تجريبية)'}
              </div>
            )}
            
            {result.error && (
              <div className="text-sm text-red-700">
                ❌ خطأ: {result.error?.message || 'Unknown error'}
              </div>
            )}
            
            {result.loading && (
              <div className="text-sm text-blue-700">
                🔄 جاري التحميل...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}