import React from "react";
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

const BasketFood = ({ src, alt, name, price, quantity, onPlus, onMinus, onDelete }) => {

    return <div className="w-full bg-gray py-4 flex px-4 mb-2 items-start rounded-xl">
        <img src={src} alt={alt} className="object-cover w-[75px] h-[75px] rounded-xl" />
        <div className="flex flex-col w-full ml-4">
            <div className="flex flex-col">
                <h5 className="text-white text-sm font-bold mb-1">{name}</h5>
                <span className="text-white text-sm mb-1">
                    <span className="font-bold">Fiyat: </span>{price}₺
                </span>

            </div>
            <div className="flex w-full">
                <h5 className="font-bold text-sm w-full mb-1">{quantity} Adet </h5>
                <div className="flex w-full justify-end items-center gap-2">
                    <button onClick={onPlus} className="text-yellow flex justify-center items-center text-xl">
                        <PlusCircleIcon className="h-5 w-5" />
                    </button>
                    <button onClick={onMinus} className="text-yellow flex justify-center items-center text-xl">
                        <MinusCircleIcon className="h-5 w-5" />
                    </button>
                    <button onClick={onDelete} className="text-yellow flex justify-center items-center text-xl">
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>;
};

export default BasketFood;