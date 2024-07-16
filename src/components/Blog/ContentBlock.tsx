// src/components/ContentBlock.tsx
import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";

export interface ContentBlockData {
  type: "PARAGRAPH" | "IMAGE";
  content: string;
  order: number;
}

interface ContentBlockProps {
  index: number;
  type: "PARAGRAPH" | "IMAGE";
  content: string;
  updateContent: (index: number, content: string) => void;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  removeContent: (index: number) => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({
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
        <Textarea
          className="min-h-24 my-4"
          value={content}
          onChange={(e) => updateContent(index, e.target.value)}
          placeholder="Enter paragraph text"
        />
      ) : (
        <div>
          <Input
            className="my-4"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, index)}
          />
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
