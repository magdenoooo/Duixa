"use client";

import { useProducts } from "@/hooks/useApi";
import ProductsHero from "@/components/shared/ProductsHero";
import ProductCard from "@/components/shared/Cards/ProductCard";

export default function ProductsClient({ searchParams }) {
  const filter = searchParams?.filter || "";
  const { data: productsData, isLoading, error } = useProducts({ 
    category: filter === "latest" ? undefined : filter,
    featured: filter === "featured" ? true : undefined 
  });
  
  const productLatest = productsData?.data || [];
  const isData = productLatest.length > 0;

  return (
    <div className="mt-[70px]">
      <ProductsHero
        isData={isData}
        meta={productsData?.meta}
        title="منتجات ديوكسا"
        subtitle="استعدي لإضافة لمسة ساحرة الى بيتك ف لا مكان مثل البيت"
        buttons={["الكل", "الاكثر طلبا", "عنايه بالبشره", "منتجات طبيعيه"]}
      >
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-dark-gray">جاري تحميل المنتجات...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg text-red-500">حدث خطأ في تحميل المنتجات</div>
          </div>
        )}

        {!isLoading && !error && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productLatest.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                in_stock={product.in_stock || 0}
                description={product.description}
                image={product.main_image || "/images/image.jpg"}
                title={product.title}
              />
            ))}
          </div>
        )}
      </ProductsHero>
    </div>
  );
}