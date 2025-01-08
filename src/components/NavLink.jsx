import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ icon, href, text }) => {
  const pathName = usePathname();
  
  const isActive = () => {
    const currentParts = pathName.split('/')
    const hrefParts = href.split('/')
    if (hrefParts.length === 3) {
      return currentParts[1] === hrefParts[1] && 
             currentParts[2] === hrefParts[2] && 
             currentParts[3] !== 'basket' &&
             currentParts[3] !== 'callWaiter'
    }
    return pathName === href
  }

  const linkClass = "flex items-center text-white font-bold flex-col justify-center";
  const activeLinkClass = "flex items-center text-yellow font-bold flex-col justify-center";
  

  return (
    <Link className={isActive() ? activeLinkClass : linkClass} href={href}>
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default NavLink;
