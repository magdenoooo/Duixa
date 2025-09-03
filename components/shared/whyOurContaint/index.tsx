import { Card, Section } from "@/components/shared";
import Button from "@/components/shared/Button";
import { About, ChickRight, Gear } from "@/public/svg";

export default function index() {
  return (
    <Section
      isWhite={false}
      hasTitle
      subTitle="لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)"
      title="لماذا تختار محتوانا ؟ "
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
        <div className="flex flex-col gap-[67px] items-start">
          <h3 className="text-[40px] leading-normal tracking-[-0.8px]">
            أبدأ رحلة التعلم الخاصة بك الان! أبدأ رحلة التعلم الخاصة بك الان!
          </h3>
          <ul className="grid gap-[17px]">
            <li className="text-[20px] leading-normal tracking-[-0.4] flex justify-start items-center gap-[10px]">
              <ChickRight />
              محتوي مجدد باستمرار
            </li>
            <li className="text-[20px] leading-normal tracking-[-0.4] flex justify-start items-center gap-[10px]">
              <ChickRight />
              اختبارات علمية علي المحتوي
            </li>
            <li className="text-[20px] leading-normal tracking-[-0.4] flex justify-start items-center gap-[10px]">
              <ChickRight />
              مصادر حديثة
            </li>
            <li className="text-[20px] leading-normal tracking-[-0.4] flex justify-start items-center gap-[10px]">
              <ChickRight />
              مركز تدريبات اونلاين{" "}
            </li>
            <li className="text-[20px] leading-normal tracking-[-0.4] flex justify-start items-center gap-[10px]">
              <ChickRight />
              مجتمع لمساعدتك في المشاكل{" "}
            </li>
            <li className="text-[20px] leading-normal tracking-[-0.4] flex justify-start items-center gap-[10px]">
              <ChickRight />
              دعم فني من المدربين
            </li>
          </ul>
          <Button icon={<About />} title="تعرف علينا اكثر" isLink link="/about-us" />
        </div>
        <div className="grid lg:grid-cols-2 gap-[30px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              description="نقدم محتوى تدريبيًا يغطي جميع الجوانب الأساسية والمتقدمة في مجال أمن المعلومات، مصمم خصيصًا لتلبية احتياجات المبتدئين والمحترفين."
              icon={<Gear />}
              title="محتوى متقدم وشامل"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
