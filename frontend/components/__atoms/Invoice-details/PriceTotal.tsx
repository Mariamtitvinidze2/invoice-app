"use client";

import React, { useState, useEffect } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FormValue } from "@/components/__organisms/Invoice/Invoice";

type Props = {
  register: UseFormRegister<FormValue>;
  errors: FieldErrors<FormValue>;
  setValue: UseFormSetValue<FormValue>;
  watch: UseFormWatch<FormValue>;
};

const PriceTotal = ({ register, errors, setValue, watch }: Props) => {
  const [price, setPrice] = useState("");
  const quantity = watch("quantity");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");

    if (rawValue === "") {
      setPrice("");
      setValue("values", "");
      return;
    }

    const number = (parseFloat(rawValue) / 100).toFixed(2);
    const parts = number.split(".");
    const formatted = Number(parts[0]).toLocaleString();
    const finalValue = `${formatted}.${parts[1]}`;

    setPrice(finalValue);
    setValue("values", finalValue);
  };

  const totalPrice = (
    parseFloat(price.replace(/,/g, "")) * Number(quantity || 0)
  ).toFixed(2);

  useEffect(() => {
    if (price && quantity) {
      setValue("total", totalPrice);
    } else {
      setValue("total", "0.00");
    }
  }, [price, quantity, setValue, totalPrice]);

  return (
    <div className="flex gap-2">
      <input
        type="text"
        {...register("item")}
        className={`w-[160px] h-[40px] border-1 outline-1 rounded p-3 ${
          errors.item ? "border-red-500" : "outline-[#DFE3FA] border-[#DFE3FA]"
        }`}
      />

      <input
        type="text"
        {...register("quantity", {
          onChange: (e) => {
            const raw = e.target.value.replace(/[^\d]/g, "");
            setValue("quantity", raw);
          },
        })}
        value={quantity || ""}
        className={`w-[59px] h-[40px] border-1 outline-1  rounded text-center ${
          errors.quantity
            ? "border-red-500"
            : "outline-[#DFE3FA]  border-[#DFE3FA]"
        }`}
      />

      <input
        type="text"
        value={`$${price}`}
        {...register("values")}
        onChange={handlePriceChange}
        className={`w-[80px] h-[40px] border-1 outline-1 rounded text-center ${
          errors.values
            ? "border-red-500"
            : "outline-[#DFE3FA]  border-[#DFE3FA]"
        }`}
      />

      <input
        type="text"
        value={`$${quantity && price ? totalPrice : `0.00`}`}
        {...register("total")}
        readOnly
        className="w-[80px] h-[40px] border-1 outline-1  rounded text-center outline-[#DFE3FA]  border-[#DFE3FA]"
      />
    </div>
  );
};

export default PriceTotal;
