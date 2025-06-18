import Image from "next/image";
import React from "react";
import PictureOne from "../../../Images/PictureOne.png";
import moon from "../../../Images/moon.png";
import profile from "../../../Images/profile.png";
import PictureTwo from "../../../Images/PictureTwo.png";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#F8F8FB]">
      <div className="w-[1200px] h-[600px] flex rounded-[20px] shadow-xl overflow-hidden">
        <div className="w-[103px] bg-[#373B53] flex flex-col justify-between items-center rounded-r-[20px] overflow-hidden">
          <Image src={PictureOne} alt="Logo" width={103} height={60} />

          <div className="flex flex-col items-center gap-6 pb-6">
            <Image src={moon} alt="Moon" width={20} height={20} />
            <div className="w-full h-[1px] bg-[#494E6E]" />
            <Image
              src={profile}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
            />
          </div>
        </div>

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

              <button className="flex items-center gap-3 bg-[#7C5DFA] hover:bg-[#9277FF] text-white font-semibold py-[14px] px-[16px] rounded-full">
                <span className="bg-white text-[#7C5DFA] rounded-full w-8 h-8 flex items-center justify-center text-xl">
                  +
                </span>
                <span className="text-sm font-bold">New Invoice</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Image
              src={PictureTwo}
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
