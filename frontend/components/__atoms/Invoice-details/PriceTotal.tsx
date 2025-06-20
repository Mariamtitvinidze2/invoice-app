"use client";

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

type FormValue = {
  item: string;
  quantity: string;
  values: string;
};

const schema = yup.object().shape({
  values: yup.string().required(),
  quantity: yup.string().required(),
  item: yup.string().required(),
});

const PriceTotal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ resolver: yupResolver(schema) });
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
          {...register("item")}
          className={`w-[160px] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.item
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
        />
      </div>

      <div className="flex flex-col ">
        <input
          type="text"
          value={quantity || ""}
          {...register("quantity")}
          className={`w-[49px] h-[40px] outline-1 border-1 rounded-[5px] text-center 
                 ${
                   errors.quantity
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
          onChange={quantityChange}
        />
      </div>

      <div className="flex flex-col ">
        <input
          type="text"
          value={`$${value || ""}`}
          placeholder="0.00"
          {...register("values")}
          className={`w-[80px] h-[40px] outline-1 border-1  p-3 rounded-[5px]
                 ${
                   errors.values
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
          onChange={handleChange}
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
      </div>
    </>
  );
};

export default PriceTotal;
