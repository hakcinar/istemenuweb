import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ icon, href, text }) => {
  const pathName = usePathname();
  const isActive = pathName.startsWith(href);
  const linkClass = "flex items-center flex-col justify-center";
  const yellowLinkClass =
    "flex items-center flex-col justify-center text-yellow";
  return (
    <Link className={isActive ? yellowLinkClass : linkClass} href={href}>
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default NavLink;
