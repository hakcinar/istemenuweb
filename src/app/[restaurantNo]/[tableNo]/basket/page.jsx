"use client";
import BasketFood from "@/components/BasketFood";
import React from "react";
import { useState, useEffect } from "react";
import { faCartShopping, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setOrder } from "@/utils/firestore";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
const Page = ({ params: { restaurantNo, tableNo } }) => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState([]);
  const basketIcon = (
    <FontAwesomeIcon className="font-bold" icon={faCartShopping} />
  );
  const spinner = (
    <FontAwesomeIcon className="font-bold animate-spin" icon={faSpinner} />
  );
  useEffect(() => {
    try {
      const localBasket = localStorage.getItem("basket");
      setBasket(localBasket ? JSON.parse(localBasket) : []);
    } catch (error) {
      console.error("Error loading basket:", error);
      setBasket([]);
    }
    setLoading(false);
  }, []);
  const total =
    basket?.reduce((acc, item) => acc + item.cost * item.quantity, 0) || 0;
  const onPlus = (id) => {
    if (!Array.isArray(basket)) return;
    const newBasket = basket.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setBasket(newBasket);
    localStorage.setItem("basket", JSON.stringify(newBasket));
  };
  const onMinus = (id) => {
    if (!Array.isArray(basket)) return;
    const item = basket.find((item) => item.id === id);
    if (!item) return;

    if (item.quantity > 1) {
      const newBasket = basket.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setBasket(newBasket);
      localStorage.setItem("basket", JSON.stringify(newBasket));
    } else {
      const newBasket = basket.filter((item) => item.id !== id);
      setBasket(newBasket);
      localStorage.setItem("basket", JSON.stringify(newBasket));
    }
  };
  const onDelete = (id) => {
    if (!Array.isArray(basket)) return;
    const newBasket = basket.filter((item) => item.id !== id);
    setBasket(newBasket);
    localStorage.setItem("basket", JSON.stringify(newBasket));
  };
  const handleOrder = async () => {
    if (!Array.isArray(basket) || basket.length === 0) return;

    setOrderLoading(true);
    try {
      const order = {
        id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        basket: basket,
        total: total,
      };

      // Önce garson ata
      const waiterResponse = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantNo,
          tableNo,
          type: "order",
          orderDetails: order,
        }),
      });

      // Response'u daha detaylı kontrol edelim
      if (!waiterResponse.ok) {
        const errorData = await waiterResponse.json();
        throw new Error(errorData.message);
      }

      const waiterData = await waiterResponse.json();

      if (!waiterData.success) {
        throw new Error(waiterData.message || "Garson atanamadı");
      }

      // Siparişi garson bilgisiyle kaydet
      const orderResult = await setOrder(
        order,
        restaurantNo,
        tableNo,
        waiterData.waiter
      );

      if (!orderResult) {
        throw new Error("Sipariş kaydedilemedi");
      }

      toast.success("Siparişiniz alındı", {
        style: {
          background: "#FEFE00",
          color: "#000000",
          fontWeight: "bold",
        },
      });

      setBasket([]);
      localStorage.setItem("basket", JSON.stringify([]));
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.message || "Sipariş oluşturulurken bir hata oluştu");
    } finally {
      setOrderLoading(false);
    }
  };
  return (
    <>
      <div className="text-white flex flex-1 flex-grow-1 relative bg-black flex-col px-4">
        <h1 className="text-white text-2xl mt-4 font-bold mb-2">Sepetim</h1>
        {Array.isArray(basket) && basket.length > 0 && (
          <div className="bg-black mb-4 sticky">
            <div className="bg-gray px-4 pb-4 pt-2 rounded-xl">
              <div className="flex justify-between items-center mt-4">
                <h2 className="text-lg text-yellow font-bold">Toplam</h2>
                <motion.p
                  key={total}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="text-2xl text-yellow font-bold"
                >
                  ₺{total.toFixed(2)}
                </motion.p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleOrder}
                disabled={orderLoading}
                className="text-black font-bold flex justify-between items-center text-bold bg-yellow border-2 font-bold rounded-xl text-xl border-yellow outline-none px-4 py-2 w-full mt-4 disabled:opacity-50"
              >
                {orderLoading ? "Sipariş Veriliyor..." : "Sipariş Ver"}{" "}
                {orderLoading ? spinner : basketIcon}
              </motion.button>
            </div>
          </div>
        )}
        {loading ? (
          <div>Yükleniyor...</div>
        ) : (
          <>
            {Array.isArray(basket) && basket.length > 0 ? (
              basket.map((item) => (
                <BasketFood
                  key={item.id}
                  src={`data:image/jpeg;base64,${item.image}`}
                  alt={item.name}
                  name={item.name}
                  price={item.cost}
                  quantity={item.quantity}
                  onPlus={() => onPlus(item.id)}
                  onMinus={() => onMinus(item.id)}
                  onDelete={() => onDelete(item.id)}
                />
              ))
            ) : (
              <div className="flex justify-start flex-col bg-gray p-4 rounded-xl">
                <h1 className="text-white text-sm text-yellow font-bold mb-2">
                  Sepetinizde Ürün Bulunmamaktadır!
                </h1>
                <h6 className="text-white text-sm font-bold mb-2">
                  Sipariş Vermek İçin Lütfen Sepetinize Ürün Ekleyiniz
                </h6>
              </div>
            )}
          </>
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          closeButton={false}
          theme="colored"
          toastStyle={{
            backgroundColor: "#FEFE00",
            color: "#000000",
            fontWeight: "bold",
          }}
        />
      </div>
    </>
  );
};

export default Page;
