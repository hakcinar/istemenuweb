"use client"
import Food from "@/components/Food";
import { getOrder } from "@/utils/firestore";
import { useState, useEffect } from "react";
import OrderStatus from "@/components/OrderStatus";

const Page = ({ params: { restaurantNo, tableNo } }) => {
    const [order, setOrder] = useState(null);
    const [orderFoodList, setOrderFoodList] = useState([]);

    useEffect(() => {
        getFullOrder();
    }, []);

    const getFullOrder = async () => {
        const order = await getOrder(restaurantNo, tableNo);
        setOrder(order);
        setOrderFoodList(order?.orders?.basket || []);
    }

    return (
        <div className="text-white flex-1 px-4 flex flex-col">
            <OrderStatus />
            <h1 className="text-2xl font-bold mb-4">Siparişim</h1>
            <div className="flex flex-col gap-4 text-white overflow-y-auto flex-1">
                {orderFoodList.map((item) => (
                    <Food
                        alt={item.name}
                        src={`data:image/jpeg;base64,${item.image}`}
                        name={item.name}
                        preparationTime={item.preparationTime}
                        price={item.cost}
                        href={`/${restaurantNo}/${tableNo}`}
                        key={item.id}
                        item={item}
                    />
                ))}
                <div className="flex justify-end items-center w-full">
                    {order?.orders?.total && (
                        <h1 className="text-2xl text-yellow font-bold mb-4">Toplam: {order.orders.total} ₺</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;