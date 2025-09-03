"use client";

import { useBlogs } from "@/hooks/useApi";
import ProductsHero from "@/components/shared/ProductsHero";
import { BlogCard } from "@/components/shared/Cards/BlogCard";

export default function BlogsClient() {
  const { data: blogsData, isLoading, error } = useBlogs();
  const blogs = blogsData?.data || [];
  const isData = blogs.length > 0;

  return (
    <div className="mt-[70px]">
      <ProductsHero
        isWhite
        title="افضل المقالات الموجوده عندنا"
        subtitle="استعدي لإضافة لمسة ساحرة الى بيتك ف لا مكان مثل البيت"
        buttons={["الكل", "المنظفات", "غسيل", "مسحوق"]}
        isData={isData}
      >
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-dark-gray">جاري تحميل المقالات...</div>
          </div>
        )}

        {error && !blogsData?.isSeedData && (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-red-500">حدث خطأ في تحميل المقالات</div>
          </div>
        )}

        {!isLoading && isData && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                image={blog.image || "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg"}
                title={blog.title || "مقال ديوكس"}
                description={blog.description || ""}
                timeAgo={blog.time_ago || "منذ يوم"}
                tags={blog.tags || []}
              />
            ))}
          </div>
        )}

        {!isLoading && !isData && (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-dark-gray">لا توجد مقالات متاحة حالياً</div>
          </div>
        )}
      </ProductsHero>
    </div>
  );
}