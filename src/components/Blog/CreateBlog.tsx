"use client";

import { useState } from "react";
import { ContentBlockData } from "./ContentBlock";
import toast from "react-hot-toast";
import { createBlogAction } from "@/app/actions/createBlog";
import { useRouter } from "next/navigation";
import BlogComp from "./BlogComp";

export default function CreateBlog() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function onSubmit(title: string, contentBlocks: ContentBlockData[]) {
    try {
      setLoading(true);
      const { error, data, message } = await createBlogAction(
        title,
        contentBlocks
      );
      setLoading(false);

      if (error) {
        toast.error(error);
      }
      if (data) {
        toast.success(message);
        router.push(`/blog/${data?.blogId}`);
      }
    } catch (error) {}
  }
  return (
    <>
      <BlogComp submitFn={onSubmit} loading={loading} blog={null} />
    </>
  );
}
