"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logout } from "./logoutButton";
import { usePathname } from "next/navigation";
import SearchSVG from "../svg/search";
import { useEffect, useState } from "react";
import Menu from "../svg/menu";

const navItems = [
  { id: 1, href: "/", name: "Home", auth: false },
  { id: 2, href: "/signup", name: "Signup", auth: false },
  { id: 3, href: "/signin", name: "Signin", auth: false },
  { id: 4, href: "/dashboard", name: "Dashboard", auth: true },
  { id: 5, href: "/blogs?page=1", name: "Read" },
  { id: 6, href: "/dashboard/myblog?page=1", name: "My Blog", auth: true },
  { id: 7, href: "/dashboard/newblog", name: "Create", auth: true },
];

export default function Navbar() {
  const { status } = useSession();
  const authStatus = status === "authenticated" ? true : false;
  const pathname = usePathname();
  const [menuOn, setMenuOn] = useState(false);
  const clickToggle = () => {
    setMenuOn((prev) => !prev);
  };

  useEffect(() => {
    setMenuOn(false);
  }, [pathname]);

  return (
    <>
      <nav className="bg-black px-4 py-2 text-white fixed left-0 right-0 top-0 z-50">
        <Link href={"/"}>
          <h1 className="inline-block font-semibold text-lg border-2 border-white p-2">
            Write&apos;re
          </h1>
        </Link>
        <li
          className={`list-none inline-block mx-2 h-full relative top-2 ${
            pathname === "/blogs/search" ? "text-orange-500" : ""
          }`}
        >
          <Link href={"/blogs/search"}>
            <SearchSVG size="size-10" />
          </Link>
        </li>
        <div
          className={`bg-black shadow-lg md:shadow-none float-right pt-4 md:p-0 fixed md:static top-0 right-0 md:h-auto h-screen md:w-auto ${
            menuOn ? "w-1/2" : "w-0"
          }`}
        >
          {navItems.map(
            (item) =>
              (authStatus === item.auth || item.auth === undefined) && (
                <li
                  className={`list-none mx-4 md:mx-2 self-center my-3 md:inline-block block ${
                    pathname === item.href ? "text-orange-500" : ""
                  }`}
                  key={item.id}
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              )
          )}

          {authStatus === true && <Logout />}
          <span
            onClick={clickToggle}
            className={`md:hidden absolute top-4 right-4 ${
              menuOn ? "inline-block" : "hidden"
            }`}
          >
            <Menu type="close" />
          </span>
        </div>
        <span
          onClick={clickToggle}
          className={`md:hidden absolute top-2 right-2 p-2 ${
            menuOn ? "hidden" : "inline-block"
          }`}
        >
          <Menu type="open" />
        </span>
      </nav>
    </>
  );
}
