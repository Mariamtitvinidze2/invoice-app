"use client";
// use client ჩავამატე რომ სტეიტი გამომეყენებინა

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Invoice from "../Invoice/Invoice";
import EMailProf from "../../../Images/email.png";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [modal, setModal] = useState(false); // (k)

  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#F8F8FB]">
      {modal && <Invoice onDiscard={() => setModal(false)} />}

      <div className="flex-1 p-12 flex flex-col">
        <div className="flex items-center justify-center gap-[300px] mb-12">
          <div>
            <h1 className="text-[32px] font-bold text-[#0C0E16] leading-none">
              Invoices
            </h1>
            <p className="text-sm text-[#888EB0] mt-1">No invoices</p>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-sm font-bold text-[#0C0E16] hover:opacity-70 flex items-center">
              Filter by status
              <span className="ml-2 text-xs">▼</span>
            </button>

            <button
              onClick={(e) => setModal(true)}
              className="flex items-center justify-start gap-4 cursor-pointer bg-[#7C5DFA] hover:bg-[#9277FF] text-white font-semibold py-[8px] px-[15px] rounded-full"
            >
              <div className="bg-white ml-[-8px] text-[#7C5DFA] rounded-full w-8 h-8 text-center text-xl">
                <p className="pt-[1px]">+</p>
              </div>
              <span className="text-sm font-bold">New Invoice</span>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Image
            src={EMailProf}
            alt="Empty"
            width={240}
            height={200}
            className="mb-10"
          />
          <h2 className="text-[24px] font-bold text-[#0C0E16] mb-4">
            There is nothing here
          </h2>
          <p className="text-sm text-[#888EB0] max-w-[220px]">
            Create an invoice by clicking the <br />
            <span className="font-semibold">New Invoice</span> button and get
            started
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 right-6 text-sm bg-[#7C5DFA] hover:bg-[#9277FF] text-white px-4 py-2 rounded-md shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
