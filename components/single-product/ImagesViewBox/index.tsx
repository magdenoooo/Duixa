"use client";

import Image from "next/image";
import { useState } from "react";
import image1 from "@/public/images/image-view1.png";
import image2 from "@/public/images/image-view2.png";
import image3 from "@/public/images/image-view3.png";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function ImagesViewBox() {
  const images = [image1, image2, image3, image1, image2];
  const [selectedImage, setSelectedImage] = useState(image1);

  return (
    <div className="flex gap-4 h-[482px] overflow-y-hidden">
      {/* Vertical Carousel */}
      <div>
        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            dragThreshold: 9,
            axis: "y",
            dragFree: true,
          }}
          className="w-[136px] h-full"
          orientation="vertical"
        >
          <CarouselContent className="flex flex-col gap-[10px] mt-[1px]">
            {images.map((image, index) => (
              <CarouselItem key={index} className=" basis-1/3 aspect-square size-[136px] pt-0">
                <div
                  className={` cursor-pointer rounded-[10px] ${
                    selectedImage === image
                      ? "border-2 border-second-primary-color"
                      : "hover:border-2 hover:border-second-primary-color"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`image ${index}`}
                    width={136}
                    height={136}
                    className="rounded-[10px] w-full h-[136px] object-cover "
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {/* Main Large Image */}
      <div className="flex-1 lg:w-[749px] lg:h-[482px] rounded-[10px] ">
        <Image src={selectedImage} alt="" width={749} height={482} className="rounded-[10px] w-full h-full" />
      </div>
    </div>
  );
}
