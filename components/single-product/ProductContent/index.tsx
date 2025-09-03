"use client";
import { BoltCircle, DocumentText, DownloadMinimalistic, FileText, InfoSquare } from "@/public/svg";
import Link from "next/link";
import { useState } from "react";

export default function ProductContent() {
  const [active, setActive] = useState(0);
  return (
    <div className="pt-[30px]  lg:p-[30px] flex flex-col gap-[30px] bg-gradient-to-b from-background via-transparent via-10%  border border-border rounded-[20px]">
      <div className=" flex items-center justify-center">
        <Link
          onClick={() => {
            setActive(0);
          }}
          className={`${
            active === 0
              ? "after:w-[80%] after:h-[4px] after:bg-foreground after:content-[''] relative after:absolute after:bottom-0 after:rounded-t-full after:-translate-x-1/2 after:left-1/2"
              : "opacity-50"
          } px-[10px] pb-[13px] text18 font-medium leading-[150%] `}
          href={"#product-details"}
        >
          تفاصيل المنتج
        </Link>
        <Link
          onClick={() => {
            setActive(1);
          }}
          className={`${
            active === 1
              ? "after:w-[80%] after:h-[4px] after:bg-foreground after:content-[''] relative after:absolute after:bottom-0 after:rounded-t-full after:-translate-x-1/2 after:left-1/2"
              : "opacity-50"
          } px-[10px] pb-[13px] text18 font-medium leading-[150%] `}
          href={"#product-describe"}
        >
          وصف المنتج
        </Link>
        <Link
          onClick={() => {
            setActive(2);
          }}
          className={`${
            active === 2
              ? "after:w-[80%] after:h-[4px] after:bg-foreground after:content-[''] relative after:absolute after:bottom-0 after:rounded-t-full after:-translate-x-1/2 after:left-1/2"
              : "opacity-50"
          } px-[10px] pb-[13px] text18 font-medium leading-[150%] `}
          href={"#attachments"}
        >
          تفاصيل المنتج
        </Link>
      </div>
      <div className="p-[20px] border border-border rounded-[20px] bg-white flex flex-col gap-[30px]">
        <div id="product-details" className="p-[20px] border border-border rounded-[20px] flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="border border-border rounded-[10px] size-[62px] bg-[#f9f9fc] flex items-center justify-center">
              <InfoSquare />
            </div>
            <h3 className="text24 font-semibold leading-[150%]">تفاصيل المنتج</h3>
          </div>

          <table className="flex gap-[10px]  w-full">
            <thead className="flex-1  ">
              <tr className="w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px] ">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">اسم العلامة التجارية </td>
              </tr>

              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium"> شكل المنتج </td>
              </tr>

              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">رائحة </td>
              </tr>
              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">إحصاء الوحدات </td>
              </tr>

              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">عدد العناصر </td>
              </tr>

              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">نوع التركيبة </td>
              </tr>
              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">استخدامات محددة للمنتج </td>
              </tr>
              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">وزن السلعة </td>
              </tr>
              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">نوع البشرة </td>
              </tr>
              <tr className="mt-[10px] w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]">
                <td className="text-16 text-nowrap  text-center leading-[24px] font-medium">أبعاد السلعة </td>
              </tr>
            </thead>

            <tbody className="flex-2">
              <tr className=" border border-border p-[10px] flex items-center justify-start rounded-[10px] ">
                <td className="text-dark-gray text-16 text-nowrap  text-start leading-[24px] font-medium">DIEUX</td>
              </tr>
              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">مسحوق</td>
              </tr>

              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">خلاصة العطور</td>
              </tr>
              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">1000 Grams</td>
              </tr>
              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">1</td>
              </tr>

              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">كفاءة عالية, مركزة</td>
              </tr>

              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">يُغسل في الغسالة</td>
              </tr>

              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">1 كيلوجرام</td>
              </tr>

              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">الكل</td>
              </tr>

              <tr className="mt-[10px] border border-border p-[10px] flex items-center justify-start rounded-[10px]">
                <td className="text-dark-gray text-16 text-nowrap  text-center leading-[24px] font-medium">
                  50 x 50 x 50 ملي متر
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="product-describe" className="p-[20px] border border-border rounded-[20px] flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="border border-border rounded-[10px] size-[62px] bg-[#f9f9fc] flex items-center justify-center">
              <BoltCircle />
            </div>
            <h3 className="text24 font-semibold leading-[150%]">وصف المنتج</h3>
          </div>
          <div className="flex flex-col gap-[20px]">
            <p className="text18 leading-[200%] text-right">
              تتزايد حاجة المجتمع للتطبيقات التي يمكنها تسهيل الأنشطة اليومية مع تقدم التكنولوجيا. تبحث العديد من
              الشركات حاليًا عن مطورين حتى يتمكنوا من بيع المنتجات (السلع أو الخدمات) التي يمكنها الوصول إلى مشترين أوسع
              عبر الإنترنت. لكي نصبح مطورين، لا يتعين علينا أن نفهم كل علوم التصميم، ولكن على الأقل يمكننا معرفة
              الأساسيات حتى نتمكن من تحويل التصميم إلى كود إلى تطبيق كامل بشكل أكثر فعالية. هذا الفصل هو الوسيلة
              المناسبة لتعلم التصميم والبرمجة في نفس الوقت. باستخدام Mentor، ستتمكن من إنشاء تطبيقات مفيدة عن طريق إضافة
              رسوم متحركة إلى التطبيقات التي تم تصميمها لجعلها أكثر تشويقًا وتفاعلية. سيشرح الموجهون الخبراء لدينا كيفية
              إنشاء تطبيق أثاث بدءًا من مرحلة التصميم وحتى مرحلة البرمجة باستخدام إطار عمل Google Flutter SDK الرائد.
              باستخدام أداة التصميم الشهيرة Figma، سوف تتعلم أساسيات إنشاء نماذج بالحجم الطبيعي التفاعلية كتوضيح في
              تطبيق ما أو المعروف باسم النموذج الأولي. بعد ذلك سوف تتعلم كيفية تطبيق الرسوم المتحركة بين الشاشات لإضفاء
              الحيوية على النموذج الأولي. بعد ذلك، ستستمر العملية في التقطيع باستخدام مجموعة متنوعة من أدوات Flutter
              Widgets الجاهزة للاستخدام، بحيث يكون عمل المطور أكثر كفاءة، مما يوفر الوقت والجهد. هذا الفصل مناسب لأولئك
              منكم الذين يرغبون في تعميق التطوير الكامل لتطبيقات الهاتف المحمول على الجانب الأمامي. لاحقًا، يمكن أن يصبح
              التطبيق الذي تم إنشاؤه بنجاح بمثابة محفظة للتقدم للعمل أو لاحتياجات عملك الشخصية. إذا واجهت صعوبات أثناء
              الدراسة، من فضلك اسأل معلمنا مباشرة من خلال مجموعة Telegram، حسنًا؟ سجل الآن ونحن ننتظر في الصف!
            </p>
            <p className="text18 leading-[200%] text-right">
              سيشرح الموجهون الخبراء لدينا كيفية إنشاء تطبيق أثاث بدءًا من مرحلة التصميم وحتى مرحلة البرمجة باستخدام
              إطار عمل Google Flutter SDK الرائد. باستخدام أداة التصميم الشهيرة Figma، سوف تتعلم أساسيات إنشاء نماذج
              بالحجم الطبيعي التفاعلية كتوضيح في تطبيق ما أو المعروف باسم النموذج الأولي. بعد ذلك سوف تتعلم كيفية تطبيق
              الرسوم المتحركة بين الشاشات لإضفاء الحيوية على النموذج الأولي. بعد ذلك، ستستمر العملية في التقطيع باستخدام
              مجموعة متنوعة من أدوات Flutter Widgets الجاهزة للاستخدام، بحيث يكون عمل المطور أكثر كفاءة، مما يوفر الوقت
              والجهد.
            </p>
            <p className="text18 leading-[200%] text-right">
              هذا الفصل مناسب لأولئك منكم الذين يرغبون في تعميق التطوير الكامل لتطبيقات الهاتف المحمول على الجانب
              الأمامي. لاحقًا، يمكن أن يصبح التطبيق الذي تم إنشاؤه بنجاح بمثابة محفظة للتقدم للعمل أو لاحتياجات عملك
              الشخصية. إذا واجهت صعوبات أثناء الدراسة، من فضلك اسأل معلمنا مباشرة من خلال مجموعة Telegram، حسنًا؟ سجل
              الآن ونحن ننتظر في الصف!
            </p>
          </div>
        </div>

        <div id="attachments" className="p-[20px] border border-border rounded-[20px] flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="border border-border rounded-[10px] size-[62px] bg-[#f9f9fc] flex items-center justify-center">
              <DocumentText />
            </div>
            <h3 className="text24 font-semibold leading-[150%]">مرفقات</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
           
            <div className="flex items-center gap-[16px] p-4 border border-border bg-white rounded-[12px]">
              <div className="size-[51px] flex items-center justify-center bg-primary-one rounded-[10px]">
                <FileText />
              </div>
              <div className="flex flex-col gap-[3px]">
                <h3 className="text-base ">ملف الحصه الاوله للتحميل.PDF</h3>
                <p className="text-sm text-dark-gray">200 KB</p>
              </div>
              <button className="flex items-center justify-center size-[38px] rounded-[8px] bg-background">
                <DownloadMinimalistic/>
              </button>
            </div>
            <div className="flex items-center gap-[16px] p-4 border border-border bg-white rounded-[12px]">
              <div className="size-[51px] flex items-center justify-center bg-primary-one rounded-[10px]">
                <FileText />
              </div>
              <div className="flex flex-col gap-[3px]">
                <h3 className="text-base ">ملف الحصه الاوله للتحميل.PDF</h3>
                <p className="text-sm text-dark-gray">200 KB</p>
              </div>
              <button className="flex items-center justify-center size-[38px] rounded-[8px] bg-background">
                <DownloadMinimalistic/>
              </button>
            </div>
            <div className="flex items-center gap-[16px] p-4 border border-border bg-white rounded-[12px]">
              <div className="size-[51px] flex items-center justify-center bg-primary-one rounded-[10px]">
                <FileText />
              </div>
              <div className="flex flex-col gap-[3px]">
                <h3 className="text-base ">ملف الحصه الاوله للتحميل.PDF</h3>
                <p className="text-sm text-dark-gray">200 KB</p>
              </div>
              <button className="flex items-center justify-center size-[38px] rounded-[8px] bg-background">
                <DownloadMinimalistic/>
              </button>
            </div>
            <div className="flex items-center gap-[16px] p-4 border border-border bg-white rounded-[12px]">
              <div className="size-[51px] flex items-center justify-center bg-primary-one rounded-[10px]">
                <FileText />
              </div>
              <div className="flex flex-col gap-[3px]">
                <h3 className="text-base ">ملف الحصه الاوله للتحميل.PDF</h3>
                <p className="text-sm text-dark-gray">200 KB</p>
              </div>
              <button className="flex items-center justify-center size-[38px] rounded-[8px] bg-background">
                <DownloadMinimalistic/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
