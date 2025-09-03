import ProductCard from "@/components/shared/Cards/ProductCard";
import ProductsHero from "@/components/shared/ProductsHero";
import appServices from "@/lib/services";
import { Meta, Product } from "@/models";
import image from "@/public/images/image.jpg";
export default async function page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams;
  const filter = params;
  console.log(filter.filter, "search params from products page");
  const data = await appServices.getProductFilterSRR(filter?.filter ?? "");
  const productLatest = data?.data?.data || ([] as Product[]);
  const paginationData = data?.data?.meta || ({} as Meta);
  const isData = productLatest.length;
  
  return (
    <div>
      <ProductsHero
        isData={!!isData}
        meta={paginationData}
        title="منتجات ديوكسا"
        subtitle="استعدي لإضافة لمسة ساحرة الى بيتك ف لا مكان مثل البيت"
        buttons={["الكل", "الاكثر طلبا", "عنايه بالبشره", "منتجات طبيعيه"]}
      >
        <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {productLatest?.map(({ id, in_stock, description, name }) => (
            <ProductCard
              id={id.toString()}
              in_stock={in_stock}
              description={description}
              image={image}
              title={name}
              key={id}
            />
          ))}
        </div>
      </ProductsHero>
    </div>
  );
}
