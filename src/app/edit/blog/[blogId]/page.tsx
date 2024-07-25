"use client";

import { getBlogByIdAction } from "@/app/actions/getBlogById";
import EditBlog from "@/components/Blog/EditBlog";
import { blogDisplayType } from "@/schema/blog";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { blogId: string } }) {
  const { data } = useSession();

  const [blog, setBlog] = useState<blogDisplayType>();

  useEffect(() => {
    getBlogByIdAction(params.blogId).then((res) => setBlog(res?.data?.blog));
  }, [params.blogId]);

  if (blog && blog?.author.email === data?.user.email)
    return (
      <>
        <EditBlog blog={blog} />
      </>
    );
}
