import React, { useState } from "react";

const Button = ({ text }) => {
  const [clickHandler, setClickHandler] = useState(false);
  const handleClick = () => {
    setClickHandler((snap) => !snap);
  };
  const defaultButton =
    "text-yellow bg-black border-2 font-bold rounded-xl text-lg border-yellow outline-none px-8 py-4";
  const activeButton =
    "text-yellow bg-black border-2 font-bold rounded-xl text-lg border-yellow outline-none px-8 py-4 focus:bg-yellow focus:text-black focus:outline-none";
  return (
    <button
      onClick={handleClick}
      className={clickHandler ? activeButton : defaultButton}
    >
      {text}
    </button>
  );
};

export default Button;
