import React from "react";
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

const BasketFood = ({ src, alt, name, price, quantity, onPlus, onMinus, onDelete }) => {

    return <div className="w-full bg-gray p-4 flex mb-2 items-start rounded-xl">
        <img src={src} alt={alt} className="object-cover w-1/4 aspect-square rounded-xl" />
        <div className="flex flex-col w-full px-4 mb-4">
            <div className="flex flex-col">
                <h5 className="text-white text-sm font-bold mb-1">{name}</h5>
                <span className="text-white text-sm mb-1">
                    <span className="font-bold">Fiyat: </span>{price} ₺
                </span>

            </div>
            <div className="flex w-full justify-start ">
                <div className="flex w-full justify-start items-center gap-2 mt-2 ml-[-4px] ">
                    <button onClick={onPlus} className="text-yellow flex justify-center items-center text-xl">
                        <PlusCircleIcon className="w-6 aspect-square" />
                    </button>
                    <span className="text-yellow text-sm font-bold">{quantity} Adet</span>
                    <button onClick={onMinus} classNam e="text-yellow flex justify-center items-center text-xl">
                        <MinusCircleIcon className="w-6 text-yellow aspect-square" />
                    </button>
                    <button onClick={onDelete} className="text-yellow flex justify-center items-center text-xl">
                        <TrashIcon className="w-6 aspect-square" />
                    </button>
                </div>
            </div>
        </div>
    </div>;
};

export default BasketFood;