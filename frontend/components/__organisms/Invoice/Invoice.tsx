"use client";

import PaymentTerms from "@/components/__atoms/Invoice-details/PaymentTerms";
import React, { useEffect, useState } from "react";
import PriceTotal from "@/components/__atoms/Invoice-details/PriceTotal";

type Props = {
  onDiscard: () => void;
};

const Invoice = ({ onDiscard }: Props) => {
  const [items, setItems] = useState<number[]>([]);
  const [discard, setDiscard] = useState(false);

  const newItem = (e: React.FormEvent<HTMLButtonElement>) => {
    setItems((prev) => [...prev, prev.length]);
  };

  useEffect(() => {
    if (discard) {
      onDiscard();
    }
  }, [discard]);

  return (
    <div className=" bg-gray-900/60 w-[100%] h-full absolute ">
      <div className="w-[50%] pl-[110px] top-0 left-0 h-[100vh] flex flex-col justify-start p-[20px] pr-[1.7px] rounded-r-[30px] bg-white absolute ">
        <div className=" overflow-y-auto pr-5">
          <h1 className="font-[inter] font-semibold text-3xl mb-7 ">
            New Invoice
          </h1>

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
                required
                className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                  required
                  className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                  required
                  className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                  required
                  className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                required
                className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
              />
            </div>

            <div>
              <label htmlFor="email" className="text-[#7E88C3] mb-1  text-sm">
                Client's Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="e.g. email@example.com"
                className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
              />
            </div>

            <div>
              <label htmlFor="address" className="text-[#7E88C3] mb-1  text-sm">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                required
                className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                  required
                  className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                  required
                  className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                  required
                  className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                  required
                  className="w-[210px] h-[40px] outline-1 outline-[#DFE3FA] cursor-pointer border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                required
                placeholder="e.g. Graphic Design"
                className="w-[100%] h-[40px] outline-1 outline-[#DFE3FA] cursor-pointer border-[#DFE3FA] border-1 rounded-[5px] p-3 "
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
                  <PriceTotal />
                </div>
              ))}
            </div>

            <button
              onClick={newItem}
              className="w-[100%] h-[50px] bg-gray-100 cursor-pointer mt-4 hover:bg-gray-200 rounded-full text-center font-[inter] font-semibold text-purple-400 "
            >
              + Add New Item
            </button>
          </div>

          <div className="w-[100%] h-[70px] flex flex-row items-center gap-20 mt-10">
            <button
              onClick={() => setDiscard(true)}
              className="w-[110px] h-[50px] rounded-full bg-gray-400 hover:bg-red-700 text-white cursor-pointer "
            >
              Discard
            </button>

            <div className=" flex-row flex items-center gap-3">
              <button className="w-[130px] h-[50px] hover:bg-gray-500 rounded-full cursor-pointer bg-gray-700 text-white ">
                Save as Draft
              </button>
              <button className="w-[130px] h-[50px] hover:bg-purple-500 rounded-full cursor-pointer bg-purple-600 text-white ">
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
