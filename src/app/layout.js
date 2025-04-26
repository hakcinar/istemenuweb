import "./globals.css";
import Header from "@/components/UI/Header";
import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen font-poppins flex flex-col w-full max-w-[480px] bg-black antialiased">
        <Header />
        <div className="flex-1">{children}</div>

        <NavBar />
      </body>
    </html>
  );
}
