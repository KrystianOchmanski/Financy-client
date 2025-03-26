"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(pathname);

  if (isPublicPath) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
