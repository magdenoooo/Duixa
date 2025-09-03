import React from "react";
import SingleCard from "@/components/single-product/SideCard";
import ImagesViewBox from "@/components/single-product/ImagesViewBox";
import { Radar3, CupFirst, StarsMinimalistic, What } from "@/public/svg";
import data from "@/data.json";
import { JSX } from "react/jsx-runtime";
import ProductContent from "@/components/single-product/ProductContent";
import OtherViewProduct from "@/components/single-product/OtherViewProduct";
import { ContactUs } from "@/components/shared";
export default function page() {
  const icons: Record<string, JSX.Element> = {
    Radar3: <Radar3 />,
    CupFirst: <CupFirst />,
    StarsMinimalistic: <StarsMinimalistic />,
    What: <What />,
  };
  return (
    <>
      <div className="container mt-[140px] ">
        <div className="flex gap-5 flex-col-reverse lg:flex-row">
          <div className="max-w-[900px] flex flex-col gap-5">
            <div>هنشوفها بعدين دي</div>
            <ImagesViewBox />
            <h2 className="text-[30px] font-medium leading-[150%] w-[90%]">
              بخاخ تنظيف المطبخ سيترو 3 اكس باور عالي التركيز من ديوكس | مزيل شحوم مطبخ قوي لجميع الاغراض للطبخ والشحوم
              لاي سطح، 1 لتر
            </h2>
            <p className="text18 leading-[200%] w-[90%]">
              تتزايد حاجة المجتمع للتطبيقات التي يمكنها تسهيل الأنشطة اليومية مع تقدم التكنولوجيا. تبحث العديد من
              الشركات حاليًا عن مطورين حتى يتمكنوا من بيع المنتجات (السلع أو الخدمات) التي يمكنها الوصول إلى مشترين أوسع
              عبر الإنترنت.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[17px] gap-y-[13px]">
              {data.product_prop.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-[15px] gap-[10px] border border-border rounded-[10px] bg-white"
                >
                  {icons[item.icon]}
                  <div className="flex flex-col gap-[5px]">
                    <h4 className="text-base "> {item.title} </h4>
                    <p className="text-dark-gray">{item.des} </p>
                  </div>
                </div>
              ))}
            </div>
            <ProductContent />
          </div>
          <SingleCard price={200} rating={0.5} totalRating={500} />
        </div>
      </div>
      <OtherViewProduct />
      <div>
        <ContactUs isHome/>
      </div>
    </>
  );
}
