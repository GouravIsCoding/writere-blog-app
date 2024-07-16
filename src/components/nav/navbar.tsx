"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logout } from "./logoutButton";
import { usePathname } from "next/navigation";

const navItems = [
  { id: 1, href: "/", name: "Home", auth: false },
  { id: 2, href: "/signup", name: "Signup", auth: false },
  { id: 3, href: "/signin", name: "Signin", auth: false },
];

export default function Navbar() {
  const { status } = useSession();
  const authStatus = status === "authenticated" ? true : false;
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-black px-4 py-2 text-white">
        <Link href={"/"}>
          <h1 className="inline-block font-semibold text-lg border-2 border-white p-2">
            Write're
          </h1>
        </Link>
        <div className="float-right">
          {navItems.map(
            (item) =>
              authStatus === item.auth && (
                <li
                  className={`list-none inline-block mx-2 self-center my-2 ${
                    pathname === item.href ? "text-orange-500" : ""
                  }`}
                  key={item.id}
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              )
          )}
          {authStatus === true && <Logout />}
        </div>
      </nav>
    </>
  );
}
