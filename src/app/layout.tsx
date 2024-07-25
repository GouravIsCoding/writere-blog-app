import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/nav/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Writere a blog",
  description: "A blog app created by Gourav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className="bg-slate-100 min-h-screen px-2 md:px-8 py-4 mt-20">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
