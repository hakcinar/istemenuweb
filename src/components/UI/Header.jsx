import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center py-3 px-6  bg-black text-yellow ">
      <Link href={"/"} className="text-4xl font-extrabold">
        iste
      </Link>
      <h2 className="text-l font-extrabold">Saklıbahçe</h2>
    </header>
  );
};

export default Header;
