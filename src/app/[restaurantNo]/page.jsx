"use client";
import React, { useState, useEffect } from "react";
import { getTableList } from "@/utils/firestore";
import Title from "@/components/UI/Title";
import Link from "next/link";
import Loader from "@/components/loader";

const Page = ({ params: { restaurantNo } }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllTableList();
    console.log(restaurantNo);
  }, []);
  const getAllTableList = async () => {
    const data = await getTableList(restaurantNo.restaurantNo);
    console.log(data);
    setTables(data);
    setLoading(false);
  };
  const emptyTable = "font-medium text-lime-500";
  const busyTable = "font-medium text-red-500";
  console.log(tables);
  return (
    <div className="bg-black flex-1 text-white px-4">
      {/* <Title content="Masa Listesi" /> 
      <div className="flex flex-wrap gap-3 flex-1 ">
        {loading ? <Loader /> : (
          tables.map((table) => {
            return (
              <Link
                href={{
                  pathname: `/${restaurantNo.restaurantNo}/${table.no}`,
                }}
                className="flex w-[48%] bg-white px-8 rounded-xl py-4 text-black mt-4  justify-between items-center"
                key={table.id}
              >
                <h2 className="font-bold">Masa:{table.no}</h2>
                <h5 className={table.status === "Dolu" ? busyTable : emptyTable}>
                  {table.status}
                </h5>
              </Link>
            );
          })
        )}
      </div> */}
    </div>
  );
};

export default Page;
