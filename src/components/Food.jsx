import React from "react";
import Link from "next/link";

const Food = ({ alt, name, src, price, href, preparationTime }) => {
  return (
    <Link
      href={href}
      className="w-full bg-gray py-4 flex px-4 mb-2 rounded-xl"
    >
      <img
        className="object-cover w-[75px] h-[75px] rounded-xl"
        alt={alt}
        src={src}
      />
      <div className="flex flex-col px-4 ">
        <h5 className="text-white text-sm font-bold mb-2">{name}</h5>
        <span className="text-white text-sm mb-2"> <span className="font-bold">Fiyat: </span>{price}₺</span>
        <div>
          <span className="text-white text-sm">
              <span className="font-bold">Hazırlanma Süresi: </span>{preparationTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Food;
