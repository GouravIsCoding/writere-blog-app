import { getBlogsAction } from "@/app/actions/getBlogs";
import BlogListItem from "@/components/Blog/blogListItem";
import ErrorDisplay from "@/components/errorDisplay";
import { blogListType } from "@/schema/blog";

export default async function BlogPage({
  params,
}: {
  params: { page: string };
}) {
  const { data, error } = await getBlogsAction(Number(params.page));

  const blogs: blogListType[] = data?.blogs;

  if (error) return <ErrorDisplay error={error} />;
  if (blogs)
    return (
      <>
        <div className="w-full min-h-screen">
          <div className="w-full min-h-screen md:w-2/3 mx-auto bg-white p-4 shadow">
            {blogs.map((blog) => (
              <li className="list-none my-6" key={blog.id}>
                <BlogListItem blog={blog} />
              </li>
            ))}
          </div>
        </div>
      </>
    );
}
