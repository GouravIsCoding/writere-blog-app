import { getBlogsAction } from "@/app/actions/getBlogs";
import BlogListItem from "@/components/Blog/blogListItem";
import ErrorDisplay from "@/components/errorDisplay";
import { Button } from "@/components/ui/button";
import { blogListType } from "@/schema/blog";
import Link from "next/link";
import { getBlogCountAction } from "../actions/totalBlogs";

const blogsPerPage = 5;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page);
  const { data, error } = await getBlogsAction(page);
  const {
    data: { count },
  } = await getBlogCountAction();
  const maxPage = Math.ceil(count / blogsPerPage);

  const blogs: blogListType[] = data?.blogs;

  if (error) return <ErrorDisplay error={error} />;
  if (blogs)
    return (
      <>
        <h1 className="text-center text-3xl m-5">Latest Blogs</h1>
        <div className="w-full min-h-screen">
          <div className="w-full min-h-screen md:w-2/3 mx-auto bg-white p-4 shadow">
            {blogs.map((blog) => (
              <li className="list-none my-6" key={blog.id}>
                <BlogListItem blog={blog} />
              </li>
            ))}
          </div>
          <div className="flex justify-center items-center my-4">
            <div>
              <Link
                className="m-3"
                href={`${page !== 1 ? `/blogs?page=${page - 1}` : ""}`}
              >
                <Button disabled={page === 1}>Prev</Button>
              </Link>
              <Link
                className="m-3"
                href={maxPage !== page ? `/blogs?page=${page + 1}` : {}}
              >
                <Button disabled={maxPage === page}>Next</Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
}
