import { CarouselApi } from "@/components/ui/carousel";
import { DEFAULT_CACHE_DURATION, Filter_Items, Products_Key } from "@/lib/constants";
import appServices from "@/lib/services";
import { Product } from "@/models";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useProductQuery = ({ isHome }: { isHome: boolean }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { data } = useQuery({
    queryKey: [Products_Key, Filter_Items.LATEST],
    queryFn: appServices.getProductFilterCSR(Filter_Items.LATEST),
    enabled: !!isHome,
    staleTime: DEFAULT_CACHE_DURATION,
  });
  const productLatest = data?.data || ([] as Product[]);
  console.log(data);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return {
    api,
    current,
    count,
    setApi,
    productLatest,
  };
};

export default useProductQuery;
