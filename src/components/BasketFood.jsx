import React from "react";
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const BasketFood = ({ src, alt, name, price, quantity, onPlus, onMinus, onDelete }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-gray p-4 flex mb-2 items-start rounded-xl"
        >
            <motion.img 
                whileHover={{ scale: 1.05 }}
                src={src} 
                alt={alt} 
                className="object-cover w-2/5 aspect-square rounded-xl" 
            />
            <div className="flex flex-col w-full px-4 mb-4">
                <div className="flex flex-col">
                    <h5 className="text-white text-sm font-bold mb-1">{name}</h5>
                    <span className="text-white text-sm mb-1">
                        <span className="font-bold">Fiyat: </span>{price} ₺
                    </span>
                </div>
                <div className="flex w-full justify-start">
                    <div className="flex w-full justify-start items-center gap-2 mt-2 ml-[-4px]">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={onPlus} 
                            className="text-yellow flex justify-center items-center text-xl"
                        >
                            <PlusCircleIcon className="w-6 aspect-square" />
                        </motion.button>
                        
                        <motion.span 
                            key={quantity}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-yellow text-sm font-bold"
                        >
                            {quantity} Adet
                        </motion.span>
                        
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={onMinus} 
                            className="text-yellow flex justify-center items-center text-xl"
                        >
                            <MinusCircleIcon className="w-6 text-yellow aspect-square" />
                        </motion.button>
                        
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={onDelete} 
                            className="text-yellow flex justify-center items-center text-xl"
                        >
                            <TrashIcon className="w-6 aspect-square" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BasketFood;