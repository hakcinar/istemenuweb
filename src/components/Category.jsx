"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Category = (props) => {
  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={props.href}>
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="w-full aspect-square rounded-xl object-cover"
          src={props.src}
        />
        <div className="flex justify-center items-center text-center">
          <h5 className="text-white text-lg font-medium mt-2">{props.name}</h5>
        </div>
      </Link>
    </motion.li>
  );
};

export default Category;
