import { getBlogByIdAction } from "@/app/actions/getBlogById";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import ImageDisplay from "@/components/Blog/ImageDisplay";
import Para from "@/components/Blog/Para";
import ErrorDisplay from "@/components/errorDisplay";
import { Button } from "@/components/ui/button";
import { blogDisplayType } from "@/schema/blog";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const { error, data } = await getBlogByIdAction(params.blogId);
  const blog: blogDisplayType = data.blog;

  const session = await getServerSession(authOptions);

  if (error) return <ErrorDisplay error={error} />;
  if (blog)
    return (
      <>
        <div className="w-full min-h-screen">
          <div className="w-full min-h-screen md:w-2/3 mx-auto bg-white p-4 shadow">
            <div className="flex justify-between items-center bg-slate-100 rounded-xl">
              <div className="flex justify-start items-center">
                <div className="px-3.5 py-2 text-3xl bg-slate-300 rounded-full m-4">
                  {blog.author.name?.trim()[0]}
                </div>
                <div>
                  <h1>{blog.author.name}</h1>
                  <h2>{blog.author.email}</h2>
                </div>
              </div>
              <div>
                {session?.user.email === blog.author.email && (
                  <Link className="float-right" href={`/edit/blog/${blog.id}`}>
                    <Button className="rounded-2xl m-2" variant={"outline"}>
                      Edit
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <h1 className="text-3xl font-medium font-sans text-center m-4">
              {blog.title}
            </h1>
            <div>
              {blog.contents.map((block) => (
                <li className="list-none" key={block.contentOrder}>
                  {block.contentType === "PARAGRAPH" ? (
                    <Para content={block.text} />
                  ) : (
                    <ImageDisplay url={block.imageUrl} />
                  )}
                </li>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
