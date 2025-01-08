"use client";
import { getDocs, getDoc } from "@/utils/firestore";
import { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "@/components/category";
import Title from "@/components/UI/Title";
import Loader from "@/components/loader";

export default function page({ params: { restaurantNo, tableNo } }) {
  const searchIcon = (
    <FontAwesomeIcon
      className="text-black absolute top-[18px] font-thin left-10 text-xl"
      icon={faMagnifyingGlass}
    />
  );
  useEffect(() => {
    getCategories();
  }, []);
  const setRestaurantAndTable = (restaurantNo, tableNo) => {
    window.dispatchEvent(new Event('restaurantChanged'));
    localStorage.setItem('restaurantNo', restaurantNo);
    localStorage.setItem('tableNo', tableNo);
  }
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true)
  const filteredCategories = categories.filter((category) => {
    return category.name
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase());
  });
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
      <div className="w-full flex flex-col pt-3 flex-1 items-center bg-black ">
        <div className="w-full px-6 relative">
          <input
            value={filter}
            onChange={filterHandler}
            className="px-14 w-full fw-bold rounded-md relative py-4 mb-4"
            type="text"
            placeholder="Arama Yap..."
          />
          {searchIcon}
          <Title content="Kategoriler" />
        </div>
        <ul className="grid w-full px-3 gap-6 grid-cols-2">
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
                    pathname: `/${restaurantNo}/${tableNo}/menu/${item.id}`,
                  }}
                />
              );
            })}
        </ul>
      </div>
    )
  );
}
