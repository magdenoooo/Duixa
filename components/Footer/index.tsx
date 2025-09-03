"use client";
import { Email, Facebook, FooterLogo, Instagram, LinkedIN, Location, Phone, Telegram, Twitter } from "@/public/svg";
import { Section } from "../shared";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
export default function Footer() {
  const contact = [
    {
      icon: <Location className="size-[36px]" />,
      title: "العنوان الخاص بنا",
      description: "The Greek Campus - Dieux",
    },
    {
      icon: <Phone className="size-[36px]" />,
      title: "اتصل بنا في اي وقت",
      description: "+201025576136",
    },
    {
      icon: <Email className="size-[36px] " />,
      title: "تواصل معنا عبر البريد",
      description: "support@Dieux.com",
    },
  ];
  const links = [
    {
      title: "الرئيسية",
      link: "/home",
    },
    {
      title: "عنا",
      link: "/about-us",
    },
    {
      title: "خدامتنا",
      link: "/home#services",
    },
    {
      title: "تواصل معنا",
      link: "/contact-us",
    },
  ];
  const links2 = [
    {
      title: "تدريب الاشخاص علي ",
      link: "",
    },
    {
      title: "كورسات اونلاين",
      link: "",
    },
    {
      title: "معسكرات التدريب",
      link: "",
    },
  ];
  const pathname = usePathname();

  const [active2, setActive2] = useState<null | number>(null);
  return (
    <div>
      <div className="flex items-start bg-white lg:justify-center lg:items-center flex-col lg:flex-row border border-border xl:divide-x  divide-border p-5 rounded">
        {contact.map((contact, index) => (
          <div key={index} className=" flex justify-center items-center gap-[15px] py-[20px] lg:px-[20px]  ">
            <div className="bg-gradient-to-br from-[#f2f3f8] via-white to-white p-[24px] rounded-[15px] border border-border flex justify-center items-center w-fit">
              {contact.icon}
            </div>
            <div className="flex flex-col items-start gap-[5px]">
              <h4 className="tracking-[-0.32px]"> {contact.title} </h4>
              <p className="text-dark-gray tracking-[-0.32px]"> {contact.description} </p>
            </div>
          </div>
        ))}
      </div>
      <Section isWhite>
        <div className="grid gap-[39px]">
          <div className="bg-background rounded-[15px] grid gap-[72px] py-[50px]">
            <div className=" flex flex-col lg:flex-row justify-center px-5  gap-[56px] lg:gap-[106px] flex-wrap">
              <ul className="grid gap-[30px] max-w-[41%]">
                <li className="flex items-center text-[18px] font-semibold gap-[5px] leading-[150%] tracking-[-0.36px]">
                  <Image src={logo} alt="logo" width={54} height={54} />
                  ديوكس
                </li>
                <li className="leading-[25px] text-dark-gray ">
                  هدفنا هو مساعدتك في الحصول علي افضل التدريبات المتخصصة في أمن المعلومات من خبراء امنين علي اعلي مستوي
                  في جميع مجالات أمن المعلومات
                </li>
                <li className="text-[25px] leading-[25px] ">تابعنا</li>
                <li className="flex gap-[15px]">
                  <a href="#">
                    <div className="hover:text-second-primary-color transition-all duration-300 size-[48px] flex justify-center items-center bg-white rounded-[15px]">
                      <Facebook className="" />
                    </div>
                  </a>
                  <a href="#">
                    <div className="hover:text-second-primary-color transition-all duration-300 size-[48px] flex justify-center items-center bg-white rounded-[15px]">
                      <Telegram className="" />
                    </div>
                  </a>
                  <a href="#">
                    <div className="hover:text-second-primary-color transition-all duration-300 size-[48px] flex justify-center items-center bg-white rounded-[15px]">
                      <LinkedIN className="" />
                    </div>
                  </a>
                  <a href="#">
                    <div className="hover:text-second-primary-color transition-all duration-300 size-[48px] flex justify-center items-center bg-white rounded-[15px]">
                      <Twitter className="" />
                    </div>
                  </a>
                  <a href="#">
                    <div className="hover:text-second-primary-color transition-all duration-300 size-[48px] flex justify-center items-center bg-white rounded-[15px]">
                      <Instagram className="" />
                    </div>
                  </a>
                </li>
              </ul>
              <div>
                <p className="mb-[20px] text-[25px] ">راوبط الموقع</p>

                <ul className="grid gap-[10px] ">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        className={`${
                          pathname === link.link ? "text-foreground" : "text-dark-gray"
                        } hover:text-foreground`}
                        href={link.link}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-[20px] text-[25px]">خدمات المنصة</p>
                <ul className="grid gap-[10px] ">
                  {links2.map((link, index) => (
                    <li key={index}>
                      <Link
                        className={`${active2 === index ? "text-foreground" : "text-dark-gray"} hover:text-foreground`}
                        onClick={() => setActive2(index)}
                        href={link.link}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex border-t border-border flex-col justify-center items-center gap-[12px] pt-[23px]">
              <p className="tracking-[-0.32px]">© جميع الحقوق محفوظة، Dieux.com</p>
              <div className="flex justify-center items-center gap-[15px] text-[14px] text-dark-gray">
                <Link href={""}>سياسة الخصوصية</Link>
                <Link href={""}>الشروط والأحكام</Link>
                <Link href={""}>تواصل معنا</Link>
              </div>
              <FooterLogo width={124.857} height={24.278} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
