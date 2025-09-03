"use client";
import { PaginationArrow } from "@/public/svg";
import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const [inputValue, setInputValue] = useState(currentPage);
  console.log(inputValue);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputValue(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="cursor-pointer disabled:pointer-events-none p-[10.94px] text-second-primary-color border border-border bg-[#f9f9fc]  rounded-[7.778px] flex items-center justify-center disabled:text-dark-gray"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PaginationArrow className="rotate-180" />
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        if (index === 0 || index === totalPages - 1 || Math.abs(currentPage - (index + 1)) <= 1) {
          return (
            <button
              key={index}
              className={`cursor-pointer p-[10.94px] size-[40px] text-second-primary-color border border-border bg-[#f9f9fc] rounded-[7.778px] flex items-center justify-center ${
                currentPage === index + 1 ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          );
        } else if (index === 1 || index === totalPages - 2) {
          return (
            <span
              key={index}
              className=" p-[10.94px] size-[40px] text-second-primary-color border border-border bg-[#f9f9fc] rounded-[7.778px] flex items-center justify-center"
            >
              ...
            </span>
          );
        }
        return null;
      })}
      <button
        className="cursor-pointer disabled:pointer-events-none p-[10.94px] text-second-primary-color border border-border bg-[#f9f9fc]  rounded-[7.778px] flex items-center justify-center disabled:text-dark-gray"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <PaginationArrow />
      </button>
    </div>
  );
}
