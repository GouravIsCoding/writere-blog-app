"use client";

import { useState } from "react";

import { ContentBlockData } from "./ContentBlock";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { blogDisplayType } from "@/schema/blog";
import { editBlogAction } from "@/app/actions/editBlog";
import BlogComp from "./BlogComp";

export default function EditBlog({ blog }: { blog: blogDisplayType }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(
    title: string,
    contentBlocks: ContentBlockData[],
    blogId?: string,
    deleted?: ContentBlockData[]
  ) {
    try {
      setLoading(true);
      const { message, error } = await editBlogAction(
        title,
        contentBlocks,
        blogId || "",
        deleted || []
      );
      setLoading(false);
      if (error) toast.error(error);
      else {
        toast.success(message);
        router.push(`/blog/${blog.id}`);
      }
    } catch (error) {}
  }

  if (blog)
    return (
      <>
        <BlogComp submitFn={onSubmit} loading={loading} blog={blog} />
      </>
    );
}
