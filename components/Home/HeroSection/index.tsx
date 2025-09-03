import stars from "@/public/images/starContainer.png";
import { Messenger, Phoneside, Telegramside, Whatsappside } from "@/public/svg";
import Image from "next/image";
// import image from "@/public/images/image.jpg";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
export default function HeroSection() {
  const littleCard = [
    {
      title: "طلاب معنا",
      analyst: "100k",
    },
    {
      title: "جامعات موجودة",
      analyst: "70",
    },
    {
      title: "كليات موجودة",
      analyst: "1500",
    },
    {
      title: "تخصص موجودة",
      analyst: "300",
    },
  ];
  return (
    <div className="container py-[100px] relative ">
      <div className="fixed left-[36px] space-y-[13px]  bottom-[10%] z-[100]">
        <Messenger className=" xl:size-[50px] hover:scale-110 cursor-pointer transition-all" />
        <Telegramside className=" xl:size-[50px] hover:scale-110 cursor-pointer transition-all" />
        <Phoneside className=" xl:size-[50px] hover:scale-110 cursor-pointer transition-all" />
        <Whatsappside className=" xl:size-[50px] hover:scale-110 cursor-pointer transition-all" />
      </div>
      <div className="flex mt-[50px] justify-center items-center flex-col gap-[15px] xl:gap-[30px]">
        <h5 className="text20 text-second-primary-color leading-[134%] tracking-[-0.6px]">اهلا بك في ديوكس 👋</h5>
        <div className="text53 font-semibold xl:leading-[92px]  text-center">
          <p>أناقة صممناها من أجلك.!</p>
          <p>تكتمل بها هوية مطبخك وأسلوب حياتك</p>
        </div>
        <p className="text20 font-normal leading-normal tracking-[-0.6px]">ديوكس .. اختيارك الأول والأفضل</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[60px]">
          {littleCard.map((card) => (
            <div key={card.title} className="flex flex-col ">
              <p className="text-center text-[40px] font-bold leading-[150%] tracking-[-1.2px]">
                {card.analyst}
                <span className="text-second-primary-color">+</span>
              </p>
              {/* text18 */}
              <h4 className="text-center  font-medium leading-[150%] tracking-[-0.36px]">{card.title}</h4>
            </div>
          ))}
        </div>
        <div className="relative  rounded-[35px] mt-[60px]  px-4 lg:px-0">
          {/* <Image
            src={image}
            alt="image"
            height={557}
            width={1240.97559}
            className="border rounded-[35px] w-full h-[557px] object-cover"
          /> */}
            <HeroVideoDialog
              className="block dark:hidden"
              animationStyle="from-center"
              videoSrc="Imagine for 1 Minute.mp4"
              thumbnailSrc="/image.jpg"
              thumbnailAlt="Hero Video"
            />
            {/* <HeroVideoDialog
              className="hidden dark:block"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
              thumbnailAlt="Hero Video"
            /> */}
        </div>
      </div>
      <div className="container mt-[60px] ">
        <div className="flex flex-col justify-center items-center py-[60px] bg-second-primary-color/10 md:px-[100px] xl:px-[237px] rounded-[41px] mt-[60px] max-w-[1240.97559px] mx-auto">
          <Image src={stars} alt="stars" width={268} height={56.4} />
          <h1 className="text-center text60">المسحوق رقم 1# في الوطن العربي</h1>
        </div>
      </div>
      <div></div>
    </div>
  );
}
