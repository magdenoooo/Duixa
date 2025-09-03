"use client";
import Button from "@/components/shared/Button";
import { Whatsapp } from "@/public/svg";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import Mobile from "./Mobile";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const navigation = [
    {
      title: "الرئيسية",
      link: "/home",
    },
    {
      title: "من نحن",
      link: "/about-us",
    },
    {
      title: "المنتجات",
      link: "/products",
    },
    {
      title:"مقالات",
      link:"/blogs"
    }
  ];
  
  return (
    <div className=" border border-border bg-[#fff] backdrop-blur-[7px] fixed top-0 w-full z-50">
      <div className="container flex justify-between items-center h-[85.32px]">
        <nav className="flex justify-center items-center gap-5">
          <div>
            <Link
              className="text18 font-medium leading-[150%] tracking-[-0.36px] flex justify-center items-center gap-[5px] ml-[49px]"
              href={"/"}
            >
              <Image src={logo} alt={"logo"} width={54} height={54} />
              ديوكس
            </Link>
          </div>
          {navigation.map((item, index) => (
            <Link
              className={`${
                pathname.includes(item.link) ? "opacity-[100%] " : "opacity-[70%]"
              } hidden xl:block text18 font-medium leading-[150%] tracking-[-0.36px] opacity-[70%] hover:opacity-[100%]`}
              href={item.link}
              key={index}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Mobile navigation={navigation} />

        <div className="hidden xl:flex justify-center items-center gap-5 ">
          <Button icon={<Whatsapp />} title="تواصل معنا" isLink link="/contact-us" />
        </div>
      </div>
    </div>
  );
}
