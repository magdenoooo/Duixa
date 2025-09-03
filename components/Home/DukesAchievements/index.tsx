import Section from "@/components/shared/Section";
import { Send, ShieldCheck, Users } from "@/public/svg";
export default function index() {
  return (
    <Section
      hasTitle
      title="انجزات ديوكس"
      subTitle="لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)"
      isWhite
    >
      <div className="relative px-[56px] pb-[100px] ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] ">
          <div className="flex flex-col items-center justify-center gap-[20px] border border-border py-[30px] rounded-[15px] z-10 bg-white h-[304px]">
            <div className="p-[24px] border border-border rounded-[15px] bg-gradient-to-br  from-[#f1f3f8] via-white to-white ">
              <Users className="size-[61px]" />
            </div>
            <p className="text-[30px] leading-[32px] text-second-primary-color">1500</p>
            <p className="text-base leading-[24px]">شركة مدربة</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-[20px] border border-border py-[30px] rounded-[15px] z-10 bg-white h-[304px]">
            <div className="p-[24px] border border-border rounded-[15px] bg-gradient-to-br  from-[#f1f3f8] via-white to-white ">
              <ShieldCheck className="size-[61px]" />
            </div>
            <p className="text-[30px] leading-[32px] text-second-primary-color">25,600</p>
            <p className="text-base leading-[24px]">متدرب</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-[20px] border border-border py-[30px] rounded-[15px] z-10 bg-white h-[304px]">
            <div className="p-[24px] border border-border rounded-[15px] bg-gradient-to-br  from-[#f1f3f8] via-white to-white ">
              <Send className="size-[61px]" />
            </div>
            <p className="text-[30px] leading-[32px] text-second-primary-color">1200</p>
            <p className="text-base leading-[24px]">استشارة اونلاين</p>
          </div>
        </div>
        <div className="absolute bg-second-primary-color w-full h-[252px] right-0 top-[80%] xl:top-[35%] rounded-[15px] " />
      </div>
    </Section>
  );
}
