import { motion } from "framer-motion";
import Link from "next/link";

const Food = ({ alt, name, src, price, href, preparationTime }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={href}
        className="w-full bg-gray py-4 flex px-4 mb-2 rounded-xl"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          className="object-cover w-1/4 aspect-square rounded-xl"
          alt={alt}
          src={src}
        />
        <div className="flex flex-col px-4">
          <h5 className="text-white text-sm font-bold mb-2">{name}</h5>
          <span className="text-white text-sm mb-2"><span className="font-bold">Fiyat: </span>{price}₺</span>
          <div>
            <span className="text-white text-sm">
              <span className="font-bold">Hazırlanma Süresi: </span>{preparationTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Food;
