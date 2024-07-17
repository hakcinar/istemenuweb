"use client";
import { getDocs } from "@/utils/firestore";
import { useEffect, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Category from "@/components/category";
import Title from "@/components/UI/Title";

export default function page() {
  const searchIcon = (
    <FontAwesomeIcon
      className="text-black absolute top-[95px] font-thin left-10 text-xl"
      icon={faMagnifyingGlass}
    />
  );
  useEffect(() => {
    getCategories();
  }, []);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const filteredCategories = categories.filter((category) => {
    return category.name.includes(filter);
  });
  const getCategories = async () => {
    const data = await getDocs("");
    setCategories(data);
  };
  const filterHandler = (e) => {
    console.log("filtreli katagori" + filteredCategories.toString);
    setFilter(e.target.value);
    console.log(categories);
  };

  return (
    <div className="w-full flex flex-col pt-3  justify-center items-center bg-black ">
      <div className="w-full px-6">
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
      <ul className="grid px-3 gap-6 grid-cols-2">
        {!filter &&
          categories.map((item) => {
            return (
              <Category
                src={`data:image/jpeg;base64,${item.image}`}
                name={item.name}
                key={item.id}
                href={{
                  pathname: `menu/${item.id}`,
                  query: {
                    name: item.name,
                    id: item.id,
                  },
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
                  pathname: `menu/${item.id}`,
                  query: {
                    name: item.name,
                    id: item.id,
                  },
                }}
              />
            );
          })}
      </ul>
    </div>
  );
}
