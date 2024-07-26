"use client";
import Title from "@/components/UI/Title";
import { getDocs } from "@/utils/firestore";
import React, { useEffect, useState } from "react";
import Button from "@/components/UI/Button";

const page = ({ params: { foodId, menuId } }) => {
  const [foodName, setFoodName] = useState([]);
  useEffect(() => {
    getFoodName();
  }, []);
  const getFoodName = async () => {
    const data = await getDocs(`${menuId}/foodList`);
    setFoodName(data);
  };
  console.log(foodName);
  return (
    <div className="flex flex-1 flex-col">
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
                <p className="text-white font-bold ">{food.desc}</p>
                <div>
                  <h5 className="text-yellow mb-2">Porsiyon Seçiniz</h5>
                  <div className="flex justify-between">
                    <Button text="1 Porsiyon" />
                    <Button text="1.5 Porsiyon" />
                  </div>
                  <h5 className="text-yellow font-bold my-3">Sipariş Notu</h5>
                  <input type="textarea" className="py-2 px-4 h-20 w-full outline-none border-none rounded-xl placeholder:w-2/4" placeholder="Eklemek veya Çıkarmak  İstediğiniz Malzemeyi Yazınız" />
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default page;
