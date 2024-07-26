"use client";
import React from "react";
import Link from "next/link";

const Category = (props) => {
  return (
    <li>
      <Link className="" href={props.href}>
        <img
          className="w-full h-[175px] border-4 border-yellow rounded-3xl object-cover"
          src={props.src}
        ></img>
        <div className="flex justify-center">
          <h5 className="text-white text-xl font-extrabold mt-2">{props.name}</h5>
        </div>
      </Link>
    </li>
  );
};

export default Category;
