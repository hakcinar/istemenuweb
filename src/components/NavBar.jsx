"use client";
import React from "react";
import {
  faCartShopping,
  faShop,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "./NavLink";

const NavBar = () => {
  const basketIcon = (
    <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
  );
  const shopIcon = <FontAwesomeIcon className="text-2xl" icon={faShop} />;
  const bellIcon = <FontAwesomeIcon className="text-2xl" icon={faBell} />;
  const profileIcon = <FontAwesomeIcon className="text-2xl" icon={faUser} />;
  return (
    <nav className="text-white bg-black px-6 pt-4 w-full max-w-[520px]  flex justify-between items-center sticky bottom-0 z-10">
      <NavLink href={"/menu"} icon={shopIcon} text={"Menu"} />
      <NavLink href={"/basket"} icon={basketIcon} text={"Sepet"} />
      <NavLink href={"/callwaiter"} icon={bellIcon} text={"Garson"} />
      <NavLink href={"/account"} icon={profileIcon} text={"Hesap"} />
    </nav>
  );
};

export default NavBar;
