"use client";

import Image from "next/image";
import React, { useState } from "react";
import left from "../../../Images/left.png";
import Right from "../../../Images/right.png";

const PaymentTerms = () => {
  const [modal, setModal] = useState<boolean>(false);

  const date = ["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"];
  const [selectDate, setSelectDate] = useState(date[3]);

  return (
    <div>
      <div className="flex flex-col ">
        <p className="text-[#7E88C3] mb-1  text-sm">Payment Terms</p>

        <div
          className={`w-[220px] h-[40px] border-1 outline-1 ${
            modal
              ? `outline-purple-600 border-purple-600`
              : `outline-[#DFE3FA] border-[#DFE3FA]`
          } rounded-[5px] p-3 flex items-center flex-row justify-between `}
        >
          <h1 className="font-semibold">{selectDate}</h1>

          <button onClick={() => setModal(!modal)}>
            <Image
              src={modal ? Right : left}
              alt={modal ? "right" : "left"}
              height={20}
              width={20}
              className="cursor-pointer"
            />
          </button>
        </div>

        {modal && (
          <div className="w-[220px] h-[180px] absolute mt-[70px] z-10 rounded-[9px] shadow-2xl bg-white flex felx-col ">
            <div>
              {date.map((el, i) => (
                <div
                  onClick={(e) => {
                    setModal(false), setSelectDate(el);
                  }}
                  key={i}
                  className={`w-[220px] h-[45px] p-3 flex felx-col cursor-pointer font-[inter] hover:text-purple-600 font-semibold ${
                    i === date.length - 1
                      ? `border-b-0`
                      : `border-b-1 border-[#b7b9bd]`
                  } `}
                >
                  <h1>{el}</h1>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTerms;
