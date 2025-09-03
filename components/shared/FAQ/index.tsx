import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Section from "@/components/shared/Section";
export default function index({ isWhite }: { isWhite: boolean }) {
  const faqData = [
    {
      id: 1,
      question: "ما هي طبيعة التدريبات التي تقدمونها؟",
      answer:
        "نقدم تدريبات شاملة تغطي أساسيات أمن المعلومات، اختبارات الاختراق، تحليل البرمجيات الخبيثة، تأمين الشبكات، وإدارة الحوادث السيبرانية.",
    },
    {
      id: 2,
      question: "هل التدريبات متاحة للمبتدئين أم للمحترفين فقط؟",
      answer:
        "تدريباتنا مصممة لتناسب جميع المستويات، بدءًا من المبتدئين الذين يرغبون في التعرف على مجال أمن المعلومات وحتى المحترفين الباحثين عن تطوير مهاراتهم.",
    },
    {
      id: 3,
      question: "هل التدريبات تقدم شهادات معتمدة؟",
      answer: "نعم، جميع تدريباتنا مصحوبة بشهادات معتمدة دوليًا، مما يساعدك على تعزيز ملفك المهني.",
    },
    {
      id: 4,
      question: "هل المحتوى التدريبي يتم تحديثه باستمرار؟",
      answer:
        "نحن نلتزم بتحديث المحتوى التدريبي دوريًا لمواكبة أحدث التهديدات السيبرانية والتقنيات المستخدمة في أمن المعلومات.",
    },
    {
      id: 5,
      question: "هل التدريبات تعتمد على الجانب العملي؟",
      answer:
        "بالتأكيد، نقدم تطبيقات عملية وتحديات محاكاة لاختبارات الاختراق وتحليل التهديدات لتطوير مهاراتك بشكل عملي.",
    },
    {
      id: 6,
      question: "كيف يمكنني التسجيل في التدريبات؟",
      answer: "يمكنك التسجيل بسهولة من خلال الموقع الإلكتروني، فقط اختر الدورة التي تناسبك واتبع خطوات الدفع والتسجيل.",
    },
    {
      id: 7,
      question: "هل أحتاج إلى تجهيزات معينة لحضور التدريبات؟",
      answer:
        "ستحتاج فقط إلى جهاز كمبيوتر واتصال بالإنترنت. سيتم مشاركتك بجميع الأدوات والبرمجيات اللازمة أثناء التدريب.",
    },
    {
      id: 8,
      question: "هل هناك دعم فني خلال التدريب؟",
      answer: "نعم، نقدم دعمًا فنيًا واستشاريًا على مدار الساعة للإجابة على جميع استفساراتك خلال فترة التدريب.",
    },
    {
      id: 9,
      question: "ما هي طرق الدفع المتاحة؟",
      answer:
        "نوفر عدة طرق للدفع، بما في ذلك الدفع عبر البطاقات الائتمانية، التحويلات البنكية، وخيارات الدفع الإلكتروني.",
    },
    {
      id: 10,
      question: "هل يمكنني استرداد الرسوم في حال عدم إكمال الدورة؟",
      answer: "نعم، لدينا سياسة استرداد مرنة. يمكنك التواصل معنا لمعرفة الشروط والأحكام.",
    },
  ];
  return (
    <Section
      isWhite={isWhite}
      hasTitle
      title="الاسئلة"
      subTitle="لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)"
    >
      <Accordion
        type={"single"}
        collapsible
        defaultValue={`item-1`}
        className="grid gap-[30px] transition-all duration-300 "
      >
        {faqData.map((faq, index) => (
          <AccordionItem
            value={`item-${index + 1}`}
            key={faq.id}
            className={`${
              isWhite ? "bg-background" : "bg-white"
            } w-full p-[34px] text-[24px] border border-border rounded-[15px] `}
          >
            <AccordionTrigger className="text-[20px] text-right pb-6">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-[18px] text-dark-gray leading-[150%] border-t border-border pt-6">
              {" "}
              {faq.answer}{" "}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
