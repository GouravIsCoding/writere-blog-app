"use client";

import Add from "../svg/add";
import { Button } from "../ui/button";

import { ChangeEvent, useState } from "react";

import { Input } from "../ui/input";
import { ContentBlockData } from "./ContentBlock";
import ContentBlock from "./ContentBlock";
import { Label } from "../ui/label";

import axios from "axios";
import { CONFIG } from "@/CONFIG";
import toast from "react-hot-toast";
import { createBlogAction } from "@/app/actions/createBlog";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<Error | null>(null);
  const [title, setTitle] = useState("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlockData[]>([]);

  const addContentBlock = (type: "PARAGRAPH" | "IMAGE") => {
    setContentBlocks([
      ...contentBlocks,
      { type, content: "", order: contentBlocks.length },
    ]);
  };

  const updateContentBlock = (index: number, content: string) => {
    const newContentBlocks = [...contentBlocks];
    newContentBlocks[index].content = content;
    setContentBlocks(newContentBlocks);
  };

  const removeContentBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files?.length && e.target.files?.length > 1)
      return setErr(new Error("One image only for one input"));
    const file = e.target.files?.[0];
    if (!file) return setErr(new Error("No file found"));

    const form = new FormData();
    form.set("file", file);

    try {
      const res = await axios.post(`${CONFIG.API_URL}/api/image/upload`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updateContentBlock(index, res.data?.secure_url);
    } catch (error) {
      toast.error("Image upload failure");
    }
  };

  async function onSubmit() {
    try {
      const { error, data, message } = await createBlogAction(
        title,
        contentBlocks
      );
      if (error) {
        toast.error(error);
      }
      if (data) {
        toast.success(message);
        router.push(`/blog/${data?.blogId}`);
      }
    } catch (error) {}
  }
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="w-full min-h-screen md:w-2/3 mx-auto bg-white p-4 shadow">
          <div>
            <Button
              onClick={() => addContentBlock("PARAGRAPH")}
              className="m-2 rounded-3xl"
              variant={"outline"}
            >
              <Add />
              Paragraph
            </Button>
            <Button
              onClick={() => addContentBlock("IMAGE")}
              className="m-2 rounded-3xl"
              variant={"outline"}
            >
              <Add />
              Image
            </Button>
          </div>
          <Label className="px-2" htmlFor="title">
            Title
          </Label>
          <Input
            className="my-3"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {contentBlocks.map((block, index) => (
            <ContentBlock
              key={index}
              index={index}
              type={block.type}
              content={block.content}
              updateContent={updateContentBlock}
              handleImageUpload={(e) => handleImageUpload(e, index)}
              removeContent={removeContentBlock}
            />
          ))}
          <div className="text-center">
            <Button
              disabled={loading}
              className="my-3 w-96 max-w-full mx-auto"
              type="button"
              onClick={onSubmit}
            >
              Submit
            </Button>
            {err && <p className="text-red-500">{err.message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
