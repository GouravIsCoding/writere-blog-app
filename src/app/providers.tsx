"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
          style: {
            width: "18rem",
            height: "4rem",
            fontSize: "1.3rem",
          },
        }}
      />
    </>
  );
};
