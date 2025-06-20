"use client";

import Image from "next/image";
import Trash from "../../../Images/trash.png";
import React, { useState } from "react";

const PriceTotal = () => {
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    if (rawValue === "") {
      setValue("");
      return;
    }

    const number = (parseFloat(rawValue) / 100).toFixed(2);
    const parts = number.split(".");
    const formatted = Number(parts[0]).toLocaleString();
    setValue(`${formatted}.${parts[1]}`);
  };

  const quantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const numbersOnly = raw.replace(/[^\d]/g, "");
    setQuantity(numbersOnly);
  };

  return (
    <>
      <div className="flex flex-col ">
        <input
          type="text"
          required
          className="w-[160px] h-[40px] outline-1 outline-[#DFE3FA]  border-[#DFE3FA] border-1 rounded-[5px] p-3 "
        />
      </div>

      <div className="flex flex-col ">
        <input
          onChange={quantityChange}
          type="text"
          required
          value={quantity || ""}
          className="w-[49px] h-[40px] outline-1 outline-[#DFE3FA]  border-[#DFE3FA] border-1 rounded-[5px] text-center "
        />
      </div>

      <div className="flex flex-col ">
        <input
          type="text"
          value={`$${value || ""}`}
          required
          onChange={handleChange}
          placeholder="0.00"
          className="w-[80px] h-[40px] outline-1 outline-[#DFE3FA]  border-[#DFE3FA] border-1 rounded-[5px] p-3 "
        />
      </div>
      <div className="flex flex-row ">
        <div className="w-[80px] h-[40px] outline-1 outline-[#DFE3FA]  border-[#DFE3FA] border-1 rounded-[5px] flex flex-col items-start pl-3 justify-center relative ">
          <p>
            $
            {value && quantity
              ? (
                  parseFloat(value.replace(/,/g, "")) * Number(quantity)
                ).toFixed(2)
              : "0.00"}
          </p>
        </div>
        <Image
          src={Trash}
          alt="trash"
          height={30}
          width={20}
          className="right-11 bottom-24 w-[25px] h-[25px] mt-[6px] ml-[15px] cursor-pointer "
        />
      </div>
    </>
  );
};

export default PriceTotal;
