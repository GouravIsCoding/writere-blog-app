import Stack from "../svg/stack";
import Template from "./template";

export default function ReadBlog() {
  return (
    <>
      <Template buttonPhrase="Read" href="/blogs?page=1" svg={<Stack />} />
    </>
  );
}
