import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl text-center mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Write&apos;re
        </h1>
        <p className="text-gray-600 mb-8">
          Discover amazing content, insightful articles, and join a community of
          passionate readers and writers.
        </p>
        <div>
          <Link href={"/signin"}>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
