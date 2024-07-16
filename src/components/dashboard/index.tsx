import AddBlog from "./addBlog";
import MyBlogs from "./myBlogs";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-evenly items-center">
        <MyBlogs />
        <AddBlog />
      </div>
    </>
  );
}
