import "./globals.css";
import Header from "@/components/UI/Header";
import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen font-poppins bg-black antialiased">
        <div className="max-w-[480px] relative w-full flex-1 flex flex-col bg-black">
          <Header />
          {children}
          <NavBar />
        </div>
      </body>
    </html>
  );
}
