export default function ErrorDisplay({ error }: { error: string }) {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="mx-auto text-center text-red-500 bg-red-200 shadow-sm p-4 rounded-xl">
          {error}
        </h1>
      </div>
    </>
  );
}
