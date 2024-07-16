import Book from "../svg/book";
import Template from "./template";

export default function MyBlogs() {
  return (
    <>
      <Template
        header={5}
        buttonPhrase="My blogs"
        className="border-green-500"
        href="/dashboard/myblog"
        svg={<Book />}
      />
    </>
  );
}
