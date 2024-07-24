import Link from "next/link";
import Book from "../svg/book";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface props {
  href: string;
  className?: string;
  svg: ReactNode;
  buttonPhrase: string;
}

export default function Template(props: props) {
  return (
    <>
      <div className="w-auto h-42 px-6 py-3 my-2 bg-white inline-block min-w-64 shadow-lg mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div
            className={`flex flex-col justify-between items-center px-8 py-2 m-2 ${props.className} rounded-full`}
          >
            {props.svg}
          </div>
        </div>

        <Link href={props.href}>
          <Button className="w-full" type="button">
            {props.buttonPhrase}
          </Button>
        </Link>
      </div>
    </>
  );
}
