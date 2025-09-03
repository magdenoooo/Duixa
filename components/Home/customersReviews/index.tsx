"use client";
import { ReviewCard } from "@/components/shared";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import profile from "@/public/images/Profile.png";
import { useEffect, useState } from "react";
export default function Testimonial() {
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
          <h2 className="text48 text-center leading-[130%] tracking-[-1.44px]">أراء العملاء الخاصه بنا</h2>
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
                <ReviewCard
                  image={profile}
                  name="راسكو جمال"
                  jobTitle="مشترك في كورس البرمجه"
                  description="كانت تجربة رائعة جدًا مع كورس البرمجة! استمتعت بالمحتوى الشيق والشروحات الواضحة. شكرًا جزيلاً للفريق على جهودهم الكبيرة في إعداد هذا الكورس."
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
      </div>
    </div>
  );
}

{
  /* <div className="relative max-w-[513px] py-[80px] px-[20px] border border-border flex flex-col items-center gap-[40px]">
    <div className="flex items-center justify-center gap-[12px]">
      <Image src={profile} alt="profile" width={60} height={60} className="rounded-full" />
      <div className="">
        <h3 className="text-[20px] leading-[150%]">راسكو جمال</h3>
        <p className="text-[18px] text-dark-gray leading-[150%]">مشترك في كورس البرمجه</p>
      </div>
    </div>
    <StarsYellow className="absolute left-1/2 -translate-x-1/2 top-[39%] md:top-[38%]" />
    <div className="bg-background p-[30px] pt-[50px] rounded-[15px] ">
      <p className="text18 leading-[150%] text-center">
        كانت تجربة رائعة جدًا مع كورس البرمجة! استمتعت بالمحتوى الشيق والشروحات الواضحة. شكرًا جزيلاً للفريق على
        جهودهم الكبيرة في إعداد هذا الكورس.
      </p>
    </div> */
}
{
  /* </div> */
}
