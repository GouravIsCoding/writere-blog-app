import Link from "next/link";
import Book from "../svg/book";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface props {
  href: string;
  className?: string;
  svg: ReactNode;
  header?: number;
  buttonPhrase: string;
}

export default function Template(props: props) {
  return (
    <>
      <div className="h-42 px-6 py-3 m-2 bg-white shadow inline-block min-w-64">
        <div className="flex flex-col justify-center items-center">
          <div
            className={`flex flex-col justify-between items-center px-8 py-2 m-2 border-4 ${props.className} rounded-full`}
          >
            <h1 className="text-4xl">{props.header}</h1>
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
