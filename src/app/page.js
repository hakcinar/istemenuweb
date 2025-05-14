"use client";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid"; // Heroicons'dan hamburger menü ikonu
import Image from "next/image"; // Next.js'in Image bileşeni
import tanitimResmi from "@/images/Tanıtım-1.png"; // Tanıtım resmi
import tanitimResmi2 from "@/images/Tanıtım-2.png"; // İkinci tanıtım resmi
import Slider from "@/components/MainSlider"; // Ana kaydırıcı bileşeni

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Menü durumu

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Menü durumunu değiştir
  };

  const listItemStyle =
    "px-4 py-2 hover:bg-gray-200 cursor-pointer border-b-2 border-yellow rounded-md"; // Liste öğeleri için stil

  return (
    <div className="px-4 relative">
      <div className="flex justify-between py-2 w-full max-w-[480px] relative z-10">
        <h5 className="text-yellow text-xl font-extrabold">iste</h5>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="bg-yellow-500 text-yellow rounded-md flex items-center justify-center"
          >
            <Bars3Icon className="h-6 w-6 text-yellow" />{" "}
            {/* Hamburger menü ikonu */}
          </button>
          {menuOpen && (
            <div className="absolute top-full right-0 bg-darkgray text-white w-48 rounded-md z-20">
              <ul className="flex flex-col">
                <li className={listItemStyle}>Hakkımızda</li>
                <li className={listItemStyle}>Müşteri Ol</li>
                <li className={listItemStyle}>İletişim</li>
                <li className={listItemStyle}>Gizlilik Politikası</li>
                <li className={listItemStyle}>Hesap Silme</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <div className="flex flex-col justify-center">
          <div>
            <h5 className="text-yellow text-sm font-bold mb-2">Biz Kimiz?</h5>
            <p className="text-white text-xs mb-4">
              Restoran işletmeciliğini daha kolay bir hale getirmek için
              buradayız. Amacımız, hem size hem de müşterilerinize sorunsuz bir
              yemek deneyimi sunmak. QR kodla çalışan sipariş sistemimiz
              sayesinde menünüzü dakikalar içinde hazırlayabilir,
              müşterilerinizin de sadece bir tıkla istedikleri yemeği
              seçmelerini sağlayabilirsiniz. Hem siz rahat edin, hem
              müşterileriniz memnun kalsın!
            </p>
          </div>
          <Image
            src={tanitimResmi}
            alt="Tanıtım Resmi"
            priority
            className="w-full h-auto"
          />
          <div>
            <h5 className="text-yellow text-sm font-bold mb-2">Ne Yaparız?</h5>
            <p className="text-white text-xs mb-4">
              Restoranlar için özel olarak tasarladığımız platformumuz,
              geleneksel menü yönetimini ve sipariş süreçlerini modernize eder.
              Misafirler, masalarında otururken akıllı telefonlarından QR kodu
              taratarak menüye erişebilir ve siparişlerini doğrudan sistemimize
              iletebilir. Bu, hem zamandan tasarruf etmelerini sağlar hem de
              garsonların her masaya tek tek sipariş alma yükünü hafifletir.
              Böylece, ekip daha verimli bir şekilde çalışabilir ve misafir
              memnuniyeti artar.
            </p>
          </div>
          <Image
            src={tanitimResmi2}
            alt="Tanıtım Resmi"
            priority
            className="w-full h-auto"
          />
          <div>
            <h5 className="text-yellow text-sm font-bold mb-2 mt-4">
              Gelecek Vizyonumuz
            </h5>
            <p className="text-white text-xs mb-4">
              Sürdürülebilir ve yenilikçi çözümler üreterek, global restoran
              endüstrisinde bir marka haline gelmek. Her geçen gün teknolojimizi
              geliştirerek, restoranların ve misafirlerin karşılaştığı
              zorlukları en aza indirmeyi hedefliyoruz.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Slider />
      </div>
    </div>
  );
};

export default Page;
