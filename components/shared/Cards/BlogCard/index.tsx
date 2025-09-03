import { ClockCircle } from "@/public/svg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface BlogCardProps {
  image: StaticImageData | string;
  title: string;
  description: string;
  timeAgo?: string;
  tags?: string[];
}

export function BlogCard({ image, title, description, timeAgo, tags }: BlogCardProps) {
  return (
    <div className="flex flex-col gap-[15px] p-[25px] rounded-[15px] bg-white border border-border transition-all duration-300 hover:scale-105 hover:shadow-[0px_14px_30px_0px_rgba(0,0,0,0.03)] ">
      <Image src={image} alt="image" width={462.7} height={289} className="w-full rounded-[10px]" />
      <div className="flex items-center gap-[6px] justify-start">
        <ClockCircle />
        <p className="text-dark-gray text-right text-sm leading-[25px]">{timeAgo}</p>
      </div>
      <div className="flex flex-col gap-[12px]">
        <h3 className="text-right text20 font-medium leading-[32px]">{title}</h3>
        <p className="text-right text18 text-dark-gray leading-[150%] tracking-[-0.108px]">{description}</p>
      </div>
      <div className="flex items-center gap-[10px]">
        {tags && tags.length > 0 && (
          <>
            <span className="px-[10px] py-[5px] rounded-[10px] bg-background border border-border text-base leading-[24px]">
              {tags[0]}
            </span>
            <span className="px-[10px] py-[5px] rounded-[10px] bg-background border border-border text-base leading-[24px]">
              {tags[1]}
            </span>
            <span className="px-[10px] py-[5px] rounded-[10px] bg-background border border-border text-base leading-[24px]">
              {tags[2]}
            </span>
            {tags.length > 3 && (
              <span className="px-[10px] py-[5px] rounded-[10px] bg-background border border-border text-base leading-[24px]">
                {tags.length - 3}+
              </span>
            )}
          </>
        )}
      </div>
      <Link href={""} className="p-[10px] bg-second-primary-color rounded-[10px] h-[48px] text-white flex items-center justify-center text-base leading-[150%]">
        عرض تفاصيل اكثر
      </Link>
    </div>
  );
}
