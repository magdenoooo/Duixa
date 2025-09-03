import React from "react";
import { useBlog } from "@/hooks/useApi";
import SingleCard from "@/components/single-product/SideCard";
import Image from "next/image";

export default function page({ params }) {
  const blogId = params?.blog;
  
  return (
    <>
      <BlogPageContent blogId={blogId} />
    </>
  );
}

function BlogPageContent({ blogId }) {
  const { data: blogData, isLoading, error } = useBlog(blogId);
  const blog = blogData?.data;

  if (isLoading) {
    return (
      <div className="container mt-[140px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-dark-gray">جاري تحميل المقال...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mt-[140px]">
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-red-500">حدث خطأ في تحميل المقال</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-[140px]">
      <div className="flex gap-5 flex-col-reverse lg:flex-row">
        <div className="max-w-[900px] flex flex-col gap-5">
          {blog.image && (
            <Image 
              src={blog.image} 
              alt={blog.title} 
              width={1080} 
              height={619} 
              className="rounded-[15px]"
            />
          )}
          <h2 className="text-[30px] font-medium leading-[150%] w-[90%]">
            {blog.title}
          </h2>
          <div 
            className="text18 leading-[200%] w-[90%] prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center gap-[10px] mt-5">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-[10px] py-[5px] rounded-[10px] bg-background border border-border text-base leading-[24px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <SingleCard />
      </div>
    </div>
  );
}
