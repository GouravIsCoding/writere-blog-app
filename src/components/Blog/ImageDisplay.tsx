import Image from "next/image";

export default function ImageDisplay({ url }: { url: string | null }) {
  return (
    <>
      {url && (
        <div className="w-full h-auto my-6">
          <Image
            src={url}
            alt=""
            width={"3800"}
            height={"0"}
            className="w-auto max-h-96 mx-auto rounded-lg"
            loading="lazy"
          />
        </div>
      )}
    </>
  );
}
