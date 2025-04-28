import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getOrder } from "@/utils/firestore";
const OrderStatus = ({ status, href }) => {
  const getStatusIndex = () => {
    switch (status) {
      case "pending":
        return 4;
      case "preparing":
        return 50;
      case "delivered":
        return 100;
      default:
        return 1;
    }
  };

  return (
    <Link href={href} className="w-full mb-4 rounded-xl bg-gray p-4">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-white text-center text-xl font-medium">
          Sipariş Alındı
        </h1>
        <h1 className="text-yellow text-center text-lg font-medium">
          Sipariş Durumu
        </h1>
      </div>
      {/* Progress Bar Container */}
      <div className="relative">
        {/* Progress Line */}
        <ProgressBar
          completed={getStatusIndex()}
          bgColor="#FEFE00"
          height="12px"
          isLabelVisible={false}
        />

        {/* Status Items */}
        <div className="flex justify-between mt-[-16px]">
          <div className="flex flex-col items-start gap-1">
            <div
              className={`w-5 h-5 rounded-full ${
                getStatusIndex() >= 33 ? "bg-yellow border-yellow" : "bg-white"
              }`}
            />
            <span
              className={`text-sm ${
                getStatusIndex() >= 33 ? "text-yellow" : "text-white"
              }`}
            >
              Sipariş Alındı
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-5 h-5 rounded-full ${
                getStatusIndex() >= 50 ? "bg-yellow border-yellow" : "bg-white"
              }`}
            />
            <span
              className={`text-sm ${
                getStatusIndex() >= 50 ? "text-yellow" : "text-white"
              }`}
            >
              Hazırlanıyor
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div
              className={`w-5 h-5 rounded-full ${
                getStatusIndex() >= 100 ? "bg-yellow border-yellow" : "bg-white"
              }`}
            />
            <span
              className={`text-sm ${
                getStatusIndex() >= 100 ? "text-yellow" : "text-white"
              }`}
            >
              Teslim Edildi
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderStatus;
