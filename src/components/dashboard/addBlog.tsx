import AddCircle from "../svg/addCircle";
import Template from "./template";

export default function AddBlog() {
  return (
    <>
      <Template
        buttonPhrase="New Blog"
        href="/dashboard/newblog"
        svg={<AddCircle />}
      />
    </>
  );
}
