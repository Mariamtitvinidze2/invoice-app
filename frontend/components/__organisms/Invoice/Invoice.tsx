"use client";

import PaymentTerms from "@/components/__atoms/Invoice-details/PaymentTerms";
import React, { useEffect, useState } from "react";
import PriceTotal from "@/components/__atoms/Invoice-details/PriceTotal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Trash from "../../../Images/trash.png";
import { useTheme } from "../../ThemeContext";

import { watch } from "fs";

type Props = {
  onDiscard: () => void;
};

type Item = {
  id: number;
};

export type FormValue = {
  address: string;
  city: string;
  postcode: string;
  country: string;
  addressTwo: string;
  cityTwo: string;
  postcodeTwo: string;
  countryTwo: string;
  name: string;
  email: string;
  description: string;
  date: string;
  item: string;
  quantity: string;
  values: string;
  total: string;
};

const schema = yup.object().shape({
  address: yup.string().required(),
  city: yup.string().required(),
  postcode: yup.string().required(),
  country: yup.string().required(),
  addressTwo: yup.string().required(),
  cityTwo: yup.string().required(),
  postcodeTwo: yup.string().required(),
  countryTwo: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required().email(),
  description: yup.string().required(),
  date: yup.string().required(),
  values: yup.string().required(),
  quantity: yup.string().required(),
  item: yup.string().required(),
  total: yup.string().required(),
});

const Invoice = ({ onDiscard }: Props) => {
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ resolver: yupResolver(schema) });
  const [items, setItems] = useState<Item[]>([]);
  const [discard, setDiscard] = useState(false);

  const newItem = (e: React.FormEvent<HTMLButtonElement>) => {
    setItems((prev) => [...prev, { id: Date.now() }]);
  };

  const deletItem = (id: number) => {
    setItems((prev) => prev.filter((el) => el.id !== id));
  };

  const onSubmit = async (data: FormValue) => {
    const existingInvoices = JSON.parse(
      localStorage.getItem("Invoices") || "[]"
    );

    const newInvoice = {
      ...data,
      id: Date.now(),
      status: "Pending",
      total: data.total,
    };

    localStorage.setItem(
      "Invoices",
      JSON.stringify([...existingInvoices, newInvoice])
    );

    console.log(data.total, "total in invoice");
    setDiscard(true);
  };

  useEffect(() => {
    if (discard) {
      onDiscard();
    }
  }, [discard]);

  return (
    <div
      className={`w-full z-20 h-full absolute ${
        theme === "dark" ? "bg-black/70" : "bg-gray-900/60"
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-[50%] pl-[110px] top-0 left-0 h-[100vh] flex flex-col justify-start p-[20px] pr-[1.7px] rounded-r-[30px] absolute overflow-y-auto ${
          theme === "dark" ? "bg-[#141625] text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`overflow-y-auto pr-5 scrollbar scrollbar-thin ${
            theme === "dark"
              ? "scrollbar-thumb-[#555] scrollbar-track-[#1E2139]"
              : "scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          }`}
        >
          <h1 className="font-[inter] font-semibold text-3xl mb-7 ">
            New Invoice
          </h1>

          {Object.keys(errors).length > 0 && (
            <p className="font-[inter] text-red-700 font-semibold absolute top-[30px] right-[30px] ">
              - All fields must be added!
            </p>
          )}

          <div className=" w-[100%] flex flex-col mb-7 gap-2 ">
            <h3 className="font-[inter] font-semibold text-lg text-[#7C5DFA] ">
              Bill From
            </h3>

            <div>
              <label
                htmlFor="address"
                className={`mb-1 text-sm ${
                  theme === "dark" ? "text-white" : "text-[#7E88C3]"
                }`}
              >
                Street Address
              </label>

              <input
                type="text"
                id="address"
                {...register("address")}
                className={`w-full h-[40px] rounded-[5px] p-3 border outline-none ${
                  errors.address ? "border-red-500" : "border-[#DFE3FA]"
                } ${
                  theme === "dark"
                    ? "bg-[#1E2139] border-[#252945] text-white"
                    : "bg-white text-black"
                }`}
              />
            </div>

            <div className="w-[100%] flex flex-row justify-between gap-4 ">
              <div className="flex flex-col">
                <label
                  htmlFor="city"
                  className={`mb-1 text-sm ${
                    theme === "dark" ? "text-white" : "text-[#7E88C3]"
                  }`}
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                    theme === "dark"
                      ? "bg-[#1E2139] border-[#252945] text-white"
                      : "bg-white text-black"
                  }`}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="postcode"
                  className={`mb-1 text-sm ${
                    theme === "dark" ? "text-white" : "text-[#7E88C3]"
                  }`}
                >
                  Post Code
                </label>
                <input
                  type="text"
                  id="postcode"
                  {...register("postcode")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                    theme === "dark"
                      ? "bg-[#1E2139] border-[#252945] text-white"
                      : "bg-white text-black"
                  }`}
                />
              </div>

              <div className="flex flex-col ">
                <label
                  htmlFor="country"
                  className={`mb-1 text-sm ${
                    theme === "dark" ? "text-white" : "text-[#7E88C3]"
                  }`}
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  {...register("country")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                    theme === "dark"
                      ? "bg-[#1E2139] border-[#252945] text-white"
                      : "bg-white text-black"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className=" w-[100%] flex flex-col mb-7 gap-3 ">
            <h3 className="font-[inter] font-semibold text-lg text-[#7C5DFA] ">
              Bill To
            </h3>

            <div>
              <label
                htmlFor="name"
                className={`mb-1 text-sm ${
                  theme === "dark" ? "text-white" : "text-[#7E88C3]"
                }`}
              >
                Client's Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                  theme === "dark"
                    ? "bg-[#1E2139] border-[#252945] text-white"
                    : "bg-white text-black"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={`mb-1 text-sm ${
                  theme === "dark" ? "text-white" : "text-[#7E88C3]"
                }`}
              >
                Client's Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="e.g. email@example.com"
                className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                  theme === "dark"
                    ? "bg-[#1E2139] border-[#252945] text-white"
                    : "bg-white text-black"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="addressTwo"
                className={`mb-1 text-sm ${
                  theme === "dark" ? "text-white" : "text-[#7E88C3]"
                }`}
              >
                Street Address
              </label>
              <input
                type="text"
                id="addressTwo"
                {...register("addressTwo")}
                className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                  theme === "dark"
                    ? "bg-[#1E2139] border-[#252945] text-white"
                    : "bg-white text-black"
                }`}
              />
            </div>

            <div className="w-[100%] flex flex-row justify-between gap-4 ">
              <div className="flex flex-col">
                <label
                  htmlFor="cityTwo"
                  className={`mb-1 text-sm ${
                    theme === "dark" ? "text-white" : "text-[#7E88C3]"
                  }`}
                >
                  City
                </label>
                <input
                  type="text"
                  id="cityTwo"
                  {...register("cityTwo")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.cityTwo
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="postcodeTwo"
                  className={`mb-1 text-sm ${
                    theme === "dark" ? "text-white" : "text-[#7E88C3]"
                  }`}
                >
                  Post Code
                </label>
                <input
                  type="text"
                  id="postcodeTwo"
                  {...register("postcodeTwo")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                    theme === "dark"
                      ? "bg-[#1E2139] border-[#252945] text-white"
                      : "bg-white text-black"
                  }`}
                />
              </div>

              <div className="flex flex-col ">
                <label
                  htmlFor="countryTwo"
                  className={`mb-1 text-sm ${
                    theme === "dark" ? "text-white" : "text-[#7E88C3]"
                  }`}
                >
                  Country
                </label>
                <input
                  type="text"
                  id="countryTwo"
                  {...register("countryTwo")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                    theme === "dark"
                      ? "bg-[#1E2139] border-[#252945] text-white"
                      : "bg-white text-black"
                  }`}
                />
              </div>
            </div>

            <div className="w-[100%] flex flex-row justify-between gap-4 mt-2 ">
              <div className="flex flex-col ">
                <label
                  htmlFor="date"
                  className={`mb-1 text-sm ${
                    theme === "dark" ? "text-white" : "text-[#7E88C3]"
                  }`}
                >
                  Invoice Date
                </label>
                <input
                  type="date"
                  id="date"
                  {...register("date")}
                  className={`w-[210px] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                    theme === "dark"
                      ? "bg-[#1E2139] border-[#252945] text-white"
                      : "bg-white text-black"
                  }`}
                />
              </div>

              <PaymentTerms />
            </div>

            <div className="flex flex-col mt-2 ">
              <label
                htmlFor="description"
                className={`mb-1 text-sm ${
                  theme === "dark" ? "text-white" : "text-[#7E88C3]"
                }`}
              >
                Project Description
              </label>
              <input
                type="text"
                id="description"
                {...register("description")}
                placeholder="e.g. Graphic Design"
                className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address ? "border-red-500" : "border-[#DFE3FA]"
                 } ${
                  theme === "dark"
                    ? "bg-[#1E2139] border-[#252945] text-white"
                    : "bg-white text-black"
                }`}
              />
            </div>
          </div>

          <div>
            <h1 className="font-[inter] font-semibold text-lg mb-2">
              Item List
            </h1>

            <div className="flex flex-row mb-1">
              <p className="text-[#7E88C3] text-sm mb-1 w-[172px]">Item Name</p>
              <p className="text-[#7E88C3] text-sm mb-1 w-[62px]">Qty.</p>
              <p className="text-[#7E88C3] text-sm mb-1 w-[90px]">Price</p>
              <p className="text-[#7E88C3] text-sm mb-1 w-[110px]">Total</p>
            </div>

            <div className="flex flex-col gap-3">
              {items.map((el, i) => (
                <div key={i} className="w-full flex flex-row gap-3">
                  <PriceTotal
                    watch={watch}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                  />
                  <button type="button" onClick={() => deletItem(el.id)}>
                    <Image
                      src={Trash}
                      alt="trash"
                      height={30}
                      width={20}
                      priority
                      className="w-[25px] h-[25px] mt-[6px] ml-[15px] cursor-pointer"
                    />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={newItem}
              className={`w-full h-[50px] mt-4 rounded-full text-center font-[inter] font-semibold cursor-pointer ${
                theme === "dark"
                  ? "bg-[#1E2139] text-[#7C5DFA] hover:bg-[#252945]"
                  : "bg-gray-100 text-purple-400 hover:bg-gray-200"
              }`}
            >
              + Add New Item
            </button>
          </div>

          <div className="w-full h-[70px] flex flex-row items-center justify-between mt-10">
            <button
              onClick={() => setDiscard(true)}
              className={`w-[110px] h-[50px] rounded-full text-white cursor-pointer ${
                theme === "dark"
                  ? "bg-gray-500 hover:bg-red-600"
                  : "bg-gray-400 hover:bg-red-700"
              }`}
            >
              Discard
            </button>

            <button
              type="submit"
              className="w-[130px] h-[50px] rounded-full cursor-pointer bg-purple-600 hover:bg-purple-500 text-white"
            >
              Save & Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Invoice;
