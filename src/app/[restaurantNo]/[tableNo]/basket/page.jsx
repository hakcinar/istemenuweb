"use client"
import BasketFood from "@/components/BasketFood";
import React from "react";
import { useState, useEffect } from "react";
import { faCartShopping, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setOrder } from "@/utils/firestore";
import { toast, ToastContainer } from "react-toastify";

const Page = ({ params: { restaurantNo, tableNo } }) => {
    const [orderLoading, setOrderLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState([]);
    const basketIcon = (
        <FontAwesomeIcon className="font-bold" icon={faCartShopping} />
    );
    const spinner = (
        <FontAwesomeIcon
            className="font-bold animate-spin"
            icon={faSpinner}
        />
    );
    console.log(restaurantNo, tableNo);
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
    const total = basket?.reduce((acc, item) => acc + item.cost * item.quantity, 0) || 0;
    const onPlus = (id) => {
        if (!Array.isArray(basket)) return;
        const newBasket = basket.map((item) => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setBasket(newBasket);
        localStorage.setItem("basket", JSON.stringify(newBasket));
    }
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
    }
    const onDelete = (id) => {
        if (!Array.isArray(basket)) return;
        const newBasket = basket.filter((item) => item.id !== id);
        setBasket(newBasket);
        localStorage.setItem("basket", JSON.stringify(newBasket));
    }
    const handleOrder = async () => {
        if (!Array.isArray(basket) || basket.length === 0) return;
        
        setOrderLoading(true);
        try {
            const order = {
                basket: basket,
                total: total,
            }
            await setOrder(order, restaurantNo, tableNo);
            toast.success("Siparişiniz alındı", {
                style: {
                    background: "#FEFE00",
                    color: "#000000",
                    fontWeight: "bold"
                },
            });
            setBasket([]);
            localStorage.setItem("basket", JSON.stringify([]));
        } catch (error) {
            console.error("Order error:", error);
            toast.error("Sipariş oluşturulurken bir hata oluştu");
        } finally {
            setOrderLoading(false);
        }
    }
    return (
        <div className="text-white flex flex-1 relative bg-black flex-col px-4">
            <h1 className="text-white text-2xl mt-4 font-bold mb-2">Sepetim</h1>
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

                    {Array.isArray(basket) && basket.length > 0 && (
                        <div className="sticky flex-1 bottom-20">
                            <div className="flex justify-between items-center mt-4">
                                <h2 className="text-lg text-yellow font-bold">Toplam</h2>
                                <p className="text-2xl text-yellow font-bold">₺{total.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={handleOrder}
                                disabled={orderLoading}
                                className="text-black font-bold flex justify-between items-center text-bold bg-yellow border-2 font-bold rounded-xl text-xl border-yellow outline-none px-4 py-2 w-full mt-4"
                            >
                                {orderLoading ? "Sipariş Veriliyor..." : "Sipariş Ver"}{" "}
                                {orderLoading ? spinner : basketIcon}
                            </button>
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
                    fontWeight: "bold"
                }}
            />
        </div>
    );
};

export default Page;
