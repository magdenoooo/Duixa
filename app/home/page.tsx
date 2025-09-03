import {
  DukesAchievements,
  HeroSection,
  WhayUs,
  CustomersReviews,
  WhyOurContain,
  ContactUs,
  ArticlesSection,
} from "@/components/Home";
import BlogsSection from "@/components/Home/BlogsSection";
import { AboutUse, FAQ } from "@/components/shared";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <ArticlesSection />
      <AboutUse isHome />
      <DukesAchievements />
      <div id="services">
      <WhayUs />
      </div>
      <CustomersReviews />
      <WhyOurContain />
      <BlogsSection />
      <FAQ  isWhite={false} />
      <ContactUs isHome />
    </div>
  );
}
//ArticlesSection
