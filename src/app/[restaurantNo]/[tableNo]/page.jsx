"use client";
import {
  getDocs,
  getOrder,
  getRestaurantLocation,
  calculateDistance,
} from "@/utils/firestore";
import { use, useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "@/components/Category";
import Title from "@/components/UI/Title";
import Loader from "@/components/loader";
import OrderStatus from "@/components/OrderStatus";

const Page = ({ params: { restaurantNo, tableNo } }) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [distanceError, setDistanceError] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const getUserLocation = async () => {
    setLocationLoading(true);
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
          console.log("User Location:", latitude, longitude);
          localStorage.setItem("userLatitude", latitude);
          localStorage.setItem("userLongitude", longitude);
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          reject(error);
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  };

  const calculateUserDistance = async () => {
    const restaurantNo = localStorage.getItem("restaurantNo");
    const restaurantLocation = await getRestaurantLocation(restaurantNo);
    const [restaurantLatitude, restaurantLongitude] = restaurantLocation;
    try {
      const { latitude: userLatitude, longitude: userLongitude } =
        await getUserLocation();
      console.log("User Location:", userLatitude, userLongitude);
      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        restaurantLatitude,
        restaurantLongitude
      );
      if (distance < 10) {
        setDistanceError(false);
      }
    } catch (error) {
      console.error("Error calculating distance:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getFullOrder();
    getUserLocation();
    calculateUserDistance();
  }, []);

  const setRestaurantAndTable = (restaurantNo, tableNo) => {
    window.dispatchEvent(new Event("restaurantChanged"));
    localStorage.setItem("restaurantNo", restaurantNo);
    localStorage.setItem("tableNo", tableNo);
  };

  const filteredCategories = categories.filter((category) => {
    return category.name
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase());
  });

  const getFullOrder = async () => {
    try {
      setOrderLoading(true);
      const orderData = await getOrder(restaurantNo, tableNo);
      setOrder(orderData);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setOrderLoading(false);
    }
  };

  const getCategories = async () => {
    const data = await getDocs("", restaurantNo);
    setCategories(data);
    setLoading(false);
  };

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  setRestaurantAndTable(restaurantNo, tableNo);

  return loading ? (
    <Loader />
  ) : locationLoading ? ( // ← BURAYI EKLEDİK
    <div className="w-full flex flex-col px-4 pt-3 flex-1 items-center bg-black">
      <p className="text-white text-center mt-10">
        Konumunuz kontrol ediliyor...
      </p>
    </div>
  ) : distanceError ? (
    <div className="w-full flex flex-col px-4 pt-3 flex-1 items-center bg-black">
      <p className="text-white text-center mt-10">
        Restoran çok uzak, sipariş veremezsiniz.
      </p>
    </div>
  ) : (
    <div className="w-full flex flex-col px-4 pt-3 flex-1 items-center bg-black">
      {!orderLoading && order && order.status && (
        <OrderStatus
          tableNo={tableNo}
          href={`${tableNo}/order`}
          status={order.status}
        />
      )}
      <div className="w-full">
        <input
          value={filter}
          onChange={filterHandler}
          className="px-4 w-full fw-bold rounded-md relative py-4 mb-4"
          type="text"
          placeholder="Kategori Ara"
        />
        <div className="flex justify-between items-center">
          <Title content="Kategoriler" />
          <Title content={`Masa ${tableNo}`} className="text-white"></Title>
        </div>
      </div>
      <ul className="grid w-full gap-6 grid-cols-2">
        {!filter &&
          categories.map((item) => {
            return (
              <Category
                src={`data:image/jpeg;base64,${item.image}`}
                name={item.name}
                key={item.id}
                href={{
                  pathname: `/${restaurantNo}/${tableNo}/${item.id}`,
                }}
              />
            );
          })}
        {filter &&
          filteredCategories.map((item) => {
            return (
              <Category
                src={`data:image/jpeg;base64,${item.image}`}
                name={item.name}
                key={item.id}
                href={{
                  pathname: `/${restaurantNo}/${tableNo}/${item.id}`,
                }}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Page;
