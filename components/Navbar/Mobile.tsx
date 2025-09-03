"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "@/public/svg";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { Whatsapp } from "@/public/svg";
import { usePathname } from "next/navigation";

interface Props {
  navigation: {
    title: string;
    link: string;
  }[];
}
export default function Mobile({ navigation }: Props) {
  const pathname = usePathname();
  return (
    <div className="block xl:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="hover:text-second-primary-color cursor-pointer transition-all duration-150" />
        </SheetTrigger>
        <SheetContent className="p-4">
          <div className="flex flex-col mt-10  gap-4">
            {navigation.map((item, index) => (
              <Link
                className={`${
                  pathname.includes(item.link) ? " opacity-[100%] " : " opacity-[70%] "
                } text18  leading-[150%] tracking-[-0.36px] opacity-[70%] hover:text-white bg-white  font-medium p-[16px] rounded-[10px] flex items-center justify-center gap-[10px] hover:bg-second-primary-color/90 transition-all duration-300`}
                href={item.link}
                key={index}
              >
                {item.title}
              </Link>
            ))}
            <Button icon={<Whatsapp />} title="تواصل معنا" isLink link="/contact-us" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
