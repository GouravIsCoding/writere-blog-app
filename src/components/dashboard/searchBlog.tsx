import SearchSVG from "../svg/search";
import Template from "./template";

export default function SeachBlog() {
  return (
    <>
      <Template
        buttonPhrase="Search blogs"
        href="/blogs/search"
        svg={<SearchSVG size="size-48" />}
      />
    </>
  );
}
