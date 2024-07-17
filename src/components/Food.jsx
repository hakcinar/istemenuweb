import React from "react";
import Link from "next/link";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Food = ({ alt, name, src, price, href }) => {
  const starIcon = (
    <FontAwesomeIcon className="text-yellow mr-1" icon={faStar} />
  );
  const foodPoint = "4.9";
  return (
    <Link
      href={href}
      className="w-full py-5 flex px-5 border-4 mb-6 border-yellow rounded-xl"
    >
      <img
        className="w-[100px] h-[100px] object-cover rounded-xl"
        alt={alt}
        src={src}
      />
      <div className="flex flex-col px-4 ">
        <h5 className="text-yellow text-m mb-2">{name}</h5>
        <span className="text-yellow text-m mb-2">Fiyat : {price}₺</span>
        <div>
          {starIcon}
          {starIcon}
          {starIcon}
          {starIcon}
          {starIcon}
          <span className="text-yellow">({foodPoint})</span>
        </div>
      </div>
    </Link>
  );
};

export default Food;
