"use client";

import Header from "@/app/(pages)/Header/page";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["greek"],
  weight: ["100", "300", "400", "600"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/signin" || pathname === "/sign-up" || pathname === "/";

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] min-h-screen`}>
        {!isAuthPage && <Header />}
        <main>{children}</main>
      </body>
    </html>
  );
}
