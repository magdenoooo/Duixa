"use client";

import image from "@/public/images/art.png";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { StarsMinimalistic2 } from "@/public/svg";
import Image from "next/image";
import bg from "@/public/images/Stars Minimalistic.png";
import { CategoryCard } from "@/components/shared/Cards/CategoryCard";
export default function OtherViewProduct() {
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
    <div className="bg-background mt-[63px]">
      <div className="container flex flex-col gap-[64px] py-[100px]">
        <div className="flex flex-col items-center text-center gap-[20px] ">
          <div className="relative">
            <Image src={bg} alt="bg" fill className="border absolute z-20 " />
            <StarsMinimalistic2 />
          </div>
          <h2 className="text36 text-center font-medium">منتجات اخري قد تعجبك</h2>
        </div>

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
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/1  md:basis-1/2 lg:basis-1/3">
                <CategoryCard
                  image={image}
                  price={200}
                  title=""
                  freeShipping
                  installmentPrice={4}
                  rating={4.5}
                  shippingDate=""
                  tags={["kjkjkj", "kjkjkjk"]}
                  totalRating={400}
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
        <div className="flex items-center justify-center">
          <button className="px-6 py-[19px] h-[54px] flex items-center justify-center rounded-[10px] border border-second-primary-color text-second-primary-color text-base font-medium leading-[150%] tracking-[-0.32px] hover:text-white hover:bg-second-primary-color cursor-pointer">
            عرض الكل
          </button>
        </div>
      </div>
    </div>
  );
}
