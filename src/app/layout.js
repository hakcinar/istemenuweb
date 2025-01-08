"use client";
import "./globals.css";
import Header from "@/components/UI/Header";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { getRestaurantName } from "@/utils/firestore";
import { Poppins } from 'next/font/google'
import Loader from "@/components/loader"
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],  // add the weights you need
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children, params: { restaurantNo } }) {
  const [title, setTitle] = useState("");
  const updateTitle = async () => {
    if (restaurantNo) {
      const restaurant = await getRestaurantName(restaurantNo)
      console.log(restaurant)
      console.log(restaurant.name)
      setTitle(restaurant)
    }
  }
  useEffect(() => {
    window.addEventListener('restaurantChanged', updateTitle);
    updateTitle();
    return () => {
      window.removeEventListener('restaurantChanged', updateTitle);
    };
  }, []);

  return (
    <html lang="en" className={poppins.className}>
      <body className="h-screen  flex">
        <div className="max-w-[520px] relative w-full m-auto flex-1 flex flex-col h-screen bg-black ">
          <Header title={title} />
          {children}
          <NavBar />
        </div>
      </body>
    </html>
  );
}
