"use client";
import React, { useEffect, useState } from "react";
import { getDocs, getDoc } from "@/utils/firestore";
import Title from "@/components/UI/Title";
import Food from "@/components/Food";
import Loader from "@/components/loader";

const page = ({ params: { restaurantNo, tableNo, categoryId } }) => {
  const [foodList, setFoodList] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getMenu();
  }, []);
  const getMenu = async () => {
    const categoryData = await getDoc(categoryId, restaurantNo);
    setCategory(categoryData);
    const res = await getDocs(`${categoryId}/foodList`, restaurantNo);
    setFoodList(res);
    setLoading(false)
  };
  return (
    loading ? <Loader /> : (
      <div className="text-white flex flex-col flex-1 bg-black">
        <img
          className="w-full h-72 mb-6 object-cover"
          src={`data:image/jpeg;base64,${category.image}`}
        />
        <div className="px-4">
          <Title content={category.name} />
          <ul>
            {foodList.map((food) => {
              return (
                <Food
                  href={{
                    pathname: `/${restaurantNo}/${tableNo}/${categoryId}/${food.id}`,
                  }}
                  alt={food.name}
                  src={`data:image/jpeg;base64,${food.image}`}
                  name={food.name}
                  price={food.cost}
                  key={food.id}
                  preparationTime={food.preparationTime}
                ></Food>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
};

export default page;
