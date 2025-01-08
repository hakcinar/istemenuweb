"use client"
import BasketFood from "@/components/BasketFood";
import React from "react";
import { useState } from "react";
import { faCartShopping, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setOrder } from "@/utils/firestore";
import { toast, ToastContainer } from "react-toastify";


const page = ({ params: { restaurantNo, tableNo } }) => {
    const [loading, setLoading] = useState(false);
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
    const localBasket = JSON.parse(localStorage.getItem("basket"));
    const [basket, setBasket] = useState(localBasket);
    const total = basket.reduce((acc, item) => acc + item.cost * item.quantity, 0);
    const onPlus = (id) => {
        const newBasket = basket.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
        setBasket(newBasket);
        localStorage.setItem("basket", JSON.stringify(newBasket));
    }
    const onMinus = (id) => {
        if (basket.find((item) => item.id === id).quantity > 1) {
            const newBasket = basket.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
            setBasket(newBasket);
            localStorage.setItem("basket", JSON.stringify(newBasket));

        }
        else {
            const newBasket = basket.filter((item) => item.id !== id);
            setBasket(newBasket);
            localStorage.setItem("basket", JSON.stringify(newBasket));
        }
    }
    const onDelete = (id) => {
        const newBasket = basket.filter((item) => item.id !== id);
        setBasket(newBasket);
        localStorage.setItem("basket", JSON.stringify(newBasket));
    }
    const handleOrder = async () => {
        setLoading(true);
        const order = {
            basket: basket,
            total: total,
        }
        console.log(order, restaurantNo, tableNo);
        await setOrder(order, restaurantNo, tableNo);
        toast.success("Siparişiniz alındı", {
            style: {
                background: "#FEFE00",
                color: "#000000",
                fontWeight: "bold"
            },
        });
        setLoading(false);
        setBasket([]);
        localStorage.setItem("basket", JSON.stringify([]));
    }
    return (
        <div className="text-white flex flex-1 flex-col px-4">
            <h1 className="text-white text-2xl mt-4 font-bold mb-2">Sepetim</h1>
            {basket.length > 0 ? (
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
                ))) : (
                <div className="flex justify-start flex-col bg-gray p-4 rounded-xl">
                    <h1 className="text-white text-sm text-yellow font-bold mb-2">Sepetinizde Ürün Bulunmamaktadır !</h1>
                    <h6 className="text-white text-sm font-bold mb-2">Sipariş Vermek İçin Lütfen Sepetinize Ürün Ekleyiniz</h6>
                </div>)
            }
            {basket.length > 0 && (
                <>
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="text-lg text-yellow  font-bold">Toplam</h2>
                        <p className="text-2xl text-yellow font-bold">₺{total.toFixed(2)}</p>
                    </div>
                    <button onClick={handleOrder} disabled={loading} className="text-black font-bold flex justify-between items-center text-bold bg-yellow border-2 font-bold rounded-xl text-xl border-yellow outline-none px-4 py-2 w-full mt-4"
                    >{loading ? "Sipariş Veriliyor..." : "Sipariş Ver "} {loading ? spinner : basketIcon}</button>
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

export default page;
