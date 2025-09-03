import { Card, Section } from "@/components/shared";
import Image from "next/image";
import image from "@/public/images/articalImage.png";
import { Gear } from "@/public/svg";
export default function index() {
  return (
    <Section isWhite hasTitle title="لماذا نحن ؟" subTitle="لماذا تختار محتوانا ؟">
      <div className="grid gap-[30px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          <div className="flex flex-col justify-center items-start gap-[31px]">
            <h3 className="text-[40px] tracking-[-0.8px]">
              أبدأ رحلة التعلم الخاصة بك الان! أبدأ رحلة التعلم الخاصة بك الان!
            </h3>
            <p className="tex-[18px] leading-[150%] tracking-[-0.108px] text-dark-gray">
              يوفر الكورس محتوى شامل يغطي مختلف جوانب البرمجة بشكل شامل، مما يساعد الطلاب على فهم المفاهيم الأساسية
              والمتقدمة في عالم البرمجة.يوفر الكورس محتوى شامل يغطي مختلف جوانب البرمجة بشكل شامل، مما يساعد الطلاب على
              فهم المفاهيم الأساسية والمتقدمة في عالم البرمجة.
            </p>
          </div>
          <div>
            <Image src={image} alt="image" width={788} height={392} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
          <Card
            isBordered
            description="نقدم محتوى تدريبيًا يغطي جميع الجوانب الأساسية والمتقدمة في مجال أمن المعلومات، مصمم خصيصًا لتلبية احتياجات المبتدئين والمحترفين."
            title="محتوى متقدم وشامل"
            icon={<Gear />}
          />
          <Card
            isBordered
            description="نقدم محتوى تدريبيًا يغطي جميع الجوانب الأساسية والمتقدمة في مجال أمن المعلومات، مصمم خصيصًا لتلبية احتياجات المبتدئين والمحترفين."
            title="محتوى متقدم وشامل"
            icon={<Gear />}
          />
          <Card
            isBordered
            description="نقدم محتوى تدريبيًا يغطي جميع الجوانب الأساسية والمتقدمة في مجال أمن المعلومات، مصمم خصيصًا لتلبية احتياجات المبتدئين والمحترفين."
            title="محتوى متقدم وشامل"
            icon={<Gear />}
          />
        </div>
      </div>
    </Section>
  );
}
