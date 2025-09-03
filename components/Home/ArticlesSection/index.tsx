"use client";

import { useProducts } from "@/hooks/useApi";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ProductCard from "@/components/shared/Cards/ProductCard";
import Rascoda from "@/public/images/Frame 1410124004.png";
import nour from "@/public/images/Frame 1597880977.png";
import StripeLogo from "@/public/images/Stripe Logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CarouselApi } from "@/components/ui/carousel";

export default function DuxProducts() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  const { data: productsData, isLoading, error } = useProducts({ limit: 6, featured: true });
  const productLatest = productsData?.data || [];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-white mt-[63px]">
      <div className=" flex flex-col items-center gap-[25px] pt-[37px] ">
        <h2 className="text-[27.61px] font-medium">شركاء نجاح</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[54px]">
          <Image src={StripeLogo} alt="StripeLogo" className="w-full aspect-[2/1] object-contain" />
          <Image src={Rascoda} alt="Rascoda" className="w-full aspect-[2/1] object-contain" />
          <Image src={nour} alt="nour" className="w-full aspect-[2/1] object-contain" />
        </div>
      </div>

      <div className="container flex flex-col gap-[64px] py-[100px]">
        <div className="flex flex-col items-center text-center gap-[20px] ">
          <h2 className="text48 text-center leading-[130%] tracking-[-1.44px]">منتجات ديوكسا</h2>
          <h3 className="text20 text-center leading-[147%] tracking-[-0.6px] text-dark-gray px-4 xl:max-w-[30%]">
            لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)
          </h3>
        </div>

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

        {!isLoading && !error && productLatest.length > 0 && (
        <Carousel
          setApi={setApi}
          className=""
          opts={{
            direction: "rtl",
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent className="">
            {productLatest.map((product, index) => (
              <CarouselItem key={index} className="basis-1/1  md:basis-1/2 lg:basis-1/3">
                <ProductCard
                  id={product.id.toString()}
                  in_stock={product.in_stock || 0}
                  image={product.main_image || "/images/articalImage.png"}
                  title={product.title}
                  description={product.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex flex-wrap items-center justify-center mt-[64px] gap-[15px]">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-[53px] h-[9px] rounded-full border border-border transition-all duration-300 ${
                  current === index + 1 ? "bg-second-primary-color scale-105" : "bg-background"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </Carousel>
        )}

        <div className="flex items-center justify-center">
          <Link
            href="/products"
            className="px-6 py-[19px] h-[54px] flex items-center justify-center rounded-[10px] border border-second-primary-color text-second-primary-color text-base font-medium leading-[150%] tracking-[-0.32px] hover:text-white hover:bg-second-primary-color cursor-pointer transition-all duration-300"
          >
            عرض الكل
          </Link>
        </div>
      </div>
    </div>
  );
}
