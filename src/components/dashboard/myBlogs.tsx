import Book from "../svg/book";
import Template from "./template";

export default function MyBlogs() {
  return (
    <>
      <Template
        buttonPhrase="My blogs"
        href="/dashboard/myblog"
        svg={<Book />}
      />
    </>
  );
}
