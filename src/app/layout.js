import "./globals.css";
import Header from "@/components/UI/Header";
import NavBar from "@/components/NavBar";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="h-[100dvh] flex">
        <div className="max-w-[520px] relative w-full m-auto flex-1 flex flex-col h-screen bg-black">
          <Header />
          {children}
          <NavBar />
        </div>
      </body>
    </html>
  );
}
