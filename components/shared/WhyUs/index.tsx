import { Card } from "@/components/shared";
import Section from "@/components/shared/Section";
import { Gear } from "@/public/svg";
export default function index() {

  return (
    <Section hasTitle title="خدماتنا وما الزي نقدمه" subTitle="لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)" isWhite={false}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            icon={<Gear className="size-[40px]" />}
            title="محتوى متقدم وشامل"
            description="نقدم محتوى تدريبيًا يغطي جميع الجوانب الأساسية والمتقدمة في مجال أمن المعلومات، مصمم خصيصًا لتلبية احتياجات
            المبتدئين والمحترفين."
          />
        ))}
      </div>
    </Section>
  );
}
