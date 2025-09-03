import { Section } from "@/components/shared";
import Image from "next/image";
import notFound from "@/public/images/notfound.png";
export default function NotFound() {
  return (
    <Section isWhite={false}>
      <div className="flex flex-col justify-center items-center gap-[72px]">
        <Image src={notFound} alt="notFound" />
        <div className="flex flex-col justify-center items-center gap-[18px]">
          <h2 className="text-[32px] xl:text-[59.811px] text-center">لا توجد نتائج مطابقة</h2>
          <p className="text-[20px] xl:text-[27.342px] font-[500] xl:max-w-[70%] text-center text-dark-gray">نعتذر، لا توجد نتائج مطابقة لبحثك. يرجى التحقق من كتابة البحث بشكل صحيح أو المحاولة بكلمات مختلفة</p>
        </div>
      </div>
    </Section>
  );
}
