"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { setWaiterCall } from "@/utils/firestore"; // You'll need to create this function

const page = ({ params: { restaurantNo, tableNo } }) => {
    const [loading, setLoading] = useState(false);

    const bellIcon = (
        <FontAwesomeIcon className="font-bold" icon={faBell} />
    );

    const spinner = (
        <FontAwesomeIcon
            className="font-bold animate-spin"
            icon={faSpinner}
        />
    );

    const handleWaiterCall = async () => {
        setLoading(true);
        try {
            await setWaiterCall(restaurantNo, tableNo);
            toast.success("Garson çağrınız iletildi", {
                style: {
                    background: "#FEFE00",
                    color: "#000000",
                    fontWeight: "bold"
                },
            });
        } catch (error) {
            console.error("Error calling waiter:", error);
            toast.error("Bir hata oluştu");
        }
        setLoading(false);
    };

    const handleBillRequest = async () => {
        setLoading(true);
        try {
            await setWaiterCall(restaurantNo, tableNo, true); // Pass true for bill request
            toast.success("Hesap isteğiniz iletildi", {
                style: {
                    background: "#FEFE00",
                    color: "#000000",
                    fontWeight: "bold"
                },
            });
        } catch (error) {
            console.error("Error requesting bill:", error);
            toast.error("Bir hata oluştu");
        }
        setLoading(false);
    };

    return (
        <div className="text-white flex flex-1 flex-col px-4">
            <h1 className="text-white text-2xl mt-4 font-bold mb-2">Garson Çağır</h1>
            
            <div className="flex flex-col gap-4">
                <div className="flex flex-col bg-gray p-4 rounded-xl">
                    <h1 className="text-yellow text-lg font-bold mb-1">Hesap İste</h1>
                    <p className="text-white text-sm mb-4">Hesap istemek için tıklayınız</p>
                    <button 
                        onClick={handleBillRequest} 
                        disabled={loading}
                        className="text-black font-bold flex justify-between items-center bg-yellow border-2 rounded-xl text-xl border-yellow outline-none px-4 py-2 w-full"
                    >
                        {loading ? "İşleniyor..." : "Hesap İste"} {loading ? spinner : bellIcon}
                    </button>
                </div>

                <div className="flex flex-col bg-gray p-4 rounded-xl">
                    <h1 className="text-yellow text-lg font-bold mb-1">Garson Çağır</h1>
                    <p className="text-white text-sm mb-4">Garson çağırmak için tıklayınız.</p>
                    <button 
                        onClick={handleWaiterCall}
                        disabled={loading}
                        className="text-black font-bold flex justify-between items-center bg-yellow border-2 rounded-xl text-xl border-yellow outline-none px-4 py-2 w-full"
                    >
                        {loading ? "İşleniyor..." : "Garson Çağır"} {loading ? spinner : bellIcon}
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
                    fontWeight: "bold"
                }}
            />
        </div>
    );
};

export default page;
