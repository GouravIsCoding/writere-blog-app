// src/components/ContentBlock.tsx
import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import Drag from "../svg/drag";

export interface ContentBlockData {
  id?: number;
  type: "PARAGRAPH" | "IMAGE";
  content: string | null;
  order: number;
}

interface ContentBlockProps {
  editable?: boolean;
  index: number;
  type: "PARAGRAPH" | "IMAGE";
  content: string;
  updateContent: (index: number, content: string) => void;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  removeContent: (index: number) => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
  editable = false,
  index,
  type,
  content,
  updateContent,
  handleImageUpload,
  removeContent,
}) => {
  return (
    <div>
      {type === "PARAGRAPH" ? (
        <div className="flex justify-between items-center">
          <Textarea
            className="w-[90%] min-h-24 my-4"
            value={content}
            onChange={(e) => updateContent(index, e.target.value)}
            placeholder="Enter paragraph text"
          />
          {editable && (
            <span>
              <Drag />
            </span>
          )}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <Input
              className="my-4 w-[90%]"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, index)}
            />
            {editable && (
              <span>
                <Drag />
              </span>
            )}
          </div>
          {content && (
            <div className="w-full h-auto">
              <Image
                src={content}
                alt=""
                width={"3800"}
                height={"0"}
                className="w-auto max-h-96 mx-auto"
                loading="eager"
              />
            </div>
          )}
        </div>
      )}
      <Button variant={"destructive"} onClick={() => removeContent(index)}>
        Remove
      </Button>
    </div>
  );
};

export default ContentBlock;
