import { CategoryCard } from "@/components/shared/Cards/CategoryCard";
import ProductsHero from "@/components/shared/ProductsHero";
import productImage from "@/public/images/61jWT0xRmQL._AC_UL320_ 1.png";
export default async function page() {
  return (
    <div className="mt-[70px]">
      <ProductsHero
      isWhite
        title="منتجات ديوكسا"
        subtitle="استعدي لإضافة لمسة ساحرة الى بيتك ف لا مكان مثل البيت"
        buttons={["الكل", "منظفات", "غسيل", "مسحوق"]}
      >
        <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <CategoryCard
              key={index}
              image={productImage}
              title="مسحوق غسيل للغسالات العادية والاثاث شبه الاوتوماتيكية مع مستخلص عطري من ديوكس"
              price={708.37}
              rating={4.5}
              installmentPrice={34.32}
              freeShipping={true}
              shippingDate="30 أبريل"
              tags={["غسيل", "مسحوق", "تنظيف", "ابراهيم"]}
              totalRating={500}
            />
          ))}
        </div>
      </ProductsHero>
    </div>
  );
}
