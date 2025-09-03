import Image from "next/image";
import Button from "@/components/shared/Button";
import Section from "@/components/shared/Section";
import image from "@/public/images/articalImage.png";
import { About } from "@/public/svg";
export default function index({ isHome, isWhite, isList }: { isHome?: boolean; isWhite?: boolean; isList?: boolean }) {
  return (
    <Section hasTitle={false} isWhite={isWhite || false}>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-[30px] ${!isHome && "pt-[70px]"}`}>
        <div className="">
          <Image src={image} alt="image" className="w-full h-full" />
        </div>

        <div className={`pt-[59px] grid gap-[49px] `}>
          <div className="flex flex-col items-start gap-[42px]">
            <h5 className="text-[20px] leading-[120%] text-second-primary-color tracking-[-0.9px] border border-second-primary-color px-[30px] py-[5px] rounded-full">
              نبذه عنا
            </h5>
            <p className="text44 leading-[67px] font-medium ">
              “سفير الجامعات “: من &quot;Noureldine for Universities&quot; إلى مرجعك الموثوق في التعليم العالي.
            </p>
            <p className="text-[21px] leading-[30px] text-dark-gray">
              نقدم لك المعلومات الموثوقة لنكون شركاء في تحقيق أحلامك المستقبلية. ترقبوا المفاجآت والتحديثات المثيرة
              قريباً!
            </p>
            {isList && (
              <ul className="grid gap-[48px]">
                <li className="text20 leading-[150%] tracking-[-0.6px]">
                  {" "}
                  هدفنا هو مساعدتك في الحصول علي افضل التدريبات المتخصصة في أمن المعلومات من خبراء امنين علي اعلي مستوي
                  في جميع مجالات أمن المعلومات
                </li>
                <li className="text20 leading-[150%] tracking-[-0.6px]">
                  {" "}
                  هدفنا هو مساعدتك في الحصول علي افضل التدريبات المتخصصة في أمن المعلومات من خبراء امنين علي اعلي مستوي
                  في جميع مجالات أمن المعلومات
                </li>
              </ul>
            )}
          </div>

          {!isList && (
            <div className="flex items-center gap-[50px]">
              <div className="text-start grid gap-[10px]">
                <p className="text30 font-bold leading-[150%] tracking-[-0.9px]">
                  100k
                  <span className="text-second-primary-color">+</span>
                </p>
                <p className="text18 leading-[150%] tracking-[-0.36px] font-medium text-dark-gray">مستفيد من خدمتنا</p>
              </div>
              <div className="text-start grid gap-[10px]">
                <p className="text30 font-bold leading-[150%] tracking-[-0.9px]">
                  10k 
                  <span className="text-second-primary-color">+</span>
                </p>
                <p className="text18 leading-[150%] tracking-[-0.36px] font-medium text-dark-gray">استشارة  عن الجامعات</p>
              </div>
              <div className="text-start grid gap-[10px]">
                <p className="text30 font-bold leading-[150%] tracking-[-0.9px]">
                  300Y
                  <span className="text-second-primary-color">+</span>
                </p>
                <p className="text18 leading-[150%] tracking-[-0.54px] font-medium text-dark-gray">خبره في المجال</p>
              </div>
            </div>
          )}
          {isHome && (
            <div className="flex items-center justify-start">
              <Button icon={<About />} title="تعرف علينا اكثر" isLink link="/about-us" />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
