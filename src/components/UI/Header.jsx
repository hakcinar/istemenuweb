"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getRestaurantName } from "@/utils/firestore";

const Header = () => {
  const [restaurantName, setRestaurantName] = useState("");

  const updateRestaurantName = async () => {
    const restaurantNo = localStorage.getItem('restaurantNo');
    if (restaurantNo) {
      const restaurant = await getRestaurantName(restaurantNo);
      setRestaurantName(restaurant.name);
    }
  };

  useEffect(() => {
    updateRestaurantName();
    
    window.addEventListener('restaurantChanged', updateRestaurantName);
    
    return () => {
      window.removeEventListener('restaurantChanged', updateRestaurantName);
    };
  }, []);

  return (
    <header className="w-full flex justify-between items-center py-3 px-6 bg-black text-yellow">
      <Link 
        href={`/${localStorage.getItem('restaurantNo')}/${localStorage.getItem('tableNo')}`} 
        className="text-4xl font-extrabold"
      >
        iste
      </Link>
      <h2 className="text-l font-extrabold">{restaurantName}</h2>
    </header>
  );
};

export default Header;
