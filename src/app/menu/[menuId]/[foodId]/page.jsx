"use client";
import Title from "@/components/UI/Title";
import { getDocs } from "@/utils/firestore";
import React, { useEffect, useState } from "react";

const page = ({ params: { foodId, menuId } }) => {
  const [foodName, setFoodName] = useState([]);
  useEffect(() => {
    getFoodName();
  }, []);
  const getFoodName = async () => {
    const data = await getDocs(`${menuId}/foodList`);
    setFoodName(data);
    
  };
  console.log(foodName)
  return (
    <div>
      {foodName.map((food) => {
        if (foodId == food.id) {
          return (
            <div key={foodId}>
              <img
                className="w-full h-[275px] object-cover"
                src={`data:image/jpeg;base64,${food.image}`}
              />
              <div className="py-4 px-4">
                <Title content={food.name} />
                <span className="text-yellow font-bold -mt-4">Açıklama</span>
                <p>{food.desc}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default page;
