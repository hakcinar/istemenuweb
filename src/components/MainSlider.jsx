import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper'ın temel stilleri
import slide1 from "@/images/Slider-1.png";
import slide2 from "@/images/Slider-2.png";
import slide3 from "@/images/Slider-3.png";
import Image from "next/image"; // Next.js'in Image bileşeni
const Slider = () => {
  return (
    <Swiper spaceBetween={20} slidesPerView={1.2}>
      <SwiperSlide className="mb-4">
        <div className="bg-darkgray text-white p-4 rounded-md">
          <h5 className="text-yellow text-lg font-bold mb-2">Masa Yönetimi</h5>
          <p className="text-white text-sm mb-4">
            Restoranına özel masalarını yönet.
          </p>
          <div className="px-6">
            <Image
              src={slide3}
              alt="Tanıtım Resmi"
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-darkgray text-white p-4 rounded-md">
          <div className="px-6">
            <Image
              src={slide2}
              alt="Tanıtım Resmi"
              priority
              className="w-full h-auto"
            />
          </div>
          <h5 className="text-yellow text-lg font-bold mt-2">Masa Ekle</h5>
          <p className="text-white text-sm mb-4">
            İstediğin isimde masaları adlandır.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-darkgray text-white p-4 rounded-md">
          <h5 className="text-yellow text-lg font-bold">QR Kod Oluştur</h5>
          <p className="text-white text-xs mb-3">
            Tek tıkla tüm masalarına ayrı ayrı QR kodlarını oluştur, istersen
            yazdır istersen paylaş.
          </p>
          <div className="px-6">
            <Image
              src={slide1}
              alt="Tanıtım Resmi"
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
