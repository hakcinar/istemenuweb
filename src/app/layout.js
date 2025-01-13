import "./globals.css";
import Header from "@/components/UI/Header";
import NavBar from "@/components/NavBar";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export default function Layout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="h-[100dvh] flex font-poppins antialiased">
        <div className="max-w-[520px] relative w-full m-auto flex-1 flex flex-col h-screen bg-black">
          <Header />
          {children}
          <NavBar />
        </div>
      </body>
    </html>
  );
}
