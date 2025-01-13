"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getRestaurantName } from "@/utils/firestore";

export default function Header() {
  const [title, setTitle] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTitle = async () => {
      try {
        const pathParts = pathname.split('/');
        const restaurantNo = pathParts[1];

        if (restaurantNo) {
          const restaurant = await getRestaurantName(restaurantNo);
          if (restaurant?.name) {
            setTitle(restaurant.name);
          }
        }
      } catch (error) {
        console.error("Error fetching restaurant name:", error);
      }
    };

    updateTitle();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="flex justify-between items-center px-4 py-4">
        <h1 className="text-yellow text-3xl font-extrabold">iste</h1>
        <h1 className="text-yellow text-2xl font-bold">{title}</h1>
      </div>
    </header>
  );
}

