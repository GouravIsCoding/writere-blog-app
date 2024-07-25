"use client";

import { searchBlogAction } from "@/app/actions/searchBlog";
import BlogListItem from "@/components/Blog/blogListItem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { blogListType } from "@/schema/blog";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  let timer: NodeJS.Timeout;
  const inputRef = useRef<HTMLInputElement>(null);
  const [blogArr, setBlogArr] = useState<blogListType[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onInput = async () => {
    const value = inputRef.current?.value;
    if (!value || value === "") return;
    try {
      const {
        data: { blogs },
      } = await searchBlogAction(value);
      if (blogs) setBlogArr(blogs);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const debouncedRequest = async () => {
    clearTimeout(timer);

    timer = setTimeout(onInput, 400);
  };

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="w-full min-h-screen md:w-2/3 mx-auto bg-white p-4 shadow flex flex-col justify-start items-center">
          <div className="mx-auto w-5/6 md:w-1/2 text-center">
            <Label className="text-3xl m-5" htmlFor="search">
              Search
            </Label>
            <Input onInput={debouncedRequest} ref={inputRef} id="search" />
          </div>
          <div className="flex justify-center items-center flex-wrap">
            {blogArr.map((blog) => (
              <li
                className="w-full md:min-w-72 md:w-1/3 list-none my-4 mx-1"
                key={blog.id}
              >
                <BlogListItem blog={blog} />
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
