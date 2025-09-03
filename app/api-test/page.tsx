import ApiTester from '@/components/ApiTester';

export default function ApiTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">API Endpoints Testing</h1>
        <ApiTester />
      </div>
    </div>
  );
}