import "./globals.css";
import Header from "@/components/UI/Header";
import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="h-[100vh] flex font-poppins antialiased">
        <div className="max-w-[480px] relative w-full m-auto flex-1 flex flex-col h-screen bg-black">
          <Header />
          {children}
          <NavBar />
        </div>
      </body>
    </html>
  );
}
