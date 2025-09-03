import React from "react";
import SingleCard from "@/components/single-product/SideCard";
import Image from "next/image";
import image from "@/public/images/image-view1.png";
export default function page() {
  return (
    <>
      <div className="container mt-[140px] ">
        <div className="flex gap-5 flex-col-reverse lg:flex-row">
          <div className="max-w-[900px] flex flex-col gap-5">
            <div>هنشوفها بعدين دي</div>
            <Image src={image} alt="Product Image" width={1080} height={619} />
            <h2 className="text-[30px] font-medium leading-[150%] w-[90%]">
              حترم شركة Dieux خصوصيتك وتلتزم بحماية بياناتك الشخصية
            </h2>
            <p className="text18 leading-[200%] w-[90%]">
              تتزايد حاجة المجتمع للتطبيقات التي يمكنها تسهيل الأنشطة اليومية مع تقدم التكنولوجيا. تبحث العديد من
              الشركات حاليًا عن مطورين حتى يتمكنوا من بيع المنتجات (السلع أو الخدمات) التي يمكنها الوصول إلى مشترين أوسع
              عبر الإنترنت.
            </p>
            <p className="text18 leading-[200%] w-[90%]">
              تتزايد حاجة المجتمع للتطبيقات التي يمكنها تسهيل الأنشطة اليومية مع تقدم التكنولوجيا. تبحث العديد من
              الشركات حاليًا عن مطورين حتى يتمكنوا من بيع المنتجات (السلع أو الخدمات) التي يمكنها الوصول إلى مشترين أوسع
              عبر الإنترنت.
            </p>
            <p className="text18 leading-[200%] w-[90%]">
              تتزايد حاجة المجتمع للتطبيقات التي يمكنها تسهيل الأنشطة اليومية مع تقدم التكنولوجيا. تبحث العديد من
              الشركات حاليًا عن مطورين حتى يتمكنوا من بيع المنتجات (السلع أو الخدمات) التي يمكنها الوصول إلى مشترين أوسع
              عبر الإنترنت.
            </p>
            <p className="text18 leading-[200%] w-[90%]">
              تتزايد حاجة المجتمع للتطبيقات التي يمكنها تسهيل الأنشطة اليومية مع تقدم التكنولوجيا. تبحث العديد من
              الشركات حاليًا عن مطورين حتى يتمكنوا من بيع المنتجات (السلع أو الخدمات) التي يمكنها الوصول إلى مشترين أوسع
              عبر الإنترنت.
            </p>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[17px] gap-y-[13px]">
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
            </div> */}
            {/* <ProductContent /> */}
          </div>
          <SingleCard/>
        </div>
      </div>
      {/* <OtherViewProduct /> */}
      {/* <div>
        <ContactUs isHome />
      </div> */}
    </>
  );
}
