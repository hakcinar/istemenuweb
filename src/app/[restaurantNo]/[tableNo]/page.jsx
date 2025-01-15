"use client";
import { getDocs, getDoc } from "@/utils/firestore";
import { getOrder } from "@/utils/firestore";
import { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "@/components/Category";
import Title from "@/components/UI/Title";
import Loader from "@/components/loader";
import OrderStatus from "@/components/OrderStatus";

const Page = ({ params: { restaurantNo, tableNo } }) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState({});
  const searchIcon = (
    <FontAwesomeIcon
      className="text-black absolute top-[18px] font-thin left-10 text-xl"
      icon={faMagnifyingGlass}
    />
  );
  useEffect(() => {
    getCategories();
    getFullOrder();
  }, []);
  const setRestaurantAndTable = (restaurantNo, tableNo) => {
    window.dispatchEvent(new Event('restaurantChanged'));
    localStorage.setItem('restaurantNo', restaurantNo);
    localStorage.setItem('tableNo', tableNo);
  }

  const filteredCategories = categories.filter((category) => {
    return category.name
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase());
  });
  const getFullOrder = async () => {
    const order = await getOrder(restaurantNo, tableNo);
    setOrder(order);
  }
  const getCategories = async () => {
    const data = await getDocs("", restaurantNo);
    setCategories(data);
    setLoading(false)
  };
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };
  setRestaurantAndTable(restaurantNo, tableNo);
  return (
    loading ? <Loader /> : (
      <div className="w-full flex flex-col px-4 pt-3 flex-1 items-center bg-black ">
        {order && <OrderStatus tableNo={tableNo} status={order.status} />}
        <div className="w-full ">
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
            {/* {searchIcon} */}
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
    )
  );
}

export default Page;
