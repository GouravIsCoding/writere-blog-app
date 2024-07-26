export default function Spinner() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    </>
  );
}
