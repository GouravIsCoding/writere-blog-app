export default function Para({ content }: { content: string | null }) {
  return (
    <>
      <p className="font-serif text-lg py-2 px-2 md:px-6 my-3">{content}</p>
    </>
  );
}
