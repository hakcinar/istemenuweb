"use client";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid"; // Heroicons'dan hamburger menü ikonu
import Image from "next/image"; // Next.js'in Image bileşeni
import tanitimResmi from "@/images/Tanıtım-1.png"; // Tanıtım resmi
import tanitimResmi2 from "@/images/Tanıtım-2.png"; // İkinci tanıtım resmi
import Slider from "@/components/MainSlider"; // Ana kaydırıcı bileşeni
import menüResmi from "@/images/Menü-1.png";
import Link from "next/link"; // Next.js'in Link bileşeni
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
      <div>
        <h3 className="text-yellow font-bold ">Menü Yönetimi</h3>
        <p className="text-white text-xs mb-4">
          Kolay bir şekilde menünü hazırla, anlık olarak müşterilerinin
          masalarıdaki QR kodlarını taratarak menünüzü görsün.
        </p>
        <Image
          src={menüResmi}
          alt="Tanıtım Resmi"
          priority
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-col mt-4">
        <h3 className="text-yellow font-bold mb-2">Uygulamalarımız</h3>
        <h5 className="text-white text-sm">
          <span className="flex items-end mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.6 9.48l1.43-2.48a.5.5 0 10-.87-.5l-1.46 2.54A8.13 8.13 0 0012 8c-1.6 0-3.1.45-4.7 1.04L5.84 6.5a.5.5 0 10-.87.5l1.43 2.48C3.7 10.56 2 12.6 2 15v2.5A2.5 2.5 0 004.5 20h15a2.5 2.5 0 002.5-2.5V15c0-2.4-1.7-4.44-4.4-5.52zM7.5 17a1 1 0 110-2 1 1 0 010 2zm9 0a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <span className="text-green-500 text-sm font-semibold">
              Android
            </span>
          </span>
        </h5>

        <a
          className=" text-yellow underline text-sm mb-2"
          target="_blank"
          download="isteGarson"
          href="/isteGarson.apk"
        >
          Garson Uygulamamız
        </a>
        <a
          className=" text-yellow text-sm underline mb-4"
          target="_blank"
          download="isteGarson"
          href="/isteRestoran.apk"
        >
          Restoran Uygulamamız
        </a>
        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M17.472 11.668c-.024-2.568 2.088-3.792 2.184-3.852-1.2-1.752-3.072-1.992-3.744-2.016-1.584-.168-3.096.936-3.9.936-.816 0-2.064-.912-3.396-.888-1.752.024-3.36 1.032-4.26 2.616-1.824 3.168-.468 7.848 1.296 10.416.864 1.248 1.896 2.64 3.24 2.592 1.296-.048 1.788-.84 3.36-.84 1.56 0 2.016.84 3.384.816 1.404-.024 2.28-1.272 3.12-2.52.624-.912.864-1.392 1.356-2.448-3.564-1.356-3.432-4.008-3.408-4.104zm-4.14-7.668c.72-.876 1.212-2.088 1.08-3.3-1.044.048-2.304.696-3.048 1.572-.672.792-1.26 2.064-1.032 3.276 1.164.09 2.28-.588 3-.552z" />
          </svg>
          <span className="text-white text-sm font-semibold">App Store</span>
        </div>
        <a
          className=" text-yellow text-sm underline mb-2"
          target="_blank"
          href="https://apps.apple.com/tr/app/i-ste-garson/id6660781736?l=tr"
        >
          Garson Uygulamamız
        </a>
        <a
          className=" text-yellow underline text-sm mb-4"
          target="_blank"
          href="https://apps.apple.com/tr/app/i-ste-restoran/id6714482926?l=tr"
        >
          Restoran Uygulamamız
        </a>
      </div>
      <footer className="mb-4">
        <h5 className="text-yellow font-bold mt-4 mb-2">İletişim</h5>
        <div className="flex flex-col justify-between text-white">
          <div>
            <span className="text-yellow text-sm font-bold mb-2">
              E-posta:{" "}
            </span>
            <Link
              className="text-white text-sm font-bold"
              href="mailto:destekistee@gmail.com"
            >
              destekistee@gmail.com
            </Link>
          </div>
          <span className="text-yellow text-sm font-bold mb-2">
            Telefon:{" "}
            <Link className="text-white text-sm" href="tel:+905312590172">
              0 531 259 01 72
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Page;
