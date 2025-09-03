import image from "@/public/images/articalImage.png";
import ProductsHero from "@/components/shared/ProductsHero";
import { BlogCard } from "@/components/shared/Cards/BlogCard";
export default function page() {
  return (
    <div>
      <ProductsHero
        isWhite
        title=" افضل المقالات الموجوده عندنا"
        subtitle="استعدي لإضافة لمسة ساحرة الى بيتك ف لا مكان مثل البيت"
        buttons={["الكل", "المنظفات", "غسيل", "مسحوق"]}
      >
        <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogCard
              key={index}
              image={image}
              title="عنوان المقالة"
              description="لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)"
              timeAgo="منذ 3 أيام"
              tags={["تكنولوجيا", "برمجة", "تصميم", "تطوير"]}
            />
          ))}
        </div>
      </ProductsHero>
    </div>
  );
}
