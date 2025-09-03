"use client";

import React from "react";
import { useProduct } from "@/hooks/useApi";
import SingleCard from "@/components/single-product/SideCard";
import ImagesViewBox from "@/components/single-product/ImagesViewBox";
import ProductContent from "@/components/single-product/ProductContent";
import OtherViewProduct from "@/components/single-product/OtherViewProduct";
import { ContactUs } from "@/components/shared";

interface ProductPageProps {
  params: Promise<{ single: string[] }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{ single: string[] } | null>(null);
  
  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);
  
  const productId = resolvedParams?.single?.[0];
  const productId = params?.single?.[0];
  const { data: productData, isLoading, error } = useProduct(productId);
  const product = productData?.data;

  if (!resolvedParams) {
    return (
      <div className="container mt-[140px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-dark-gray">جاري تحميل...</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mt-[140px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-dark-gray">جاري تحميل تفاصيل المنتج...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mt-[140px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-red-500">حدث خطأ في تحميل تفاصيل المنتج</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-[140px]">
        <div className="flex gap-5 flex-col-reverse lg:flex-row">
          <div className="max-w-[900px] flex flex-col gap-5">
            <ImagesViewBox images={product.images || []} />
            <h2 className="text-[30px] font-medium leading-[150%] w-[90%]">
              {product.title}
            </h2>
            <div 
              className="text18 leading-[200%] w-[90%]"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            
            {product.attributes && product.attributes.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[17px] gap-y-[13px]">
                {product.attributes.map((attribute, index) => (
                  <div
                    key={index}
                    className="flex items-center p-[15px] gap-[10px] border border-border rounded-[10px] bg-white"
                  >
                    <div className="flex flex-col gap-[5px]">
                      <h4 className="text-base">{attribute}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <ProductContent product={product} />
          </div>
          <SingleCard 
            price={parseFloat(product.price) || 200} 
            rating={product.rate || 0.5} 
            totalRating={product.total_rate || 500}
            isProduct={true}
            product={product}
          />
        </div>
      </div>
      <OtherViewProduct />
      <div>
        <ContactUs isHome />
      </div>
    </>
  );
}