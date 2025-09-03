"use client";

import { useState } from 'react';
import { testEndpoint, runAllTests } from '@/lib/api-tester';

export default function ApiTester() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestAll = async () => {
    setIsLoading(true);
    try {
      const testResults = await runAllTests();
      setResults(testResults);
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testSingleEndpoint = async (endpoint: string, method = 'GET') => {
    setIsLoading(true);
    try {
      const result = await testEndpoint(endpoint, method);
      setResults(prev => [...prev, result]);
    } catch (error) {
      console.error('Error testing endpoint:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Endpoints Tester</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleTestAll}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'جاري الفحص...' : 'فحص جميع الـ Endpoints'}
        </button>
        
        <button
          onClick={() => setResults([])}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          مسح النتائج
        </button>
      </div>

      <div className="grid gap-4 mb-6">
        <h3 className="text-lg font-semibold">فحص Endpoints منفردة:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button
            onClick={() => testSingleEndpoint('/api/products')}
            className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            GET /products
          </button>
          <button
            onClick={() => testSingleEndpoint('/api/products/1')}
            className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            GET /products/1
          </button>
          <button
            onClick={() => testSingleEndpoint('/api/categories')}
            className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            GET /categories
          </button>
          <button
            onClick={() => testSingleEndpoint('/api/blogs')}
            className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            GET /blogs
          </button>
          <button
            onClick={() => testSingleEndpoint('/api/blogs/1')}
            className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            GET /blogs/1
          </button>
          <button
            onClick={() => testSingleEndpoint('/api/contact', 'POST')}
            className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            POST /contact
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">نتائج الفحص:</h3>
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.ok 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm">{result.endpoint}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  result.ok 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.status} {result.ok ? '✅' : '❌'}
                </span>
              </div>
              
              {result.data && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Response Data:</p>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(result.data, null, 2).substring(0, 500)}
                    {JSON.stringify(result.data, null, 2).length > 500 ? '...' : ''}
                  </pre>
                </div>
              )}
              
              {result.error && (
                <div className="mt-2">
                  <p className="text-sm text-red-600 mb-1">Error:</p>
                  <pre className="text-xs bg-red-100 p-2 rounded">
                    {result.error}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}