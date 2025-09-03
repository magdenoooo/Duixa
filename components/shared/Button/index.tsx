import Link from "next/link";

interface ButtonProps {
  title: string;
  icon: any;
  isLink?: boolean;
  link?: string;
}
export default function index({ icon, isLink, link, title }: ButtonProps) {
  if (isLink) {
    return (
      <Link
        href={link || ""}
        className="bg-second-primary-color text-white font-medium p-[16px] rounded-[10px] leading-[130%] flex items-center justify-center gap-[10px] hover:bg-second-primary-color/90 transition-all duration-300 "
      >
        {title}
        {icon}
      </Link>
    );
  } else {
    return (
      <button className="bg-second-primary-color text-white font-medium p-[16px] rounded-[10px] leading-[130%] flex items-center justify-center gap-[10px]  hover:bg-second-primary-color/90 transition-all duration-300 cursor-pointer">
        {icon}
        {title}
      </button>
    );
  }
}
