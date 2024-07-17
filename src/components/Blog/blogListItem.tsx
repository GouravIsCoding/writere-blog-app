import { blogListType } from "@/schema/blog";
import { giveTime } from "@/utils/time";
import Image from "next/image";
import Link from "next/link";

export default function BlogListItem({ blog }: { blog: blogListType }) {
  return (
    <>
      <Link href={`/blog/${blog.id}`}>
        <div className="w-full">
          <div className="w-full flex justify-start items-center bg-slate-100 rounded-xl p-4">
            {blog.image ? (
              <div className="w-24 h-auto my-6 mx-4">
                <Image
                  src={blog.image.replace("/upload/", "/upload/w_300/")}
                  alt=""
                  width={"300"}
                  height={"0"}
                  className=""
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-24 h-16 my-6 mx-4 bg-slate-300">
                <h1>No Image</h1>
              </div>
            )}
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium">Title:{blog.title}</h1>
                <span className="mx-3 text-xs">{giveTime(blog.createdAt)}</span>
              </div>
              <h1 className="text-slate-500">Author:{blog.author.name}</h1>
              {blog.para && <p>{blog.para.slice(0, 180)}...</p>}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
