import AddBlog from "./addBlog";
import MyBlogs from "./myBlogs";
import ReadBlog from "./readBlog";

export default function Dashboard() {
  return (
    <>
      <div className="min-h-screen flex justify-evenly items-center">
        <MyBlogs />
        <AddBlog />
        <ReadBlog />
      </div>
    </>
  );
}
