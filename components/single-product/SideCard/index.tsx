"use client";
import {
  Amazon,
  FolderWithFiles,
  Image461TickCircle,
  Noon,
  TickCircle,
  WatsappWhite,
  YellowStar,
} from "@/public/svg";

interface Props {
  price?: number;
  rating?: number;
  totalRating?: number;
  isProduct?: boolean;
}

export default function SideCard({ price, rating, totalRating, isProduct }: Props) {
  const handleShare = (platform?: "whatsapp") => {
    const shareData = {
      title: "منتج رائع",
      text: "أنصحك بمراجعة هذا المنتج",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (platform === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        `${shareData.text}\n${shareData.url}`
      )}`;
      window.open(whatsappUrl, "_blank");
      return;
    }

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("تمت المشاركة بنجاح"))
        .catch((error) => console.error("خطأ في المشاركة:", error));
    } else {
      navigator.clipboard
        .writeText(`${shareData.text} - ${shareData.url}`)
        .then(() => alert("تم نسخ الرابط للمشاركة!"))
        .catch(() => alert("حدث خطأ أثناء نسخ الرابط."));
    }
  };

  return (
    <div className="lg:w-fit h-fit bg-white p-5 flex flex-col gap-[18px] rounded-[20px] border border-border ">
      {isProduct && (
        <div className="flex items-end justify-between">
          <div className="text30 text-second-primary-color text-right font-semibold ">
            {price?.toFixed(2)} <span className="text-base">جنية مصري</span>
          </div>
          <div className="flex items-center gap-2">
            <YellowStar />
            <span className="text-sm leading-[200%] text-dark-gray">
              {rating} ({totalRating} تقيم)
            </span>
          </div>
        </div>
      )}

      {isProduct && (
        <div className="flex flex-col gap-[15px] p-[15px] bg-background rounded-[15px] border border-border ">
          <h3 className="text-center text-dark-gray text-base tracking-[0.16px]">
            روابط شراء المنتج
          </h3>
          <div className="flex items-center gap-[10px]">
            <button className="px-[30px] py-[16px] bg-orange flex items-center justify-center gap-[10px] rounded-full h-[52px] border border-border text-base font-medium text-white">
              رابط المنتج أمازون
              <Amazon />
            </button>
            <button className="px-[30px] py-[16px] bg-yellow flex items-center justify-center gap-[10px] rounded-full h-[52px] border border-border text-base font-medium text-[#383B42]">
              رابط المنتج نون
              <Noon />
            </button>
          </div>
          <button className="px-[30px] py-[16px] bg-foreground flex items-center justify-center gap-[10px] rounded-full h-[52px] border border-border text-base font-medium text-white">
            رابط اخر لجوجل
          </button>
        </div>
      )}

      <div className="flex flex-col gap-[10px] p-[15px] border border-border rounded-[10px]">
        <div className="flex items-center gap-[10px]">
          <FolderWithFiles />
          <span className="text-base font-medium leading-[100%] text-dark-gray">كاتوجري</span>
        </div>
        <div className="grid grid-cols-5 gap-[10px]">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="text-base leading-[24px] px-[10px] py-[5px] flex items-center justify-center border border-border bg-background rounded-[10px] text-dark-gray"
            >
              غسيل
            </span>
          ))}
        </div>
      </div>

      <div className="p-[10px] flex flex-col gap-[18px] rounded-[10px] bg-background">
        <div className="flex items-center gap-[10px]">
          <TickCircle />
          <p className="text-dark-gray text-base leading-[200%] ">
            فهم أساسيات النموذج الأولي والرسوم المتحركة
          </p>
        </div>
        <div className="flex items-center gap-[10px]">
          <TickCircle />
          <p className="text-dark-gray text-base leading-[200%] ">فهم أساسيات MicroInteraction</p>
        </div>
        <div className="flex items-center gap-[10px]">
          <TickCircle />
          <p className="text-dark-gray text-base leading-[200%] ">
            إنشاء الرسوم المتحركة (20 دراسة حالة) لتطبيقات الهاتف
          </p>
        </div>
        <div className="flex items-center gap-[10px]">
          <TickCircle />
          <p className="text-dark-gray text-base leading-[200%] ">تقديم التصاميم باستخدام الرسوم المتحركة</p>
        </div>
      </div>

      <button
        onClick={() => handleShare()}
        className="px-[30px] py-[16px] flex items-center justify-center gap-[10px] rounded-full h-[52px] border border-border text-base font-medium cursor-pointer hover:bg-second-primary-color hover:text-white transition-all duration-300"
      >
        مشاركة للأفادة
        <Image461TickCircle />
      </button>

      <button
        onClick={() => handleShare("whatsapp")}
        className="px-[30px] py-[16px] flex items-center justify-center gap-[10px] rounded-full h-[52px] border border-border text-base font-medium text-white bg-second-primary-color hover:bg-second-primary-color/80 transition-all duration-300 cursor-pointer"
      >
        مشاركة للأفادة
        <WatsappWhite />
      </button>
    </div>
  );
}
