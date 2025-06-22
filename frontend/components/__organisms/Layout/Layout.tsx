"use client";

import { usePathname } from "next/navigation";
import Header from "../Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/" || pathname === "/signin" || pathname === "/sign-up";

  return (
    <>
      {!isAuthPage && <Header />}
      <main>{children}</main>
    </>
  );
}
