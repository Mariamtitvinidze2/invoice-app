"use client";
import { useTheme } from "../../ThemeContext";
import ThemeToggle from "../../ThemeToggle";
import Image from "next/image";
import profile from "../../../Images/profile.png";
import React from "react";

const Header = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`fixed z-50 w-[80px] h-full ${
        theme === "dark" ? "bg-[#1E2139]" : "bg-[#373B53]"
      } flex flex-col justify-between items-center rounded-r-[20px] overflow-hidden`}
    >
      {" "}
      <svg
        onClick={() => location.reload()}
        width="103"
        height="103"
        viewBox="0 0 103 103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[110px] mt-[-16px]"
      >
        <path
          d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
          fill="#7C5DFA"
        />
        <mask
          id="mask0_1_42"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="103"
          height="103"
        >
          <path
            d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_1_42)">
          <path
            d="M103 52H20C8.95431 52 0 60.9543 0 72V135C0 146.046 8.95431 155 20 155H103V52Z"
            fill="#9277FF"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.6942 33.2922L52 51.9999L61.3058 33.2922C67.6645 36.6407 72 43.314 72 50.9999C72 62.0456 63.0457 70.9999 52 70.9999C40.9543 70.9999 32 62.0456 32 50.9999C32 43.314 36.3355 36.6407 42.6942 33.2922Z"
          fill="white"
        />
      </svg>
      <div className="flex flex-col items-center gap-4 pb-6">
        <div className="flex flex-col items-center gap-4 pb-6">
          <ThemeToggle />
          <div className="w-full h-[1px] bg-[#494E6E]" />
          <Image
            src={profile}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
