"use client";
import Title from "@/components/UI/Title";
import { getFood } from "@/utils/firestore";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/loader";

const Page = ({ params: { foodId, categoryId, restaurantNo } }) => {
  const basketIcon = (
    <FontAwesomeIcon className="text-lg" icon={faCartShopping} />
  );
  const [food, setFood] = useState([]);
  const [note, setNote] = useState("");
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [clickHandler, setClickHandler] = useState(false);
  /*const pieces = [
    { text: "1 Porsiyon", piece: "1", },
    { text: "1.5 Porsiyon", piece: "1.5" },
  ];*/
  useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      setBasket(JSON.parse(savedBasket));
    }
    getOnlyName();
  }, []);

  /*const handleClick = (piece) => {
    setClickHandler(piece);
     if (piece === clickHandler) {
      setClickHandler(false);
    } else {
     setClickHandler(piece);
    }
  };*/
  const basketHandler = () => {
    toast.success("Ürün Sepete Eklendi", {
      style: {
        background: "#FEFE00",
        color: "#000000",
        fontWeight: "medium",
      },
    });
    // Get current basket from both state and localStorage
    const currentBasket =
      basket.length > 0
        ? basket
        : JSON.parse(localStorage.getItem("basket")) || [];
    // Check if the food already exists in the basket
    const existingFoodIndex = currentBasket.findIndex(
      (item) => item.id === food.id
    );
    let newBasket;
    if (existingFoodIndex === -1) {
      // Add new food while preserving all existing items
      newBasket = [...currentBasket, { ...food, quantity: 1, note }];
    } else {
      // Update quantity of existing food while preserving other items
      newBasket = currentBasket.map((item, index) => {
        if (index === existingFoodIndex) {
          return { ...item, quantity: item.quantity + 1, note };
        }
        return item;
      });
    }

    // Update both state and localStorage
    setBasket(newBasket);
    localStorage.setItem("basket", JSON.stringify(newBasket));
    // Dispatch event for other components
    window.dispatchEvent(new Event("basketUpdated"));
    setNote("");
  };
  const getOnlyName = async () => {
    const data = await getFood(categoryId, foodId, restaurantNo);
    setFood(data);
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-1 flex-col bg-black">
      <div key={foodId}>
        <img
          className="w-full h-[275px] object-cover"
          src={`data:image/jpeg;base64,${food.image}`}
        />
        <div className="py-4 px-4">
          <div className="flex justify-between items-center">
            <Title content={food.name} />
            <span className="text-yellow text-xl mr-6 font-medium">
              {food.cost} ₺
            </span>
          </div>
          <span className="text-yellow font-medium -mt-4">Açıklama</span>
          <p className="text-white font-medium">{food.desc}</p>
          <div>
            <h5 className="text-yellow mb-2 font-medium hidden">
              Porsiyon Seçiniz
            </h5>
            {/* <div className="flex justify-between">
              {pieces.map((item, i) => (
                <Button
                  key={`piece_${i}`}
                  handleClick={() => {
                    handleClick(item.piece);
                  }}
                  isActive={item.piece === clickHandler}
                  text={item.text}
                />
              ))}
            </div>*/}
            <h5 className="text-yellow font-bold my-2">Sipariş Notu</h5>
            <textarea
              onChange={(e) => setNote(e.target.value)}
              value={note}
              className="pt-3 pb-2 px-4 w-full  outline-none border-none rounded-xl placeholder:text-m font-medium bg-white flex items-center justify-center  overflow-hidden mb-4"
              placeholder="Eklemek veya Çıkarmak İstediğiniz Malzemeyi Yazınız"
            />
            <button
              onClick={basketHandler}
              className="text-black flex justify-between items-center text-bold bg-yellow border-2 font-medium rounded-xl text-xl border-yellow outline-none px-4 py-2 w-full"
            >
              Sepete Ekle
              {basketIcon}
            </button>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={true}
              closeButton={false}
              theme="colored"
              toastStyle={{
                backgroundColor: "#FEFE00",
                color: "#000000",
                fontWeight: "medium",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
