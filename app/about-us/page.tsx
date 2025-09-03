import { AboutUse,ContactUs,FAQ,WhyOurContain, WhyUs } from "@/components/shared";
import WhyUsAbout from '@/components/about-us/WhyUsAbout'
export default function page() {
  return (
    <div>
      <AboutUse isWhite/>
      <WhyUs/>
      <WhyUsAbout/>
      <WhyOurContain />
      {/* <AboutUse isList/> */}
      <FAQ isWhite />
      <ContactUs isHome />
    </div>
  );
}
