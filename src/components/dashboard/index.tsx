import AddBlog from "./addBlog";
import MyBlogs from "./myBlogs";
import ReadBlog from "./readBlog";
import SeachBlog from "./searchBlog";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center flex-wrap text-center">
        <MyBlogs />
        <AddBlog />
        <ReadBlog />
        <SeachBlog />
      </div>
    </>
  );
}
