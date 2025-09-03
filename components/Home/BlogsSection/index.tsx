"use client";
import image from "@/public/images/articalImage.png";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { BlogCard } from "@/components/shared/Cards/BlogCard";
import Link from "next/link";
export default function BlogsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
      <div className="container flex flex-col gap-[64px] py-[100px]">
        <div className="flex flex-col items-center text-center gap-[20px] ">
          <h2 className="text48 text-center leading-[130%] tracking-[-1.44px]">احدث المقالات الخاصه بنا</h2>
          <h3 className="text20 text-center leading-[147%] tracking-[-0.6px] text-dark-gray lg:max-w-[33%]">
            لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)
          </h3>
        </div>

        <Carousel
          setApi={setApi}
          className=""
          opts={{
            direction: "rtl",
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent className="">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/1  md:basis-1/2 lg:basis-1/3">
                <BlogCard
                  image={image}
                  title="عنوان المقالة"
                  description="لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)"
                  timeAgo="منذ 3 أيام"
                  tags={["تكنولوجيا", "برمجة", "تصميم", "تطوير"]}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex flex-wrap items-center justify-center mt-[64px] gap-[15px]">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-[53px] h-[9px] rounded-full cursor-pointer border border-border transition-all duration-300 ${
                  current === index + 1 ? "bg-second-primary-color scale-105" : "bg-background"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </Carousel>
        <div className="flex items-center justify-center">
          <Link href="/blogs" className="px-6 py-[19px] h-[54px] flex items-center justify-center rounded-[10px] border border-second-primary-color text-second-primary-color text-base font-medium leading-[150%] tracking-[-0.32px] hover:text-white hover:bg-second-primary-color cursor-pointer transition-all duration-300">
            عرض الكل
          </Link>
        </div>
      </div>
    </div>
  );
}
