"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "./NavLink";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdRestaurant } from "react-icons/md";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [navigationPath, setNavigationPath] = useState("");

  const shopIcon = <MdRestaurant className="text-xl mb-1" />;
  const userIcon = <FontAwesomeIcon className="text-xl mb-1" icon={faUser} />;
  const cartIcon = (
    <FontAwesomeIcon className="text-xl mb-1" icon={faCartShopping} />
  );
  useEffect(() => {
    const restaurantNo = localStorage.getItem("restaurantNo");
    const tableNo = localStorage.getItem("tableNo");

    if (restaurantNo && tableNo) {
      const newPath = `/${restaurantNo.split("/")[0]}/${tableNo}`;
      setNavigationPath(newPath);
    }
  }, [pathname]);

  return (
    <nav className="bg-black sticky bottom-0 px-4  py-3 w-full">
      <div className="container flex justify-between items-center">
        <NavLink
          href={`${navigationPath}` || "/"}
          className="text-xl font-medium"
          icon={shopIcon}
          alt="FooodBank"
          text="Menu"
          Category="menu"
        ></NavLink>
        <NavLink
          href={`${navigationPath}/basket`}
          className="text-xl font-medium"
          icon={cartIcon}
          alt="cart"
          text="Sepet"
          Category="basket"
        ></NavLink>
        <NavLink
          href={`${navigationPath}/callWaiter`}
          className="text-xl font-medium"
          icon={userIcon}
          alt="Garson Çağır"
          text="Garson"
          Category="callWaiter"
        ></NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
