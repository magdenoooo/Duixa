"use client";
import { BoltCircle, DocumentText, DownloadMinimalistic, FileText, InfoSquare } from "@/public/svg";
import Link from "next/link";
import { useState } from "react";

interface ProductContentProps {
  product: any;
}

export default function ProductContent({ product }: ProductContentProps) {
  const [active, setActive] = useState(0);
  
  return (
    <div className="pt-[30px]  lg:p-[30px] flex flex-col gap-[30px] bg-gradient-to-b from-background via-transparent via-10%  border border-border rounded-[20px]">
      <div className=" flex items-center justify-center">
        <Link
          onClick={() => {
            setActive(0);
          }}
          className={`${
            active === 0
              ? "after:w-[80%] after:h-[4px] after:bg-foreground after:content-[''] relative after:absolute after:bottom-0 after:rounded-t-full after:-translate-x-1/2 after:left-1/2"
              : "opacity-50"
          } px-[10px] pb-[13px] text18 font-medium leading-[150%] `}
          href={"#product-details"}
        >
          تفاصيل المنتج
        </Link>
        <Link
          onClick={() => {
            setActive(1);
          }}
          className={`${
            active === 1
              ? "after:w-[80%] after:h-[4px] after:bg-foreground after:content-[''] relative after:absolute after:bottom-0 after:rounded-t-full after:-translate-x-1/2 after:left-1/2"
              : "opacity-50"
          } px-[10px] pb-[13px] text18 font-medium leading-[150%] `}
          href={"#product-describe"}
        >
          وصف المنتج
        </Link>
        <Link
          onClick={() => {
            setActive(2);
          }}
          className={`${
            active === 2
              ? "after:w-[80%] after:h-[4px] after:bg-foreground after:content-[''] relative after:absolute after:bottom-0 after:rounded-t-full after:-translate-x-1/2 after:left-1/2"
              : "opacity-50"
          } px-[10px] pb-[13px] text18 font-medium leading-[150%] `}
          href={"#attachments"}
        >
          تفاصيل المنتج
        </Link>
      </div>
      <div className="p-[20px] border border-border rounded-[20px] bg-white flex flex-col gap-[30px]">
        <div id="product-details" className="p-[20px] border border-border rounded-[20px] flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="border border-border rounded-[10px] size-[62px] bg-[#f9f9fc] flex items-center justify-center">
              <InfoSquare />
            </div>
            <h3 className="text24 font-semibold leading-[150%]">تفاصيل المنتج</h3>
          </div>

          {product?.product_details && product.product_details.length > 0 ? (
            <table className="flex gap-[10px] w-full">
              <thead className="flex-1">
                {product.product_details.map((detail, index) => (
                  <tr key={index} className={`${index > 0 ? 'mt-[10px]' : ''} w-full bg-[#F8F9FA] border border-border p-[10px] flex items-center justify-center rounded-[10px]`}>
                    <td className="text-16 text-nowrap text-center leading-[24px] font-medium">
                      {detail.key}
                    </td>
                  </tr>
                ))}
              </thead>
              <tbody className="flex-2">
                {product.product_details.map((detail, index) => (
                  <tr key={index} className={`${index > 0 ? 'mt-[10px]' : ''} border border-border p-[10px] flex items-center justify-start rounded-[10px]`}>
                    <td className="text-dark-gray text-16 text-nowrap text-start leading-[24px] font-medium">
                      {detail.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-dark-gray py-4">
              لا توجد تفاصيل متاحة للمنتج
            </div>
          )}
        </div>

        <div id="product-describe" className="p-[20px] border border-border rounded-[20px] flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="border border-border rounded-[10px] size-[62px] bg-[#f9f9fc] flex items-center justify-center">
              <BoltCircle />
            </div>
            <h3 className="text24 font-semibold leading-[150%]">وصف المنتج</h3>
          </div>
          <div className="flex flex-col gap-[20px]">
            {product?.notes ? (
              <div 
                className="text18 leading-[200%] text-right prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: product.notes }}
              />
            ) : (
              <p className="text18 leading-[200%] text-right text-dark-gray">
                لا توجد تفاصيل إضافية متاحة للمنتج
              </p>
            )}
          </div>
        </div>

        <div id="attachments" className="p-[20px] border border-border rounded-[20px] flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="border border-border rounded-[10px] size-[62px] bg-[#f9f9fc] flex items-center justify-center">
              <DocumentText />
            </div>
            <h3 className="text24 font-semibold leading-[150%]">مرفقات</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
            {product?.files && product.files.length > 0 ? (
              product.files.map((file, index) => (
                <div key={index} className="flex items-center gap-[16px] p-4 border border-border bg-white rounded-[12px]">
                  <div className="size-[51px] flex items-center justify-center bg-primary-one rounded-[10px]">
                    <FileText />
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <h3 className="text-base">{file.name}</h3>
                    <p className="text-sm text-dark-gray">{file.size}</p>
                  </div>
                  <a 
                    href={file.src}
                    download
                    className="flex items-center justify-center size-[38px] rounded-[8px] bg-background hover:bg-second-primary-color hover:text-white transition-all duration-300"
                  >
                    <DownloadMinimalistic />
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-dark-gray py-4">
                لا توجد ملفات متاحة للتحميل
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
