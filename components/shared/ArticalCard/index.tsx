import { Article } from "@/types/blogsRes";
import Image from "next/image";
import image2 from "@/public/images/articalImage.png";
import Link from "next/link";

export default function index({ short_description, title, id }: Article) {
  return (
    <Link href={`/articles/${id}`} >
      <div className="p-[25px] border border-border rounded-[15px] grid gap-[15px] bg-white">
        <Image src={image2} alt="" width={463} height={235} className="rounded-[15px] w-full" />
        <div className="flex items-start gap-[10px]">
          {short_description}
          {/* {tags.map((tag) => (
          <span
          key={tag}
          className="py-[5px] px-[10px] bg-background rounded-[10px] w-[99px] text-center leading-[24px] flex justify-center items-center"
          >
          {tag}
          </span>
          ))} */}
          {/* <div className="py-[5px] px-[10px] bg-background rounded-[10px] w-[99px] text-center leading-[24px]">غسيل</div> */}
          {/* <div className="py-[5px] px-[10px] bg-background rounded-[10px] w-[99px] text-center leading-[24px]">غسيل</div> */}
        </div>
        <p className="text20 font-medium leading-[32px] "> {title} </p>
      </div>
    </Link>
  );
}
