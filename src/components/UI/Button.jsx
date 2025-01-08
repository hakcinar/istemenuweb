import React, { useState } from "react";

const Button = ({ text, isActive = false,handleClick }) => {

  const defaultButton =
    "text-yellow bg-black border-2 font-bold rounded-xl text-lg border-yellow outline-none px-8 py-4";
  const activeButton =
    "text-black bg-yellow border-2 font-bold rounded-xl text-lg border-yellow outline-none px-8 py-4";
  return (
    <button
      onClick={handleClick}
      className={isActive ? activeButton : defaultButton}
    >
      {text}
    </button>
  );
};

export default Button;
