import Link from "next/link";
import SearchSVG from "../svg/search";

export default function SearchDiv() {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl text-center mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Search Blogs All Day
        </h1>
        <p className="text-gray-600 mb-8">
          Search Your favourite blogs with our enhanced search feature.
        </p>
        <div>
          <Link href={"/blogs/search"}>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              <span className="flex justify-center items-center">
                <span className="text-xl">search</span>{" "}
                <SearchSVG size="size-12" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
