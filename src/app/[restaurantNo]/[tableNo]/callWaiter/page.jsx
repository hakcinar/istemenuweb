"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = ({ params: { restaurantNo, tableNo } }) => {
  const [waiterLoading, setWaiterLoading] = useState(false);
  const [billLoading, setBillLoading] = useState(false);
  const bellIcon = <FontAwesomeIcon className="font-bold" icon={faBell} />;

  const spinner = (
    <FontAwesomeIcon className="font-bold animate-spin" icon={faSpinner} />
  );

  const sendNotification = async (type) => {
    if (type === "waiter") {
      setWaiterLoading(true);
    } else if (type === "bill") {
      setBillLoading(true);
    }
    try {
      console.log("Starting notification request with:", {
        restaurantNo,
        tableNo,
        type,
      });

      // Log the full URL being called
      const apiUrl = "/api/notification";
      console.log("Calling API at:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantNo,
          tableNo,
          type,
        }),
      }).catch((error) => {
        console.error("Fetch failed:", error);
        throw error;
      });

      console.log("API Response status:", response.status);

      // Log the raw response
      const rawResponse = await response.text();
      console.log("Raw response:", rawResponse);

      // Parse the response as JSON
      const responseData = rawResponse ? JSON.parse(rawResponse) : null;
      console.log("Parsed response data:", responseData);

      if (!response.ok) {
        throw new Error(
          responseData?.message || `HTTP error! status: ${response.status}`
        );
      }

      toast.success(
        type === "bill"
          ? "Hesap isteğiniz iletildi"
          : "Garson çağrınız iletildi",
        {
          style: {
            background: "#FEFE00",
            color: "#000000",
            fontWeight: "bold",
          },
        }
      );
    } catch (error) {
      console.error("Client Error:", error);
      console.error("Error stack:", error.stack);
      toast.error(`Bir hata oluştu: ${error.message}`);
    } finally {
      if (type === "waiter") {
        setWaiterLoading(false);
      } else if (type === "bill") {
        setBillLoading(false);
      }
    }
  };

  const handleWaiterCall = () => sendNotification("waiter");
  const handleBillRequest = () => sendNotification("bill");

  return (
    <div className="text-white flex flex-1 flex-col px-4">
      <h1 className="text-white text-2xl mt-4 font-bold mb-2">Garson Çağır</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col bg-gray p-4 rounded-xl">
          <h1 className="text-yellow text-lg font-bold mb-1">Hesap İste</h1>
          <p className="text-white text-sm mb-4">
            Hesap istemek için tıklayınız
          </p>
          <button
            onClick={handleBillRequest}
            disabled={billLoading}
            className="text-black font-bold flex justify-between items-center bg-yellow border-2 rounded-xl text-xl border-yellow outline-none px-4 py-2 w-full"
          >
            {billLoading ? "Hesap İsteğiniz İletiliyor..." : "Hesap İste"}{" "}
            {billLoading ? spinner : bellIcon}
          </button>
        </div>

        <div className="flex flex-col bg-gray p-4 rounded-xl">
          <h1 className="text-yellow text-lg font-bold mb-1">Garson Çağır</h1>
          <p className="text-white text-sm mb-4">
            Garson çağırmak için tıklayınız.
          </p>
          <button
            onClick={handleWaiterCall}
            disabled={waiterLoading}
            className="text-black font-bold flex justify-between items-center bg-yellow border-2 rounded-xl text-xl border-yellow outline-none px-4 py-2 w-full"
          >
            {waiterLoading ? "Garson Çağrınız İletiliyor..." : "Garson Çağır"}{" "}
            {waiterLoading ? spinner : bellIcon}
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        closeButton={false}
        theme="colored"
        toastStyle={{
          backgroundColor: "#FEFE00",
          color: "#000000",
          fontWeight: "bold",
        }}
      />
    </div>
  );
};

export default Page;
