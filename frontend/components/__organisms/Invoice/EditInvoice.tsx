"use client";

import PaymentTerms from "@/components/__atoms/Invoice-details/PaymentTerms";
import React, { useEffect, useState } from "react";
import PriceTotal from "@/components/__atoms/Invoice-details/PriceTotal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Trash from "../../../Images/trash.png";
import { InvoiceData } from "../HomePage/HomePage";

type Props = {
  onDiscard: () => void;
  invoice: InvoiceData;
  onSave: (updatedInvoice: InvoiceData) => void;
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

const EditInvoice = ({ onDiscard, invoice, onSave }: Props) => {
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

  const onSubmit = (data: FormValue) => {
    const updatedInvoice: InvoiceData = {
      ...invoice,
      address: data.address,
      city: data.city,
      postcode: data.postcode,
      country: data.country,
      addressTwo: data.addressTwo,
      cityTwo: data.cityTwo,
      postcodeTwo: data.postcodeTwo,
      countryTwo: data.countryTwo,
      name: data.name,
      email: data.email,
      description: data.description,
      date: data.date,
      item: invoice.status,
      quantity: invoice.status,
      values: invoice.status,
      total: invoice.status,
    };

    onSave(updatedInvoice);
  };

  useEffect(() => {
    localStorage.getItem("savedInvoice");
  }, []);

  useEffect(() => {
    if (discard) {
      onDiscard();
    }
  }, [discard]);

  useEffect(() => {
    if (invoice) {
      setValue("address", invoice.address);
      setValue("city", invoice.city);
      setValue("postcode", invoice.postcode);
      setValue("country", invoice.country);
      setValue("addressTwo", invoice.addressTwo);
      setValue("cityTwo", invoice.cityTwo);
      setValue("postcodeTwo", invoice.postcodeTwo);
      setValue("countryTwo", invoice.countryTwo);
      setValue("name", invoice.name);
      setValue("email", invoice.email);
      setValue("description", invoice.description);
      setValue("date", invoice.date);
      setValue("item", invoice.item);
      setValue("quantity", invoice.quantity);
      setValue("values", invoice.values);
      setValue("total", invoice.total);
    }
  }, [invoice, setValue]);

  return (
    <div className={`bg-gray-900/60 w-[100%] h-full absolute top-0 left-0 `}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%] pl-[110px] top-0 left-0 h-[100vh] flex flex-col justify-start p-[20px] pr-[1.7px] rounded-r-[30px] bg-white absolute "
      >
        <div className=" overflow-y-auto pr-5">
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
              <label htmlFor="address" className="text-[#7E88C3] mb-1  text-sm">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                {...register("address")}
                className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.address
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
              />
            </div>

            <div className="w-[100%] flex flex-row justify-between gap-4 ">
              <div className="flex flex-col">
                <label htmlFor="city" className="text-[#7E88C3] mb-1  text-sm">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.city
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="postcode"
                  className="text-[#7E88C3] mb-1  text-sm"
                >
                  Post Code
                </label>
                <input
                  type="text"
                  id="postcode"
                  {...register("postcode")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.postcode
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
                />
              </div>

              <div className="flex flex-col ">
                <label
                  htmlFor="country"
                  className="text-[#7E88C3] mb-1  text-sm"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  {...register("country")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.country
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
                />
              </div>
            </div>
          </div>

          <div className=" w-[100%] flex flex-col mb-7 gap-3 ">
            <h3 className="font-[inter] font-semibold text-lg text-[#7C5DFA] ">
              Bill To
            </h3>

            <div>
              <label htmlFor="name" className="text-[#7E88C3] mb-1  text-sm">
                Client's Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.name
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-[#7E88C3] mb-1  text-sm">
                Client's Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="e.g. email@example.com"
                className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.email
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
              />
            </div>

            <div>
              <label
                htmlFor="addressTwo"
                className="text-[#7E88C3] mb-1  text-sm"
              >
                Street Address
              </label>
              <input
                type="text"
                id="addressTwo"
                {...register("addressTwo")}
                className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.addressTwo
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
              />
            </div>

            <div className="w-[100%] flex flex-row justify-between gap-4 ">
              <div className="flex flex-col">
                <label
                  htmlFor="cityTwo"
                  className="text-[#7E88C3] mb-1  text-sm"
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
                  className="text-[#7E88C3] mb-1  text-sm"
                >
                  Post Code
                </label>
                <input
                  type="text"
                  id="postcodeTwo"
                  {...register("postcodeTwo")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.postcodeTwo
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
                />
              </div>

              <div className="flex flex-col ">
                <label
                  htmlFor="countryTwo"
                  className="text-[#7E88C3] mb-1  text-sm"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="countryTwo"
                  {...register("countryTwo")}
                  className={`w-[100%] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.countryTwo
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
                />
              </div>
            </div>

            <div className="w-[100%] flex flex-row justify-between gap-4 mt-2 ">
              <div className="flex flex-col ">
                <label htmlFor="date" className="text-[#7E88C3] mb-1  text-sm">
                  Invoice Date
                </label>
                <input
                  type="date"
                  id="date"
                  {...register("date")}
                  className={`w-[210px] h-[40px] outline-1 border-1
                 rounded-[5px] p-3 ${
                   errors.date
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
                />
              </div>

              <PaymentTerms />
            </div>

            <div className="flex flex-col mt-2 ">
              <label
                htmlFor="description"
                className="text-[#7E88C3] text-sm mb-1"
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
                   errors.description
                     ? `outline-[#ff0000] border-[#ff0000]`
                     : `outline-[#DFE3FA] border-[#DFE3FA]`
                 } `}
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
                <div key={i} className="w-[100%] flex flex-row gap-3 ">
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
                      className="right-11 bottom-24 w-[25px] h-[25px] mt-[6px] ml-[15px] cursor-pointer "
                    />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={newItem}
              className="w-[100%] h-[50px] bg-gray-100 cursor-pointer mt-4 hover:bg-gray-200 rounded-full text-center font-[inter] font-semibold text-purple-400 "
            >
              + Add New Item
            </button>
          </div>

          <div className="w-[100%] h-[70px] flex flex-row items-end justify-end gap-5 mt-3">
            <button
              onClick={() => setDiscard(true)}
              className="w-[110px] h-[50px] hover:bg-gray-200 rounded-full bg-gray-100  text-gray-500 font-semibold cursor-pointer "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-[140px] h-[50px] transition font-semibold hover:bg-purple-500 bg-purple-600 rounded-full cursor-pointer text-white "
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditInvoice;
