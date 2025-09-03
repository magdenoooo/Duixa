export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">مرحباً بك في ديوكس</h1>
        <p className="text-lg text-gray-600 mb-8">جاري تحميل الموقع...</p>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}