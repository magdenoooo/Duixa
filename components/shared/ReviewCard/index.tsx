import { StarsYellow } from "@/public/svg";
import Image from "next/image";
import React from "react";

interface ProfileProps {
  name: string;
  jobTitle: string;
  description: string;
  image: any;
}
export default function index({ name, jobTitle, description, image }: ProfileProps) {
  return (
    <div className="relative max-w-[513px] py-[80px] px-[20px] border border-border flex flex-col items-center gap-[40px]">
      <div className="flex items-center justify-center gap-[12px]">
        <Image src={image} alt="profile" width={60} height={60} className="rounded-full" />
        <div className="">
          <h3 className="text-[20px] leading-[150%]"> {name} </h3>
          <p className="text-[18px] text-dark-gray leading-[150%]"> {jobTitle} </p>
        </div>
      </div>
      <StarsYellow className="absolute left-1/2 -translate-x-1/2 top-[39%] md:top-[38%]" />
      <div className="bg-background p-[30px] pt-[50px] rounded-[15px] ">
        {/* text18 */}
        <p className=" leading-[150%] text-center">{description}</p>
      </div>
    </div>
  );
}
