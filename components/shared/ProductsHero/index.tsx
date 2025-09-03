"use client";
import { useCallback, useState } from "react";
import { Section } from "..";
import { Search } from "@/public/svg";
import Pagination from "../Pagination";
import { Meta } from "@/models";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  title: string;
  subtitle: string;
  buttons: string[];
  children: React.ReactNode;
  isWhite?: boolean;
  meta?: Meta;
  isData: boolean;
}

export default function ProductsHero({ buttons, subtitle, title, children, isWhite, meta, isData }: Props) {
  const [active, setActive] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleFilterClick = (index: number) => {
    setActive(index);
    if (index === 0) {
      router.push("?" + createQueryString("filter", ""));
    } else if (index === 1) {
      router.push("?" + createQueryString("filter", "latest"));
    } else {
      router.push("?" + createQueryString("filter", "featured"));
    }
  };

  return (
    <Section isWhite={isWhite || false}>
      <div className="grid gap-[30px]">
        <div className="flex flex-col items-center gap-[30px] mb-[20px]">
          <div className="flex flex-col gap-[10px]">
            <h2 className="tracking-[-0.396px] text-[36px] leading-[150%] font-semibold text-center">{title}</h2>
            <p className="text-center text-[18px]">{subtitle}</p>
          </div>
          <form className="w-[300px] md:w-[500px] xl:w-[1106px] relative p-5 bg-white rounded-[10px] border border-border shadow-[0px_14px_30px_0px_rgba(0,0,0,0.03)]">
            <input
              id="search"
              type="text"
              placeholder="بحث عن"
              className="leading-[150%] focus:outline-1 outline-border px-5 border border-border bg-background h-[60px] w-full rounded-[10px] placeholder:text-dark-gray pr-[50px]"
            />
            <label htmlFor="search">
              <Search className="absolute right-[40px] top-[50%] translate-y-[-50%]" />
            </label>
          </form>
        </div>

        <div className="flex items-center justify-center gap-[13px]">
          {buttons.map((button, index) => (
            <button
              onClick={() => handleFilterClick(index)}
              className={`px-[30px] py-[12px] flex items-center justify-center rounded-full border border-border bg-background text-sm font-medium leading-6 tracking-[-0.18px] ${
                active === index && "bg-foreground text-white"
              } cursor-pointer`}
              key={index}
            >
              {button}
            </button>
          ))}
        </div>

        {isData ? children: <div className="h-screen flex justify-center text-30 font-semibold text-description"> لا يوجد نتائج لعرضها </div> }

        {meta && isData && (
          <Pagination 
            currentPage={meta.current_page} 
            onPageChange={() => {}} 
            totalPages={meta.last_page} 
          />
        )}
      </div>
    </Section>
  );
}
