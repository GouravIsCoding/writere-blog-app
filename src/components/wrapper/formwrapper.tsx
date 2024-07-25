"use client";

import React from "react";

export default function Formwrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-slate-100 flex justify-center items-center">
        <div className="w-full md:w-[40%] md:mx-2  px-4 md:px-8 py-6 bg-white shadow">
          {children}
        </div>
      </div>
    </>
  );
}
