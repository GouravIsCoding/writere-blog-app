"use client";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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

import { blogDisplayType } from "@/schema/blog";
import Link from "next/link";

export default function BlogComp({
  blog,
  submitFn,
  loading,
}: {
  blog: blogDisplayType | null;
  submitFn: (
    title: string,
    contentBlocks: ContentBlockData[],
    blogId?: string,
    deleted?: ContentBlockData[]
  ) => Promise<void>;
  loading: boolean;
}) {
  const [err, setErr] = useState<Error | null>(null);
  const [deleted, setDeleted] = useState<ContentBlockData[]>([]);
  const [title, setTitle] = useState(blog ? blog.title : "");
  const [contentBlocks, setContentBlocks] = useState<ContentBlockData[]>(
    blog
      ? blog.contents.map((item) => ({
          id: item.id,
          type: item.contentType,
          content: item.contentType === "IMAGE" ? item.imageUrl : item.text,
          order: item.contentOrder,
        }))
      : []
  );

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
    setDeleted((prev) => [...prev, contentBlocks[index]]);
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

  function handleDrop(result: any) {
    setContentBlocks((prev) => {
      const item = prev[result.source.index];
      const modified = prev.filter((_, index) => index !== result.source.index);
      modified.splice(result.destination.index, 0, item);

      return modified;
    });
  }

  async function onSubmit() {
    try {
      await submitFn(
        title,
        contentBlocks,
        blog ? blog.id : undefined,
        blog ? deleted : undefined
      );
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
          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="editbox">
              {(provided) => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {contentBlocks.map((block, index) => (
                    <Draggable
                      key={block.order.toString()}
                      draggableId={block.order.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className="list-none"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <ContentBlock
                            editable={true}
                            index={index}
                            type={block.type}
                            content={block.content || ""}
                            updateContent={updateContentBlock}
                            handleImageUpload={(e) =>
                              handleImageUpload(e, index)
                            }
                            removeContent={removeContentBlock}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div className="text-center">
            {blog && (
              <Link href={`/blog/${blog.id}`}>
                <Button
                  variant={"outline"}
                  className="my-3 w-96 max-w-full mx-auto"
                  type={"button"}
                >
                  Cancel
                </Button>
              </Link>
            )}
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
