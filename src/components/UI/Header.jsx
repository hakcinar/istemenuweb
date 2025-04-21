"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getRestaurantName } from "@/utils/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
export default function Header() {
  const [title, setTitle] = useState("");
  const pathname = usePathname();
  const { restaurantNo, tableNo } = useParams();
  useEffect(() => {
    const updateTitle = async () => {
      try {
        const pathParts = pathname.split("/");
        const restaurantNo = pathParts[1];
        const tableNo = pathParts[2];

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
        <Link
          href={`/${restaurantNo}/${tableNo}`}
          className="text-yellow text-lg font-bold"
        >
          {title}
        </Link>
        <h5 className="text-yellow text-xl font-bold">iste</h5>
      </div>
    </header>
  );
}
