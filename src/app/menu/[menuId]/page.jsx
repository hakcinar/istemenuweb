"use client";
import React, { useEffect, useState } from "react";
import { getDocs } from "@/utils/firestore";
import { useSearchParams } from "next/navigation";
import Title from "@/components/UI/Title";
import Food from "@/components/Food";

const page = ({ params: { menuId } }) => {
  const searchParams = useSearchParams();
  const [foodList, setFoodList] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  useEffect(() => {
    getMenu();
    getCategory();
  }, []);
  const getMenu = async () => {
    const res = await getDocs(`${menuId}/foodList`);
    setFoodList(res);
  };
  const getCategory = async () => {
    const res = await getDocs("");
    setCategoryName(res);
  };
  console.log(categoryName);
  return (
    <div className="text-white">
      {categoryName.map((item) => {
        if (item.id == menuId) {
          return (
            <img
              key={item.id}
              className="w-full h-72 mb-6 object-cover"
              src={`data:image/jpeg;base64,${item.image}`}
            />
          );
        }
      })}
      <div className="px-4">
        <Title content={searchParams.get("name")} />
        <ul>
          {foodList.map((food) => {
            return (
              <Food
                href={{
                  pathname: `${menuId}/${food.id}`,
                  query: {
                    name: food.name,
                    id: food.id,
                    menuId: menuId,
                  },
                }}
                alt={food.name}
                src={`data:image/jpeg;base64,${food.image}`}
                name={food.name}
                price={food.cost}
                key={food.id}
              ></Food>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default page;
