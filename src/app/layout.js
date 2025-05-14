"use client";
import "./globals.css";
import Header from "@/components/UI/Header";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  // Anasayfa kontrolü
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className="h-screen font-poppins flex flex-col w-full max-w-[480px] bg-black antialiased">
        {!isHomePage && <Header />}
        <div className="flex-1">{children}</div>
        {!isHomePage && <NavBar />}
      </body>
    </html>
  );
}
