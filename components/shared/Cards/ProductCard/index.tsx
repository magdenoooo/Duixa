import { BoxMinimalistic } from "@/public/svg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function ProductCard({
  id,
  image,
  title,
  description,
  in_stock
}: {
  id: string;
  image: StaticImageData | string;
  title: string;
  description: string;
  in_stock: number;
}) {
  // التأكد من أن الصورة صالحة أو استخدام صورة افتراضية
  const getValidImageUrl = (img: StaticImageData | string): string => {
    if (typeof img === 'string') {
      if (img.startsWith('http')) {
        return img;
      }
    }
    return "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg";
  };

  const imageUrl = getValidImageUrl(image);

  return (
    <div className="relative border-[4px] border-white rounded-[16px] h-[533px] flex flex-col justify-between overflow-hidden transition-all duration-300 over:scale-105 hover:shadow-[0px_14px_30px_0px_rgba(0,0,0,0.03)] hover:scale-105">
      <Image src={imageUrl} alt="image" fill style={{ objectFit: 'cover' }} className="z-0" />
      <div className="flex items-center justify-start p-[10px]">
        <div className="flex items-center gap-[5px] bg-white p-[10px] rounded-[10px] backdrop-blur-[7px]">
          <BoxMinimalistic />
          <p className="text-second-primary-color text-base leading-[25px]">{in_stock} منتج موجود</p>
        </div>
      </div>
      <div className="flex items-end justify-center relative z-[10] ">
        <div className="flex flex-col gap-[11px] p-5 rounded-t-[20px] bg-background border border-border lg:w-[381px]">
          <h4 className="text-center text20 font-semibold leading-[150%] tracking-[-0.6px]">{title}</h4>
          <div
            className="text-dark-gray text-base leading-[150%] tracking-[-0.32px] text-center"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <Link
            href={`/products/${id}`}
            className="p-2.5 h-[48px] flex items-center justify-center rounded-[10px] bg-second-primary-color text-white text-base leading-[150%] mt-[2px] cursor-pointer"
          >
            عرض المنتجات الموجودة
          </Link>
        </div>
      </div>
    </div>
  );
}
