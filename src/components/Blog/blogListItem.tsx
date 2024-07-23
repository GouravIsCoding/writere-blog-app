import { blogListType } from "@/schema/blog";
import { giveTime } from "@/utils/time";
import Image from "next/image";
import Link from "next/link";

export default function BlogListItem({ blog }: { blog: blogListType }) {
  return (
    <>
      <Link href={`/blog/${blog.id}`}>
        <div className="w-full min-h-64 bg-white p-3 rounded-2xl shadow-lg">
          <span className="mx-3 text-xs float-right">
            {giveTime(blog.createdAt)}
          </span>

          {blog.image ? (
            <div className="w-auto h-auto my-6 mx-4 p-2 rounded-lg">
              <Image
                src={blog.image.replace("/upload/", "/upload/h_360/")}
                alt=""
                width={"1280"}
                height={"0"}
                className="mx-auto rounded-lg w-auto max-h-48"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-auto h-48 my-6 mx-4 bg-slate-300 flex justify-center items-center rounded-xl">
              <h1 className="text-center w-auto">No Image</h1>
            </div>
          )}
          <div className="w-full flex justify-start items-center rounded-xl p-4 shadow">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium">Title:{blog.title}</h1>
              </div>
              <h1 className="text-slate-500">Author:{blog.author.name}</h1>
              {blog.para && <p>{blog.para.slice(0, 80)}...</p>}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
