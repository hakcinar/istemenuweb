import React from "react";

const Loader = () => {
  return (
    <div className="h-full w-full flex flex-1 flex-col items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <h1 className="text-yellow text-3xl font-medium mb-4">iste</h1>
        <div className="flex gap-2">
          <div
            className="w-3 h-3 bg-yellow rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "200ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "400ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
