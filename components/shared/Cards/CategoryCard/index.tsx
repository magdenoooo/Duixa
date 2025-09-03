import { YellowStar } from "@/public/svg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProductCardProps {
  image: StaticImageData | string;
  title: string;
  price: number;
  rating?: number;
  totalRating?: number;
  installmentPrice?: number;
  freeShipping?: boolean;
  shippingDate?: string;
  tags?: string[];
}
export const CategoryCard = ({
  image,
  title,
  totalRating,
  price,
  rating = 4.5,
  installmentPrice = 34.32,
  freeShipping = true,
  shippingDate = "30 أبريل",
  tags = ["غسيل", "مسحوق", "تنظيف"],
}: ProductCardProps) => {
  return (
    <div className="bg-white p-5 rounded-[15px] shadow-[0px_4px_54px_0px_rgba(0,0,0,0.05)] flex flex-col gap-[12px] hover:scale-105 transition-all duration-300">
      {/* Image */}
      <div className="flex items-center justify-center  h-[286px]">
        <Image src={image} alt={title} className="" width={186} height={286} />
      </div>

      {/* Content */}
      <div className="space-y-[12px] text-right">
        <h3 className="text-right text20 font-medium leading-[32px]  line-clamp-2 ">{title}</h3>

        <div className="text-dark-gray text-right text-nowrap text-base leading-[150%] tracking-[-0.096px]">
          <div className="">القسط يبدأ من {installmentPrice} جنيه باستخدام التقسيط</div>

          {freeShipping && (
            <div className="truncate">توصيل مجاني غداً {shippingDate} علي 200 جنيه من سلع يتم توصيلها</div>
          )}
        </div>
        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <div className="text30 text-second-primary-color text-right font-semibold ">
            {price.toFixed(2)} <span className="text-base">جنية مصري</span>
          </div>
          <div className="flex items-center gap-2">
            <YellowStar />
            <span className="text-sm leading-[200%] text-dark-gray">
              {rating} ({totalRating} تقيم){" "}
            </span>
          </div>
        </div>
        {/* CTA Button */}
        <Link href={""} className="flex items-center justify-center h-[48px] bg-second-primary-color p-[10px] rounded-[10px] w-full text-white text-base leading-[150%]">
          عرض تفاصيل أكثر
        </Link>
        {/* Tags */}
        <div className="flex items-center gap-[10px] pt-2">
          <span className="text-base leading-[24px] px-[10px] py-[5px] flex items-center justify-center border border-border bg-background rounded-[10px]">
            {tags[0]}
          </span>
          <span className="text-base leading-[24px] px-[10px] py-[5px] flex items-center justify-center border border-border bg-background rounded-[10px]">
            {tags[1]}
          </span>
          <span className="text-base leading-[24px] px-[10px] py-[5px] flex items-center justify-center border border-border bg-background rounded-[10px]">
            {tags[2]}
          </span>
          {tags.length > 3 && (
            <span className="text-base leading-[24px] px-[10px] py-[5px] flex items-center justify-center border border-border bg-background rounded-[10px]">
              {tags.length - 3} +
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
